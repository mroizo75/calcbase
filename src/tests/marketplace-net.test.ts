import { describe, it, expect } from "vitest";
import { calculateMarketplaceSale, type MarketplaceSaleInput } from "@/lib/utils/marketplace-net";

const base: MarketplaceSaleInput = {
  itemPrice: 20,
  buyerShipping: 0,
  vatRatePercent: 20,
  productCost: 8,
  sellerShipping: 3.5,
  otherCost: 0,
  platformPercent: 6.98,
  platformFixed: 0,
  platformFeeBase: "gross",
  paymentPercent: 4,
  paymentFixed: 0.2,
  paymentFeeBase: "gross",
  monthlySales: 0,
  monthlyFixedCosts: 0,
};

describe("calculateMarketplaceSale", () => {
  it("matches the Etsy UK worked example", () => {
    const r = calculateMarketplaceSale(base);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.customerPays).toBe(24);
    expect(r.vatAmount).toBe(4);
    expect(r.platformFee).toBe(1.68);
    expect(r.paymentFee).toBe(1.16);
    expect(r.costs).toBe(11.5);
    expect(r.profitPerSale).toBe(5.66);
    expect(r.marginPercent).toBe(28.3);
  });

  it("charges a net-based fee on the VAT-exclusive amount", () => {
    const r = calculateMarketplaceSale({
      ...base,
      itemPrice: 100,
      vatRatePercent: 0,
      productCost: 60,
      sellerShipping: 0,
      platformPercent: 15,
      platformFeeBase: "net",
      paymentPercent: 0,
      paymentFixed: 0,
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.platformFee).toBe(15);
    expect(r.profitPerSale).toBe(25);
    expect(r.marginPercent).toBe(25);
  });

  it("does not count VAT as revenue when VAT is 0", () => {
    const r = calculateMarketplaceSale({ ...base, vatRatePercent: 0, platformPercent: 0, paymentPercent: 0, paymentFixed: 0 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.customerPays).toBe(20);
    expect(r.vatAmount).toBe(0);
    expect(r.profitPerSale).toBe(8.5);
  });

  it("gives break-even sales and monthly profit", () => {
    const r = calculateMarketplaceSale({
      ...base,
      itemPrice: 100,
      vatRatePercent: 0,
      productCost: 60,
      sellerShipping: 0,
      platformPercent: 15,
      platformFeeBase: "net",
      paymentPercent: 0,
      paymentFixed: 0,
      monthlySales: 100,
      monthlyFixedCosts: 500,
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.breakEvenSalesPerMonth).toBe(20);
    expect(r.monthlyProfit).toBe(2000);
  });

  it("returns zero break-even when there are no fixed costs", () => {
    const r = calculateMarketplaceSale({ ...base, monthlyFixedCosts: 0 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.breakEvenSalesPerMonth).toBe(0);
  });

  it("returns no break-even when each sale loses money", () => {
    const r = calculateMarketplaceSale({ ...base, productCost: 30, monthlyFixedCosts: 100, monthlySales: 10 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.profitPerSale).toBeLessThan(0);
    expect(r.breakEvenSalesPerMonth).toBeNull();
  });

  it("rejects a zero sale price and invalid percentages", () => {
    expect(calculateMarketplaceSale({ ...base, itemPrice: 0 }).ok).toBe(false);
    expect(calculateMarketplaceSale({ ...base, platformPercent: 150 }).ok).toBe(false);
    expect(calculateMarketplaceSale({ ...base, productCost: -1 }).ok).toBe(false);
  });
});
