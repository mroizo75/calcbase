import { defineField, defineType } from "sanity";

export const seoOpportunity = defineType({
  name: "seoOpportunity",
  title: "SEO Opportunity",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
          { title: "Applied", value: "applied" },
          { title: "Done (manual)", value: "doneManual" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Calculator CTR", value: "calculatorCtr" },
          { title: "Calculator query gap", value: "calculatorQueryGap" },
          { title: "News CTR", value: "newsCtr" },
          { title: "News review", value: "newsReview" },
          { title: "Article draft (review)", value: "articleDraft" },
        ],
      },
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "pageUrl",
      title: "Page URL",
      type: "url",
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "targetQueries",
      title: "Target queries",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
    }),
    defineField({
      name: "impressions",
      title: "Impressions",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "clicks",
      title: "Clicks",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "ctr",
      title: "CTR",
      type: "number",
      description: "Click-through rate as a fraction (e.g. 0.02 = 2%)",
      readOnly: true,
    }),
    defineField({
      name: "position",
      title: "Avg. position",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "periodDays",
      title: "Period (days)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "rationale",
      title: "Rationale",
      type: "text",
      rows: 3,
      readOnly: true,
    }),
    defineField({
      name: "actionBrief",
      title: "Action brief",
      type: "text",
      rows: 4,
      description:
        "Human task. For articleDraft: open the linked article, edit thoroughly, then Publish to site. Never leave thin AI text live.",
      readOnly: true,
    }),
    defineField({
      name: "currentTitle",
      title: "Current title",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "currentDescription",
      title: "Current description",
      type: "text",
      rows: 2,
      readOnly: true,
    }),
    defineField({
      name: "proposedTitle",
      title: "Proposed title",
      type: "string",
      description: "CTR suggestion (50–60 chars). Use Generate title/meta if empty.",
      validation: (r) =>
        r.custom((value) => {
          if (!value) return true;
          if (value.length < 50 || value.length > 60) return "Title must be 50–60 characters";
          return true;
        }),
    }),
    defineField({
      name: "proposedDescription",
      title: "Proposed description",
      type: "text",
      rows: 3,
      description: "Optional CTR suggestion for calculators only (150–160 chars).",
      validation: (r) =>
        r.custom((value) => {
          if (!value) return true;
          if (value.length < 150 || value.length > 160) {
            return "Description must be 150–160 characters";
          }
          return true;
        }),
    }),
    defineField({
      name: "proposedTitleAlt",
      title: "Proposed title (alt)",
      type: "string",
      description: "Second title alternative if provided.",
      validation: (r) =>
        r.custom((value) => {
          if (!value) return true;
          if (value.length < 50 || value.length > 60) return "Title must be 50–60 characters";
          return true;
        }),
    }),
    defineField({
      name: "draftArticleId",
      title: "Draft article ID",
      type: "string",
      description: "Linked Sanity article in draftReview. Not live until you Publish to site.",
      readOnly: true,
    }),
    defineField({
      name: "recommendedSlug",
      title: "Recommended slug",
      type: "string",
      description:
        "Only for news/article opportunities. Calculator URLs stay fixed (changing them hurts SEO).",
    }),
    defineField({
      name: "recommendationSummary",
      title: "Why this recommendation",
      type: "text",
      rows: 3,
      description: "AI rationale for the proposed title/meta/slug package.",
    }),
    defineField({
      name: "appliedAt",
      title: "Applied at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "followUpImpressions",
      title: "Follow-up impressions",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "followUpClicks",
      title: "Follow-up clicks",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "followUpCtr",
      title: "Follow-up CTR",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "followUpPosition",
      title: "Follow-up position",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "followUpAt",
      title: "Follow-up measured at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Awaiting follow-up (~7 days)", value: "awaiting_followup" },
          { title: "Improved CTR", value: "improved_ctr" },
          { title: "Improved position", value: "improved_position" },
          { title: "Improved both", value: "improved_both" },
          { title: "Mixed", value: "mixed" },
          { title: "No change", value: "no_change" },
          { title: "Worse", value: "worse" },
        ],
      },
    }),
    defineField({
      name: "outcomeNotes",
      title: "Outcome notes (learning)",
      type: "text",
      rows: 3,
      readOnly: true,
      description: "What worked / did not — filled automatically ~7 days after apply.",
    }),
  ],
  preview: {
    select: {
      title: "slug",
      kind: "kind",
      status: "status",
      outcome: "outcome",
      impressions: "impressions",
    },
    prepare({ title, kind, status, outcome, impressions }) {
      return {
        title: title || "SEO opportunity",
        subtitle: `${kind ?? "?"} · ${status ?? "?"} · ${outcome ?? "no outcome"} · ${impressions ?? 0} impr.`,
      };
    },
  },
  orderings: [
    {
      title: "Impressions (high)",
      name: "impressionsDesc",
      by: [{ field: "impressions", direction: "desc" }],
    },
  ],
});
