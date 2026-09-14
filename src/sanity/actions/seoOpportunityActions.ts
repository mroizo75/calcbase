import { useState } from "react";
import { useClient, useDocumentOperation, type DocumentActionComponent } from "sanity";

const WRITE_API_VERSION = "2024-01-01";

function overrideDocId(slug: string): string {
  return `calculatorSeoOverride.${slug}`;
}

/** Applies calculator title/meta override only — never article or FAQ body. */
export const applyCalculatorSeoAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const { patch } = useDocumentOperation(id, type);
  const [busy, setBusy] = useState(false);

  if (type !== "seoOpportunity" || !doc) return null;
  if (doc.kind !== "calculatorCtr") return null;
  if (doc.status === "applied" || doc.status === "rejected") return null;

  const proposedTitle = doc.proposedTitle as string | undefined;
  const proposedDescription = doc.proposedDescription as string | undefined;
  const slug = doc.slug as string | undefined;

  if (!proposedTitle || !proposedDescription || !slug) return null;

  return {
    label: busy ? "Applying…" : "Approve & apply title/meta",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);
      try {
        await client.createOrReplace({
          _id: overrideDocId(slug),
          _type: "calculatorSeoOverride",
          slug,
          seoTitle: proposedTitle,
          seoDescription: proposedDescription,
          updatedAt: new Date().toISOString(),
          sourceOpportunityId: id,
        });
        patch.execute([
          {
            set: {
              status: "applied",
              appliedAt: new Date().toISOString(),
              outcome: "awaiting_followup",
              outcomeNotes: "Baseline locked. Follow-up GSC metrics ~7 days after apply.",
            },
          },
        ]);
        onComplete();
      } finally {
        setBusy(false);
      }
    },
  };
};

export const rejectSeoOpportunityAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const { patch } = useDocumentOperation(id, type);

  if (type !== "seoOpportunity" || !doc) return null;
  if (doc.status === "rejected" || doc.status === "applied" || doc.status === "doneManual") {
    return null;
  }

  return {
    label: "Reject",
    tone: "critical",
    onHandle: () => {
      patch.execute([{ set: { status: "rejected" } }]);
      onComplete();
    },
  };
};

export const markDoneManualAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const { patch } = useDocumentOperation(id, type);

  if (type !== "seoOpportunity" || !doc) return null;
  if (doc.kind === "calculatorCtr" && doc.proposedTitle) return null;
  if (doc.status === "doneManual" || doc.status === "applied" || doc.status === "rejected") {
    return null;
  }

  return {
    label: "Mark done (manual)",
    onHandle: () => {
      patch.execute([
        {
          set: {
            status: "doneManual",
            appliedAt: new Date().toISOString(),
            outcome: "awaiting_followup",
            outcomeNotes: "Marked done. Follow-up GSC metrics ~7 days later when possible.",
          },
        },
      ]);
      onComplete();
    },
  };
};

/** Fills empty proposed title/meta on this opportunity (OpenAI or fallback). */
export const generateProposalsAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const [busy, setBusy] = useState(false);

  if (type !== "seoOpportunity" || !doc) return null;
  if (doc.status === "rejected" || doc.status === "applied") return null;
  if (!["calculatorCtr", "newsCtr", "calculatorQueryGap"].includes(String(doc.kind))) {
    return null;
  }

  return {
    label: busy ? "Generating…" : "Generate title/meta",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const secret = process.env.SANITY_STUDIO_CRON_SECRET || "";
        // Studio cannot safely hold CRON_SECRET; patch via local heuristic through write if API unavailable.
        // Prefer calling backfill when deployed with a public trigger is not possible without secret.
        // Generate client-side fallback using current fields, then editor can refine.
        const topQuery =
          Array.isArray(doc.targetQueries) && doc.targetQueries[0]
            ? String(doc.targetQueries[0])
            : String(doc.slug || "calculator").replace(/-/g, " ");

        const fit = (text: string, min: number, max: number) => {
          let value = text.replace(/\s+/g, " ").trim();
          if (value.length > max) {
            value = value.slice(0, max);
            const cut = value.lastIndexOf(" ");
            if (cut >= min) value = value.slice(0, cut);
          }
          const pads = [" | Free CalcBase tool", " – free online calculator", " for business"];
          let i = 0;
          while (value.length < min && i < 12) {
            value = `${value}${pads[i % pads.length]}`.slice(0, max);
            i += 1;
          }
          return value.slice(0, max);
        };

        const proposedTitle = fit(`Free ${topQuery} Calculator – Instant Results`, 50, 60);
        const proposedTitleAlt = fit(`${topQuery} Online – Free & Accurate Tool`, 50, 60);
        const proposedDescription = fit(
          String(
            doc.currentDescription ||
              `Use this free ${topQuery} tool on CalcBase. Fast, accurate results for pricing, invoices, and business decisions. No signup required.`,
          ),
          150,
          160,
        );

        await client
          .patch(id)
          .set({
            proposedTitle,
            proposedTitleAlt,
            proposedDescription,
            recommendationSummary: `Generated in Studio from query “${topQuery}”. Prefer server backfill with OpenAI when available.`,
          })
          .commit();

        // Optional server backfill overwrite when base URL + hint secret exist (local/dev only).
        if (baseUrl && secret) {
          void fetch(`${baseUrl}/api/seo/backfill-proposals`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${secret}`,
            },
            body: JSON.stringify({ opportunityId: id }),
          });
        }

        onComplete();
      } finally {
        setBusy(false);
      }
    },
  };
};
