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
    text: z.string().min(5).max(160),
  }),
  z.object({
    type: z.literal("h3"),
    text: z.string().min(5).max(160),
  }),
  z.object({
    type: z.literal("p"),
    text: z.string().min(40).max(2000),
  }),
  z.object({
    type: z.literal("ul"),
    items: z.array(z.string().min(8).max(300)).min(2).max(10),
  }),
  z.object({
    type: z.literal("image"),
    prompt: z.string().min(12).max(500),
    alt: z.string().min(5).max(160),
    caption: z.string().min(5).max(200).optional(),
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
    excerpt: z.string().min(120).max(170),
    category: articleCategorySchema,
    relatedCalculators: z.array(z.string().min(3)).min(1).max(4),
    coverImagePrompt: z.string().min(12).max(500),
    coverImageAlt: z.string().min(5).max(160),
    reviewNotes: z.string().min(20).max(1000),
    blocks: z.array(articleBlockSchema).min(8).max(50),
  })
  .strict()
  .superRefine((value, ctx) => {
    const h2Count = value.blocks.filter((b) => b.type === "h2").length;
    const imageCount = value.blocks.filter((b) => b.type === "image").length;
    const paragraphChars = value.blocks
      .filter((b) => b.type === "p")
      .reduce((sum, b) => sum + (b.type === "p" ? b.text.length : 0), 0);

    if (h2Count < 3) {
      ctx.addIssue({ code: "custom", message: "Need at least 3 H2 sections", path: ["blocks"] });
    }
    if (imageCount < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Need at least 1 in-body image block",
        path: ["blocks"],
      });
    }
    if (paragraphChars < 1600) {
      ctx.addIssue({
        code: "custom",
        message: "Article body paragraphs must be substantial (>=1600 chars)",
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

function fit(text: string, min: number, max: number): string {
  let value = text.replace(/\s+/g, " ").trim();
  if (value.length > max) {
    value = value.slice(0, max + 1);
    const cut = value.lastIndexOf(" ");
    value = (cut >= min ? value.slice(0, cut) : value.slice(0, max)).trim();
  }
  while (value.length < min) {
    value = `${value} for business teams`.slice(0, max);
    if (value.length >= min || value.length === max) break;
  }
  return value.slice(0, max);
}

/** Soft-normalize model JSON before Zod so minor length misses don't drop the draft. */
export function normalizeArticleDraftCandidate(
  raw: unknown,
  forcedSlug: string,
): unknown {
  if (!raw || typeof raw !== "object") return raw;
  const obj = { ...(raw as Record<string, unknown>) };

  if (typeof obj.title === "string") obj.title = fit(obj.title, 20, 80);
  if (typeof obj.excerpt === "string") obj.excerpt = fit(obj.excerpt, 140, 160);
  if (typeof obj.coverImagePrompt === "string") {
    obj.coverImagePrompt = fit(obj.coverImagePrompt, 20, 400);
  }
  if (typeof obj.coverImageAlt === "string") {
    obj.coverImageAlt = fit(obj.coverImageAlt, 8, 160);
  }
  if (typeof obj.reviewNotes === "string") {
    obj.reviewNotes = fit(obj.reviewNotes, 40, 800);
  }
  obj.slug = forcedSlug;

  if (Array.isArray(obj.blocks)) {
    obj.blocks = obj.blocks
      .map((block) => {
        if (!block || typeof block !== "object") return null;
        const b = { ...(block as Record<string, unknown>) };
        if (b.type === "h2" || b.type === "h3") {
          if (typeof b.text === "string") b.text = fit(b.text, 8, 120);
          return b;
        }
        if (b.type === "p") {
          if (typeof b.text === "string") b.text = fit(b.text, 80, 1200);
          return b;
        }
        if (b.type === "ul" && Array.isArray(b.items)) {
          b.items = b.items
            .filter((i): i is string => typeof i === "string")
            .map((i) => fit(i, 12, 240))
            .slice(0, 8);
          if ((b.items as string[]).length < 2) return null;
          return b;
        }
        if (b.type === "image") {
          if (typeof b.prompt === "string") b.prompt = fit(b.prompt, 20, 400);
          if (typeof b.alt === "string") b.alt = fit(b.alt, 8, 160);
          if (typeof b.caption === "string") b.caption = fit(b.caption, 8, 200);
          return b;
        }
        return null;
      })
      .filter(Boolean);
  }

  return obj;
}
