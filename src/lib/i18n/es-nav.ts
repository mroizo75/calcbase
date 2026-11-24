/**
 * Lightweight, client-safe list of calculators that have a Spanish (es-419)
 * version under /es/. Kept separate from the content registry so the header,
 * footer and sitemap can use it without bundling the full Spanish copy.
 *
 * A test (src/tests/i18n-es.test.ts) keeps this list in sync with
 * registry-es.ts and the English registry.
 */
export interface EsNavItem {
  slug: string;
  label: string;
}

export const ES_CALCULATOR_NAV: EsNavItem[] = [
  { slug: "profit-calculator", label: "Calculadora de ganancias" },
];

export const ES_SLUGS: string[] = ES_CALCULATOR_NAV.map((item) => item.slug);

export const ES_HUB_PATH = "/es";

export function hasSpanish(slug: string): boolean {
  return ES_SLUGS.includes(slug);
}

export function esPath(slug: string): string {
  return `/es/${slug}`;
}

/** Maps the current pathname to the equivalent page in the other language. */
export function alternateLanguageHref(pathname: string): { href: string; label: string; lang: string } {
  if (pathname === "/es" || pathname === "/es/") {
    return { href: "/calculators", label: "English", lang: "en" };
  }
  if (pathname.startsWith("/es/")) {
    const slug = pathname.slice("/es/".length).replace(/\/$/, "");
    return { href: `/${slug}`, label: "English", lang: "en" };
  }
  const slug = pathname.replace(/^\//, "").replace(/\/$/, "");
  if (hasSpanish(slug)) {
    return { href: esPath(slug), label: "Español", lang: "es-419" };
  }
  return { href: ES_HUB_PATH, label: "Español", lang: "es-419" };
}
