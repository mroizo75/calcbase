import { groq } from "next-sanity";

/** Live articles only — draftReview never appears on the public site. */
const publishedArticleFilter = `_type == "article" && defined(slug.current) && (editorialStatus == "published" || !defined(editorialStatus)) && publishedAt <= now()`;

const coverImageProjection = `coverImage{
  alt,
  asset->{
    _id,
    url,
    metadata { dimensions }
  }
}`;

const bodyProjection = `body[]{
  ...,
  _type == "image" => {
    ...,
    asset->{
      _id,
      url,
      metadata { dimensions }
    }
  }
}`;

export const ARTICLES_QUERY = groq`
  *[${publishedArticleFilter}]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    category,
    relatedCalculators,
    ${coverImageProjection}
  }
`;

export const ARTICLE_SLUGS_QUERY = groq`
  *[${publishedArticleFilter}] {
    "slug": slug.current,
    publishedAt
  }
`;

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[${publishedArticleFilter} && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    category,
    relatedCalculators,
    ${coverImageProjection},
    ${bodyProjection}
  }
`;

export const RECENT_ARTICLES_QUERY = groq`
  *[${publishedArticleFilter}]
  | order(publishedAt desc) [0..4] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    category,
    ${coverImageProjection}
  }
`;

export const ALL_ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current
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

export const APPLIED_AWAITING_FOLLOWUP_QUERY = groq`
  *[_type == "seoOpportunity" && status in ["applied", "doneManual"] && defined(appliedAt) && !defined(followUpAt)] {
    _id,
    slug,
    pageUrl,
    kind,
    appliedAt,
    impressions,
    clicks,
    ctr,
    position,
    proposedTitle,
    proposedDescription
  }
`;

export const RECENT_OUTCOMES_QUERY = groq`
  *[_type == "seoOpportunity" && defined(outcome) && outcome != "awaiting_followup"] | order(followUpAt desc) [0..20] {
    _id,
    slug,
    kind,
    outcome,
    outcomeNotes,
    proposedTitle,
    impressions,
    ctr,
    position,
    followUpCtr,
    followUpPosition
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
    proposedTitleAlt,
    draftArticleId
  }
`;
