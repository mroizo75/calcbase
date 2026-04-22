import type { CalculatorConfig, FaqEntry } from "@/lib/calculators/types";
import { getCanonicalUrl, getBaseUrl } from "@/lib/utils/urls";

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    name: "CalcBase",
    url: getBaseUrl(),
    description:
      "Free online business calculators for VAT, margins, markup, discounts, and break-even analysis.",
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    name: "CalcBase",
    url: getBaseUrl(),
    logo: `${getBaseUrl()}/icon.png`,
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: getCanonicalUrl(item.url),
    })),
  };
}

export function buildFaqSchema(entries: FaqEntry[]) {
  if (entries.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: e.answer,
      },
    })),
  };
}

export function buildWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: getCanonicalUrl(opts.url),
    isPartOf: { "@type": "WebSite", url: getBaseUrl() },
  };
}

export function buildArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: getCanonicalUrl(opts.url),
    publisher: {
      "@type": "Organization",
      name: "CalcBase",
      url: getBaseUrl(),
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

export function buildGraphJsonLd(schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

export function buildSiteGraphJsonLd() {
  return buildGraphJsonLd([
    buildWebsiteSchema(),
    buildOrganizationSchema(),
  ]);
}

export function buildCalculatorPageGraph(config: CalculatorConfig) {
  const schemas: Record<string, unknown>[] = [
    buildWebPageSchema({
      name: config.title,
      description: config.longDescription,
      url: config.seo.canonical,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Calculators", url: "/calculators" },
      { name: config.title, url: config.seo.canonical },
    ]),
  ];

  const faq = buildFaqSchema(config.faq);
  if (faq) schemas.push(faq);

  return buildGraphJsonLd(schemas);
}

export function buildGuidePageGraph(opts: {
  title: string;
  description: string;
  canonical: string;
  datePublished: string;
  dateModified: string;
}) {
  return buildGraphJsonLd([
    buildArticleSchema({
      headline: opts.title,
      description: opts.description,
      url: opts.canonical,
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: opts.title, url: opts.canonical },
    ]),
  ]);
}
