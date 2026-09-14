import type { CalculatorConfig } from "@/lib/calculators/types";
import {
  ctrGapScore,
  expectedCtrForPosition,
  extractSlugFromPageUrl,
  isCalculatorSlug,
  isNewsSlug,
  queryGapScore,
  type GscQueryRow,
  type GscSnapshot,
} from "@/lib/seo/gsc-scoring";
import {
  scoredOpportunitySchema,
  type ScoredOpportunity,
} from "@/lib/seo/opportunity-schema";

const MAX_OPPORTUNITIES = 8;

export interface PageMetaSnapshot {
  title: string;
  description: string;
}

export interface ScoreOpportunitiesInput {
  snapshot: GscSnapshot;
  siteHost: string;
  calculatorSlugs: Set<string>;
  calculatorMeta: Map<string, PageMetaSnapshot>;
  /** Existing pending keys: `${kind}:${slug}` */
  pendingKeys: Set<string>;
}

function topQueriesForPage(queries: GscQueryRow[], page: string, limit = 5): string[] {
  return queries
    .filter((q) => q.page === page)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit)
    .map((q) => q.query);
}

function buildCalculatorCtr(
  pageUrl: string,
  slug: string,
  impressions: number,
  clicks: number,
  ctr: number,
  position: number,
  periodDays: number,
  queries: string[],
  meta: PageMetaSnapshot | undefined,
  score: number,
): ScoredOpportunity {
  const expected = expectedCtrForPosition(position);
  return scoredOpportunitySchema.parse({
    kind: "calculatorCtr",
    pageUrl,
    slug,
    targetQueries: queries,
    impressions,
    clicks,
    ctr,
    position,
    periodDays,
    rationale: `CTR ${(ctr * 100).toFixed(2)}% is below ~${(expected * 100).toFixed(1)}% expected at position ${position.toFixed(1)} with ${impressions} impressions.`,
    actionBrief: `Review title and meta description for /${slug}. Top queries: ${queries.join(", ") || "n/a"}. Approve a title/meta suggestion or write your own — do not auto-generate page body.`,
    currentTitle: meta?.title,
    currentDescription: meta?.description,
    score,
  });
}

function buildCalculatorQueryGap(
  pageUrl: string,
  slug: string,
  periodDays: number,
  best: GscQueryRow,
  relatedQueries: string[],
): ScoredOpportunity {
  const score = queryGapScore(best);
  return scoredOpportunitySchema.parse({
    kind: "calculatorQueryGap",
    pageUrl,
    slug,
    targetQueries: relatedQueries,
    impressions: best.impressions,
    clicks: best.clicks,
    ctr: best.ctr,
    position: best.position,
    periodDays,
    rationale: `Query "${best.query}" ranks at ${best.position.toFixed(1)} with ${best.impressions} impressions — striking distance on an existing calculator.`,
    actionBrief: `Manually improve FAQ or examples on /${slug} to better answer "${best.query}". Write the content yourself. Do not paste AI article/FAQ spam.`,
    score,
  });
}

function buildNewsOpportunity(
  kind: "newsCtr" | "newsReview",
  pageUrl: string,
  slug: string,
  impressions: number,
  clicks: number,
  ctr: number,
  position: number,
  periodDays: number,
  queries: string[],
  score: number,
): ScoredOpportunity {
  const newsSlug = slug.replace(/^news\//, "");
  return scoredOpportunitySchema.parse({
    kind,
    pageUrl,
    slug,
    targetQueries: queries,
    impressions,
    clicks,
    ctr,
    position,
    periodDays,
    rationale:
      kind === "newsCtr"
        ? `News URL has ${impressions} impressions but CTR ${(ctr * 100).toFixed(2)}% at position ${position.toFixed(1)}.`
        : `News URL warrants a manual quality review (position ${position.toFixed(1)}, ${impressions} impressions).`,
    actionBrief: `Open /news/${newsSlug} in Studio and improve title/excerpt yourself if needed. Never auto-generate article body. Top queries: ${queries.join(", ") || "n/a"}.`,
    score,
  });
}

export function scoreOpportunities(input: ScoreOpportunitiesInput): ScoredOpportunity[] {
  const { snapshot, siteHost, calculatorSlugs, calculatorMeta, pendingKeys } = input;
  const candidates: ScoredOpportunity[] = [];

  for (const page of snapshot.pages) {
    const slug = extractSlugFromPageUrl(page.page, siteHost);
    if (!slug) continue;

    const queries = topQueriesForPage(snapshot.queries, page.page);
    const keyCtr = isNewsSlug(slug) ? `newsCtr:${slug}` : `calculatorCtr:${slug}`;
    const gap = ctrGapScore(page);

    if (gap > 0 && !pendingKeys.has(keyCtr)) {
      if (isCalculatorSlug(slug, calculatorSlugs)) {
        candidates.push(
          buildCalculatorCtr(
            page.page,
            slug,
            page.impressions,
            page.clicks,
            page.ctr,
            page.position,
            snapshot.periodDays,
            queries,
            calculatorMeta.get(slug),
            gap,
          ),
        );
      } else if (isNewsSlug(slug)) {
        candidates.push(
          buildNewsOpportunity(
            "newsCtr",
            page.page,
            slug,
            page.impressions,
            page.clicks,
            page.ctr,
            page.position,
            snapshot.periodDays,
            queries,
            gap,
          ),
        );
      }
    }

    if (isNewsSlug(slug) && page.position >= 8 && page.impressions >= 80) {
      const reviewKey = `newsReview:${slug}`;
      if (!pendingKeys.has(reviewKey) && !candidates.some((c) => c.kind === "newsReview" && c.slug === slug)) {
        candidates.push(
          buildNewsOpportunity(
            "newsReview",
            page.page,
            slug,
            page.impressions,
            page.clicks,
            page.ctr,
            page.position,
            snapshot.periodDays,
            queries,
            page.impressions / page.position,
          ),
        );
      }
    }
  }

  const queryGapBySlug = new Map<string, GscQueryRow>();
  for (const row of snapshot.queries) {
    const slug = extractSlugFromPageUrl(row.page, siteHost);
    if (!slug || !isCalculatorSlug(slug, calculatorSlugs)) continue;
    if (queryGapScore(row) <= 0) continue;
    const existing = queryGapBySlug.get(slug);
    if (!existing || queryGapScore(row) > queryGapScore(existing)) {
      queryGapBySlug.set(slug, row);
    }
  }

  for (const [slug, best] of queryGapBySlug) {
    const key = `calculatorQueryGap:${slug}`;
    if (pendingKeys.has(key)) continue;
    if (candidates.some((c) => c.slug === slug && c.kind === "calculatorCtr")) continue;
    const related = topQueriesForPage(snapshot.queries, best.page);
    candidates.push(
      buildCalculatorQueryGap(best.page, slug, snapshot.periodDays, best, related),
    );
  }

  return candidates.sort((a, b) => b.score - a.score).slice(0, MAX_OPPORTUNITIES);
}

export function buildCalculatorMetaMap(
  calculators: CalculatorConfig[],
): Map<string, PageMetaSnapshot> {
  return new Map(
    calculators.map((c) => [
      c.slug,
      { title: c.seo.title, description: c.seo.description },
    ]),
  );
}
