import { describe, it, expect } from "vitest";
import {
  round,
  addVat,
  removeVat,
  calculateMargin,
  calculateMarkup,
  calculateMarkupFromPercent,
  calculateDiscount,
  calculateBreakeven,
  marginToMarkup,
  markupToMargin,
  calculateRoi,
  calculateSalesTax,
  calculateCommission,
} from "@/lib/utils/math";

describe("round", () => {
  it("rounds to 2 decimal places by default", () => {
    expect(round(1.005)).toBe(1.01);
    expect(round(1.004)).toBe(1);
  });

  it("rounds to specified decimal places", () => {
    expect(round(1.2345, 3)).toBe(1.235);
    expect(round(100, 0)).toBe(100);
  });
});

describe("addVat", () => {
  it("adds 20% VAT to 100", () => {
    const { gross, vatAmount } = addVat(100, 20);
    expect(vatAmount).toBe(20);
    expect(gross).toBe(120);
  });

  it("adds 5% VAT to 200", () => {
    const { gross, vatAmount } = addVat(200, 5);
    expect(vatAmount).toBe(10);
    expect(gross).toBe(210);
  });

  it("handles zero rate", () => {
    const { gross, vatAmount } = addVat(100, 0);
    expect(vatAmount).toBe(0);
    expect(gross).toBe(100);
  });

  it("handles decimal amounts", () => {
    const { gross, vatAmount } = addVat(99.99, 20);
    expect(vatAmount).toBe(20);
    expect(gross).toBe(119.99);
  });
});

describe("removeVat", () => {
  it("removes 20% VAT from 120", () => {
    const { net, vatAmount } = removeVat(120, 20);
    expect(net).toBe(100);
    expect(vatAmount).toBe(20);
  });

  it("removes 10% GST from 110", () => {
    const { net, vatAmount } = removeVat(110, 10);
    expect(net).toBe(100);
    expect(vatAmount).toBe(10);
  });

  it("round-trips correctly: add then remove", () => {
    const { gross } = addVat(250, 20);
    const { net } = removeVat(gross, 20);
    expect(net).toBe(250);
  });
});

describe("calculateMargin", () => {
  it("calculates 40% margin on $100 revenue, $60 cost", () => {
    const { profit, marginPercent } = calculateMargin(100, 60);
    expect(profit).toBe(40);
    expect(marginPercent).toBe(40);
  });

  it("handles zero revenue", () => {
    const { marginPercent } = calculateMargin(0, 50);
    expect(marginPercent).toBe(0);
  });

  it("handles negative margin", () => {
    const { profit, marginPercent } = calculateMargin(80, 100);
    expect(profit).toBe(-20);
    expect(marginPercent).toBe(-25);
  });
});

describe("calculateMarkup", () => {
  it("calculates 66.67% markup on $60 cost, $100 price", () => {
    const { profit, markupPercent } = calculateMarkup(60, 100);
    expect(profit).toBe(40);
    expect(markupPercent).toBe(66.67);
  });

  it("handles zero cost", () => {
    const { markupPercent } = calculateMarkup(0, 100);
    expect(markupPercent).toBe(0);
  });
});

describe("calculateMarkupFromPercent", () => {
  it("calculates selling price from 50% markup on $80 cost", () => {
    const { sellingPrice, profit } = calculateMarkupFromPercent(80, 50);
    expect(sellingPrice).toBe(120);
    expect(profit).toBe(40);
  });
});

describe("calculateDiscount", () => {
  it("calculates 25% off $200", () => {
    const { discountAmount, finalPrice } = calculateDiscount(200, 25);
    expect(discountAmount).toBe(50);
    expect(finalPrice).toBe(150);
  });

  it("handles 0% discount", () => {
    const { discountAmount, finalPrice } = calculateDiscount(100, 0);
    expect(discountAmount).toBe(0);
    expect(finalPrice).toBe(100);
  });

  it("handles 100% discount", () => {
    const { discountAmount, finalPrice } = calculateDiscount(100, 100);
    expect(discountAmount).toBe(100);
    expect(finalPrice).toBe(0);
  });
});

describe("marginToMarkup", () => {
  it("converts 25% margin to 33.33% markup", () => {
    expect(marginToMarkup(25)).toBe(33.33);
  });

  it("converts 50% margin to 100% markup", () => {
    expect(marginToMarkup(50)).toBe(100);
  });

  it("returns Infinity for 100% margin", () => {
    expect(marginToMarkup(100)).toBe(Infinity);
  });
});

describe("markupToMargin", () => {
  it("converts 33.33% markup to 25% margin", () => {
    expect(markupToMargin(33.33)).toBe(25);
  });

  it("converts 100% markup to 50% margin", () => {
    expect(markupToMargin(100)).toBe(50);
  });

  it("converts 50% markup to 33.33% margin", () => {
    expect(markupToMargin(50)).toBe(33.33);
  });
});

describe("calculateRoi", () => {
  it("calculates 50% ROI on $1000 investment with $1500 return", () => {
    const { roi, netProfit } = calculateRoi(1000, 1500);
    expect(roi).toBe(50);
    expect(netProfit).toBe(500);
  });

  it("handles negative ROI (loss)", () => {
    const { roi, netProfit } = calculateRoi(1000, 600);
    expect(roi).toBe(-40);
    expect(netProfit).toBe(-400);
  });

  it("handles zero investment", () => {
    const { roi, netProfit } = calculateRoi(0, 500);
    expect(roi).toBe(0);
    expect(netProfit).toBe(500);
  });
});

describe("calculateSalesTax", () => {
  it("calculates 7.25% sales tax on $100", () => {
    const { taxAmount, totalPrice } = calculateSalesTax(100, 7.25);
    expect(taxAmount).toBe(7.25);
    expect(totalPrice).toBe(107.25);
  });

  it("handles zero tax rate", () => {
    const { taxAmount, totalPrice } = calculateSalesTax(100, 0);
    expect(taxAmount).toBe(0);
    expect(totalPrice).toBe(100);
  });
});

describe("calculateCommission", () => {
  it("calculates 5% commission on $10,000 sale", () => {
    const { commission, netAfterCommission } = calculateCommission(10000, 5);
    expect(commission).toBe(500);
    expect(netAfterCommission).toBe(9500);
  });

  it("handles 100% commission", () => {
    const { commission, netAfterCommission } = calculateCommission(1000, 100);
    expect(commission).toBe(1000);
    expect(netAfterCommission).toBe(0);
  });
});

describe("calculateBreakeven", () => {
  it("calculates break-even for coffee shop example", () => {
    const { breakEvenUnits, breakEvenRevenue } = calculateBreakeven(5000, 1.5, 4.5);
    expect(breakEvenUnits).toBe(1667);
    expect(breakEvenRevenue).toBe(7501.5);
  });

  it("returns Infinity when contribution margin is zero", () => {
    const { breakEvenUnits } = calculateBreakeven(1000, 10, 10);
    expect(breakEvenUnits).toBe(Infinity);
  });

  it("returns Infinity when selling below variable cost", () => {
    const { breakEvenUnits } = calculateBreakeven(1000, 15, 10);
    expect(breakEvenUnits).toBe(Infinity);
  });
});
