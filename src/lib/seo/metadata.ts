import type { Metadata } from "next";
import type { CalculatorConfig } from "@/lib/calculators/types";
import { getCanonicalUrl, getBaseUrl } from "@/lib/utils/urls";

const SITE_NAME = "CalcBase";
const DEFAULT_DESCRIPTION =
  "Free online business calculators for VAT, sales tax, profit margin, markup, ROI, commissions, discounts, and break-even. 12 tools plus guides. Trusted by professionals.";

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: `${SITE_NAME} – Free Business Calculators | VAT, Margin, Markup & More`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: getBaseUrl(),
      siteName: SITE_NAME,
      title: `${SITE_NAME} – Free Business Calculators | VAT, Margin, Markup & More`,
      description: DEFAULT_DESCRIPTION,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CalcBase – Free Business Calculators" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildCalculatorMetadata(config: CalculatorConfig): Metadata {
  return {
    title: config.seo.title,
    description: config.seo.description,
    alternates: {
      canonical: config.seo.canonical,
    },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: getCanonicalUrl(config.seo.canonical),
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: config.seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: ["/opengraph-image"],
    },
  };
}

export function buildPageMetadata(opts: {
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: opts.canonical,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: getCanonicalUrl(opts.canonical),
      type: "website",
    },
  };
}
