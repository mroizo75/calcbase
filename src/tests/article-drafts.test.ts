import { describe, expect, it } from "vitest";
import { articleDraftPayloadSchema } from "@/lib/seo/article-draft-schema";
import { scoreArticleTopics, topicToSlug } from "@/lib/seo/score-article-topics";

describe("topicToSlug", () => {
  it("slugifies queries", () => {
    expect(topicToSlug("How to calculate VAT UK")).toBe("how-to-calculate-vat-uk");
  });
});

describe("scoreArticleTopics", () => {
  it("returns at most one informational striking-distance topic", () => {
    const topics = scoreArticleTopics({
      calculatorSlugs: ["vat-calculator", "margin-calculator"],
      existingArticleSlugs: new Set(),
      pendingTopicKeys: new Set(),
      snapshot: {
        periodDays: 28,
        pages: [],
        queries: [
          {
            page: "https://calcbase.io/vat-calculator",
            query: "how to calculate vat on invoices",
            impressions: 200,
            clicks: 3,
            ctr: 0.015,
            position: 12,
          },
          {
            page: "https://calcbase.io/",
            query: "calcbase",
            impressions: 500,
            clicks: 40,
            ctr: 0.08,
            position: 1,
          },
        ],
      },
    });

    expect(topics.length).toBe(1);
    expect(topics[0].query).toContain("vat");
  });

  it("skips existing article slugs", () => {
    const topics = scoreArticleTopics({
      calculatorSlugs: ["vat-calculator"],
      existingArticleSlugs: new Set(["how-to-calculate-vat-on-invoices"]),
      pendingTopicKeys: new Set(),
      snapshot: {
        periodDays: 28,
        pages: [],
        queries: [
          {
            page: "https://calcbase.io/vat-calculator",
            query: "how to calculate vat on invoices",
            impressions: 200,
            clicks: 3,
            ctr: 0.015,
            position: 12,
          },
        ],
      },
    });
    expect(topics).toEqual([]);
  });
});

describe("articleDraftPayloadSchema", () => {
  it("requires deep structure with h2 and images", () => {
    const longP =
      "This paragraph explains a concrete worked example with numbers so the draft stays substantial enough for editorial review before any publish decision on the public news section of the site. Include net amounts, VAT rates, and gross totals the reader can verify by hand. ".repeat(
        4,
      );

    const parsed = articleDraftPayloadSchema.parse({
      title: "How to Calculate VAT on Invoices for Small Businesses",
      slug: "how-to-calculate-vat-on-invoices",
      excerpt:
        "Learn how to calculate VAT on invoices step by step, with worked examples, rate tips, and links to free CalcBase VAT tools for accurate pricing.",
      category: "calculator-guides",
      relatedCalculators: ["vat-calculator"],
      coverImagePrompt: "Clean desk with invoice paperwork and calculator, editorial photo",
      coverImageAlt: "Invoice and calculator on a desk",
      reviewNotes: "Verify VAT rates for target markets and replace any uncertain regulatory claims.",
      blocks: [
        { type: "h2", text: "What VAT on an invoice really means" },
        { type: "p", text: longP },
        { type: "h2", text: "Step-by-step calculation" },
        { type: "p", text: longP },
        { type: "h3", text: "Worked example with numbers" },
        { type: "p", text: longP },
        { type: "h2", text: "Common mistakes to avoid" },
        { type: "ul", items: ["Forgetting net vs gross", "Using the wrong regional rate"] },
        { type: "h2", text: "Tools that speed up the process" },
        { type: "p", text: longP },
        {
          type: "image",
          prompt: "Simple diagram of net price plus VAT equaling gross",
          alt: "Diagram of VAT added to net price",
          caption: "Net + VAT = gross",
        },
      ],
    });

    expect(parsed.blocks.some((b) => b.type === "h2")).toBe(true);
    expect(parsed.blocks.some((b) => b.type === "image")).toBe(true);
  });
});
