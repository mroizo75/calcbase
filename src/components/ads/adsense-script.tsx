"use client";

import { useEffect } from "react";
import { ADS_ENABLED, ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";
import { useAdsAllowed } from "@/lib/consent/use-ads-allowed";

export function AdsenseScript() {
  const hasConsent = useAdsAllowed() === true;

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
