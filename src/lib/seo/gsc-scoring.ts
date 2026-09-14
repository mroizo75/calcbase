export interface GscPageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscQueryRow {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscSnapshot {
  periodDays: number;
  pages: GscPageRow[];
  queries: GscQueryRow[];
}

/** Approximate expected CTR by average position (industry-ish curve). */
export function expectedCtrForPosition(position: number): number {
  if (position <= 1) return 0.28;
  if (position <= 2) return 0.15;
  if (position <= 3) return 0.11;
  if (position <= 5) return 0.07;
  if (position <= 10) return 0.03;
  if (position <= 20) return 0.015;
  return 0.008;
}

export function ctrGapScore(row: Pick<GscPageRow, "impressions" | "ctr" | "position">): number {
  if (row.impressions < 50) return 0;
  const expected = expectedCtrForPosition(row.position);
  const gap = expected - row.ctr;
  if (gap <= 0) return 0;
  return gap * Math.log10(row.impressions + 1) * 100;
}

export function queryGapScore(
  query: Pick<GscQueryRow, "impressions" | "position" | "ctr">,
): number {
  if (query.impressions < 20) return 0;
  if (query.position < 4 || query.position > 20) return 0;
  return (query.impressions / query.position) * (1 + Math.max(0, expectedCtrForPosition(query.position) - query.ctr));
}

export function extractSlugFromPageUrl(pageUrl: string, siteHost: string): string | null {
  try {
    const url = new URL(pageUrl);
    const host = url.hostname.replace(/^www\./, "");
    const allowed = siteHost.replace(/^www\./, "");
    if (host !== allowed && !host.endsWith(`.${allowed}`)) {
      return null;
    }
    const path = url.pathname.replace(/\/$/, "") || "/";
    if (path === "/") return "home";
    const segments = path.split("/").filter(Boolean);
    if (segments[0] === "news" && segments[1]) return `news/${segments[1]}`;
    if (segments[0] === "guides" && segments[1]) return `guides/${segments[1]}`;
    if (segments.length === 1) return segments[0];
    return null;
  } catch {
    return null;
  }
}

export function isCalculatorSlug(slug: string, calculatorSlugs: Set<string>): boolean {
  return calculatorSlugs.has(slug);
}

export function isNewsSlug(slug: string): boolean {
  return slug.startsWith("news/");
}
