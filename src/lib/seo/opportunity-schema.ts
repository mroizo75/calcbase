import { z } from "zod";

/** Title/meta only — reject any attempt to carry article/FAQ body fields. */
export const proposedMetaSchema = z
  .object({
    proposedTitle: z.string().min(50).max(60),
    proposedDescription: z.string().min(150).max(160),
    proposedTitleAlt: z.string().min(50).max(60).optional(),
  })
  .strict();

export const seoOpportunityKindSchema = z.enum([
  "calculatorCtr",
  "calculatorQueryGap",
  "newsCtr",
  "newsReview",
  "articleDraft",
]);

export const seoOpportunityStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "applied",
  "doneManual",
]);

export const scoredOpportunitySchema = z
  .object({
    kind: seoOpportunityKindSchema,
    pageUrl: z.string().url(),
    slug: z.string().min(1),
    targetQueries: z.array(z.string()).max(10),
    impressions: z.number().nonnegative(),
    clicks: z.number().nonnegative(),
    ctr: z.number().nonnegative(),
    position: z.number().positive(),
    periodDays: z.number().int().positive(),
    rationale: z.string().min(1),
    actionBrief: z.string().min(1),
    currentTitle: z.string().optional(),
    currentDescription: z.string().optional(),
    score: z.number(),
    proposedTitle: z.string().min(50).max(60).optional(),
    proposedDescription: z.string().min(150).max(160).optional(),
    proposedTitleAlt: z.string().min(50).max(60).optional(),
    draftArticleId: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    // seoOpportunity queue docs must not embed article body — drafts live on article docs.
    const forbidden = ["body", "faq", "longDescription", "portableText", "articleBody", "blocks"] as const;
    for (const key of forbidden) {
      if (key in value) {
        ctx.addIssue({
          code: "custom",
          message: `Forbidden content field: ${key}`,
        });
      }
    }
  });

export type ProposedMeta = z.infer<typeof proposedMetaSchema>;
export type ScoredOpportunity = z.infer<typeof scoredOpportunitySchema>;
export type SeoOpportunityKind = z.infer<typeof seoOpportunityKindSchema>;

export function assertNoContentBodyFields(payload: Record<string, unknown>): void {
  const forbidden = ["body", "faq", "longDescription", "portableText", "articleBody", "blocks"];
  for (const key of forbidden) {
    if (key in payload && payload[key] !== undefined) {
      throw new Error(`SEO payloads must not include content field: ${key}`);
    }
  }
}
