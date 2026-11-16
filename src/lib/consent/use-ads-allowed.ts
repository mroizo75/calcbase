"use client";

import { useEffect, useState } from "react";
import { getConsentStatus } from "./config";
import { visitorNeedsConsent } from "./visitor-region";

/**
 * null = avgjøres ennå, true = annonser tillatt, false = ikke tillatt.
 * - Samtykke gitt: alltid tillatt.
 * - Samtykke avvist: aldri annonser.
 * - Ikke valgt: tillatt utenfor EU/EØS/UK/CH, ellers må brukeren samtykke først.
 */
export function useAdsAllowed(): boolean | null {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    const status = getConsentStatus();
    if (status === "accepted") {
      setAllowed(true);
    } else if (status === "rejected") {
      setAllowed(false);
    } else {
      void visitorNeedsConsent().then((needs) => {
        if (active) setAllowed(!needs);
      });
    }
    return () => {
      active = false;
    };
  }, []);

  return allowed;
}
