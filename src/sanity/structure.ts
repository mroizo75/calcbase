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
                    .filter('_type == "seoOpportunity" && status == "pending"')
                    .defaultOrdering([{ field: "impressions", direction: "desc" }]),
                ),
              S.listItem()
                .title("Approved (awaiting apply)")
                .child(
                  S.documentList()
                    .title("Approved")
                    .filter('_type == "seoOpportunity" && status == "approved"'),
                ),
              S.listItem()
                .title("All opportunities")
                .child(
                  S.documentTypeList("seoOpportunity").title("All SEO Opportunities"),
                ),
            ]),
        ),
      S.listItem()
        .title("Calculator SEO Overrides")
        .child(
          S.documentTypeList("calculatorSeoOverride").title("Calculator SEO Overrides"),
        ),
      S.divider(),
      S.listItem()
        .title("Articles")
        .child(S.documentTypeList("article").title("Articles")),
    ]);
