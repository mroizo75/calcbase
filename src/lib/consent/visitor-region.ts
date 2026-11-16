"use client";

import { requiresConsent } from "./region";

let countryPromise: Promise<string | null> | null = null;

/** Henter besøkendes land fra /api/house-ads (én forespørsel per sidelast). */
export function getVisitorCountry(): Promise<string | null> {
  if (!countryPromise) {
    countryPromise = fetch("/api/house-ads", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        const body = (await response.json()) as { country?: unknown };
        return typeof body.country === "string" ? body.country : null;
      })
      .catch(() => null);
  }
  return countryPromise;
}

/** Sant hvis besøkende må samtykke før annonser lastes. */
export async function visitorNeedsConsent(): Promise<boolean> {
  return requiresConsent(await getVisitorCountry());
}
