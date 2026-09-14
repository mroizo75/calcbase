import { calculators } from "../src/lib/calculators/registry";
import { guides } from "../src/lib/guides/registry";
import { createReviewArticleDraft } from "../src/lib/seo/create-article-draft";
import { fetchGscSnapshot } from "../src/lib/seo/gsc-client";
import { generateArticleDraftDetailed } from "../src/lib/seo/generate-article-draft";
import { scoreArticleTopics } from "../src/lib/seo/score-article-topics";
import { getBaseUrl } from "../src/lib/utils/urls";
import { getWriteClient } from "../src/sanity/lib/client";
import { ALL_ARTICLE_SLUGS_QUERY } from "../src/sanity/lib/queries";

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing locally");
  }

  const snapshot = await fetchGscSnapshot(28);
  const writeClient = getWriteClient();
  const calculatorSlugs = calculators.map((c) => c.slug);
  const existingArticles = await writeClient.fetch<Array<{ slug: string }>>(
    ALL_ARTICLE_SLUGS_QUERY,
  );
  const existingArticleSlugs = new Set(existingArticles.map((a) => a.slug).filter(Boolean));

  const topics = scoreArticleTopics({
    snapshot,
    calculatorSlugs,
    existingArticleSlugs,
    pendingTopicKeys: new Set(),
    existingGuideSlugs: new Set(guides.map((g) => g.slug)),
  });

  if (topics.length === 0) {
    throw new Error("No article topics found even with relaxed filters");
  }

  const topic = topics[0];
  console.log("Generating draft for:", topic.query, "→", topic.preferredSlug);

  const generated = await generateArticleDraftDetailed({ topic, calculatorSlugs });
  if (!generated.draft) {
    throw new Error(
      `OpenAI draft failed: ${generated.error ?? "unknown"} (models: ${generated.modelTried?.join(",")})`,
    );
  }

  const draft = generated.draft;
  const opportunityId = `seoOpportunity.articleDraft.${draft.slug}`;
  await writeClient.createOrReplace({
    _id: opportunityId,
    _type: "seoOpportunity",
    status: "pending",
    kind: "articleDraft",
    pageUrl: `${getBaseUrl()}/news/${draft.slug}`,
    slug: draft.slug,
    recommendedSlug: draft.slug,
    proposedTitle: draft.title.slice(0, 60),
    proposedDescription: draft.excerpt,
    recommendationSummary: `Manual/local draft for "${topic.query}". Review in Articles → Drafts, then Publish to site.`,
    targetQueries: [topic.query],
    impressions: topic.impressions,
    clicks: topic.clicks,
    ctr: topic.ctr,
    position: topic.position,
    periodDays: snapshot.periodDays,
    rationale: `Created via scripts/create-article-now.ts — ${topic.impressions} impr. at pos ${topic.position.toFixed(1)}.`,
    actionBrief:
      "Review draft thoroughly. Publish to site only when quality is AdSense-safe. Then Mark done.",
  });

  const { articleId, coverUploaded } = await createReviewArticleDraft({
    client: writeClient,
    draft,
    sourceOpportunityId: opportunityId,
    baseUrl: getBaseUrl(),
  });

  await writeClient.patch(opportunityId).set({ draftArticleId: articleId }).commit();

  console.log(
    JSON.stringify(
      {
        ok: true,
        opportunityId,
        articleId,
        slug: draft.slug,
        title: draft.title,
        coverUploaded,
        models: generated.modelTried,
        studioPath: "Articles → Drafts — review before release",
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
