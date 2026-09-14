import { randomUUID } from "crypto";
import type { SanityClient } from "next-sanity";
import type { ArticleDraftPayload } from "@/lib/seo/article-draft-schema";
import { generateArticleImagePng } from "@/lib/seo/generate-article-draft";

type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "h4" | "blockquote";
  markDefs: unknown[];
  children: PortableTextSpan[];
  listItem?: "bullet" | "number";
  level?: number;
};

type PortableTextImage = {
  _type: "image";
  _key: string;
  alt: string;
  caption?: string;
  asset: { _type: "reference"; _ref: string };
};

function key(): string {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function textBlock(
  style: PortableTextBlock["style"],
  text: string,
): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function bulletItem(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

async function uploadPng(
  client: SanityClient,
  png: Buffer,
  filename: string,
): Promise<string | null> {
  try {
    const asset = await client.assets.upload("image", png, {
      filename,
      contentType: "image/png",
    });
    return asset._id;
  } catch {
    return null;
  }
}

export async function buildArticlePortableText(
  client: SanityClient,
  draft: ArticleDraftPayload,
): Promise<Array<PortableTextBlock | PortableTextImage>> {
  const body: Array<PortableTextBlock | PortableTextImage> = [];

  for (const block of draft.blocks) {
    if (block.type === "h2") {
      body.push(textBlock("h2", block.text));
      continue;
    }
    if (block.type === "h3") {
      body.push(textBlock("h3", block.text));
      continue;
    }
    if (block.type === "p") {
      body.push(textBlock("normal", block.text));
      continue;
    }
    if (block.type === "ul") {
      for (const item of block.items) {
        body.push(bulletItem(item));
      }
      continue;
    }
    if (block.type === "image") {
      const png = await generateArticleImagePng(block.prompt);
      if (!png) continue;
      const assetId = await uploadPng(client, png, `${draft.slug}-inline-${key()}.png`);
      if (!assetId) continue;
      body.push({
        _type: "image",
        _key: key(),
        alt: block.alt,
        caption: block.caption,
        asset: { _type: "reference", _ref: assetId },
      });
    }
  }

  return body;
}

export async function createReviewArticleDraft(input: {
  client: SanityClient;
  draft: ArticleDraftPayload;
  sourceOpportunityId?: string;
  baseUrl: string;
}): Promise<{ articleId: string; coverUploaded: boolean }> {
  const { client, draft, sourceOpportunityId, baseUrl } = input;

  const coverPng = await generateArticleImagePng(draft.coverImagePrompt);
  let coverRef: string | null = null;
  if (coverPng) {
    coverRef = await uploadPng(client, coverPng, `${draft.slug}-cover.png`);
  }

  const body = await buildArticlePortableText(client, draft);
  if (body.length < 8) {
    throw new Error("Generated article body too short after conversion");
  }

  const articleId = `article.${draft.slug}`;
  await client.createOrReplace({
    _id: articleId,
    _type: "article",
    editorialStatus: "draftReview",
    title: draft.title,
    slug: { _type: "slug", current: draft.slug },
    excerpt: draft.excerpt,
    category: draft.category,
    relatedCalculators: draft.relatedCalculators,
    reviewNotes: [
      draft.reviewNotes,
      `Target URL after publish: ${baseUrl}/news/${draft.slug}`,
      "Human must edit for accuracy, originality, and AdSense quality before Publish to site.",
    ].join("\n\n"),
    publishedAt: new Date().toISOString(),
    body,
    ...(coverRef
      ? {
          coverImage: {
            _type: "image",
            alt: draft.coverImageAlt,
            asset: { _type: "reference", _ref: coverRef },
          },
        }
      : {}),
    ...(sourceOpportunityId ? { sourceOpportunityId } : {}),
  });

  return { articleId, coverUploaded: Boolean(coverRef) };
}
