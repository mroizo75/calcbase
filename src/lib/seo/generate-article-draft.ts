import {
  articleDraftPayloadSchema,
  type ArticleDraftPayload,
  type ArticleTopicCandidate,
} from "@/lib/seo/article-draft-schema";
import { topicToSlug } from "@/lib/seo/score-article-topics";

function key(): string | null {
  return process.env.OPENAI_API_KEY ?? null;
}

export async function generateArticleDraft(input: {
  topic: ArticleTopicCandidate;
  calculatorSlugs: string[];
}): Promise<ArticleDraftPayload | null> {
  const apiKey = key();
  if (!apiKey) return null;

  const suggestedSlug = input.topic.preferredSlug || topicToSlug(input.topic.query);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_SEO_MODEL ?? "gpt-4o",
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "You write deep, original English business/finance draft articles for CalcBase.com.",
            "This draft is for HUMAN REVIEW only and must not be thin or templated.",
            "Return JSON matching the schema exactly. No markdown fences.",
            "Rules:",
            "- title is the only H1 (20-80 chars). Body uses h2/h3 only — never h1.",
            "- At least 4 h2 sections, substantial paragraphs (practical, specific, with numbers/examples).",
            "- Include worked examples with realistic figures.",
            "- Link related calculators as plain paths like /vat-calculator inside paragraph text where natural.",
            "- Include at least one in-body image block with a concrete illustration prompt + alt.",
            "- coverImagePrompt: clean editorial illustration, no text overlays, no logos, photoreal or simple diagram style.",
            "- reviewNotes: tell the editor what to fact-check, localize, and improve before publish.",
            "- category one of: tax-news, business-finance, calculator-guides, economic-news.",
            "- relatedCalculators must be from the provided calculator slug list.",
            "- excerpt 140-160 chars. slug kebab-case.",
            "- Total paragraph text must be substantial (aim 3000+ characters across p blocks).",
            "- No fluff, no 'In today's fast-paced world', no fake citations, no inventing laws.",
            "- If uncertain about a regulation, say the reader should verify with official sources.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({
            targetQuery: input.topic.query,
            suggestedSlug,
            gsc: {
              impressions: input.topic.impressions,
              clicks: input.topic.clicks,
              position: input.topic.position,
              landingPage: input.topic.landingPage,
            },
            preferredCalculators: input.topic.relatedCalculatorSlugs,
            allCalculatorSlugs: input.calculatorSlugs,
            schemaHint: {
              title: "string",
              slug: "kebab-case",
              excerpt: "140-160 chars",
              category: "calculator-guides|business-finance|tax-news|economic-news",
              relatedCalculators: ["slug"],
              coverImagePrompt: "string",
              coverImageAlt: "string",
              reviewNotes: "string",
              blocks: [
                { type: "h2", text: "..." },
                { type: "p", text: "..." },
                { type: "h3", text: "..." },
                { type: "ul", items: ["..."] },
                { type: "image", prompt: "...", alt: "...", caption: "..." },
              ],
            },
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

  const result = articleDraftPayloadSchema.safeParse(parsed);
  if (!result.success) return null;

  // Keep only known calculator slugs
  const allowed = new Set(input.calculatorSlugs);
  const related = result.data.relatedCalculators.filter((s) => allowed.has(s));
  if (related.length === 0) return null;

  return {
    ...result.data,
    slug: suggestedSlug,
    relatedCalculators: related.slice(0, 4),
  };
}

export async function generateArticleImagePng(prompt: string): Promise<Buffer | null> {
  const apiKey = key();
  if (!apiKey) return null;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1",
      prompt: `${prompt}. Editorial business illustration for a finance article. No text, no watermark, no logos.`,
      size: "1536x1024",
    }),
  });

  if (!response.ok) {
    // Fallback for accounts that only have dall-e-3
    const fallback = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `${prompt}. Editorial business illustration for a finance article. No text, no watermark, no logos.`,
        size: "1792x1024",
        response_format: "b64_json",
      }),
    });
    if (!fallback.ok) return null;
    const fb = (await fallback.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>;
    };
    const b64 = fb.data?.[0]?.b64_json;
    if (b64) return Buffer.from(b64, "base64");
    const url = fb.data?.[0]?.url;
    if (!url) return null;
    const img = await fetch(url);
    if (!img.ok) return null;
    return Buffer.from(await img.arrayBuffer());
  }

  const data = (await response.json()) as {
    data?: Array<{ b64_json?: string; url?: string }>;
  };
  const b64 = data.data?.[0]?.b64_json;
  if (b64) return Buffer.from(b64, "base64");
  const url = data.data?.[0]?.url;
  if (!url) return null;
  const img = await fetch(url);
  if (!img.ok) return null;
  return Buffer.from(await img.arrayBuffer());
}
