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
      title: "How to Calculate Discount: Formula & Examples | CalcBase",
      description:
        "How to calculate a percentage discount: find the sale price, stack two discounts, and work back to the original price. Discount formula and worked examples in USD.",
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
  {
    slug: "vat-rates-by-country",
    title: "VAT Rates by Country: Complete 2026 Guide to Global Tax Rates",
    description:
      "A comprehensive reference of VAT, GST, and consumption tax rates for major economies worldwide. Includes UK, EU, Australia, Canada, India, and more.",
    publishedDate: "2026-04-26",
    updatedDate: "2026-04-26",
    relatedCalculators: ["vat-calculator", "add-vat", "remove-vat"],
    seo: {
      title: "VAT Rates by Country 2026 – Global VAT & GST Rate Table | CalcBase",
      description:
        "Complete list of VAT and GST rates by country for 2026. UK 20%, Germany 19%, France 20%, Australia 10%, and more. Compare rates and calculate VAT instantly.",
      canonical: "/guides/vat-rates-by-country",
    },
  },
  {
    slug: "vat-vs-sales-tax",
    title: "VAT vs Sales Tax: What's the Difference and Why It Matters",
    description:
      "VAT and sales tax both add cost to purchases, but they work differently. This guide explains the key differences, how each is calculated, and which countries use which system.",
    publishedDate: "2026-04-26",
    updatedDate: "2026-04-26",
    relatedCalculators: ["vat-calculator", "add-vat", "remove-vat"],
    seo: {
      title: "VAT vs Sales Tax – Key Differences Explained Simply | CalcBase",
      description:
        "Understand the difference between VAT and sales tax. How each works, who pays, collection methods, and which countries use which. Clear comparison with examples.",
      canonical: "/guides/vat-vs-sales-tax",
    },
  },
  {
    slug: "how-to-price-a-product",
    title: "How to Price a Product: Formulas, Strategies, and Common Mistakes",
    description:
      "Pricing determines profitability. This guide covers cost-plus pricing, margin-based pricing, competitive pricing, and the formulas behind each approach.",
    publishedDate: "2026-04-26",
    updatedDate: "2026-04-26",
    relatedCalculators: ["price-builder", "margin-calculator", "markup-calculator", "profit-calculator", "commission-calculator"],
    seo: {
      title: "How to Price a Product – Pricing Formulas & Strategies | CalcBase",
      description:
        "Learn how to price a product using cost-plus, margin-based, and competitive pricing strategies. Includes formulas, worked examples, and common pricing mistakes to avoid.",
      canonical: "/guides/how-to-price-a-product",
    },
  },
  {
    slug: "how-to-calculate-roi",
    title: "How to Calculate ROI: Formula, Examples, and Common Pitfalls",
    description:
      "Return on investment measures the efficiency of an investment. Learn the ROI formula, see worked examples for marketing, real estate, and business investments, and understand ROI limitations.",
    publishedDate: "2026-04-26",
    updatedDate: "2026-04-26",
    relatedCalculators: ["profit-calculator", "break-even-calculator", "margin-calculator"],
    seo: {
      title: "How to Calculate ROI – Formula, Examples & Pitfalls | CalcBase",
      description:
        "Learn the ROI formula step by step. Calculate return on investment for marketing campaigns, real estate, and business decisions. Includes worked examples and common mistakes.",
      canonical: "/guides/how-to-calculate-roi",
    },
    faq: [
      {
        question: "What is a good ROI?",
        answer:
          "There is no universal benchmark. A good ROI depends on the risk, the time period, and the alternatives. As a rough guide, an annual return above the cost of capital (for example, the interest rate on a savings account or a stock index's long-run average of roughly 7–10% a year) is generally considered worthwhile. Always compare ROI on an annualised basis so investments of different lengths can be judged fairly.",
      },
      {
        question: "What is the difference between ROI and ROAS?",
        answer:
          "ROI measures net profit relative to the total cost of an investment, so it accounts for all costs. ROAS (return on ad spend) divides revenue generated by ad spend, so a ROAS of 4 means $4 of revenue for every $1 spent on ads. ROAS ignores product cost and overheads, so a campaign can have a high ROAS and still lose money. Use ROAS to judge ad efficiency and ROI to judge whether the business made a profit.",
      },
      {
        question: "How do I calculate ROI in Excel or Google Sheets?",
        answer:
          "Put the total return in cell A1 and the total cost in cell B1, then enter =(A1-B1)/B1 and format the cell as a percentage. For example, a return of $15,000 on a $10,000 cost gives =(15000-10000)/10000, which displays as 50%.",
      },
      {
        question: "Is ROI the same as profit margin?",
        answer:
          "No. ROI compares profit with the cost of an investment, while profit margin compares profit with revenue. A business can have a 10% profit margin and a 200% ROI on a specific purchase, or the reverse. Margin is used to assess ongoing operations, and ROI is used to compare investments.",
      },
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. If the total return is less than the cost, net profit is negative and so is the ROI. For example, spending $5,000 to earn $4,000 back gives a net loss of $1,000 and an ROI of −20%.",
      },
      {
        question: "Why does ROI ignore how long an investment takes?",
        answer:
          "The basic ROI formula compares only the start and end values, so it does not show timing. A 50% return over one year and a 50% return over ten years produce the same ROI, but the annualised return is very different (50% a year versus roughly 4.1% a year). Use annualised ROI or IRR when the holding period varies.",
      },
    ],
  },
  {
    slug: "pricing-strategy-explained",
    title: "Pricing Strategy Explained: From Cost-Plus to Value-Based Pricing",
    description:
      "Choose the right pricing strategy for your business. This guide covers cost-plus, value-based, competitive, penetration, and premium pricing with real-world examples and the math behind each.",
    publishedDate: "2026-04-26",
    updatedDate: "2026-04-26",
    relatedCalculators: ["margin-calculator", "markup-calculator", "break-even-calculator", "profit-calculator"],
    seo: {
      title: "Pricing Strategy Guide – 5 Methods with Formulas | CalcBase",
      description:
        "Compare pricing strategies: cost-plus, value-based, competitive, penetration, and premium pricing. Learn which strategy fits your business with formulas and examples.",
      canonical: "/guides/pricing-strategy-explained",
    },
  },
  {
    slug: "discount-impact-on-margin",
    title: "How Discounts Destroy Your Margin (And How Much More You Need to Sell)",
    description:
      "A discount reduces your margin by more than you think. This guide shows the real math: how discounts shrink profit, the formula for required sales volume increase, and a reference table for every margin and discount combination.",
    publishedDate: "2026-04-26",
    updatedDate: "2026-04-26",
    relatedCalculators: ["discount-calculator", "margin-calculator", "break-even-calculator", "profit-calculator"],
    seo: {
      title: "Discount Impact on Margin – The Math Behind Sales & Promotions | CalcBase",
      description:
        "See how discounts reduce profit margin and how much extra volume you need to break even. Includes the discount-margin formula, worked examples, and a full reference table.",
      canonical: "/guides/discount-impact-on-margin",
    },
  },
  {
    slug: "how-to-calculate-sales-commission",
    title: "How to Calculate Sales Commission: Formula, Examples and Tiered Rates",
    description:
      "Learn how sales commission works: the formula, how to find the rate from an amount, tiered plans that apply rate by band, and gross versus net sales, with worked examples in USD.",
    publishedDate: "2026-11-19",
    updatedDate: "2026-11-19",
    relatedCalculators: ["commission-calculator", "profit-calculator", "marketplace-profit-calculator", "price-builder"],
    seo: {
      title: "How to Calculate Sales Commission – Formula & Examples | CalcBase",
      description:
        "Calculate sales commission step by step: the formula, finding the rate from a payout, tiered commission bands, and gross versus net sales. Worked examples in USD.",
      canonical: "/guides/how-to-calculate-sales-commission",
    },
  },
];

export function getGuide(slug: string): GuideConfig | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesForCalculator(calcSlug: string): GuideConfig[] {
  return guides.filter((g) => g.relatedCalculators.includes(calcSlug));
}

export function getRelatedGuides(currentSlug: string): GuideConfig[] {
  const current = getGuide(currentSlug);
  if (!current) return [];
  const currentCalcSet = new Set(current.relatedCalculators);
  return guides
    .filter((g) => g.slug !== currentSlug && g.relatedCalculators.some((c) => currentCalcSet.has(c)))
    .slice(0, 4);
}
