import { frameForPlacement, type AdPlacement } from "@/lib/ads/config";
import { HouseAdSlot } from "./house-ad-slot";

interface AdBannerProps {
  slot: AdPlacement;
  className?: string;
  width?: "content" | "wide";
}

export function AdBanner({ slot, className, width = "content" }: AdBannerProps) {
  return (
    <HouseAdSlot
      placement={slot}
      frame={frameForPlacement(slot)}
      className={className}
      width={width}
    />
  );
}
