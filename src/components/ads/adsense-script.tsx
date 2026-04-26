"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { ADS_ENABLED, ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";
import { getConsentStatus } from "@/lib/consent/config";

const NOOP_SUBSCRIBE = () => () => {};

export function AdsenseScript() {
  const hasConsent = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => getConsentStatus() === "accepted",
    () => false,
  );

  if (!ADS_ENABLED || !ADSENSE_PUBLISHER_ID || !hasConsent) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
