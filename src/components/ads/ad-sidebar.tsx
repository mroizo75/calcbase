import type { AdPlacement } from "@/lib/ads/config";
import { HouseAdSlot } from "./house-ad-slot";

interface AdSidebarProps {
  slot: AdPlacement;
}

export function AdSidebar({ slot }: AdSidebarProps) {
  return <HouseAdSlot placement={slot} frame="sidebar" variant="sidebar" />;
}
