"use client";

import { useState } from "react";
import { useClient, type DocumentActionComponent } from "sanity";

const WRITE_API_VERSION = "2024-01-01";

/** Makes an article live on /news after human review. Never runs automatically. */
export const publishArticleToSiteAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const [busy, setBusy] = useState(false);

  if (type !== "article" || !doc) return null;
  if (doc.editorialStatus === "published") return null;

  return {
    label: busy ? "Publishing…" : "Publish to site",
    tone: "positive",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);
      try {
        // Commit directly to the published document (avoid Studio draft staging).
        const publishedId = id.replace(/^drafts\./, "");
        await client
          .patch(publishedId)
          .set({
            editorialStatus: "published",
            publishedAt: new Date().toISOString(),
          })
          .commit({ autoGenerateArrayKeys: true });

        // If a draft sibling exists, discard it after syncing fields
        if (id.startsWith("drafts.")) {
          try {
            await client.delete(id);
          } catch {
            // ignore if already gone
          }
        }

        const sourceId = doc.sourceOpportunityId as string | undefined;
        if (sourceId) {
          await client
            .patch(sourceId)
            .set({
              status: "doneManual",
              appliedAt: new Date().toISOString(),
              outcome: "awaiting_followup",
              outcomeNotes:
                "Article published. Follow-up GSC metrics ~7 days later for learning loop.",
            })
            .commit();
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const secret = process.env.SANITY_STUDIO_CRON_SECRET;
        const slugValue = doc.slug;
        const slug =
          typeof slugValue === "string"
            ? slugValue
            : slugValue &&
                typeof slugValue === "object" &&
                "current" in slugValue &&
                typeof (slugValue as { current?: unknown }).current === "string"
              ? (slugValue as { current: string }).current
              : undefined;

        if (baseUrl && secret && slug) {
          void fetch(`${baseUrl}/api/seo/revalidate-news`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${secret}`,
            },
            body: JSON.stringify({ slug }),
          });
        }

        onComplete();
      } finally {
        setBusy(false);
      }
    },
  };
};

export const unpublishArticleAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const [busy, setBusy] = useState(false);

  if (type !== "article" || !doc) return null;
  if (doc.editorialStatus !== "published") return null;

  return {
    label: busy ? "Unpublishing…" : "Unpublish (back to review)",
    tone: "caution",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);
      try {
        const publishedId = id.replace(/^drafts\./, "");
        await client
          .patch(publishedId)
          .set({ editorialStatus: "draftReview" })
          .commit();
        onComplete();
      } finally {
        setBusy(false);
      }
    },
  };
};
