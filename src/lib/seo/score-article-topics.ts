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
  if (q.includes("break") || q.includes("even")) {
    return ["break-even-calculator"].filter((s) => calculatorSlugs.includes(s));
  }
  if (q.includes("commission")) {
    return ["commission-calculator"].filter((s) => calculatorSlugs.includes(s));
  }
  if (q.includes("roi")) {
    return ["roi-calculator"].filter((s) => calculatorSlugs.includes(s));
  }
  if (q.includes("discount")) {
    return ["discount-calculator"].filter((s) => calculatorSlugs.includes(s));
  }
  return calculatorSlugs.slice(0, 2);
}

function looksLikeArticleIntent(query: string): boolean {
  return /\b(how|what|why|vs|versus|difference|rate|rates|formula|calculate|mean|example|guide|explain|rule of thumb|countries)\b/i.test(
    query,
  );
}

/**
 * Picks at most one article topic from GSC.
 * Site may rank in positions 40–90 early on — still worth drafting guides for high-impression queries.
 */
export function scoreArticleTopics(input: {
  snapshot: GscSnapshot;
  calculatorSlugs: string[];
  existingArticleSlugs: Set<string>;
  pendingTopicKeys: Set<string>;
  /** Optional: known guide slugs to avoid near-duplicate news drafts */
  existingGuideSlugs?: Set<string>;
}): ArticleTopicCandidate[] {
  const {
    snapshot,
    calculatorSlugs,
    existingArticleSlugs,
    pendingTopicKeys,
    existingGuideSlugs = new Set(),
  } = input;
  const byQuery = new Map<string, ArticleTopicCandidate>();

  for (const row of snapshot.queries) {
    // Early-site reality: many valuable queries sit far below page 1.
    if (row.impressions < 15) continue;
    if (row.position < 3 || row.position > 100) continue;

    const q = row.query.toLowerCase().trim();
    if (q.length < 6) continue;
    if (!looksLikeArticleIntent(q) && !/\b(calculator|margin|markup|vat|gst|profit|commission|roi)\b/i.test(q)) {
      continue;
    }

    // Navigational "{tool} calculator" queries belong on calculator pages, not news drafts
    if (/^(?:free\s+)?[a-z0-9\s-]{2,40}\s+calculator$/i.test(q)) continue;

    const related = inferCalculators(q, calculatorSlugs);
    if (related.length === 0) continue;

    let proposedSlug = slugifyQuery(q);
    if (!proposedSlug) continue;

    // If a guide already owns this slug, create a distinct news angle slug
    if (existingGuideSlugs.has(proposedSlug)) {
      proposedSlug = `${proposedSlug}-practical-examples`;
    }

    if (existingArticleSlugs.has(proposedSlug)) continue;
    if (pendingTopicKeys.has(`articleDraft:${proposedSlug}`)) continue;

    const score =
      (row.impressions / Math.max(row.position, 1)) *
      (1 + (row.position > 20 ? 0.4 : 0)) *
      (looksLikeArticleIntent(q) ? 1.3 : 1);

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
        preferredSlug: proposedSlug,
      });
    }
  }

  return [...byQuery.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ARTICLE_TOPICS);
}

export function topicToSlug(query: string, existingGuideSlugs?: Set<string>): string {
  let slug = slugifyQuery(query);
  if (existingGuideSlugs?.has(slug)) {
    slug = `${slug}-practical-examples`;
  }
  return slug;
}
