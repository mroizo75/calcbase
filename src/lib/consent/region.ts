/**
 * Land der annonse-/cookiesamtykke kreves før annonser lastes (GDPR/UK GDPR/nFADP).
 * Alle andre land (f.eks. USA, Canada, Australia) får annonser uten forhåndssamtykke.
 * Ukjent land behandles som samtykkepliktig (trygt standardvalg).
 */
const CONSENT_REQUIRED = new Set<string>([
  // EU
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EØS
  "IS", "LI", "NO",
  // UK
  "GB",
  // Sveits (nFADP, konservativt valg)
  "CH",
]);

export function requiresConsent(countryCode: string | null | undefined): boolean {
  if (!countryCode) return true;
  return CONSENT_REQUIRED.has(countryCode.toUpperCase());
}
