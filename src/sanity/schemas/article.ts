import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "editorialStatus",
      title: "Editorial status",
      type: "string",
      description:
        "Use the bottom action «Publish to site (/news)» to go live. Do not rely on the radio alone. draftReview = Studio only. published = live on /news.",
      options: {
        list: [
          { title: "Draft — review before release", value: "draftReview" },
          { title: "Published (live)", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draftReview",
      validation: (r) => r.required(),
      readOnly: ({ value }) => value === "published",
    }),
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      description: "Page H1 / browser title base. 20–80 characters.",
      validation: (r) => r.required().min(20).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required().min(8).max(160),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Set when releasing to the site (Publish to site action updates this).",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Tax & VAT News", value: "tax-news" },
          { title: "Business Finance", value: "business-finance" },
          { title: "Calculator Guides", value: "calculator-guides" },
          { title: "Economic News", value: "economic-news" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (meta description)",
      type: "text",
      rows: 3,
      description: "Used as meta description. 140–160 characters.",
      validation: (r) => r.required().min(100).max(160),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "Use H2/H3 for structure. Do not put H1 in body — title is the H1.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "relatedCalculators",
      title: "Related Calculators",
      type: "array",
      of: [{ type: "string" }],
      description: "Slugs of related calculators (e.g. vat-calculator, markup-calculator)",
    }),
    defineField({
      name: "reviewNotes",
      title: "Review notes",
      type: "text",
      rows: 4,
      description: "Checklist / warnings for the editor before Publish to site.",
    }),
    defineField({
      name: "sourceOpportunityId",
      title: "Source SEO opportunity",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "editorialStatus",
      media: "coverImage",
    },
    prepare({ title, status, media }) {
      return {
        title: title || "Untitled",
        subtitle: status === "published" ? "Live" : "Draft — review",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
