import { defineField, defineType } from "sanity";

export const calculatorSeoOverride = defineType({
  name: "calculatorSeoOverride",
  title: "Calculator SEO Override",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Calculator slug",
      type: "string",
      description: "Must match a registry calculator slug (e.g. vat-calculator).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (r) => r.required().min(50).max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (r) => r.required().min(150).max(160),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sourceOpportunityId",
      title: "Source opportunity ID",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "slug",
      subtitle: "seoTitle",
    },
  },
});
