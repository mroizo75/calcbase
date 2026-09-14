import { z } from "zod";
import { proposedMetaSchema, type ProposedMeta } from "@/lib/seo/opportunity-schema";
import type { ScoredOpportunity } from "@/lib/seo/opportunity-schema";

const newsMetaSchema = proposedMetaSchema;

/**
 * AI recommendations for title + meta on calculator and news CTR opportunities.
 * Never changes calculator URL slugs (keep stable). Never writes page body.
 */
export async function suggestPageMeta(
  opportunity: ScoredOpportunity,
  existingTitles: string[],
): Promise<(ProposedMeta & { recommendedSlug?: string; recommendationSummary?: string }) | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  if (opportunity.kind !== "calculatorCtr" && opportunity.kind !== "newsCtr") return null;

  const isNews = opportunity.kind === "newsCtr";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_SEO_MODEL ?? "gpt-4o-mini",
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            isNews
              ? "You recommend SEO title and meta description for an existing news/guide URL."
              : "You recommend SEO title and meta description for an existing calculator URL.",
            "Return JSON: { proposedTitle, proposedTitleAlt, proposedDescription, recommendationSummary, recommendedSlug? }.",
            "proposedTitle/proposedTitleAlt: 50-60 chars. proposedDescription: 150-160 chars.",
            "recommendationSummary: 1-2 sentences on why this should lift CTR for the target queries.",
            isNews
              ? "recommendedSlug: optional kebab-case only if current slug is weak; otherwise omit. Do not force slug changes."
              : "Do NOT recommend changing the calculator slug/URL. Omit recommendedSlug.",
            "Use target queries naturally. No clickbait. No FAQ/body content.",
            "Titles must be unique vs existingTitles.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({
            kind: opportunity.kind,
            slug: opportunity.slug,
            pageUrl: opportunity.pageUrl,
            currentTitle: opportunity.currentTitle,
            currentDescription: opportunity.currentDescription,
            targetQueries: opportunity.targetQueries,
            gsc: {
              impressions: opportunity.impressions,
              clicks: opportunity.clicks,
              ctr: opportunity.ctr,
              position: opportunity.position,
            },
            existingTitles,
          }),
        },
      ],
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  const meta = newsMetaSchema.safeParse(parsed);
  if (!meta.success) return null;

  const titleClash = existingTitles.some(
    (t) =>
      t.toLowerCase() === meta.data.proposedTitle.toLowerCase() ||
      (meta.data.proposedTitleAlt &&
        t.toLowerCase() === meta.data.proposedTitleAlt.toLowerCase()),
  );
  if (titleClash) return null;

  const extra = z
    .object({
      recommendationSummary: z.string().min(20).max(400).optional(),
      recommendedSlug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(96)
        .optional(),
    })
    .safeParse(parsed);

  return {
    ...meta.data,
    recommendationSummary: extra.success ? extra.data.recommendationSummary : undefined,
    recommendedSlug:
      isNews && extra.success ? extra.data.recommendedSlug : undefined,
  };
}

/** @deprecated use suggestPageMeta */
export async function suggestCalculatorMeta(
  opportunity: ScoredOpportunity,
  existingTitles: string[],
): Promise<ProposedMeta | null> {
  const result = await suggestPageMeta(opportunity, existingTitles);
  if (!result) return null;
  return {
    proposedTitle: result.proposedTitle,
    proposedDescription: result.proposedDescription,
    proposedTitleAlt: result.proposedTitleAlt,
  };
}
