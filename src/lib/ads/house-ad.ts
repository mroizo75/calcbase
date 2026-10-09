import { z } from "zod";
import { isAdPlacement, type AdPlacement } from "@/lib/ads/config";

export interface HouseAd {
  id: string;
  name: string;
  alt: string;
  href: string;
  imageUrl: string;
  width?: number;
  height?: number;
  placements: AdPlacement[];
  /** Empty means every country. Otherwise ISO 3166-1 alpha-2, uppercase. */
  countries: string[];
  priority: number;
}

const houseAdRawSchema = z.object({
  _id: z.string().min(1),
  name: z.string().optional(),
  alt: z.string().min(1),
  href: z.string().min(1),
  priority: z.number().finite().optional(),
  placements: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  imageUrl: z.string().min(1),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export function safeHttpUrl(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeCountry(value: string): string | null {
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

export function mapHouseAd(raw: unknown): HouseAd | null {
  const parsed = houseAdRawSchema.safeParse(raw);
  if (!parsed.success) return null;

  const href = safeHttpUrl(parsed.data.href);
  const imageUrl = safeHttpUrl(parsed.data.imageUrl);
  if (!href || !imageUrl) return null;

  const placements = (parsed.data.placements ?? []).filter(isAdPlacement);
  if (placements.length === 0) return null;

  const countries = (parsed.data.countries ?? [])
    .map(normalizeCountry)
    .filter((code): code is string => Boolean(code));

  return {
    id: parsed.data._id,
    name: parsed.data.name?.trim() || "Banner ad",
    alt: parsed.data.alt.trim(),
    href,
    imageUrl,
    width: parsed.data.width,
    height: parsed.data.height,
    placements,
    countries,
    priority: parsed.data.priority ?? 0,
  };
}

/**
 * Country-specific ads beat a worldwide ad.
 * Unknown country only sees ads with no country list.
 * Highest priority wins. Equal priority uses a stable id order.
 */
export function pickHouseAd(
  ads: readonly HouseAd[],
  placement: AdPlacement,
  country: string | null,
): HouseAd | null {
  const candidates = ads.filter((ad) => ad.placements.includes(placement));
  const code = country?.trim().toUpperCase() ?? "";
  const specific = code
    ? candidates.filter((ad) => ad.countries.includes(code))
    : [];
  const pool = specific.length > 0 ? specific : candidates.filter((ad) => ad.countries.length === 0);
  if (pool.length === 0) return null;

  return [...pool].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))[0] ?? null;
}
