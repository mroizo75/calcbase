import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("SEO Opportunities")
        .child(
          S.list()
            .title("SEO Opportunities")
            .items([
              S.listItem()
                .title("Pending review")
                .child(
                  S.documentList()
                    .title("Pending")
                    .apiVersion("2024-01-01")
                    .filter('_type == "seoOpportunity" && status == "pending"')
                    .defaultOrdering([{ field: "impressions", direction: "desc" }]),
                ),
              S.listItem()
                .title("Approved (awaiting apply)")
                .child(
                  S.documentList()
                    .title("Approved")
                    .apiVersion("2024-01-01")
                    .filter('_type == "seoOpportunity" && status == "approved"'),
                ),
              S.listItem()
                .title("All opportunities")
                .child(
                  S.documentTypeList("seoOpportunity").title("All SEO Opportunities"),
                ),
              S.listItem()
                .title("Awaiting follow-up (~7 days)")
                .child(
                  S.documentList()
                    .title("Awaiting follow-up")
                    .apiVersion("2024-01-01")
                    .filter(
                      '_type == "seoOpportunity" && outcome == "awaiting_followup"',
                    ),
                ),
              S.listItem()
                .title("Outcomes — what worked")
                .child(
                  S.documentList()
                    .title("Measured outcomes")
                    .apiVersion("2024-01-01")
                    .filter(
                      '_type == "seoOpportunity" && defined(outcome) && outcome != "awaiting_followup"',
                    )
                    .defaultOrdering([{ field: "followUpAt", direction: "desc" }]),
                ),
            ]),
        ),
      S.listItem()
        .title("SEO Weekly Reports")
        .child(S.documentTypeList("seoWeeklyReport").title("SEO Weekly Reports")),
      S.listItem()
        .title("Calculator SEO Overrides")
        .child(
          S.documentTypeList("calculatorSeoOverride").title("Calculator SEO Overrides"),
        ),
      S.divider(),
      S.listItem()
        .title("Articles")
        .child(
          S.list()
            .title("Articles")
            .items([
              S.listItem()
                .title("Drafts — review before release")
                .child(
                  S.documentList()
                    .title("Article drafts")
                    .apiVersion("2024-01-01")
                    .filter('_type == "article" && editorialStatus == "draftReview"')
                    .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
                ),
              S.listItem()
                .title("Published (live)")
                .child(
                  S.documentList()
                    .title("Published articles")
                    .apiVersion("2024-01-01")
                    .filter(
                      '_type == "article" && (editorialStatus == "published" || !defined(editorialStatus))',
                    )
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                ),
              S.listItem()
                .title("All articles")
                .child(S.documentTypeList("article").title("All articles")),
            ]),
        ),
    ]);
