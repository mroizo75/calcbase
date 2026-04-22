"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ADS_ENABLED, AD_SLOTS, type AdPlacement } from "@/lib/ads/config";
import { getConsentStatus } from "@/lib/consent/config";

const NOOP_SUBSCRIBE = () => () => {};

interface AdSlotProps {
  slot: AdPlacement;
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const config = AD_SLOTS[slot];
  const hasConsent = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => getConsentStatus() === "accepted",
    () => false,
  );

  useEffect(() => {
    if (!ADS_ENABLED || !hasConsent || !adRef.current || pushed.current) return;
    pushed.current = true;

    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      /* AdSense not loaded */
    }
  }, [hasConsent]);

  if (!ADS_ENABLED || !hasConsent) return null;

  return (
    <div
      className={`ad-container flex items-center justify-center ${className}`}
      aria-hidden="true"
      data-placement={slot}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
        data-ad-slot={config.slotId || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
