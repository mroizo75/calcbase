import {
  articleDraftPayloadSchema,
  normalizeArticleDraftCandidate,
  type ArticleDraftPayload,
  type ArticleTopicCandidate,
} from "@/lib/seo/article-draft-schema";
import { topicToSlug } from "@/lib/seo/score-article-topics";

function key(): string | null {
  return process.env.OPENAI_API_KEY ?? null;
}

async function callOpenAiArticleJson(input: {
  apiKey: string;
  model: string;
  topic: ArticleTopicCandidate;
  calculatorSlugs: string[];
  suggestedSlug: string;
}): Promise<{ raw: string | null; status: number; errorText?: string }> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: input.model,
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
            "- coverImagePrompt: clean editorial illustration, no text overlays, no logos.",
            "- reviewNotes: tell the editor what to fact-check before publish.",
            "- category one of: tax-news, business-finance, calculator-guides, economic-news.",
            "- relatedCalculators must be from the provided calculator slug list.",
            "- excerpt EXACTLY 140-160 chars. slug must equal suggestedSlug.",
            "- Total paragraph text across p blocks should exceed 2500 characters.",
            "- No fluff, no fake citations, no inventing laws.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({
            targetQuery: input.topic.query,
            suggestedSlug: input.suggestedSlug,
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
              slug: input.suggestedSlug,
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

  if (!response.ok) {
    return { raw: null, status: response.status, errorText: await response.text() };
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return { raw: data.choices?.[0]?.message?.content ?? null, status: 200 };
}

export interface GenerateArticleDraftResult {
  draft: ArticleDraftPayload | null;
  error?: string;
  modelTried?: string[];
}

/**
 * Generates an article draft for human review. Never publishes.
 */
export async function generateArticleDraft(input: {
  topic: ArticleTopicCandidate;
  calculatorSlugs: string[];
}): Promise<ArticleDraftPayload | null> {
  const result = await generateArticleDraftDetailed(input);
  return result.draft;
}

export async function generateArticleDraftDetailed(input: {
  topic: ArticleTopicCandidate;
  calculatorSlugs: string[];
}): Promise<GenerateArticleDraftResult> {
  const apiKey = key();
  if (!apiKey) return { draft: null, error: "missing_OPENAI_API_KEY" };

  const suggestedSlug = input.topic.preferredSlug || topicToSlug(input.topic.query);
  const models = [
    process.env.OPENAI_SEO_MODEL ?? "gpt-4o-mini",
    "gpt-4o-mini",
    "gpt-4o",
  ].filter((m, i, arr) => arr.indexOf(m) === i);

  const modelTried: string[] = [];
  let lastError = "unknown";

  for (const model of models) {
    modelTried.push(model);
    const { raw, status, errorText } = await callOpenAiArticleJson({
      apiKey,
      model,
      topic: input.topic,
      calculatorSlugs: input.calculatorSlugs,
      suggestedSlug,
    });

    if (!raw) {
      lastError = `openai_http_${status}:${(errorText || "").slice(0, 200)}`;
      continue;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      lastError = "invalid_json";
      continue;
    }

    const normalized = normalizeArticleDraftCandidate(parsed, suggestedSlug);
    const result = articleDraftPayloadSchema.safeParse(normalized);
    if (!result.success) {
      lastError = `zod:${result.error.issues
        .slice(0, 3)
        .map((i) => `${i.path.join(".")}:${i.message}`)
        .join("; ")}`;
      continue;
    }

    const allowed = new Set(input.calculatorSlugs);
    const related = result.data.relatedCalculators.filter((s) => allowed.has(s));
    if (related.length === 0) {
      lastError = "no_valid_related_calculators";
      continue;
    }

    return {
      draft: {
        ...result.data,
        slug: suggestedSlug,
        relatedCalculators: related.slice(0, 4),
      },
      modelTried,
    };
  }

  return { draft: null, error: lastError, modelTried };
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
