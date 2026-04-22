import { describe, it, expect } from "vitest";
import { calculators } from "@/lib/calculators/registry";
import { guides } from "@/lib/guides/registry";
import {
  buildSiteGraphJsonLd,
  buildCalculatorPageGraph,
  buildGuidePageGraph,
} from "@/lib/seo/schema";
import { buildCalculatorMetadata, buildPageMetadata } from "@/lib/seo/metadata";

describe("SEO metadata", () => {
  it("every calculator has unique title under 70 chars", () => {
    const titles = new Set<string>();
    for (const calc of calculators) {
      const meta = buildCalculatorMetadata(calc);
      const title = meta.title as string;
      expect(title.length).toBeLessThanOrEqual(70);
      expect(titles.has(title)).toBe(false);
      titles.add(title);
    }
  });

  it("every calculator has unique description under 170 chars", () => {
    const descriptions = new Set<string>();
    for (const calc of calculators) {
      const meta = buildCalculatorMetadata(calc);
      const desc = meta.description as string;
      expect(desc.length).toBeLessThanOrEqual(170);
      expect(descriptions.has(desc)).toBe(false);
      descriptions.add(desc);
    }
  });

  it("every calculator has a self-referencing canonical", () => {
    for (const calc of calculators) {
      expect(calc.seo.canonical).toBe(`/${calc.slug}`);
      const meta = buildCalculatorMetadata(calc);
      expect(meta.alternates?.canonical).toBe(`/${calc.slug}`);
    }
  });

  it("every guide has unique SEO metadata", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const guide of guides) {
      expect(titles.has(guide.seo.title)).toBe(false);
      expect(descriptions.has(guide.seo.description)).toBe(false);
      titles.add(guide.seo.title);
      descriptions.add(guide.seo.description);
    }
  });

  it("page metadata helper produces correct shape", () => {
    const meta = buildPageMetadata({
      title: "Test Page",
      description: "A test description",
      canonical: "/test",
    });
    expect(meta.title).toBe("Test Page");
    expect(meta.description).toBe("A test description");
    expect(meta.alternates?.canonical).toBe("/test");
    expect(meta.openGraph?.title).toBe("Test Page");
  });
});

describe("structured data", () => {
  it("site graph contains WebSite and Organization schemas", () => {
    const graph = buildSiteGraphJsonLd();
    expect(graph["@context"]).toBe("https://schema.org");
    const types = (graph["@graph"] as Array<{ "@type": string }>).map((s) => s["@type"]);
    expect(types).toContain("WebSite");
    expect(types).toContain("Organization");
  });

  it("calculator page graph includes WebPage, BreadcrumbList, and FAQPage", () => {
    const calc = calculators[0];
    const graph = buildCalculatorPageGraph(calc);
    const types = (graph["@graph"] as Array<{ "@type": string }>).map((s) => s["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
  });

  it("guide page graph includes Article and BreadcrumbList", () => {
    const guide = guides[0];
    const graph = buildGuidePageGraph({
      title: guide.title,
      description: guide.description,
      canonical: guide.seo.canonical,
      datePublished: guide.publishedDate,
      dateModified: guide.updatedDate,
    });
    const types = (graph["@graph"] as Array<{ "@type": string }>).map((s) => s["@type"]);
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
  });

  it("FAQ schema includes all questions for each calculator", () => {
    for (const calc of calculators) {
      const graph = buildCalculatorPageGraph(calc);
      const faqSchema = (graph["@graph"] as Array<{ "@type": string; mainEntity?: unknown[] }>)
        .find((s) => s["@type"] === "FAQPage");
      expect(faqSchema).toBeDefined();
      expect(faqSchema!.mainEntity).toHaveLength(calc.faq.length);
    }
  });

  it("breadcrumb schema has correct positions starting at 1", () => {
    const calc = calculators[0];
    const graph = buildCalculatorPageGraph(calc);
    const breadcrumbs = (graph["@graph"] as Array<{ "@type": string; itemListElement?: Array<{ position: number }> }>)
      .find((s) => s["@type"] === "BreadcrumbList");
    expect(breadcrumbs).toBeDefined();
    expect(breadcrumbs!.itemListElement![0].position).toBe(1);
    expect(breadcrumbs!.itemListElement![1].position).toBe(2);
    expect(breadcrumbs!.itemListElement![2].position).toBe(3);
  });
});
