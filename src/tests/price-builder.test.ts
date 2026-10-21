import { describe, expect, it } from "vitest";
import { getPlatformFee } from "@/data/platform-fees";
import { getCalculator } from "@/lib/calculators/registry";
import {
  breakdownAtPrice,
  feeRateOnNet,
  priceWarnings,
  solvePriceForMargin,
  type PriceBuilderInput,
} from "@/lib/utils/price-builder";

function input(overrides: Partial<PriceBuilderInput> = {}): PriceBuilderInput {
  return {
    unitCost: 60,
    shippingPerUnit: 0,
    otherPerUnit: 0,
    platformPercent: 0,
    platformFixed: 0,
    platformFeeAppliesTo: "net",
    paymentPercent: 0,
    paymentFixed: 0,
    paymentFeeAppliesTo: "gross",
    vatRegistered: true,
    vatRatePercent: 20,
    discountPercent: 0,
    targetMarginPercent: 40,
    ...overrides,
  };
}

describe("solvePriceForMargin", () => {
  it("solves a price with zero fees", () => {
    const result = solvePriceForMargin(input());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.listNet).toBe(100);
    expect(result.vatAmount).toBe(20);
    expect(result.customerPays).toBe(120);
    expect(result.profit).toBe(40);
    expect(result.marginPercent).toBe(40);
    expect(result.markupPercent).toBe(66.67);
  });

  it("converts a fee on the VAT-inclusive price into a fee on the net price", () => {
    expect(feeRateOnNet(10, "gross", 0.2)).toBeCloseTo(0.12, 10);
    const result = solvePriceForMargin(
      input({
        unitCost: 48,
        platformPercent: 10,
        platformFeeAppliesTo: "gross",
        targetMarginPercent: 20,
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.marginPercent).toBe(20);
    expect(result.platformFee).toBeGreaterThan(0);
  });

  it("charges a fee on the net price only", () => {
    const gross = solvePriceForMargin(
      input({
        unitCost: 48,
        platformPercent: 10,
        platformFeeAppliesTo: "gross",
        vatRegistered: true,
        vatRatePercent: 20,
        targetMarginPercent: 20,
      }),
    );
    const net = solvePriceForMargin(
      input({
        unitCost: 48,
        platformPercent: 10,
        platformFeeAppliesTo: "net",
        vatRegistered: true,
        vatRatePercent: 20,
        targetMarginPercent: 20,
      }),
    );
    expect(gross.ok && net.ok).toBe(true);
    if (!gross.ok || !net.ok) return;
    expect(net.listNet).toBeLessThan(gross.listNet);
  });

  it("adds no VAT when the seller is not registered", () => {
    const result = solvePriceForMargin(
      input({
        unitCost: 40,
        vatRegistered: false,
        vatRatePercent: 20,
        targetMarginPercent: 50,
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.vatAmount).toBe(0);
    expect(result.customerPays).toBe(result.listNet);
    expect(result.listNet).toBe(80);
    expect(result.marginPercent).toBe(50);
  });

  it("returns a typed error when the target margin is impossible", () => {
    const result = solvePriceForMargin(
      input({ platformPercent: 30, platformFeeAppliesTo: "net", targetMarginPercent: 80 }),
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("impossible_target");
    expect(Number.isFinite(result.code.length)).toBe(true);
  });

  it("treats a 0% discount as no discount", () => {
    const base = solvePriceForMargin(input({ discountPercent: 0 }));
    const explicit = solvePriceForMargin(input());
    expect(base.ok && explicit.ok).toBe(true);
    if (!base.ok || !explicit.ok) return;
    expect(base.listNet).toBe(explicit.listNet);
  });

  it("returns a typed error for a 100% discount", () => {
    const result = solvePriceForMargin(input({ discountPercent: 100 }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("full_discount");
  });

  it("round-trips: breakdown at the solved price matches the target margin to 2 decimals", () => {
    const solved = solvePriceForMargin(
      input({
        unitCost: 48,
        platformPercent: 10,
        platformFeeAppliesTo: "gross",
        paymentPercent: 1.5,
        paymentFixed: 0.2,
        paymentFeeAppliesTo: "gross",
        targetMarginPercent: 25,
        discountPercent: 10,
      }),
    );
    expect(solved.ok).toBe(true);
    if (!solved.ok) return;
    const again = breakdownAtPrice(
      input({
        unitCost: 48,
        platformPercent: 10,
        platformFeeAppliesTo: "gross",
        paymentPercent: 1.5,
        paymentFixed: 0.2,
        paymentFeeAppliesTo: "gross",
        targetMarginPercent: 25,
        discountPercent: 10,
      }),
      solved.listNet,
    );
    expect(again.ok).toBe(true);
    if (!again.ok) return;
    expect(again.marginPercent).toBeCloseTo(25, 2);
  });
});

describe("priceWarnings", () => {
  it("explains a 40% markup as a 28.6% margin", () => {
    const result = solvePriceForMargin(input({ targetMarginPercent: 40 }));
    const warnings = priceWarnings(input({ targetMarginPercent: 40 }), result, "charge");
    expect(warnings.some((warning) => warning.message.includes("28.6%"))).toBe(true);
  });

  it("warns when the seller is not VAT-registered", () => {
    const current = input({ vatRegistered: false, targetMarginPercent: 50, unitCost: 40 });
    const result = solvePriceForMargin(current);
    const warnings = priceWarnings(current, result, "charge");
    expect(warnings.some((warning) => warning.id === "not_vat_registered")).toBe(true);
    expect(warnings.some((warning) => warning.message.includes("cannot reclaim VAT"))).toBe(true);
  });

  it("warns when the margin after fees is under 10%", () => {
    const current = input({
        unitCost: 91,
      vatRegistered: false,
      targetMarginPercent: 0,
    });
    const result = breakdownAtPrice(current, 100);
    expect(result.ok).toBe(true);
    const warnings = priceWarnings(current, result, "check");
    expect(warnings.some((warning) => warning.id === "low_margin")).toBe(true);
  });
});

describe("worked examples", () => {
  it("prices an Etsy UK sale at a 35% margin", () => {
    const etsy = getPlatformFee("etsy-uk");
    expect(etsy?.percentFee).toBe(6.98);
    expect(etsy?.paymentPercentFee).toBe(4);
    expect(etsy?.paymentFixedFee).toBe(0.2);
    const result = solvePriceForMargin(
      input({
        unitCost: 8,
        shippingPerUnit: 3.5,
        otherPerUnit: 0,
        platformPercent: etsy?.percentFee ?? 0,
        platformFixed: etsy?.fixedFee ?? 0,
        platformFeeAppliesTo: etsy?.feeAppliesTo ?? "gross",
        paymentPercent: etsy?.paymentPercentFee ?? 0,
        paymentFixed: etsy?.paymentFixedFee ?? 0,
        paymentFeeAppliesTo: etsy?.paymentFeeAppliesTo ?? "gross",
        vatRegistered: true,
        vatRatePercent: 20,
        discountPercent: 0,
        targetMarginPercent: 35,
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.listNet).toBe(22.57);
    expect(result.customerPays).toBe(27.08);
    expect(result.vatAmount).toBe(4.51);
    expect(result.platformFee).toBe(1.89);
    expect(result.paymentFee).toBe(1.28);
    expect(result.profit).toBe(7.9);
    expect(result.marginPercent).toBe(35);
  });

  it("prices an Amazon UK footwear sale at a 25% margin", () => {
    const amazon = getPlatformFee("amazon-uk-footwear");
    expect(amazon?.percentFee).toBe(15);
    expect(amazon?.sourceUrl).toBe("https://sell.amazon.co.uk/pricing");
    const result = solvePriceForMargin(
      input({
        unitCost: 12,
        shippingPerUnit: 2.5,
        platformPercent: 15,
        platformFeeAppliesTo: "gross",
        vatRegistered: true,
        vatRatePercent: 20,
        targetMarginPercent: 25,
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.listNet).toBe(25.44);
    expect(result.customerPays).toBe(30.53);
    expect(result.platformFee).toBe(4.58);
    expect(result.profit).toBe(6.36);
    expect(result.marginPercent).toBe(25);
  });

  it("prices a digital product on Stripe for a seller who is not VAT-registered", () => {
    const stripe = getPlatformFee("stripe-uk");
    expect(stripe?.paymentPercentFee).toBe(1.5);
    expect(stripe?.paymentFixedFee).toBe(0.2);
    const result = solvePriceForMargin(
      input({
        unitCost: 0,
        shippingPerUnit: 0,
        otherPerUnit: 15,
        platformPercent: 0,
        paymentPercent: 1.5,
        paymentFixed: 0.2,
        paymentFeeAppliesTo: "gross",
        vatRegistered: false,
        vatRatePercent: 20,
        targetMarginPercent: 50,
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.listNet).toBe(31.34);
    expect(result.customerPays).toBe(31.34);
    expect(result.vatAmount).toBe(0);
    expect(result.paymentFee).toBe(0.67);
    expect(result.profit).toBe(15.67);
    expect(result.marginPercent).toBe(50);
  });

  it("shows each worked example on the price builder page", () => {
    const page = getCalculator("price-builder");
    expect(page?.examples[0]?.result).toContain("£27.08");
    expect(page?.examples[1]?.result).toContain("£30.53");
    expect(page?.examples[2]?.result).toContain("£31.34");
    expect(page?.examples[2]?.result).toContain("VAT £0.00");
  });
});
