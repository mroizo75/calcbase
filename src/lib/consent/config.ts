export type ConsentStatus = "undecided" | "accepted" | "rejected";

export const CONSENT_KEY = "calcbase-cookie-consent";

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "undecided";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted") return "accepted";
  if (stored === "rejected") return "rejected";
  return "undecided";
}

export function setConsentStatus(status: "accepted" | "rejected"): void {
  localStorage.setItem(CONSENT_KEY, status);
}
