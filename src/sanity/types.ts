import type { PortableTextBlock } from "@portabletext/types";

export type ArticleCategory =
  | "tax-news"
  | "business-finance"
  | "calculator-guides"
  | "economic-news";

export interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: ArticleCategory;
  relatedCalculators?: string[];
}

export interface Article extends ArticleSummary {
  body: PortableTextBlock[];
}

export const categoryLabels: Record<ArticleCategory, string> = {
  "tax-news": "Tax & VAT News",
  "business-finance": "Business Finance",
  "calculator-guides": "Calculator Guides",
  "economic-news": "Economic News",
};
