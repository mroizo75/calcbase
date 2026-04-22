import type { CalculatorConfig, VatPreset } from "./types";

export const VAT_PRESETS: VatPreset[] = [
  { country: "United Kingdom", rate: 20, label: "UK Standard (20%)" },
  { country: "United Kingdom", rate: 5, label: "UK Reduced (5%)" },
  { country: "United Kingdom", rate: 0, label: "UK Zero (0%)" },
  { country: "Germany", rate: 19, label: "Germany (19%)" },
  { country: "France", rate: 20, label: "France (20%)" },
  { country: "Italy", rate: 22, label: "Italy (22%)" },
  { country: "Spain", rate: 21, label: "Spain (21%)" },
  { country: "Netherlands", rate: 21, label: "Netherlands (21%)" },
  { country: "Ireland", rate: 23, label: "Ireland (23%)" },
  { country: "Sweden", rate: 25, label: "Sweden (25%)" },
  { country: "Poland", rate: 23, label: "Poland (23%)" },
  { country: "Belgium", rate: 21, label: "Belgium (21%)" },
  { country: "Australia", rate: 10, label: "Australia GST (10%)" },
  { country: "Canada", rate: 5, label: "Canada GST (5%)" },
  { country: "New Zealand", rate: 15, label: "New Zealand GST (15%)" },
  { country: "India", rate: 18, label: "India GST (18%)" },
  { country: "South Africa", rate: 15, label: "South Africa (15%)" },
];

