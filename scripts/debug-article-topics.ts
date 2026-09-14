import { calculators } from "../src/lib/calculators/registry";
import { guides } from "../src/lib/guides/registry";
import { fetchGscSnapshot } from "../src/lib/seo/gsc-client";
import { scoreArticleTopics } from "../src/lib/seo/score-article-topics";
import { getWriteClient } from "../src/sanity/lib/client";
import {
  ALL_ARTICLE_SLUGS_QUERY,
  PENDING_SEO_OPPORTUNITY_KEYS_QUERY,
} from "../src/sanity/lib/queries";

async function main() {
  const snapshot = await fetchGscSnapshot(28);
  const writeClient = getWriteClient();
  const pendingRows = await writeClient.fetch<Array<{ key: string }>>(
    PENDING_SEO_OPPORTUNITY_KEYS_QUERY,
  );
  const pendingKeys = new Set(pendingRows.map((r) => r.key).filter(Boolean));
  const existingArticles = await writeClient.fetch<Array<{ slug: string }>>(
    ALL_ARTICLE_SLUGS_QUERY,
  );
  const existingArticleSlugs = new Set(existingArticles.map((a) => a.slug).filter(Boolean));

  const topics = scoreArticleTopics({
    snapshot,
    calculatorSlugs: calculators.map((c) => c.slug),
    existingArticleSlugs,
    pendingTopicKeys: pendingKeys,
    existingGuideSlugs: new Set(guides.map((g) => g.slug)),
  });

  console.log(
    JSON.stringify(
      {
        openAiConfigured: Boolean(process.env.OPENAI_API_KEY),
        topicsFound: topics.length,
        topics: topics.map((t) => ({
          query: t.query,
          preferredSlug: t.preferredSlug,
          impressions: t.impressions,
          position: Number(t.position.toFixed(1)),
          related: t.relatedCalculatorSlugs,
        })),
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
