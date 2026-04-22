export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

export type AdPlacement =
  | "calc-below-intro"
  | "calc-below-result"
  | "calc-below-faq"
  | "calc-sidebar"
  | "guide-mid-content"
  | "guide-below-content"
  | "home-below-featured"
  | "home-below-guides"
  | "index-below-header";

export interface AdSlotConfig {
  placement: AdPlacement;
  format: "horizontal" | "rectangle" | "vertical" | "responsive";
  /** Numeric slot ID from your AdSense dashboard (e.g. "1234567890"). Leave empty until ad units are created. */
  slotId: string;
  desktopSize: { width: number; height: number };
  mobileSize: { width: number; height: number };
}

/**
 * Map each logical placement to its AdSense ad-unit slot ID.
 * Replace the placeholder strings below with the numeric slot IDs
 * from your Google AdSense dashboard (e.g. "1234567890").
 * Until real IDs are set, auto-format responsive ads are used.
 */
export const AD_SLOTS: Record<AdPlacement, AdSlotConfig> = {
  "calc-below-intro": {
    placement: "calc-below-intro",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 728, height: 90 },
    mobileSize: { width: 320, height: 100 },
  },
  "calc-below-result": {
    placement: "calc-below-result",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 728, height: 90 },
    mobileSize: { width: 320, height: 100 },
  },
  "calc-below-faq": {
    placement: "calc-below-faq",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 336, height: 280 },
    mobileSize: { width: 300, height: 250 },
  },
  "calc-sidebar": {
    placement: "calc-sidebar",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 300, height: 600 },
    mobileSize: { width: 320, height: 100 },
  },
  "guide-mid-content": {
    placement: "guide-mid-content",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 728, height: 90 },
    mobileSize: { width: 320, height: 100 },
  },
  "guide-below-content": {
    placement: "guide-below-content",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 336, height: 280 },
    mobileSize: { width: 300, height: 250 },
  },
  "home-below-featured": {
    placement: "home-below-featured",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 728, height: 90 },
    mobileSize: { width: 320, height: 100 },
  },
  "home-below-guides": {
    placement: "home-below-guides",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 728, height: 90 },
    mobileSize: { width: 320, height: 100 },
  },
  "index-below-header": {
    placement: "index-below-header",
    format: "responsive",
    slotId: "",
    desktopSize: { width: 728, height: 90 },
    mobileSize: { width: 320, height: 100 },
  },
};
