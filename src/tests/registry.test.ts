import { describe, it, expect } from "vitest";
import {
  calculators,
  getCalculator,
  getRelatedCalculators,
  searchCalculators,
} from "@/lib/calculators/registry";

describe("calculator registry", () => {
  it("contains all 12 calculators", () => {
    expect(calculators).toHaveLength(12);
  });

  it("each calculator has required fields", () => {
    for (const calc of calculators) {
      expect(calc.slug).toBeTruthy();
      expect(calc.title).toBeTruthy();
      expect(calc.shortDescription).toBeTruthy();
      expect(calc.longDescription).toBeTruthy();
      expect(calc.formula).toBeTruthy();
      expect(calc.examples.length).toBeGreaterThanOrEqual(2);
      expect(calc.faq.length).toBeGreaterThanOrEqual(3);
      expect(calc.seo.title).toBeTruthy();
      expect(calc.seo.description).toBeTruthy();
      expect(calc.seo.canonical).toBe(`/${calc.slug}`);
    }
  });

  it("all relatedSlugs reference existing calculators", () => {
    const slugs = new Set(calculators.map((c) => c.slug));
    for (const calc of calculators) {
      for (const related of calc.relatedSlugs) {
        expect(slugs.has(related)).toBe(true);
      }
    }
  });

  it("each calculator has unique SEO metadata", () => {
    const titles = calculators.map((c) => c.seo.title);
    const descriptions = calculators.map((c) => c.seo.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});

describe("getCalculator", () => {
  it("returns a calculator by slug", () => {
    const calc = getCalculator("vat-calculator");
    expect(calc).toBeDefined();
    expect(calc?.title).toBe("VAT Calculator");
  });

  it("returns undefined for unknown slug", () => {
    expect(getCalculator("nonexistent")).toBeUndefined();
  });
});

describe("getRelatedCalculators", () => {
  it("returns related calculators", () => {
    const related = getRelatedCalculators("vat-calculator");
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((c) => c.slug !== "vat-calculator")).toBe(true);
  });
});

describe("searchCalculators", () => {
  it("finds calculators by keyword", () => {
    const results = searchCalculators("vat");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((c) => c.slug === "vat-calculator")).toBe(true);
  });

  it("returns all calculators for empty query", () => {
    expect(searchCalculators("")).toEqual(calculators);
  });

  it("returns empty array for no match", () => {
    expect(searchCalculators("xyznonexistent")).toEqual([]);
  });
});
