import { ADS_ENABLED } from "@/lib/ads/config";
import { AdSlot } from "./ad-slot";
import type { AdPlacement } from "@/lib/ads/config";

interface AdSidebarProps {
  slot: AdPlacement;
}

export function AdSidebar({ slot }: AdSidebarProps) {
  if (!ADS_ENABLED) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20">
        <AdSlot slot={slot} />
      </div>
    </aside>
  );
}
