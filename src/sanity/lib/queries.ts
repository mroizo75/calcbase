import { groq } from "next-sanity";

export const ARTICLES_QUERY = groq`
  *[_type == "article" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    category,
    relatedCalculators
  }
`;

export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt
  }
`;

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    category,
    relatedCalculators
  }
`;

export const RECENT_ARTICLES_QUERY = groq`
  *[_type == "article" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) [0..4] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    category
  }
`;

export const CALCULATOR_SEO_OVERRIDE_BY_SLUG_QUERY = groq`
  *[_type == "calculatorSeoOverride" && slug == $slug][0] {
    slug,
    seoTitle,
    seoDescription,
    updatedAt,
    sourceOpportunityId
  }
`;

export const PENDING_SEO_OPPORTUNITY_KEYS_QUERY = groq`
  *[_type == "seoOpportunity" && status == "pending"] {
    "key": kind + ":" + slug
  }
`;

export const APPROVED_SEO_OPPORTUNITIES_QUERY = groq`
  *[_type == "seoOpportunity" && status == "approved" && kind == "calculatorCtr"] {
    _id,
    kind,
    slug,
    proposedTitle,
    proposedDescription
  }
`;

export const SEO_OPPORTUNITY_BY_ID_QUERY = groq`
  *[_type == "seoOpportunity" && _id == $id][0] {
    _id,
    status,
    kind,
    slug,
    pageUrl,
    proposedTitle,
    proposedDescription,
    proposedTitleAlt
  }
`;
