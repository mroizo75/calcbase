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
    faq: [
      {
        question: "What does VAT stand for?",
        answer:
          "VAT stands for Value Added Tax. It is a consumption tax charged at each stage of the supply chain on the value a business adds, and the end consumer bears the final cost.",
      },
      {
        question: "Who pays VAT, the buyer or the seller?",
        answer:
          "The buyer pays it in the price. The seller collects VAT on sales, subtracts the VAT it paid on business purchases, and sends the difference to the tax authority. VAT-registered businesses are collectors, not the final payers.",
      },
      {
        question: "How do you add 20% VAT to a price?",
        answer:
          "Multiply the net price by 1.20. For example, a £1,000 net price becomes £1,200 including £200 VAT. To go the other way, divide the gross price by 1.20.",
      },
      {
        question: "Is VAT the same as sales tax?",
        answer:
          "No. US sales tax is charged once, at the final retail sale. VAT is charged at every stage, with businesses reclaiming the VAT on their purchases. The result for the consumer looks similar, but the paperwork and the tax base differ.",
      },
      {
        question: "When must a UK business register for VAT?",
        answer:
          "A UK business must register when its taxable turnover goes over the VAT registration threshold in a rolling 12-month period (£90,000 as of 2024). Below that, registration is voluntary. Check gov.uk for the current figure.",
      },
    ],
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
    faq: [
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin is profit as a percentage of the selling price. Markup is profit as a percentage of cost. A product that costs $60 and sells for $100 has a $40 profit, which is a 40% margin and a 66.7% markup.",
      },
      {
        question: "How do you convert markup to margin?",
        answer:
          "Divide the markup by (1 + markup). A 50% markup is 0.50 ÷ 1.50 = 33.3% margin. A 100% markup is 1.00 ÷ 2.00 = 50% margin.",
      },
      {
        question: "How do you convert margin to markup?",
        answer:
          "Divide the margin by (1 − margin). A 40% margin is 0.40 ÷ 0.60 = 66.7% markup. A 25% margin is 0.25 ÷ 0.75 = 33.3% markup.",
      },
      {
        question: "Is markup always higher than margin?",
        answer:
          "Yes, for any profitable sale. Both use the same profit figure, but markup divides it by cost, which is lower than the selling price. The gap grows as the percentages rise: a 20% margin is a 25% markup, while a 60% margin is a 150% markup.",
      },
      {
        question: "What markup do I need for a 50% margin?",
        answer:
          "A 100% markup. If an item costs $100, price it at $200. The profit of $100 is 50% of the $200 selling price. A 50% markup would only give $150, which is a 33.3% margin.",
      },
    ],
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
    faq: [
      {
        question: "How do you calculate a discount percentage?",
        answer:
          "Subtract the sale price from the original price, divide the result by the original price and multiply by 100. For example, a $120 jacket now selling for $90 is ($120 − $90) ÷ $120 × 100 = 25% off.",
      },
      {
        question: "How do you calculate the sale price after a discount?",
        answer:
          "Multiply the original price by (1 − discount ÷ 100). For 30% off $250, that is $250 × 0.70 = $175. You save $75.",
      },
      {
        question: "Do two discounts add up?",
        answer:
          "No. The second discount is applied to the already reduced price. 20% off followed by an extra 10% off is $100 × 0.80 × 0.90 = $72, which is a 28% total discount, not 30%.",
      },
      {
        question: "How do you find the original price from the sale price?",
        answer:
          "Divide the sale price by (1 − discount ÷ 100). If you paid $67.50 after a 25% discount, the original price was $67.50 ÷ 0.75 = $90.",
      },
      {
        question: "How does a discount affect profit margin?",
        answer:
          "A discount comes straight out of your margin. A 20% discount on a product with a 30% margin removes about two-thirds of the profit per sale, so you need far more sales to earn the same total profit. Check the impact with the margin calculator before setting a discount.",
      },
    ],
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
    faq: [
      {
        question: "What is the break-even point?",
        answer:
          "The break-even point is the sales volume at which total revenue equals total costs, so profit is zero. Divide fixed costs by the contribution margin per unit (selling price minus variable cost per unit) to get the number of units needed.",
      },
      {
        question: "What is contribution margin?",
        answer:
          "Contribution margin is the selling price minus the variable cost per unit. It is the amount each sale contributes towards covering fixed costs. Once fixed costs are covered, the contribution margin becomes profit.",
      },
      {
        question: "What is the difference between fixed and variable costs?",
        answer:
          "Fixed costs such as rent, salaries and software subscriptions stay the same whatever you sell. Variable costs such as materials, packaging, shipping and payment fees rise and fall with each unit sold.",
      },
      {
        question: "Can I calculate break-even in dollars and in units?",
        answer:
          "Yes. Break-even units = fixed costs ÷ contribution margin per unit. Break-even revenue = break-even units × selling price per unit. For example, $3,000 of fixed costs and a $16 contribution margin give 188 units, or $4,512 of revenue at a $24 price.",
      },
      {
        question: "What happens if the variable cost is higher than the price?",
        answer:
          "The contribution margin is zero or negative, so each sale adds nothing or adds to the loss. No volume will reach break-even. The price, the variable cost or the business model has to change first.",
      },
    ],
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
    faq: [
      {
        question: "What is the standard VAT rate in the UK?",
        answer:
          "The standard UK VAT rate is 20%. A reduced rate of 5% applies to some goods, such as domestic fuel and power, and a zero rate applies to items such as most food, children's clothing and books.",
      },
      {
        question: "What is the difference between VAT and GST?",
        answer:
          "They work the same way in practice: tax is charged at each stage and businesses reclaim the tax on their purchases. The names differ by country. GST is used in Australia, New Zealand, Singapore, India and Canada, while VAT is used across Europe, the UK and much of the rest of the world.",
      },
      {
        question: "How do I work out VAT from a price that already includes it?",
        answer:
          "Divide the gross price by (1 + rate). For example, $240 including 20% VAT is $240 ÷ 1.20 = $200 net, and the VAT portion is $40. Subtracting 20% of $240 gives the wrong answer of $48.",
      },
      {
        question: "What is the standard GST rate in Canada?",
        answer:
          "The federal GST rate is 5%. Several provinces also charge provincial sales tax, and some combine it with GST into a harmonised rate (HST) of 13–15%. The rate depends on the province where the buyer is located.",
      },
      {
        question: "Why do VAT rates differ between countries?",
        answer:
          "Each government sets its own rates and decides which goods get reduced or zero rates. EU members must keep a standard rate of at least 15%, but the rate is otherwise a national choice, so the same product can carry different tax in different countries.",
      },
    ],
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
    faq: [
      {
        question: "What is the best pricing strategy?",
        answer:
          "There is no single best strategy. Cost-plus suits stable-cost products, value-based pricing suits software and consulting, competitive pricing suits commoditised markets, penetration pricing suits winning share quickly, and premium pricing suits strong brands. Most businesses combine several.",
      },
      {
        question: "What is the difference between cost-plus and value-based pricing?",
        answer:
          "Cost-plus pricing starts from what the product costs you to make and adds a markup. Value-based pricing starts from what the customer gains and what they are willing to pay, so the price can be far above cost.",
      },
      {
        question: "When should I use penetration pricing?",
        answer:
          "Use it when you need to win customers quickly in a competitive market and can fund early losses. Before you commit, run a break-even analysis to see how much volume you need and how long you can sustain the low price.",
      },
      {
        question: "Does a higher price always mean more profit?",
        answer:
          "No. A higher price usually means fewer units sold. Profit depends on price, volume and cost together. Premium pricing works only where customers accept the higher price, so test changes before you apply them across the range.",
      },
    ],
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
    faq: [
      {
        question: "How much does a discount reduce profit margin?",
        answer:
          "Your cost stays the same, so the whole discount comes out of profit. A product that sells for $100 with a $60 cost has a 40% margin. At 20% off it sells for $80, profit falls from $40 to $20 and the margin drops to 25%, so profit per sale is cut in half.",
      },
      {
        question: "How much more do I need to sell to make up for a discount?",
        answer:
          "Required volume increase = discount % ÷ (margin % − discount %). With a 40% margin and 20% off, that is 20 ÷ (40 − 20) = 100%, so you must double your unit sales to earn the same total profit.",
      },
      {
        question: "What happens if the discount is bigger than my margin?",
        answer:
          "You lose money on every sale. A 40% discount on a product with a 30% margin means each unit sells for less than it cost you, so selling more units only increases the loss.",
      },
      {
        question: "How do I calculate the new margin after a discount?",
        answer:
          "Subtract your cost from the discounted price, then divide by the discounted price. For a $120 jacket with a $78 cost and 15% off, the price is $102, profit is $24 and the new margin is $24 ÷ $102 = 23.5%, down from 35%.",
      },
      {
        question: "When is it worth offering a discount?",
        answer:
          "A discount can pay off when you are clearing dead stock, acquiring customers whose lifetime value exceeds the margin lost on the first sale, or securing a large guaranteed order that lowers your unit costs. Outside those cases, check the volume increase you need first.",
      },
    ],
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
    faq: [
      {
        question: "How do you calculate sales commission?",
        answer:
          "Multiply total sales by the commission rate. For $31,000 in sales at a 3% commission, the commission is $31,000 × 0.03 = $930.",
      },
      {
        question: "How do you find the commission rate from the amount paid?",
        answer:
          "Divide the commission by the sales and multiply by 100. If you were paid $930 on $31,000 of sales, the rate is $930 ÷ $31,000 × 100 = 3%.",
      },
      {
        question: "How does tiered commission work?",
        answer:
          "Each rate applies only to the sales inside its band. With 5% on the first $10,000 and 8% above that, $25,000 in sales pays $500 + $1,200 = $1,700, an effective rate of 6.8%. Applying 8% to the whole $25,000 would wrongly give $2,000.",
      },
      {
        question: "Is commission paid on gross or net sales?",
        answer:
          "It depends on the contract. Gross sales include refunds, while net sales remove them first. At 3%, $31,000 gross pays $930, but $30,000 net of $1,000 in refunds pays $900.",
      },
      {
        question: "Is sales commission a cost to the business?",
        answer:
          "Yes. A 10% commission on an $80 sale is $8, which comes straight out of your profit. Include it in your cost before you set a price or a target margin.",
      },
    ],
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
