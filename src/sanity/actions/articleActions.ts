"use client";

import { useState } from "react";
import { useClient, useDocumentOperation, type DocumentActionComponent } from "sanity";

const WRITE_API_VERSION = "2024-01-01";

/** Makes an article live on /news after human review. Never runs automatically. */
export const publishArticleToSiteAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = draft || published;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const { patch } = useDocumentOperation(id, type);
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
        patch.execute([
          {
            set: {
              editorialStatus: "published",
              publishedAt: new Date().toISOString(),
            },
          },
        ]);

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
  const { patch } = useDocumentOperation(id, type);

  if (type !== "article" || !doc) return null;
  if (doc.editorialStatus !== "published") return null;

  return {
    label: "Unpublish (back to review)",
    tone: "caution",
    onHandle: () => {
      patch.execute([{ set: { editorialStatus: "draftReview" } }]);
      onComplete();
    },
  };
};
