import type { GscSnapshot } from "@/lib/seo/gsc-scoring";
import type { ArticleTopicCandidate } from "@/lib/seo/article-draft-schema";

const MAX_ARTICLE_TOPICS = 1;

function slugifyQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function inferCalculators(query: string, calculatorSlugs: string[]): string[] {
  const q = query.toLowerCase();
  const hits = calculatorSlugs.filter((slug) => {
    const stem = slug.replace(/-calculator$/, "").replace(/-/g, " ");
    return q.includes(stem) || stem.split(" ").some((w) => w.length > 3 && q.includes(w));
  });
  if (hits.length > 0) return hits.slice(0, 3);
  if (q.includes("vat") || q.includes("gst") || q.includes("tax")) {
    return ["vat-calculator", "add-vat", "remove-vat"].filter((s) => calculatorSlugs.includes(s));
  }
  if (q.includes("margin") || q.includes("markup") || q.includes("profit")) {
    return ["margin-calculator", "markup-calculator", "profit-calculator"].filter((s) =>
      calculatorSlugs.includes(s),
    );
  }
  return calculatorSlugs.slice(0, 2);
}

/**
 * Picks at most one article topic from GSC query gaps.
 * Prefers informational queries in striking distance that deserve a deep guide.
 */
export function scoreArticleTopics(input: {
  snapshot: GscSnapshot;
  calculatorSlugs: string[];
  existingArticleSlugs: Set<string>;
  pendingTopicKeys: Set<string>;
}): ArticleTopicCandidate[] {
  const { snapshot, calculatorSlugs, existingArticleSlugs, pendingTopicKeys } = input;
  const byQuery = new Map<string, ArticleTopicCandidate>();

  for (const row of snapshot.queries) {
    if (row.impressions < 40) continue;
    if (row.position < 5 || row.position > 25) continue;

    const q = row.query.toLowerCase().trim();
    if (q.length < 8) continue;
    // Prefer guide-like intent over pure navigational brand queries
    const looksInformational =
      /\b(how|what|why|vs|versus|rate|rates|formula|calculate|calculator|mean|example|guide)\b/i.test(
        q,
      );
    if (!looksInformational) continue;

    const related = inferCalculators(q, calculatorSlugs);
    if (related.length === 0) continue;

    const proposedSlug = slugifyQuery(q);
    if (!proposedSlug || existingArticleSlugs.has(proposedSlug)) continue;
    if (pendingTopicKeys.has(`articleDraft:${proposedSlug}`)) continue;

    const score =
      (row.impressions / Math.max(row.position, 1)) *
      (1 + (row.position > 10 ? 0.3 : 0)) *
      (looksInformational ? 1.2 : 1);

    const existing = byQuery.get(proposedSlug);
    if (!existing || score > existing.score) {
      byQuery.set(proposedSlug, {
        query: row.query,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        position: row.position,
        landingPage: row.page,
        score,
        relatedCalculatorSlugs: related,
      });
    }
  }

  return [...byQuery.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ARTICLE_TOPICS);
}

export function topicToSlug(query: string): string {
  return slugifyQuery(query);
}
