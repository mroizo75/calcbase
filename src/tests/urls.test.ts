import { describe, it, expect } from "vitest";
import { getCanonicalUrl, getCalculatorUrl, getGuideUrl, buildShareUrl } from "@/lib/utils/urls";

describe("URL utilities", () => {
  it("builds canonical URLs correctly", () => {
    expect(getCanonicalUrl("/vat-calculator")).toBe("https://calcbase.com/vat-calculator");
    expect(getCanonicalUrl("about")).toBe("https://calcbase.com/about");
  });

  it("builds calculator URLs", () => {
    expect(getCalculatorUrl("vat-calculator")).toBe("/vat-calculator");
  });

  it("builds guide URLs", () => {
    expect(getGuideUrl("vat-explained")).toBe("/guides/vat-explained");
  });

  it("builds share URLs with query params", () => {
    const url = buildShareUrl("vat-calculator", { amount: 100, rate: 20 });
    expect(url).toBe("https://calcbase.com/vat-calculator?amount=100&rate=20");
  });
});
