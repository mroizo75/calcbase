import { z } from "zod";

export const articleCategorySchema = z.enum([
  "tax-news",
  "business-finance",
  "calculator-guides",
  "economic-news",
]);

const articleBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("h2"),
    text: z.string().min(8).max(120),
  }),
  z.object({
    type: z.literal("h3"),
    text: z.string().min(8).max(120),
  }),
  z.object({
    type: z.literal("p"),
    text: z.string().min(80).max(1200),
  }),
  z.object({
    type: z.literal("ul"),
    items: z.array(z.string().min(12).max(240)).min(2).max(8),
  }),
  z.object({
    type: z.literal("image"),
    prompt: z.string().min(20).max(400),
    alt: z.string().min(8).max(160),
    caption: z.string().min(8).max(200).optional(),
  }),
]);

export const articleDraftPayloadSchema = z
  .object({
    title: z.string().min(20).max(80),
    slug: z
      .string()
      .min(8)
      .max(96)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    excerpt: z.string().min(140).max(160),
    category: articleCategorySchema,
    relatedCalculators: z.array(z.string().min(3)).min(1).max(4),
    coverImagePrompt: z.string().min(20).max(400),
    coverImageAlt: z.string().min(8).max(160),
    reviewNotes: z.string().min(40).max(800),
    blocks: z.array(articleBlockSchema).min(10).max(40),
  })
  .strict()
  .superRefine((value, ctx) => {
    const h2Count = value.blocks.filter((b) => b.type === "h2").length;
    const imageCount = value.blocks.filter((b) => b.type === "image").length;
    const paragraphChars = value.blocks
      .filter((b) => b.type === "p")
      .reduce((sum, b) => sum + (b.type === "p" ? b.text.length : 0), 0);

    if (h2Count < 4) {
      ctx.addIssue({ code: "custom", message: "Need at least 4 H2 sections", path: ["blocks"] });
    }
    if (imageCount < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Need at least 1 in-body image block",
        path: ["blocks"],
      });
    }
    if (paragraphChars < 2500) {
      ctx.addIssue({
        code: "custom",
        message: "Article body paragraphs must be substantial (>=2500 chars)",
        path: ["blocks"],
      });
    }
  });

export type ArticleDraftPayload = z.infer<typeof articleDraftPayloadSchema>;

export interface ArticleTopicCandidate {
  query: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  landingPage: string;
  score: number;
  relatedCalculatorSlugs: string[];
  preferredSlug: string;
}
