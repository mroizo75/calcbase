import { describe, expect, it } from "vitest";
import { parseNumericInputEs } from "@/lib/i18n/parse-number-es";
import { alternateLanguageHref, esPath, hasSpanish } from "@/lib/i18n/es-nav";

describe("parseNumericInputEs", () => {
  it("parses plain integers and decimals", () => {
    expect(parseNumericInputEs("1234")).toBe(1234);
    expect(parseNumericInputEs("12.5")).toBe(12.5);
    expect(parseNumericInputEs("12,5")).toBe(12.5);
  });

  it("handles US/Mexico style 1,234.56", () => {
    expect(parseNumericInputEs("1,234.56")).toBe(1234.56);
    expect(parseNumericInputEs("1,234,567.89")).toBe(1234567.89);
  });

  it("handles Argentina/Colombia/Chile style 1.234,56", () => {
    expect(parseNumericInputEs("1.234,56")).toBe(1234.56);
    expect(parseNumericInputEs("1.234.567,89")).toBe(1234567.89);
  });

  it("treats a single comma followed by three digits as a thousands separator", () => {
    expect(parseNumericInputEs("1,234")).toBe(1234);
  });

  it("treats several dots as thousands separators", () => {
    expect(parseNumericInputEs("1.234.567")).toBe(1234567);
  });

  it("ignores currency symbols and spaces", () => {
    expect(parseNumericInputEs("$ 1 250,50")).toBe(1250.5);
  });

  it("handles negatives and empty input", () => {
    expect(parseNumericInputEs("-45,5")).toBe(-45.5);
    expect(parseNumericInputEs("")).toBe(0);
    expect(parseNumericInputEs("abc")).toBe(0);
  });
});

describe("es-nav helpers", () => {
  it("knows which slugs have Spanish", () => {
    expect(hasSpanish("profit-calculator")).toBe(true);
    expect(hasSpanish("does-not-exist")).toBe(false);
  });

  it("builds /es paths", () => {
    expect(esPath("profit-calculator")).toBe("/es/profit-calculator");
  });

  it("maps pathnames to the other language", () => {
    expect(alternateLanguageHref("/profit-calculator").href).toBe("/es/profit-calculator");
    expect(alternateLanguageHref("/es/profit-calculator").href).toBe("/profit-calculator");
    expect(alternateLanguageHref("/es").href).toBe("/calculators");
    expect(alternateLanguageHref("/vat-calculator").href).toBe("/es");
  });
});
