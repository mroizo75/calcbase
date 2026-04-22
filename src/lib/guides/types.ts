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
}
