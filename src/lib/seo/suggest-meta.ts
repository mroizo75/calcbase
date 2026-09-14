import { proposedMetaSchema, type ProposedMeta } from "@/lib/seo/opportunity-schema";
import type { ScoredOpportunity } from "@/lib/seo/opportunity-schema";

/**
 * Optional OpenAI title/meta suggestions for calculatorCtr only.
 * Never generates article body, FAQ, or longDescription.
 */
export async function suggestCalculatorMeta(
  opportunity: ScoredOpportunity,
  existingTitles: string[],
): Promise<ProposedMeta | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  if (opportunity.kind !== "calculatorCtr") return null;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_SEO_MODEL ?? "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "You write SEO title and meta description alternatives for an existing calculator page.",
            "Return JSON only: { \"proposedTitle\": string, \"proposedTitleAlt\": string, \"proposedDescription\": string }.",
            "proposedTitle and proposedTitleAlt: 50-60 characters. proposedDescription: 150-160 characters.",
            "Use the target queries naturally. Do not invent FAQ, articles, or page body.",
            "Titles must be unique vs the provided existing titles list.",
            "No clickbait. Accurate for a free business calculator tool.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({
            slug: opportunity.slug,
            currentTitle: opportunity.currentTitle,
            currentDescription: opportunity.currentDescription,
            targetQueries: opportunity.targetQueries,
            existingTitles,
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

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

  const result = proposedMetaSchema.safeParse(parsed);
  if (!result.success) return null;

  const titleClash = existingTitles.some(
    (t) =>
      t.toLowerCase() === result.data.proposedTitle.toLowerCase() ||
      (result.data.proposedTitleAlt &&
        t.toLowerCase() === result.data.proposedTitleAlt.toLowerCase()),
  );
  if (titleClash) return null;

  return result.data;
}
