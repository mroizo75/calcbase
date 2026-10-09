import { ADS_ENABLED, frameForPlacement, type AdPlacement } from "@/lib/ads/config";
import { resolveHouseAd } from "@/lib/ads/get-house-ads";
import { HouseAd } from "./house-ad";
import { AdSlot } from "./ad-slot";

interface AdBannerProps {
  slot: AdPlacement;
  className?: string;
  width?: "content" | "wide";
}

export async function AdBanner({ slot, className, width = "content" }: AdBannerProps) {
  const houseAd = await resolveHouseAd(slot);
  const showAdsense = ADS_ENABLED && !houseAd;
  if (!houseAd && !showAdsense) return null;

  return (
    <div className={className ?? "my-8"}>
      <div className={`mx-auto ${width === "wide" ? "max-w-6xl" : "max-w-3xl"}`}>
        {houseAd ? <HouseAd ad={houseAd} frame={frameForPlacement(slot)} /> : <AdSlot slot={slot} />}
      </div>
    </div>
  );
}
