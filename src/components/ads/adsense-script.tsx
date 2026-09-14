"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ADS_ENABLED, ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";
import { getConsentStatus } from "@/lib/consent/config";

const NOOP_SUBSCRIBE = () => () => {};

export function AdsenseScript() {
  const hasConsent = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => getConsentStatus() === "accepted",
    () => false,
  );

  useEffect(() => {
    if (!ADS_ENABLED || !ADSENSE_PUBLISHER_ID || !hasConsent) return;

    if (document.querySelector(`script[src*="adsbygoogle"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [hasConsent]);

  return null;
}
