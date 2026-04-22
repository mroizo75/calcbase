const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://calcbase.com";

export function getBaseUrl(): string {
  return BASE_URL;
}

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

export function getCalculatorUrl(slug: string): string {
  return `/${slug}`;
}

export function getGuideUrl(slug: string): string {
  return `/guides/${slug}`;
}

export function buildShareUrl(slug: string, params: Record<string, string | number>): string {
  const url = new URL(getCanonicalUrl(`/${slug}`));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url.toString();
}
