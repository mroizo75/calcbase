import { describe, expect, it } from "vitest";
import {
  ctrGapScore,
  expectedCtrForPosition,
  extractSlugFromPageUrl,
  queryGapScore,
} from "@/lib/seo/gsc-scoring";
import {
  assertNoContentBodyFields,
  proposedMetaSchema,
  scoredOpportunitySchema,
} from "@/lib/seo/opportunity-schema";
import { scoreOpportunities } from "@/lib/seo/score-opportunities";
import { mergeCalculatorSeo } from "@/lib/seo/merge-calculator-seo";
import { slugFromRevalidatePayload } from "@/lib/seo/revalidate-payload";
import type { CalculatorConfig } from "@/lib/calculators/types";

describe("expectedCtrForPosition", () => {
  it("returns higher CTR for better positions", () => {
    expect(expectedCtrForPosition(1)).toBeGreaterThan(expectedCtrForPosition(5));
    expect(expectedCtrForPosition(5)).toBeGreaterThan(expectedCtrForPosition(15));
  });
});

describe("ctrGapScore", () => {
  it("scores pages with high impressions and low CTR", () => {
    const low = ctrGapScore({ impressions: 500, ctr: 0.005, position: 3 });
    const ok = ctrGapScore({ impressions: 500, ctr: 0.12, position: 3 });
    expect(low).toBeGreaterThan(ok);
    expect(ok).toBe(0);
  });

  it("ignores low-impression pages", () => {
    expect(ctrGapScore({ impressions: 10, ctr: 0.001, position: 2 })).toBe(0);
  });
});

describe("queryGapScore", () => {
  it("scores striking-distance queries", () => {
    const score = queryGapScore({ impressions: 100, position: 8, ctr: 0.01 });
    expect(score).toBeGreaterThan(0);
  });

  it("ignores position 1–3 and below-threshold volume", () => {
    expect(queryGapScore({ impressions: 100, position: 2, ctr: 0.01 })).toBe(0);
    expect(queryGapScore({ impressions: 5, position: 10, ctr: 0.01 })).toBe(0);
  });
});

describe("extractSlugFromPageUrl", () => {
  it("extracts calculator and news slugs", () => {
    expect(extractSlugFromPageUrl("https://calcbase.io/vat-calculator", "calcbase.io")).toBe(
      "vat-calculator",
    );
    expect(
      extractSlugFromPageUrl("https://calcbase.io/news/uk-vat-change", "calcbase.io"),
    ).toBe("news/uk-vat-change");
  });
});

describe("opportunity schemas", () => {
  it("accepts valid proposed meta", () => {
    const parsed = proposedMetaSchema.parse({
      proposedTitle: "Free VAT Calculator Online – Add or Remove VAT Fast",
      proposedDescription:
        "Calculate VAT inclusive or exclusive amounts instantly. Free online VAT calculator with UK, EU, and common rates for invoices, quotes, and pricing work.",
    });
    expect(parsed.proposedTitle.length).toBeGreaterThanOrEqual(50);
    expect(parsed.proposedDescription.length).toBeGreaterThanOrEqual(150);
  });

  it("rejects content body fields on scored opportunities via strict object", () => {
    expect(() =>
      scoredOpportunitySchema.parse({
        kind: "calculatorCtr",
        pageUrl: "https://calcbase.io/vat-calculator",
        slug: "vat-calculator",
        targetQueries: ["vat calculator"],
        impressions: 100,
        clicks: 2,
        ctr: 0.02,
        position: 5,
        periodDays: 28,
        rationale: "test rationale long enough",
        actionBrief: "test brief long enough",
        score: 1,
        body: "not allowed",
      }),
    ).toThrow();
  });

  it("assertNoContentBodyFields throws on forbidden keys", () => {
    expect(() => assertNoContentBodyFields({ faq: [] })).toThrow(/faq/);
  });
});

describe("scoreOpportunities", () => {
  it("ranks CTR-gap calculator pages and respects pending dedup", () => {
    const result = scoreOpportunities({
      siteHost: "calcbase.io",
      calculatorSlugs: new Set(["vat-calculator"]),
      calculatorMeta: new Map([
        [
          "vat-calculator",
          {
            title: "VAT Calculator – Free Online Tool",
            description: "Calculate VAT quickly with our free calculator for business pricing.",
          },
        ],
      ]),
      pendingKeys: new Set(),
      snapshot: {
        periodDays: 28,
        pages: [
          {
            page: "https://calcbase.io/vat-calculator",
            impressions: 800,
            clicks: 4,
            ctr: 0.005,
            position: 4,
          },
        ],
        queries: [
          {
            page: "https://calcbase.io/vat-calculator",
            query: "vat calculator",
            impressions: 200,
            clicks: 1,
            ctr: 0.005,
            position: 4,
          },
        ],
      },
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].kind).toBe("calculatorCtr");
    expect(result[0].slug).toBe("vat-calculator");
    expect(result[0]).not.toHaveProperty("body");
  });

  it("skips pending duplicates", () => {
    const result = scoreOpportunities({
      siteHost: "calcbase.io",
      calculatorSlugs: new Set(["vat-calculator"]),
      calculatorMeta: new Map(),
      pendingKeys: new Set(["calculatorCtr:vat-calculator"]),
      snapshot: {
        periodDays: 28,
        pages: [
          {
            page: "https://calcbase.io/vat-calculator",
            impressions: 800,
            clicks: 4,
            ctr: 0.005,
            position: 4,
          },
        ],
        queries: [],
      },
    });
    expect(result.every((r) => r.kind !== "calculatorCtr")).toBe(true);
  });
});

describe("mergeCalculatorSeo", () => {
  const base = {
    slug: "vat-calculator",
    title: "VAT Calculator",
    shortDescription: "Short",
    longDescription: "Long stays",
    category: "vat" as const,
    relatedSlugs: [],
    faq: [],
    formula: "x",
    formulaExplanation: "y",
    examples: [],
    seo: {
      title: "Original Title That Is Long Enough For Tests",
      description:
        "Original description that is long enough to pass typical meta description length expectations here.",
      canonical: "/vat-calculator",
    },
    defaultInputs: {},
    keywords: [],
  } satisfies CalculatorConfig;

  it("overrides only seo title and description", () => {
    const merged = mergeCalculatorSeo(base, {
      seoTitle: "New Title That Is Exactly Long Enough!!",
      seoDescription:
        "New description that is long enough to satisfy one hundred fifty characters requirement for meta descriptions in our SEO system.",
    });
    expect(merged.seo.title).toContain("New Title");
    expect(merged.seo.description.startsWith("New description")).toBe(true);
    expect(merged.longDescription).toBe("Long stays");
    expect(merged.faq).toEqual([]);
  });

  it("returns base when override is null", () => {
    expect(mergeCalculatorSeo(base, null)).toBe(base);
  });
});

describe("slugFromRevalidatePayload", () => {
  it("reads slug from apply payload", () => {
    expect(slugFromRevalidatePayload({ slug: "vat-calculator" })).toBe("vat-calculator");
  });

  it("reads slug from Sanity override webhook body", () => {
    expect(
      slugFromRevalidatePayload({
        _type: "calculatorSeoOverride",
        slug: "margin-calculator",
        seoTitle: "x",
      }),
    ).toBe("margin-calculator");
  });

  it("rejects unrelated payloads", () => {
    expect(slugFromRevalidatePayload({ opportunityId: "abc" })).toBeNull();
    expect(slugFromRevalidatePayload({ body: "nope" })).toBeNull();
  });
});
