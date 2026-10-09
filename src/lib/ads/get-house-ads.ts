import { unstable_cache } from "next/cache";
import { mapHouseAd, type HouseAd } from "@/lib/ads/house-ad";
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
  revalidate: 30,
  tags: ["house-ads"],
});
