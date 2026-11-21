"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsentStatus, setConsentStatus } from "@/lib/consent/config";

const NOOP_SUBSCRIBE = () => () => {};

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);
  const isUndecided = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => getConsentStatus() === "undecided",
    () => false,
  );

  if (!isUndecided || dismissed) return null;

  function handleAccept() {
    setConsentStatus("accepted");
    setDismissed(true);
    window.location.reload();
  }

  function handleReject() {
    setConsentStatus("rejected");
    setDismissed(true);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t bg-background/95 p-4 shadow-lg backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 text-sm leading-relaxed text-muted-foreground">
          <p>
            We use cookies to serve relevant advertisements via Google AdSense and to understand
            how our site is used. Essential cookies are always active. Advertising cookies are only
            enabled with your consent.{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleReject}
            className="h-10 rounded-lg border px-5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="h-10 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
