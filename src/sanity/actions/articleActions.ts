"use client";

import { useState } from "react";
import { useClient, type DocumentActionComponent } from "sanity";

const WRITE_API_VERSION = "2024-01-01";

function resolveSlug(doc: Record<string, unknown> | null | undefined): string | undefined {
  if (!doc) return undefined;
  const slugValue = doc.slug;
  if (typeof slugValue === "string") return slugValue;
  if (
    slugValue &&
    typeof slugValue === "object" &&
    "current" in slugValue &&
    typeof (slugValue as { current?: unknown }).current === "string"
  ) {
    return (slugValue as { current: string }).current;
  }
  return undefined;
}

/**
 * One-click: set editorialStatus=published and commit to the live document.
 * This is the button that makes /news show the article.
 */
export const publishArticleToSiteAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const doc = (draft || published) as Record<string, unknown> | null;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const [busy, setBusy] = useState(false);

  if (type !== "article" || !doc) return null;

  const status = doc.editorialStatus as string | undefined;
  const alreadyLive = status === "published" && !draft;
  if (alreadyLive) return null;

  return {
    label: busy ? "Publishing to site…" : "Publish to site (/news)",
    tone: "positive",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);
      try {
        const publishedId = id.replace(/^drafts\./, "");
        const draftId = id.startsWith("drafts.") ? id : `drafts.${publishedId}`;

        // 1) Ensure published document is live for /news
        await client
          .patch(publishedId)
          .set({
            editorialStatus: "published",
            publishedAt: new Date().toISOString(),
          })
          .commit({ autoGenerateArrayKeys: true });

        // 2) If Studio has a draft, copy critical fields then delete draft
        const draftDoc = await client.fetch(`*[_id == $id][0]`, { id: draftId }).catch(() => null);
        if (draftDoc) {
          const {
            _id: _omitId,
            _rev: _omitRev,
            _type: _omitType,
            ...fields
          } = draftDoc as Record<string, unknown>;
          await client
            .patch(publishedId)
            .set({
              ...fields,
              editorialStatus: "published",
              publishedAt: new Date().toISOString(),
            })
            .commit({ autoGenerateArrayKeys: true });
          try {
            await client.delete(draftId);
          } catch {
            // ignore
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
        const secret = process.env.SANITY_STUDIO_CRON_SECRET || process.env.CRON_SECRET;
        const slug = resolveSlug(doc);
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
  const doc = (draft || published) as Record<string, unknown> | null;
  const client = useClient({ apiVersion: WRITE_API_VERSION });
  const [busy, setBusy] = useState(false);

  if (type !== "article" || !doc) return null;
  if (doc.editorialStatus !== "published") return null;

  return {
    label: busy ? "Unpublishing…" : "Unpublish from /news",
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
