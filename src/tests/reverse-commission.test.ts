import { describe, it, expect } from "vitest";
import { calculateCommission, calculateSalesNeeded } from "@/lib/utils/math";

describe("calculateSalesNeeded", () => {
  it("finds the sale that pays a given commission", () => {
    expect(calculateSalesNeeded(930, 3).requiredSales).toBe(31000);
  });

  it("round-trips with calculateCommission", () => {
    const { requiredSales } = calculateSalesNeeded(1200, 10);
    expect(calculateCommission(requiredSales, 10).commission).toBe(1200);
  });

  it("returns 0 for a zero rate", () => {
    expect(calculateSalesNeeded(500, 0).requiredSales).toBe(0);
  });

  it("rounds to cents", () => {
    expect(calculateSalesNeeded(100, 3).requiredSales).toBe(3333.33);
  });
});
