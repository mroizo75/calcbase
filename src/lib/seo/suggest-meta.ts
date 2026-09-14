import { z } from "zod";
import { proposedMetaSchema, type ProposedMeta } from "@/lib/seo/opportunity-schema";
import type { ScoredOpportunity } from "@/lib/seo/opportunity-schema";
import { getCalculator } from "@/lib/calculators/registry";

const metaExtrasSchema = z.object({
  recommendationSummary: z.string().min(10).max(400).optional(),
  recommendedSlug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(96)
    .optional(),
});

export type PageMetaSuggestion = ProposedMeta & {
  recommendedSlug?: string;
  recommendationSummary?: string;
  source: "openai" | "fallback";
};

/** Force title/description into Zod length windows. */
export function fitSeoLength(text: string, min: number, max: number): string {
  let value = text.replace(/\s+/g, " ").trim();
  if (value.length > max) {
    value = value.slice(0, max + 1);
    const cut = value.lastIndexOf(" ");
    value = (cut >= min ? value.slice(0, cut) : value.slice(0, max)).trim();
  }
  if (value.length > max) value = value.slice(0, max).trim();

  const pads = [
    " | Free CalcBase tool",
    " – free online calculator",
    " for business pricing",
    " with instant results",
  ];
  let i = 0;
  while (value.length < min && i < 20) {
    const pad = pads[i % pads.length];
    const next = `${value}${pad}`;
    value = next.length > max ? next.slice(0, max).trim() : next;
    i += 1;
    if (value.length === max && value.length < min) break;
  }
  if (value.length < min) {
    value = `${value}${".".repeat(min - value.length)}`.slice(0, max);
  }
  return value.slice(0, max);
}

function uniqueTitle(candidate: string, existingTitles: string[]): string {
  const lower = new Set(existingTitles.map((t) => t.toLowerCase()));
  let title = fitSeoLength(candidate, 50, 60);
  if (!lower.has(title.toLowerCase())) return title;

  for (let n = 2; n <= 9; n += 1) {
    const suffix = ` (${n})`;
    const base = fitSeoLength(candidate, 50, Math.max(50, 60 - suffix.length));
    const next = fitSeoLength(`${base}${suffix}`, 50, 60);
    if (!lower.has(next.toLowerCase())) return next;
  }
  return fitSeoLength(`${candidate} online`, 50, 60);
}

/** Deterministic package when OpenAI is missing or returns invalid lengths. */
export function buildFallbackPageMeta(
  opportunity: Pick<
    ScoredOpportunity,
    "slug" | "kind" | "targetQueries" | "currentTitle" | "currentDescription"
  >,
  existingTitles: string[],
): PageMetaSuggestion {
  const topQuery = opportunity.targetQueries[0] ?? opportunity.slug.replace(/-/g, " ");
  const calc = getCalculator(opportunity.slug);
  const topic = topQuery.replace(/\bcalculator\b/gi, "").trim() || calc?.title || opportunity.slug;

  const titleSeed =
    opportunity.kind === "newsCtr"
      ? `${topic}: practical guide for businesses`
      : `Free ${topic} Calculator – Instant Results`;

  const titleAltSeed =
    opportunity.kind === "newsCtr"
      ? `How to handle ${topic} (with examples)`
      : `${calc?.title ?? topic} Online – Free & Accurate`;

  const descSeed =
    opportunity.currentDescription ||
    calc?.seo.description ||
    `Use this free ${topic} tool on CalcBase. Fast, accurate results for pricing, invoices, and business decisions. No signup required.`;

  const proposedTitle = uniqueTitle(titleSeed, existingTitles);
  const proposedTitleAlt = uniqueTitle(titleAltSeed, [...existingTitles, proposedTitle]);
  const proposedDescription = fitSeoLength(descSeed, 150, 160);

  return {
    proposedTitle,
    proposedTitleAlt,
    proposedDescription,
    recommendationSummary: `Fallback package targeting “${topQuery}” to improve CTR. Review wording before apply.`,
    source: "fallback",
  };
}

function clampParsedMeta(parsed: Record<string, unknown>): ProposedMeta | null {
  const title = typeof parsed.proposedTitle === "string" ? parsed.proposedTitle : null;
  const description =
    typeof parsed.proposedDescription === "string" ? parsed.proposedDescription : null;
  if (!title || !description) return null;

  const alt =
    typeof parsed.proposedTitleAlt === "string" ? parsed.proposedTitleAlt : undefined;

  const candidate = {
    proposedTitle: fitSeoLength(title, 50, 60),
    proposedDescription: fitSeoLength(description, 150, 160),
    ...(alt ? { proposedTitleAlt: fitSeoLength(alt, 50, 60) } : {}),
  };

  const result = proposedMetaSchema.safeParse(candidate);
  return result.success ? result.data : null;
}

/**
 * AI recommendations for title + meta. Always returns a package (OpenAI or fallback).
 * Never changes calculator URL slugs. Never writes page body.
 */
export async function suggestPageMeta(
  opportunity: ScoredOpportunity,
  existingTitles: string[],
): Promise<PageMetaSuggestion> {
  const supportsAi =
    opportunity.kind === "calculatorCtr" ||
    opportunity.kind === "newsCtr" ||
    opportunity.kind === "calculatorQueryGap";

  if (!supportsAi) {
    return buildFallbackPageMeta(opportunity, existingTitles);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return buildFallbackPageMeta(opportunity, existingTitles);
  }

  const isNews = opportunity.kind === "newsCtr";

  try {
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
              "proposedTitle/proposedTitleAlt MUST be 50-60 characters. proposedDescription MUST be 150-160 characters. Count carefully.",
              "recommendationSummary: 1-2 sentences on why this should lift CTR for the target queries.",
              isNews
                ? "recommendedSlug: optional kebab-case only if current slug is weak; otherwise omit."
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

    if (!response.ok) {
      return buildFallbackPageMeta(opportunity, existingTitles);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content;
    if (!raw) return buildFallbackPageMeta(opportunity, existingTitles);

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return buildFallbackPageMeta(opportunity, existingTitles);
    }

    if (!parsed || typeof parsed !== "object") {
      return buildFallbackPageMeta(opportunity, existingTitles);
    }

    const meta = clampParsedMeta(parsed as Record<string, unknown>);
    if (!meta) return buildFallbackPageMeta(opportunity, existingTitles);

    const titleClash = existingTitles.some(
      (t) =>
        t.toLowerCase() === meta.proposedTitle.toLowerCase() ||
        (meta.proposedTitleAlt && t.toLowerCase() === meta.proposedTitleAlt.toLowerCase()),
    );
    if (titleClash) {
      const fallback = buildFallbackPageMeta(opportunity, existingTitles);
      return { ...fallback, source: "fallback" };
    }

    const extra = metaExtrasSchema.safeParse(parsed);
    return {
      ...meta,
      recommendationSummary: extra.success ? extra.data.recommendationSummary : undefined,
      recommendedSlug: isNews && extra.success ? extra.data.recommendedSlug : undefined,
      source: "openai",
    };
  } catch {
    return buildFallbackPageMeta(opportunity, existingTitles);
  }
}

/** @deprecated use suggestPageMeta */
export async function suggestCalculatorMeta(
  opportunity: ScoredOpportunity,
  existingTitles: string[],
): Promise<ProposedMeta | null> {
  const result = await suggestPageMeta(opportunity, existingTitles);
  return {
    proposedTitle: result.proposedTitle,
    proposedDescription: result.proposedDescription,
    proposedTitleAlt: result.proposedTitleAlt,
  };
}
