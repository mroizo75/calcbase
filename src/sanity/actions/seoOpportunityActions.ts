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
