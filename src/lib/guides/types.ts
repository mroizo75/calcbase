import type { FaqEntry } from "@/lib/calculators/types";

export interface GuideConfig {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  updatedDate: string;
  relatedCalculators: string[];
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  /** Optional. When set, the FAQ is rendered on the page and FAQPage schema is added. */
  faq?: FaqEntry[];
}
