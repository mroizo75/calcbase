import { ADS_ENABLED } from "@/lib/ads/config";
import { resolveHouseAd } from "@/lib/ads/get-house-ads";
import type { AdPlacement } from "@/lib/ads/config";
import { HouseAd } from "./house-ad";
import { AdSlot } from "./ad-slot";

interface AdSidebarProps {
  slot: AdPlacement;
}

export async function AdSidebar({ slot }: AdSidebarProps) {
  const houseAd = await resolveHouseAd(slot);
  const showAdsense = ADS_ENABLED && !houseAd;
  if (!houseAd && !showAdsense) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 w-[300px]">
        {houseAd ? <HouseAd ad={houseAd} frame="sidebar" /> : <AdSlot slot={slot} />}
      </div>
    </aside>
  );
}