export const calculators: CalculatorConfig[] = [
  {
    slug: "vat-calculator",
    title: "VAT Calculator",
    shortDescription: "Add or remove VAT from any amount instantly. Supports UK, EU, and international VAT rates.",
    longDescription:
      "Calculate Value Added Tax for any country. Add VAT to a net amount or extract VAT from a gross price. Choose from preset rates for the UK, EU, Australia, Canada, and more — or enter a custom rate.",
    category: "vat",
    relatedSlugs: ["add-vat", "remove-vat", "margin-calculator", "discount-calculator"],
    defaultInputs: { amount: 100, rate: 20, mode: "add" },
    formula: "VAT Amount = Net Amount × (VAT Rate ÷ 100)\nGross Amount = Net Amount + VAT Amount",
    formulaExplanation:
      "To add VAT, multiply the net amount by the VAT rate expressed as a decimal, then add it to the net amount. To remove VAT from a gross amount, divide the gross by (1 + VAT rate as decimal).",
    examples: [
      {
        title: "Adding 20% VAT to £500",
        description: "A UK freelancer invoicing £500 before VAT.",
        inputs: { "Net amount": "£500", "VAT rate": "20%" },
        result: "VAT = £100. Gross amount = £600.",
      },
      {
        title: "Removing 20% VAT from £240",
        description: "Finding the net price of a £240 product that includes UK VAT.",
        inputs: { "Gross amount": "£240", "VAT rate": "20%" },
        result: "Net amount = £200. VAT included = £40.",
      },
    ],
    faq: [
      {
        question: "What is VAT?",
        answer:
          "VAT (Value Added Tax) is a consumption tax placed on goods and services at each stage of production or distribution. It is used in over 160 countries, including the UK and EU. In the US, the equivalent is sales tax, which works differently.",
      },
      {
        question: "How do I add VAT to a price?",
        answer:
          "Multiply the net price by the VAT rate (e.g. 20% = 0.20), then add that to the net price. For example, £100 × 0.20 = £20 VAT, making the gross price £120.",
      },
      {
        question: "How do I remove VAT from a gross price?",
        answer:
          "Divide the gross price by (1 + VAT rate). For a 20% rate: divide by 1.20. For example, £120 ÷ 1.20 = £100 net.",
      },
      {
        question: "What is the current UK VAT rate?",
        answer:
          "The standard UK VAT rate is 20%. A reduced rate of 5% applies to some goods and services like home energy. Some items such as most food and children's clothing are zero-rated at 0%.",
      },
      {
        question: "Is VAT the same as sales tax?",
        answer:
          "No. VAT is collected at every stage of the supply chain and each business remits the tax on the value it adds. Sales tax, used in the US, is collected only at the final point of sale to the consumer.",
      },
      {
        question: "How do I convert net to gross (and gross to net)?",
        answer:
          "Net to gross: multiply the net amount by (1 + VAT rate). For 20% VAT: net × 1.20 = gross. Gross to net: divide the gross amount by (1 + VAT rate). For 20% VAT: gross ÷ 1.20 = net. The difference is the VAT amount.",
      },
      {
        question: "What does 'divide by 1.2' mean for VAT?",
        answer:
          "Dividing by 1.2 is the shortcut for removing 20% VAT from a gross price. Since 20% VAT means the gross is 120% of the net, dividing by 1.20 gives the net amount. For 5% VAT, divide by 1.05. For other rates, divide by (1 + rate/100).",
      },
    ],
    seo: {
      title: "VAT Calculator – Add or Remove VAT Online Free | CalcBase",
      description:
        "Free VAT calculator: add VAT to a net price or remove VAT from a gross amount. UK 20%, EU, GST, and custom rates. Net-to-gross and gross-to-net instantly.",
      canonical: "/vat-calculator",
    },
    keywords: [
      "vat calculator", "vat calculator uk", "vat calculator online", "add vat", "remove vat",
      "value added tax calculator", "uk vat calculator", "net to gross calculator", "gross to net calculator",
      "gst calculator", "calculate vat", "20 vat calculator", "vat rate calculator",
      "how to calculate vat", "reverse vat calculator", "vat calculator free",
    ],
  },
  {
    slug: "add-vat",
    title: "Add VAT Calculator",
    shortDescription: "Quickly add VAT to any net amount. See the VAT amount and gross total instantly.",
    longDescription:
      "Need to add VAT to a price? Enter the net amount and choose a VAT rate. This calculator shows the exact VAT amount and the final gross price — useful for invoicing, quoting, and pricing.",
    category: "vat",
    relatedSlugs: ["vat-calculator", "remove-vat", "markup-calculator", "margin-calculator"],
    defaultInputs: { amount: 100, rate: 20 },
    formula: "VAT Amount = Net Amount × (VAT Rate ÷ 100)\nGross Amount = Net Amount + VAT Amount",
    formulaExplanation:
      "Take the net amount (before tax) and multiply it by the VAT rate as a decimal. Add the result to the original net amount to get the final price including VAT.",
    examples: [
      {
        title: "Adding 20% VAT to a £1,000 invoice",
        description: "A consultant preparing a UK VAT invoice for £1,000 in services.",
        inputs: { "Net amount": "£1,000", "VAT rate": "20%" },
        result: "VAT = £200. Total invoice amount = £1,200.",
      },
      {
        title: "Adding 10% GST to an A$350 product",
        description: "An Australian retailer adding GST to a product priced at A$350 before tax.",
        inputs: { "Net amount": "A$350", "VAT rate": "10%" },
        result: "GST = A$35. Gross price = A$385.",
      },
    ],
    faq: [
      {
        question: "When should I add VAT to a price?",
        answer:
          "If you are a VAT-registered business selling goods or services, you must add VAT to your net price before invoicing the customer. The VAT amount must be shown separately on the invoice.",
      },
      {
        question: "Can I add different VAT rates?",
        answer:
          "Yes. Different products and services may have different VAT rates. In the UK, the standard rate is 20%, but a reduced 5% rate applies to some items, and zero-rated goods carry 0% VAT.",
      },
      {
        question: "What if my price already includes VAT?",
        answer:
          "If the price already includes VAT, you need to remove (extract) VAT instead. Use the Remove VAT calculator or the main VAT Calculator in remove mode.",
      },
    ],
    seo: {
      title: "Add VAT Calculator – Net to Gross Price Calculator | CalcBase",
      description:
        "Add VAT to any net price instantly. Calculate VAT amount and gross total for UK 20%, EU, GST, or custom rates. Free net-to-gross VAT calculator for invoicing.",
      canonical: "/add-vat",
    },
    keywords: [
      "add vat", "add vat calculator", "add vat to price", "net to gross", "net to gross calculator",
      "calculate vat on price", "plus vat calculator", "vat inclusive price", "how to add vat",
      "add 20 vat", "vat on net amount",
    ],
  },
  {
    slug: "remove-vat",
    title: "Remove VAT Calculator",
    shortDescription: "Extract VAT from a gross price. See the original net amount and VAT paid.",
    longDescription:
      "Have a price that includes VAT and need to find the net amount? Enter the gross total and the VAT rate, and this calculator extracts the VAT portion and shows you the price before tax.",
    category: "vat",
    relatedSlugs: ["vat-calculator", "add-vat", "discount-calculator", "margin-calculator"],
    defaultInputs: { amount: 120, rate: 20 },
    formula: "Net Amount = Gross Amount ÷ (1 + VAT Rate ÷ 100)\nVAT Amount = Gross Amount − Net Amount",
    formulaExplanation:
      "To find the net price, divide the gross (VAT-inclusive) amount by 1 plus the VAT rate as a decimal. For a 20% rate, divide by 1.20. The difference between gross and net is the VAT amount.",
    examples: [
      {
        title: "Removing 20% VAT from £600",
        description: "Finding the net cost of a £600 purchase that includes UK VAT.",
        inputs: { "Gross amount": "£600", "VAT rate": "20%" },
        result: "Net amount = £500. VAT included = £100.",
      },
      {
        title: "Extracting 5% GST from C$52.50",
        description: "Finding the pre-tax price of a C$52.50 item in Canada.",
        inputs: { "Gross amount": "C$52.50", "VAT rate": "5%" },
        result: "Net amount = C$50.00. GST included = C$2.50.",
      },
    ],
    faq: [
      {
        question: "How do I remove VAT from a price?",
        answer:
          "Divide the gross price by (1 + VAT rate as a decimal). For a 20% VAT rate, divide by 1.20. For example, £120 ÷ 1.20 = £100 net price.",
      },
      {
        question: "Why can't I just subtract the percentage?",
        answer:
          "VAT is added on top of the net price, so the gross price is 120% of the net (for a 20% rate). Subtracting 20% of the gross gives the wrong answer. You must divide, not subtract.",
      },
      {
        question: "Is the remove VAT formula the same for all countries?",
        answer:
          "The formula structure is the same — divide by (1 + rate). Only the rate changes by country: 20% for UK, 19% for Germany, 10% for Australia GST, and so on.",
      },
    ],
    seo: {
      title: "Remove VAT Calculator – Gross to Net Price Calculator | CalcBase",
      description:
        "Remove VAT from any gross price. Extract VAT and find the net amount instantly. Reverse VAT calculator for UK 20%, EU, GST rates. Divide by 1.2 made easy.",
      canonical: "/remove-vat",
    },
    keywords: [
      "remove vat", "remove vat calculator", "reverse vat calculator", "extract vat", "gross to net",
      "gross to net calculator", "vat exclusive calculator", "without vat", "divide by 1.2",
      "calculate vat from gross", "vat inclusive to exclusive", "subtract vat",
    ],
  },
  {
    slug: "margin-calculator",
    title: "Margin Calculator",
    shortDescription: "Calculate profit margin from revenue and cost. See profit and margin percentage.",
    longDescription:
      "Enter your revenue (selling price) and cost to calculate profit margin. This calculator shows your profit amount and margin percentage — essential for pricing decisions and financial analysis.",
    category: "pricing",
    relatedSlugs: ["markup-calculator", "margin-markup-converter", "break-even-calculator", "discount-calculator"],
    defaultInputs: { revenue: 100, cost: 60 },
    formula: "Profit = Revenue − Cost\nMargin % = (Profit ÷ Revenue) × 100",
    formulaExplanation:
      "Profit margin is the percentage of revenue that remains as profit after costs. It is calculated by dividing profit by revenue, not by cost. This is the key difference between margin and markup.",
    examples: [
      {
        title: "40% margin on a $100 product",
        description: "A product that sells for $100 and costs $60 to produce.",
        inputs: { Revenue: "$100", Cost: "$60" },
        result: "Profit = $40. Margin = 40%.",
      },
      {
        title: "Margin on a service contract",
        description: "A £5,000 consulting project with £3,250 in costs.",
        inputs: { Revenue: "£5,000", Cost: "£3,250" },
        result: "Profit = £1,750. Margin = 35%.",
      },
    ],
    faq: [
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin is profit as a percentage of revenue (selling price). Markup is profit as a percentage of cost. A 50% markup on a $100 cost gives a $150 selling price, but the margin is only 33.3%.",
      },
      {
        question: "What is a good profit margin?",
        answer:
          "This varies widely by industry. Retail margins are often 3–10%, while software companies may have 60–90% margins. Compare against your industry benchmarks for context.",
      },
      {
        question: "Can margin be negative?",
        answer:
          "Yes. A negative margin means you are selling below cost — your revenue does not cover your costs. This indicates a loss on each sale.",
      },
      {
        question: "How do I convert margin to markup (and vice versa)?",
        answer:
          "Margin to markup: Markup = Margin ÷ (1 − Margin). For example, a 25% margin equals a 33.3% markup. Markup to margin: Margin = Markup ÷ (1 + Markup). A 50% markup equals a 33.3% margin. They are always different numbers for the same transaction.",
      },
      {
        question: "What margin do I need to cover a discount?",
        answer:
          "Your maximum safe discount roughly equals your margin percentage. With a 30% margin you can discount up to 30% and still cover costs. But to maintain the same total profit, you need a disproportionate volume increase — a 20% discount on a 40% margin product requires 100% more sales to break even.",
      },
    ],
    seo: {
      title: "Profit Margin Calculator – Calculate Margin % Free | CalcBase",
      description:
        "Free profit margin calculator. Enter revenue and cost to find your gross profit margin percentage and profit amount. Learn the difference between margin and markup.",
      canonical: "/margin-calculator",
    },
    keywords: [
      "profit margin calculator", "margin calculator", "gross margin calculator", "gross profit margin calculator",
      "margin percentage calculator", "margin vs markup", "how to calculate profit margin",
      "what is a good profit margin", "net profit margin", "margin formula", "profit margin formula",
      "calculate margin from cost and price",
    ],
  },
  {
    slug: "markup-calculator",
    title: "Markup Calculator",
    shortDescription: "Calculate markup percentage from cost and selling price, or find the selling price from a target markup.",
    longDescription:
      "Determine your markup percentage based on cost and selling price, or set a target markup to find the right price. Markup is calculated on cost and is critical for retail and wholesale pricing.",
    category: "pricing",
    relatedSlugs: ["margin-calculator", "margin-markup-converter", "discount-calculator", "break-even-calculator"],
    defaultInputs: { cost: 60, sellingPrice: 100, mode: "fromPrice" },
    formula: "Markup % = ((Selling Price − Cost) ÷ Cost) × 100\nSelling Price = Cost × (1 + Markup % ÷ 100)",
    formulaExplanation:
      "Markup measures how much you increase the cost to arrive at your selling price. It is always calculated relative to cost, unlike margin which is relative to revenue.",
    examples: [
      {
        title: "Markup on a $60 item sold for $100",
        description: "A retailer buying a product for $60 and selling it for $100.",
        inputs: { Cost: "$60", "Selling price": "$100" },
        result: "Profit = $40. Markup = 66.67%.",
      },
      {
        title: "Finding selling price with 50% markup",
        description: "A wholesaler with a $80 cost wanting to apply a 50% markup.",
        inputs: { Cost: "$80", "Target markup": "50%" },
        result: "Selling price = $120. Profit = $40.",
      },
    ],
    faq: [
      {
        question: "How is markup different from margin?",
        answer:
          "Markup is calculated on cost: (Price − Cost) ÷ Cost. Margin is calculated on revenue: (Price − Cost) ÷ Price. The same transaction yields different percentages for each.",
      },
      {
        question: "What is a standard markup in retail?",
        answer:
          "Keystone pricing uses a 100% markup (doubling the cost). In practice, markups range from 20% to 100%+ depending on the industry, product type, and competitive landscape.",
      },
      {
        question: "Can markup exceed 100%?",
        answer:
          "Yes. A 200% markup means the selling price is 3× the cost. Luxury goods and specialty items commonly carry markups well over 100%.",
      },
      {
        question: "What is keystone markup?",
        answer:
          "Keystone markup (also called keystone pricing) is a 100% markup, which doubles the cost to set the selling price. If an item costs $50, the keystone selling price is $100. This is a common baseline in retail, though actual markups vary widely by product category.",
      },
    ],
    seo: {
      title: "Markup Calculator – Find Markup % or Selling Price | CalcBase",
      description:
        "Free markup calculator. Calculate markup percentage from cost and price, or find selling price from target markup. Includes markup-to-margin conversion table.",
      canonical: "/markup-calculator",
    },
    keywords: [
      "markup calculator", "markup percentage calculator", "how to calculate markup", "markup formula",
      "markup vs margin", "cost plus markup calculator", "retail markup calculator",
      "markup to margin converter", "keystone markup", "100 percent markup",
      "what is markup", "selling price calculator",
    ],
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    shortDescription: "Calculate the discount amount and final price after applying a percentage discount.",
    longDescription:
      "Enter the original price and discount percentage to see exactly how much you save and what the final price will be. Useful for sales, promotions, and comparing deals.",
    category: "pricing",
    relatedSlugs: ["vat-calculator", "margin-calculator", "markup-calculator", "break-even-calculator"],
    defaultInputs: { originalPrice: 100, discountPercent: 25 },
    formula: "Discount Amount = Original Price × (Discount % ÷ 100)\nFinal Price = Original Price − Discount Amount",
    formulaExplanation:
      "Multiply the original price by the discount rate to find the savings amount. Subtract that from the original price to get the final price you pay.",
    examples: [
      {
        title: "25% off a $200 item",
        description: "A $200 jacket on sale with a 25% discount.",
        inputs: { "Original price": "$200", "Discount": "25%" },
        result: "You save $50. Final price = $150.",
      },
      {
        title: "15% off a £79.99 subscription",
        description: "An annual software subscription with a 15% promotional discount.",
        inputs: { "Original price": "£79.99", "Discount": "15%" },
        result: "You save £12.00. Final price = £67.99.",
      },
    ],
    faq: [
      {
        question: "How do I calculate a percentage discount?",
        answer:
          "Multiply the original price by the discount percentage divided by 100. For 30% off $80: $80 × 0.30 = $24 discount. Final price = $80 − $24 = $56.",
      },
      {
        question: "Do multiple discounts stack?",
        answer:
          "Successive discounts are applied one after another, not added together. A 20% discount followed by a 10% discount on $100 gives $72 — not $70. Each discount applies to the reduced price.",
      },
      {
        question: "How do I find the original price from a discounted price?",
        answer:
          "Divide the final price by (1 − discount rate). If you paid $75 after a 25% discount: $75 ÷ 0.75 = $100 original price.",
      },
      {
        question: "What is 20 percent off a price?",
        answer:
          "To find 20% off, multiply the original price by 0.20 to get the discount amount, then subtract. For example, 20% off $80 = $80 × 0.20 = $16 discount. Final price = $80 − $16 = $64.",
      },
    ],
    seo: {
      title: "Discount Calculator – Percentage Off & Sale Price | CalcBase",
      description:
        "Free discount calculator. Enter original price and discount % to see savings and final sale price. Calculate 10%, 20%, 25%, 30%, 50% off any amount instantly.",
      canonical: "/discount-calculator",
    },
    keywords: [
      "discount calculator", "percentage off calculator", "percent off calculator", "sale price calculator",
      "discount percentage calculator", "how to calculate percentage off", "savings calculator",
      "what is 20 percent off", "what is 30 percent off", "calculate original price from discount",
      "double discount calculator", "discount formula", "percent off",
    ],
  },
  {
    slug: "margin-markup-converter",
    title: "Margin to Markup Converter",
    shortDescription: "Convert between margin and markup instantly. See the equivalent percentage and a full conversion table.",
    longDescription:
      "Confused by margin vs markup? Enter a margin percentage to see the equivalent markup, or enter a markup to see the equivalent margin. Includes a live conversion table for quick reference.",
    category: "pricing",
    relatedSlugs: ["margin-calculator", "markup-calculator", "break-even-calculator", "vat-calculator"],
    defaultInputs: { margin: 25 },
    formula: "Markup = Margin ÷ (1 − Margin)\nMargin = Markup ÷ (1 + Markup)",
    formulaExplanation:
      "Margin and markup describe the same profit from different perspectives. Margin is profit ÷ revenue; markup is profit ÷ cost. Since revenue = cost + profit, the two are always mathematically related but never equal (except at 0%).",
    examples: [
      {
        title: "25% margin to markup",
        description: "A business with a 25% profit margin wants to know the equivalent markup.",
        inputs: { "Margin": "25%" },
        result: "Markup = 33.33%. For every $1 of cost, you charge $1.33.",
      },
      {
        title: "50% markup to margin",
        description: "A retailer using a 50% markup wants to know the actual profit margin.",
        inputs: { "Markup": "50%" },
        result: "Margin = 33.33%. One-third of revenue is profit.",
      },
    ],
    faq: [
      {
        question: "Why are margin and markup different numbers?",
        answer:
          "Margin uses revenue as the denominator, markup uses cost. Since revenue is always larger than cost (when profitable), margin is always a smaller number than markup for the same transaction. A 50% markup equals only a 33.3% margin.",
      },
      {
        question: "When should I use margin vs markup?",
        answer:
          "Margin is standard in financial reporting and investor communication. Markup is common in retail pricing, purchasing, and cost-plus contracts. Use whichever your industry or audience expects, but always clarify which you mean.",
      },
      {
        question: "Can margin ever be higher than markup?",
        answer:
          "No. For any profitable sale, margin is always lower than markup. They are only equal at 0%. As margin approaches 100%, markup approaches infinity.",
      },
      {
        question: "What markup gives a 50% margin?",
        answer:
          "A 50% margin requires a 100% markup (doubling the cost). Use the formula: Markup = Margin ÷ (1 − Margin) = 0.50 ÷ 0.50 = 1.00 = 100%.",
      },
    ],
    seo: {
      title: "Margin to Markup Converter – Convert Instantly Free | CalcBase",
      description:
        "Free margin to markup converter. Convert profit margin to markup percentage and vice versa. Includes a full conversion table and formulas for margin vs markup.",
      canonical: "/margin-markup-converter",
    },
    keywords: [
      "margin to markup converter", "markup to margin converter", "margin vs markup",
      "margin to markup formula", "convert margin to markup", "markup to margin formula",
      "margin vs markup table", "margin markup difference", "margin to markup calculator",
      "what markup for 30 margin", "50 margin to markup",
    ],
  },
  {
    slug: "break-even-calculator",
    title: "Break-even Calculator",
    shortDescription: "Find out how many units you need to sell to cover your costs and start making profit.",
    longDescription:
      "Enter your fixed costs, variable cost per unit, and selling price per unit to find the break-even point. See exactly how many units you must sell — and the revenue needed — before your business turns profitable.",
    category: "business",
    relatedSlugs: ["margin-calculator", "markup-calculator", "vat-calculator", "discount-calculator"],
    defaultInputs: { fixedCosts: 10000, variableCostPerUnit: 25, sellingPricePerUnit: 50 },
    formula: "Break-even Units = Fixed Costs ÷ (Selling Price − Variable Cost per Unit)\nBreak-even Revenue = Break-even Units × Selling Price",
    formulaExplanation:
      "The break-even point is where total revenue equals total costs. Each unit sold contributes its selling price minus its variable cost toward covering fixed costs. Divide fixed costs by this contribution margin to find the number of units needed.",
    examples: [
      {
        title: "Coffee shop break-even",
        description: "A coffee shop with $5,000 monthly fixed costs, $1.50 cost per cup, and $4.50 selling price.",
        inputs: { "Fixed costs": "$5,000", "Variable cost": "$1.50", "Selling price": "$4.50" },
        result: "Break-even = 1,667 cups. Revenue needed = $7,501.50.",
      },
      {
        title: "SaaS product break-even",
        description: "A SaaS startup with £20,000 monthly costs, £5 variable cost per user, and £25 per month subscription.",
        inputs: { "Fixed costs": "£20,000", "Variable cost": "£5", "Selling price": "£25" },
        result: "Break-even = 1,000 subscribers. Revenue needed = £25,000.",
      },
    ],
    faq: [
      {
        question: "What are fixed costs?",
        answer:
          "Fixed costs remain constant regardless of output — rent, salaries, insurance, and equipment leases. They must be paid even if you sell zero units.",
      },
      {
        question: "What are variable costs?",
        answer:
          "Variable costs change with production volume — raw materials, packaging, shipping, and sales commissions. They increase as you produce and sell more units.",
      },
      {
        question: "What if selling price equals variable cost?",
        answer:
          "If the selling price equals (or is less than) the variable cost per unit, each sale contributes nothing (or loses money) toward covering fixed costs. Break-even is impossible — you need to raise prices or reduce variable costs.",
      },
      {
        question: "How can I lower my break-even point?",
        answer:
          "Reduce fixed costs, lower variable costs per unit, or increase the selling price. Each of these increases the contribution margin per unit and reduces the number of units needed to break even.",
      },
      {
        question: "What is contribution margin?",
        answer:
          "Contribution margin is the selling price per unit minus the variable cost per unit. It represents how much each unit sold contributes toward covering fixed costs. Once enough units are sold to cover all fixed costs, additional units generate pure profit.",
      },
      {
        question: "How do I calculate break-even revenue?",
        answer:
          "Break-even revenue = break-even units × selling price per unit. Alternatively: break-even revenue = fixed costs ÷ contribution margin ratio, where the ratio is (selling price − variable cost) ÷ selling price.",
      },
    ],
    seo: {
      title: "Break-even Calculator – Find Your Break-even Point Free | CalcBase",
      description:
        "Free break-even calculator. Enter fixed costs, variable costs, and price to find how many units to sell to break even. See contribution margin and revenue needed.",
      canonical: "/break-even-calculator",
    },
    keywords: [
      "break even calculator", "break-even calculator", "break even point calculator",
      "break even analysis calculator", "break even formula", "contribution margin calculator",
      "how to calculate break even point", "break even point formula", "how many units to break even",
      "break even revenue", "break even analysis", "fixed costs variable costs",
      "break even chart", "break even point",
    ],
  },
];

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getRelatedCalculators(slug: string): CalculatorConfig[] {
  const calc = getCalculator(slug);
  if (!calc) return [];
  return calc.relatedSlugs
    .map((s) => getCalculator(s))
    .filter((c): c is CalculatorConfig => c !== undefined);
}

export function getCalculatorsByCategory(category: CalculatorConfig["category"]): CalculatorConfig[] {
  return calculators.filter((c) => c.category === category);
}

export function searchCalculators(query: string): CalculatorConfig[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return calculators;
  return calculators.filter(
    (c) =>
      c.title.toLowerCase().includes(lower) ||
      c.shortDescription.toLowerCase().includes(lower) ||
      c.keywords.some((k) => k.includes(lower)),
  );
}
