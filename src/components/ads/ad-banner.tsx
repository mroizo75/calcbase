import { ADS_ENABLED } from "@/lib/ads/config";
import { AdSlot } from "./ad-slot";
import type { AdPlacement } from "@/lib/ads/config";

interface AdBannerProps {
  slot: AdPlacement;
  className?: string;
}

export function AdBanner({ slot, className = "" }: AdBannerProps) {
  if (!ADS_ENABLED) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="mx-auto max-w-3xl">
        <AdSlot slot={slot} />
      </div>
    </div>
  );
}
