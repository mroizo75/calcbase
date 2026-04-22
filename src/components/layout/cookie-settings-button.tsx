"use client";

import { CONSENT_KEY } from "@/lib/consent/config";

export function CookieSettingsButton() {
  function handleReset() {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie Settings
    </button>
  );
}
