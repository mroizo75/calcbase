"use client";

import { useEffect, useState } from "react";
import { ADS_ENABLED, type AdFrame, type AdPlacement } from "@/lib/ads/config";
import { pickHouseAd, type HouseAd } from "@/lib/ads/house-ad";
import { AdSlot } from "./ad-slot";
import { HouseAdView } from "./house-ad";

interface HouseAdPayload {
  country: string | null;
  ads: HouseAd[];
}

let inflight: { at: number; promise: Promise<HouseAdPayload> } | null = null;

function loadHouseAds(): Promise<HouseAdPayload> {
  if (!inflight || Date.now() - inflight.at > 30_000) {
    inflight = {
      at: Date.now(),
      promise: fetch("/api/house-ads", { cache: "no-store" })
        .then(async (response) => {
          if (!response.ok) return { country: null, ads: [] };
          const body = (await response.json()) as Partial<HouseAdPayload>;
          return {
            country: typeof body.country === "string" ? body.country : null,
            ads: Array.isArray(body.ads) ? body.ads : [],
          };
        })
        .catch(() => ({ country: null, ads: [] })),
    };
  }
  return inflight.promise;
}

interface HouseAdSlotProps {
  placement: AdPlacement;
  frame: AdFrame;
  className?: string;
  width?: "content" | "wide";
  variant?: "banner" | "sidebar";
}

export function HouseAdSlot({
  placement,
  frame,
  className,
  width = "content",
  variant = "banner",
}: HouseAdSlotProps) {
  const [payload, setPayload] = useState<HouseAdPayload | null>(null);

  useEffect(() => {
    let active = true;
    void loadHouseAds().then((next) => {
      if (active) setPayload(next);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!payload) return null;

  const ad = pickHouseAd(payload.ads, placement, payload.country);
  if (!ad && !ADS_ENABLED) return null;

  const creative = ad ? <HouseAdView ad={ad} frame={frame} /> : <AdSlot slot={placement} />;

  if (variant === "sidebar") {
    return (
      <aside className="hidden xl:block">
        <div className="sticky top-20 w-[300px]">{creative}</div>
      </aside>
    );
  }

  return (
    <div className={className ?? "my-8"}>
      <div className={`mx-auto ${width === "wide" ? "max-w-6xl" : "max-w-3xl"}`}>{creative}</div>
    </div>
  );
}
