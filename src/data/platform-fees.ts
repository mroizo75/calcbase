export interface PlatformFeePreset {
  id: string;
  label: string;
  country: string;
  percentFee: number;
  fixedFee: number;
  currency: "GBP";
  feeAppliesTo: "gross" | "net";
  paymentPercentFee: number;
  paymentFixedFee: number;
  paymentFeeAppliesTo: "gross" | "net";
  sourceUrl: string;
  paymentSourceUrl?: string;
  lastVerified: "2026-10-21";
  notes: string;
}

/**
 * Figures below were read from the linked official pages on 2026-10-21.
 * Category marketplaces do not have one rate. Those presets name the category.
 */
export const platformFees: PlatformFeePreset[] = [
  {
    id: "etsy-uk",
    label: "Etsy UK",
    country: "United Kingdom",
    percentFee: 6.98,
    fixedFee: 0,
    currency: "GBP",
    feeAppliesTo: "gross",
    paymentPercentFee: 4,
    paymentFixedFee: 0.2,
    paymentFeeAppliesTo: "gross",
    sourceUrl: "https://www.etsy.com/uk/legal/fees/",
    paymentSourceUrl:
      "https://help.etsy.com/hc/en-us/articles/115015628847-What-are-Payment-Processing-Fees-for-Selling-on-Etsy",
    lastVerified: "2026-10-21",
    notes:
      "Platform percent is the 6.5% transaction fee plus the UK regulatory operating fee of 0.48%. Outside the US the transaction fee applies to the displayed price (including tax the seller is responsible for) plus delivery and gift wrap. The regulatory fee is 0.48% of item price plus postage, gift wrap and personalisation, excluding tax Etsy collects. Payment processing for a UK bank is 4% + £0.20 of the total sale, including tax and postage. Not included: the $0.20 listing fee, Offsite Ads, VAT on Etsy's own fees, or a 2.5% currency conversion fee.",
  },
  {
    id: "amazon-uk-footwear",
    label: "Amazon UK — Footwear 15%",
    country: "United Kingdom",
    percentFee: 15,
    fixedFee: 0,
    currency: "GBP",
    feeAppliesTo: "gross",
    paymentPercentFee: 0,
    paymentFixedFee: 0,
    paymentFeeAppliesTo: "gross",
    sourceUrl: "https://sell.amazon.co.uk/pricing",
    lastVerified: "2026-10-21",
    notes:
      "Footwear referral fee is 15% of the total price, including item price, shipping and gift wrap. Most categories are between 8% and 15%, so change this rate for your category. Amazon also charges a minimum of £0.25 when that is greater than the percentage. This preset does not add £0.25 on top, and it does not include the Individual plan (£0.75 per unit) or the Professional plan (£25 a month, excl. VAT).",
  },
  {
    id: "ebay-uk-clothes",
    label: "eBay UK — Clothes, Shoes & Accessories 11.9%",
    country: "United Kingdom",
    percentFee: 11.9,
    fixedFee: 0.4,
    currency: "GBP",
    feeAppliesTo: "gross",
    paymentPercentFee: 0,
    paymentFixedFee: 0,
    paymentFeeAppliesTo: "gross",
    sourceUrl:
      "https://www.ebay.co.uk/help/selling/fees-credits-invoices/fees-business-sellers-activated-managed-payments?id=4809",
    lastVerified: "2026-10-21",
    notes:
      "Business-seller final value fee for Clothes, Shoes & Accessories is 11.9% of the total amount of the sale, including item price, postage and applicable taxes. The per-order fee is £0.30 up to £10 and £0.40 above £10. This preset uses £0.40. Other categories differ. eBay says you do not pay a separate payment-processing fee.",
  },
  {
    id: "shopify-payments-uk-basic",
    label: "Shopify Payments UK — Basic, online cards",
    country: "United Kingdom",
    percentFee: 0,
    fixedFee: 0,
    currency: "GBP",
    feeAppliesTo: "gross",
    paymentPercentFee: 2,
    paymentFixedFee: 0.25,
    paymentFeeAppliesTo: "gross",
    sourceUrl: "https://www.shopify.com/uk/pricing",
    lastVerified: "2026-10-21",
    notes:
      "Basic plan online standard card rate is 2% + 25p. There is no extra Shopify percentage on the order when Shopify Payments is the provider. Not included: the monthly plan, Amex (3.1% + 25p on Basic), international cards (3.1% + 25p on Basic), or Grow (1.7% + 25p) and Advanced (1.5% + 25p).",
  },
  {
    id: "stripe-uk",
    label: "Stripe UK — standard UK cards",
    country: "United Kingdom",
    percentFee: 0,
    fixedFee: 0,
    currency: "GBP",
    feeAppliesTo: "gross",
    paymentPercentFee: 1.5,
    paymentFixedFee: 0.2,
    paymentFeeAppliesTo: "gross",
    sourceUrl: "https://stripe.com/gb/pricing",
    lastVerified: "2026-10-21",
    notes:
      "1.5% + 20p is the standard UK card rate. Premium UK cards are 2.8% + 20p, EEA cards are 2.5% + 20p, and other international cards are 3.15% + 20p. There is no separate platform percentage.",
  },
];

export function getPlatformFee(id: string): PlatformFeePreset | undefined {
  return platformFees.find((preset) => preset.id === id);
}
