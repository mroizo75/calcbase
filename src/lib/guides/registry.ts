import type { GuideConfig } from "./types";

export const guides: GuideConfig[] = [
  {
    slug: "vat-explained",
    title: "VAT Explained: What It Is, How It Works, and Who Pays It",
    description:
      "A clear, practical guide to Value Added Tax — how it differs from sales tax, how it is calculated, and what businesses need to know about UK, EU, and international VAT rates.",
    publishedDate: "2026-04-15",
    updatedDate: "2026-04-17",
    relatedCalculators: ["vat-calculator", "add-vat", "remove-vat"],
    seo: {
      title: "What Is VAT? VAT Explained Simply (UK, EU & Global Rates) | CalcBase",
      description:
        "Understand VAT (Value Added Tax) in plain English. How VAT works, who pays it, current UK VAT rates (20%, 5%, 0%), EU rates, GST, and how to calculate VAT. Complete guide with examples.",
      canonical: "/guides/vat-explained",
    },
  },
  {
    slug: "margin-vs-markup",
    title: "Margin vs Markup: The Difference That Costs Businesses Money",
    description:
      "Margin and markup both describe profit, but they are calculated differently. Confusing them leads to pricing errors. This guide clears it up with formulas, a conversion table, and examples.",
    publishedDate: "2026-04-15",
    updatedDate: "2026-04-17",
    relatedCalculators: ["margin-calculator", "markup-calculator"],
    seo: {
      title: "Margin vs Markup – What's the Difference? Formula & Table | CalcBase",
      description:
        "Learn the difference between profit margin and markup with clear formulas, worked examples, and a margin-to-markup conversion table. Avoid the pricing mistake that costs businesses money.",
      canonical: "/guides/margin-vs-markup",
    },
  },
  {
    slug: "how-to-calculate-discount",
    title: "How to Calculate Discount: Percentages, Stacking, and Reverse Calculations",
    description:
      "Learn how percentage discounts work, how to calculate the final price, and why stacking discounts does not mean adding them together. Includes formulas for finding original prices.",
    publishedDate: "2026-04-15",
    updatedDate: "2026-04-17",
    relatedCalculators: ["discount-calculator", "margin-calculator"],
    seo: {
      title: "How to Calculate Percentage Discount – Formulas & Examples | CalcBase",
      description:
        "Step-by-step guide: calculate percentage off, find sale price, stack multiple discounts, and reverse-calculate original price. Includes the discount formula and worked examples.",
      canonical: "/guides/how-to-calculate-discount",
    },
  },
  {
    slug: "break-even-formula",
    title: "Break-even Formula Explained: Fixed Costs, Variable Costs, and the Math",
    description:
      "Understand the break-even formula, what contribution margin means, and how to find the exact point where your business starts making profit. Includes worked examples for retail and SaaS.",
    publishedDate: "2026-04-15",
    updatedDate: "2026-04-17",
    relatedCalculators: ["break-even-calculator", "margin-calculator", "markup-calculator"],
    seo: {
      title: "Break-even Formula – How to Calculate Break-even Point | CalcBase",
      description:
        "Learn the break-even formula step by step. Understand fixed costs, variable costs, contribution margin, and how to find break-even units and revenue. Worked examples for real businesses.",
      canonical: "/guides/break-even-formula",
    },
  },
];

export function getGuide(slug: string): GuideConfig | undefined {
  return guides.find((g) => g.slug === slug);
}
