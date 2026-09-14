import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
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
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "relatedCalculators",
      title: "Related Calculators",
      type: "array",
      of: [{ type: "string" }],
      description: "Slugs of related calculators (e.g. vat-calculator, markup-calculator)",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
