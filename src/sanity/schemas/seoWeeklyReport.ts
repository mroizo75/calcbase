import { defineField, defineType } from "sanity";

export const seoWeeklyReport = defineType({
  name: "seoWeeklyReport",
  title: "SEO Weekly Report",
  type: "document",
  fields: [
    defineField({
      name: "weekOf",
      title: "Week of",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "createdCount",
      title: "New recommendations",
      type: "number",
    }),
    defineField({
      name: "appliedAwaitingFollowUp",
      title: "Applied — awaiting follow-up",
      type: "number",
    }),
    defineField({
      name: "outcomesImproved",
      title: "Outcomes improved",
      type: "number",
    }),
    defineField({
      name: "outcomesWorse",
      title: "Outcomes worse",
      type: "number",
    }),
    defineField({
      name: "outcomesFlat",
      title: "Outcomes flat/mixed",
      type: "number",
    }),
    defineField({
      name: "summary",
      title: "Learning summary",
      type: "text",
      rows: 8,
      description: "Red thread: what title/meta patterns worked this week.",
    }),
    defineField({
      name: "topWins",
      title: "Top wins",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "topLosses",
      title: "Top losses / revert candidates",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "weekOf", subtitle: "summary" },
    prepare({ title, subtitle }) {
      return {
        title: title ? `Week of ${String(title).slice(0, 10)}` : "SEO weekly report",
        subtitle: subtitle ? String(subtitle).slice(0, 80) : undefined,
      };
    },
  },
});
