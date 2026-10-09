import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import { mapHouseAd, pickHouseAd, type HouseAd } from "@/lib/ads/house-ad";
import type { AdPlacement } from "@/lib/ads/config";
import { isSanityConfigured, getSanityClient } from "@/sanity/lib/client";
import { HOUSE_ADS_QUERY } from "@/sanity/lib/queries";

async function loadHouseAds(): Promise<HouseAd[]> {
  if (!isSanityConfigured()) return [];

  try {
    const rows = await getSanityClient().fetch<unknown[]>(HOUSE_ADS_QUERY);
    if (!Array.isArray(rows)) return [];
    return rows.map(mapHouseAd).filter((ad): ad is HouseAd => ad !== null);
  } catch {
    return [];
  }
}

export const getHouseAds = unstable_cache(loadHouseAds, ["house-ads"], {
  revalidate: 60,
  tags: ["house-ads"],
});

async function visitorCountry(): Promise<string | null> {
  const headerList = await headers();
  const raw =
    headerList.get("x-vercel-ip-country") ||
    headerList.get("cf-ipcountry") ||
    headerList.get("x-cb-country");
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || code === "XX" || code === "T1") return null;
  return code;
}

export async function resolveHouseAd(placement: AdPlacement): Promise<HouseAd | null> {
  const ads = await getHouseAds();
  const forPlacement = ads.filter((ad) => ad.placements.includes(placement));
  const needsGeo = forPlacement.some((ad) => ad.countries.length > 0);
  const country = needsGeo ? await visitorCountry() : null;
  return pickHouseAd(forPlacement, placement, country);
}
