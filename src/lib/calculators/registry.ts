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

export interface SalesTaxPreset {
  state: string;
  rate: number;
  label: string;
}

export const US_SALES_TAX_PRESETS: SalesTaxPreset[] = [
  { state: "California", rate: 7.25, label: "California (7.25%)" },
  { state: "Texas", rate: 6.25, label: "Texas (6.25%)" },
  { state: "New York", rate: 4, label: "New York (4%)" },
  { state: "Florida", rate: 6, label: "Florida (6%)" },
  { state: "Illinois", rate: 6.25, label: "Illinois (6.25%)" },
  { state: "Pennsylvania", rate: 6, label: "Pennsylvania (6%)" },
  { state: "Ohio", rate: 5.75, label: "Ohio (5.75%)" },
  { state: "Georgia", rate: 4, label: "Georgia (4%)" },
  { state: "Washington", rate: 6.5, label: "Washington (6.5%)" },
  { state: "New Jersey", rate: 6.625, label: "New Jersey (6.625%)" },
  { state: "Michigan", rate: 6, label: "Michigan (6%)" },
  { state: "Colorado", rate: 2.9, label: "Colorado (2.9%)" },
  { state: "Oregon", rate: 0, label: "Oregon (0% – no sales tax)" },
  { state: "Montana", rate: 0, label: "Montana (0% – no sales tax)" },
  { state: "Delaware", rate: 0, label: "Delaware (0% – no sales tax)" },
  { state: "New Hampshire", rate: 0, label: "New Hampshire (0% – no sales tax)" },
];

export const calculators: CalculatorConfig[] = [
  {
    slug: "vat-calculator",
    title: "VAT Calculator",
    shortDescription: "Add or remove VAT from any amount instantly. Supports UK, EU, and international VAT rates.",
    longDescription:
      "Calculate Value Added Tax for any country. Add VAT to a net amount or extract VAT from a gross price. Choose from preset rates for the UK, EU, Australia, Canada, and more — or enter a custom rate.",
    category: "vat",
    relatedSlugs: ["add-vat", "remove-vat", "sales-tax-calculator", "gst-calculator", "margin-calculator", "discount-calculator"],
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
    relatedSlugs: ["vat-calculator", "remove-vat", "gst-calculator", "markup-calculator", "margin-calculator"],
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
    relatedSlugs: ["vat-calculator", "add-vat", "gst-calculator", "discount-calculator", "margin-calculator"],
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
    relatedSlugs: ["markup-calculator", "profit-calculator", "margin-markup-converter", "break-even-calculator", "percentage-calculator", "percentage-change-calculator"],
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
    relatedSlugs: ["vat-calculator", "margin-calculator", "markup-calculator", "break-even-calculator", "percentage-calculator"],
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
    relatedSlugs: ["margin-calculator", "roi-calculator", "profit-calculator", "markup-calculator"],
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
  {
    slug: "roi-calculator",
    title: "ROI Calculator",
    shortDescription: "Calculate return on investment. See your ROI percentage and net profit instantly.",
    longDescription:
      "Enter the total investment cost and the gain (or current value) to find your return on investment. This calculator shows the ROI percentage and net profit — essential for evaluating business decisions, marketing campaigns, and investment opportunities.",
    category: "business",
    relatedSlugs: ["profit-calculator", "break-even-calculator", "margin-calculator", "commission-calculator", "percentage-change-calculator"],
    defaultInputs: { investment: 10000, gain: 15000 },
    formula: "Net Profit = Gain − Investment\nROI % = (Net Profit ÷ Investment) × 100",
    formulaExplanation:
      "ROI measures the efficiency of an investment. Subtract the cost from the gain to find net profit, then divide by the original investment and multiply by 100 to express it as a percentage.",
    examples: [
      {
        title: "Marketing campaign ROI",
        description: "A business spends $5,000 on ads and generates $12,000 in revenue.",
        inputs: { Investment: "$5,000", "Total return": "$12,000" },
        result: "Net profit = $7,000. ROI = 140%.",
      },
      {
        title: "Equipment purchase ROI",
        description: "A £20,000 machine generates £28,000 in additional revenue over its lifetime.",
        inputs: { Investment: "£20,000", "Total return": "£28,000" },
        result: "Net profit = £8,000. ROI = 40%.",
      },
    ],
    faq: [
      {
        question: "What is a good ROI?",
        answer:
          "A good ROI depends on context. In the stock market, 7–10% annual ROI is considered average. For marketing campaigns, 500%+ ROI (5:1 ratio) is a common benchmark. For real estate, 8–12% is typical. Always compare ROI within the same category.",
      },
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. A negative ROI means you lost money — the gain was less than the investment. For example, investing $1,000 and getting back $800 gives an ROI of −20%.",
      },
      {
        question: "What is the difference between ROI and profit margin?",
        answer:
          "ROI measures the return relative to the investment cost. Profit margin measures the profit relative to revenue. ROI tells you how efficiently your money was used; margin tells you how much of each sale is profit.",
      },
      {
        question: "How do I calculate ROI on a marketing campaign?",
        answer:
          "Subtract the total campaign cost from the revenue it generated, then divide by the campaign cost. If a $2,000 campaign generates $10,000: ($10,000 − $2,000) ÷ $2,000 = 400% ROI.",
      },
    ],
    seo: {
      title: "ROI Calculator – Calculate Return on Investment Free | CalcBase",
      description:
        "Free ROI calculator. Enter investment cost and gain to calculate return on investment percentage and net profit. Evaluate marketing, business, and investment ROI.",
      canonical: "/roi-calculator",
    },
    keywords: [
      "roi calculator", "return on investment calculator", "roi formula", "calculate roi",
      "marketing roi calculator", "investment return calculator", "how to calculate roi",
      "roi percentage calculator", "what is a good roi", "roi calculator free",
      "return on investment formula", "business roi calculator",
    ],
  },
  {
    slug: "profit-calculator",
    title: "Profit Calculator",
    shortDescription: "Calculate profit, selling price, and margins from cost and revenue. Three flexible input modes.",
    longDescription:
      "Find your profit amount, selling price, margin percentage, and markup from any combination of inputs. Enter cost and revenue, cost and target margin, or cost and target markup — the calculator shows everything you need for pricing decisions.",
    category: "pricing",
    relatedSlugs: ["margin-calculator", "markup-calculator", "roi-calculator", "break-even-calculator"],
    defaultInputs: { cost: 60, revenue: 100, mode: "fromRevenue" },
    formula: "Profit = Revenue − Cost\nMargin % = (Profit ÷ Revenue) × 100\nMarkup % = (Profit ÷ Cost) × 100",
    formulaExplanation:
      "Profit is the difference between what you sell for and what it costs. Margin expresses that profit as a percentage of revenue; markup expresses it as a percentage of cost. Both describe the same profit from different perspectives.",
    examples: [
      {
        title: "Profit from a $100 sale",
        description: "A product that costs $60 to produce is sold for $100.",
        inputs: { Cost: "$60", Revenue: "$100" },
        result: "Profit = $40. Margin = 40%. Markup = 66.67%.",
      },
      {
        title: "Setting price from a 30% margin target",
        description: "A product costs £50 and you need a 30% margin.",
        inputs: { Cost: "£50", "Target margin": "30%" },
        result: "Selling price = £71.43. Profit = £21.43.",
      },
    ],
    faq: [
      {
        question: "How do I calculate profit?",
        answer:
          "Subtract the total cost from the total revenue. If you sell a product for $100 and it costs $60, your profit is $40.",
      },
      {
        question: "What is the difference between gross and net profit?",
        answer:
          "Gross profit is revenue minus the direct cost of goods sold. Net profit subtracts all expenses (rent, salaries, taxes, etc.). This calculator focuses on gross profit.",
      },
      {
        question: "How do I find selling price from a target margin?",
        answer:
          "Divide the cost by (1 − margin as decimal). For a 30% margin on a $50 cost: $50 ÷ 0.70 = $71.43 selling price.",
      },
      {
        question: "Is profit the same as margin?",
        answer:
          "No. Profit is an absolute amount (e.g. $40). Margin is profit expressed as a percentage of revenue (e.g. 40%). A high margin on a small sale can mean less total profit than a low margin on a large sale.",
      },
    ],
    seo: {
      title: "Profit Calculator – Calculate Profit & Selling Price | CalcBase",
      description:
        "Free profit calculator. Find profit, margin, and markup from cost and revenue. Set target margins to find the right selling price. Three flexible input modes.",
      canonical: "/profit-calculator",
    },
    keywords: [
      "profit calculator", "profit margin calculator", "how to calculate profit",
      "selling price calculator", "profit formula", "gross profit calculator",
      "calculate profit from cost and price", "profit percentage calculator",
      "how much profit calculator", "price from margin calculator",
    ],
  },
  {
    slug: "sales-tax-calculator",
    title: "Sales Tax Calculator",
    shortDescription: "Calculate US sales tax for any amount. Includes state tax rate presets.",
    longDescription:
      "Enter a price and sales tax rate to see the tax amount and total price. Choose from preset US state tax rates or enter a custom rate. Useful for shopping, invoicing, and comparing prices across states.",
    category: "vat",
    relatedSlugs: ["vat-calculator", "add-vat", "remove-vat", "gst-calculator", "discount-calculator", "roi-calculator"],
    defaultInputs: { price: 100, rate: 7.25 },
    formula: "Sales Tax = Price × (Tax Rate ÷ 100)\nTotal Price = Price + Sales Tax",
    formulaExplanation:
      "In the US, sales tax is added on top of the listed price at the point of sale. Multiply the pre-tax price by the sales tax rate to find the tax amount, then add it to get the total.",
    examples: [
      {
        title: "California sales tax on a $50 purchase",
        description: "Buying a $50 item in California with a 7.25% state sales tax.",
        inputs: { Price: "$50", "Sales tax rate": "7.25%" },
        result: "Sales tax = $3.63. Total price = $53.63.",
      },
      {
        title: "Comparing prices across states",
        description: "A $500 laptop purchased in Oregon (0%) vs New York (4% state + local).",
        inputs: { Price: "$500", "Tax rate": "8%" },
        result: "In NY: $40 tax, $540 total. In Oregon: $0 tax, $500 total.",
      },
    ],
    faq: [
      {
        question: "How is sales tax different from VAT?",
        answer:
          "Sales tax is charged only at the final point of sale to the consumer. VAT is collected at every stage of production and distribution. Sales tax is used in the US; VAT is used in the UK, EU, and most other countries.",
      },
      {
        question: "Which US states have no sales tax?",
        answer:
          "Five states have no statewide sales tax: Oregon, Montana, Delaware, New Hampshire, and Alaska. However, Alaska allows local jurisdictions to impose sales tax.",
      },
      {
        question: "Does sales tax apply to online purchases?",
        answer:
          "Yes, in most cases. Since the 2018 Supreme Court ruling (South Dakota v. Wayfair), states can require online retailers to collect sales tax even if they have no physical presence in the state.",
      },
      {
        question: "Why do sales tax rates vary so much?",
        answer:
          "US sales tax is set at the state, county, and city level. State rates range from 0% to 7.25%, and local surcharges can add 1–5% more. The total combined rate varies by exact location.",
      },
    ],
    seo: {
      title: "Sales Tax Calculator – US State Sales Tax Calculator | CalcBase",
      description:
        "Free US sales tax calculator. Enter price and tax rate to find sales tax and total. Includes all US state tax rates. Compare prices across states instantly.",
      canonical: "/sales-tax-calculator",
    },
    keywords: [
      "sales tax calculator", "us sales tax calculator", "sales tax calculator by state",
      "calculate sales tax", "sales tax formula", "how to calculate sales tax",
      "state sales tax rates", "sales tax rate calculator", "total price with tax",
      "tax calculator usa", "sales tax vs vat", "reverse sales tax calculator",
    ],
  },
  {
    slug: "commission-calculator",
    title: "Commission Calculator",
    shortDescription: "Calculate sales commission earned and net amount. Supports percentage-based commissions.",
    longDescription:
      "Enter the total sales amount and commission rate to find the commission earned and the remaining net amount. Useful for sales professionals, real estate agents, freelancers, and affiliate marketers.",
    category: "business",
    relatedSlugs: ["profit-calculator", "roi-calculator", "margin-calculator", "discount-calculator"],
    defaultInputs: { salesAmount: 50000, commissionRate: 5 },
    formula: "Commission = Sales Amount × (Commission Rate ÷ 100)\nNet Amount = Sales Amount − Commission",
    formulaExplanation:
      "Multiply the total sales amount by the commission rate to find the commission earned. The net amount is what remains after the commission is paid.",
    examples: [
      {
        title: "Real estate agent commission",
        description: "A 6% commission on a $350,000 home sale.",
        inputs: { "Sales amount": "$350,000", "Commission rate": "6%" },
        result: "Commission = $21,000. Net to seller = $329,000.",
      },
      {
        title: "Sales rep monthly commission",
        description: "A sales rep earning 8% on £25,000 in monthly sales.",
        inputs: { "Sales amount": "£25,000", "Commission rate": "8%" },
        result: "Commission earned = £2,000. Net to company = £23,000.",
      },
    ],
    faq: [
      {
        question: "What is a typical sales commission rate?",
        answer:
          "Commission rates vary by industry. Real estate agents typically earn 5–6%, SaaS sales reps 8–12%, retail salespeople 1–5%, and affiliate marketers 5–30%. Rates depend on the product value and sales cycle length.",
      },
      {
        question: "How do tiered commissions work?",
        answer:
          "Tiered commissions increase the rate as sales volume grows. For example: 5% on the first $50,000, 8% on sales above $50,000. This calculator uses a flat rate; for tiered commissions, calculate each tier separately.",
      },
      {
        question: "Is commission calculated on revenue or profit?",
        answer:
          "Most commissions are calculated on revenue (the total sale amount). Some businesses calculate on gross profit instead, which incentivizes higher-margin sales. Always clarify the commission base.",
      },
      {
        question: "What is the difference between commission and markup?",
        answer:
          "Commission is a percentage paid to a salesperson or intermediary. Markup is the percentage added to cost to set the selling price. They serve different purposes: commission compensates salespeople; markup determines pricing.",
      },
    ],
    seo: {
      title: "Commission Calculator – Sales Commission Calculator Free | CalcBase",
      description:
        "Free commission calculator. Calculate sales commission earned and net amount from any sale. Includes real estate, sales rep, and affiliate commission examples.",
      canonical: "/commission-calculator",
    },
    keywords: [
      "commission calculator", "sales commission calculator", "commission rate calculator",
      "real estate commission calculator", "how to calculate commission",
      "commission percentage calculator", "sales rep commission calculator",
      "affiliate commission calculator", "commission formula",
      "calculate commission on sales", "commission earned calculator",
    ],
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    shortDescription: "Find X% of a number, calculate what percentage one number is of another, or reverse-calculate the whole from a known part.",
    longDescription:
      "Three percentage modes in one tool: find what X% of any number equals, calculate what percentage one value is of another, or work backwards to find the original total when you know the part and the rate. Every result shows the formula so you can verify the math.",
    category: "business",
    relatedSlugs: ["percentage-change-calculator", "discount-calculator", "margin-calculator", "markup-calculator", "roi-calculator"],
    defaultInputs: { percent: 15, total: 200, mode: "find-amount" },
    formula: "Amount = Total × (Percent ÷ 100)\nPercent = (Part ÷ Total) × 100\nWhole = Part ÷ (Percent ÷ 100)",
    formulaExplanation:
      "All three percentage calculations use the same relationship: Percent × Total = Part × 100. Rearrange for what you need: to find the amount multiply total by the rate; to find the rate divide part by total; to find the whole divide part by the rate.",
    examples: [
      {
        title: "What is 15% of $200?",
        description: "A sales rep earning a 15% commission on a $200 sale.",
        inputs: { Percent: "15%", Total: "$200" },
        result: "15% of $200 = $30.",
      },
      {
        title: "45 is what percent of 180?",
        description: "A business made $45 profit on a $180 sale — what is the margin?",
        inputs: { Part: "45", Total: "180" },
        result: "45 is 25% of 180.",
      },
      {
        title: "30 is 12%, what is the whole?",
        description: "A discount of $30 represents 12% off — what was the original price?",
        inputs: { Part: "$30", Percent: "12%" },
        result: "The whole = $250.",
      },
    ],
    faq: [
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percentage divided by 100. For example, 15% of 200 = 200 × 0.15 = 30. This works for any percentage and any number.",
      },
      {
        question: "How do I find what percentage one number is of another?",
        answer:
          "Divide the part by the whole, then multiply by 100. For example, 45 out of 180 = (45 ÷ 180) × 100 = 25%. This is also the formula for profit margin when part is profit and whole is revenue.",
      },
      {
        question: "How do I find the original number before a percentage was taken?",
        answer:
          "Divide the known part by the percentage rate (as a decimal). If 30 represents 12% of something: 30 ÷ 0.12 = 250. This is the reverse percentage calculation.",
      },
      {
        question: "What is the difference between percentage and percentage points?",
        answer:
          "A percentage is a proportion of a total. A percentage point is the arithmetic difference between two percentages. If a rate goes from 10% to 15%, it increased by 5 percentage points, but by 50% as a relative change.",
      },
      {
        question: "How do I calculate percentage increase or decrease?",
        answer:
          "Use the Percentage Change Calculator for increases and decreases. The formula is: ((new − old) ÷ old) × 100. A positive result is an increase; a negative result is a decrease.",
      },
    ],
    seo: {
      title: "Percentage Calculator – What is X% of Y? | CalcBase",
      description:
        "Free percentage calculator. Find what X% of a number is, calculate what percentage one number is of another, or reverse-calculate the whole. Instant results with formula.",
      canonical: "/percentage-calculator",
    },
    keywords: [
      "percentage calculator", "what is 15 percent of 200", "percent of calculator",
      "how to calculate percentage", "percentage formula", "x is what percent of y",
      "percentage calculator online", "calculate percentage of number", "reverse percentage calculator",
      "find the whole from percentage", "percent calculator", "percentage of a number",
    ],
  },
  {
    slug: "percentage-change-calculator",
    title: "Percentage Change Calculator",
    shortDescription: "Calculate the percentage increase or decrease between two numbers, or find the new value after applying a percentage change.",
    longDescription:
      "Two modes: find the exact percentage change between any two values (increase or decrease), or apply a known percentage change to calculate the resulting value. Used for tracking price changes, growth rates, discounts, and performance metrics.",
    category: "business",
    relatedSlugs: ["percentage-calculator", "roi-calculator", "discount-calculator", "margin-calculator", "profit-calculator"],
    defaultInputs: { from: 80, to: 100, mode: "find-change" },
    formula: "Percentage Change = ((New − Old) ÷ |Old|) × 100\nNew Value = Old Value × (1 + Change% ÷ 100)",
    formulaExplanation:
      "To find the percentage change, subtract the old value from the new, divide by the absolute value of the old, and multiply by 100. A positive result means increase; negative means decrease. To apply a change, multiply the original value by (1 + rate).",
    examples: [
      {
        title: "Price increase from $80 to $100",
        description: "A product's price changed from $80 to $100 — what is the percentage increase?",
        inputs: { "Old value": "$80", "New value": "$100" },
        result: "Percentage increase = 25%.",
      },
      {
        title: "Salary after 8% raise",
        description: "A £42,000 salary after an 8% pay rise.",
        inputs: { "Original value": "£42,000", "Change": "+8%" },
        result: "New salary = £45,360.",
      },
      {
        title: "Stock dropped from $250 to $200",
        description: "A stock price declined — what is the percentage loss?",
        inputs: { "Old price": "$250", "New price": "$200" },
        result: "Percentage decrease = −20%.",
      },
    ],
    faq: [
      {
        question: "What is the formula for percentage change?",
        answer:
          "Percentage change = ((New Value − Old Value) ÷ |Old Value|) × 100. A positive result means the value increased; a negative result means it decreased. Always divide by the original (old) value, not the new one.",
      },
      {
        question: "How do I calculate a percentage increase?",
        answer:
          "Subtract the original value from the new value, divide by the original, and multiply by 100. For example, from 80 to 100: (100 − 80) ÷ 80 × 100 = 25% increase.",
      },
      {
        question: "How do I calculate a percentage decrease?",
        answer:
          "Same formula as percentage increase — the result will simply be negative. For example, from 100 to 75: (75 − 100) ÷ 100 × 100 = −25% (a 25% decrease).",
      },
      {
        question: "What is the difference between percentage change and percentage points?",
        answer:
          "Percentage change is relative: from 20% to 25% is a 25% change ((25−20)÷20×100). Percentage points measure the absolute difference: 25% − 20% = 5 percentage points. These are very different and often confused.",
      },
      {
        question: "How do I reverse a percentage change to find the original value?",
        answer:
          "If you know the current value and the percentage change, divide by (1 + change/100). For example, a value is now $120 after a 20% increase: $120 ÷ 1.20 = $100 original. Use the Remove VAT or Reverse Percentage calculator for this.",
      },
      {
        question: "How is percentage change different from ROI?",
        answer:
          "ROI (Return on Investment) uses the same percentage change formula but is specifically applied to financial returns: (Gain − Investment) ÷ Investment × 100. Percentage change is the general-purpose version of that same calculation.",
      },
    ],
    seo: {
      title: "Percentage Change Calculator – Increase & Decrease | CalcBase",
      description:
        "Free percentage change calculator. Calculate % increase or decrease between two numbers, or apply a change to find the new value. Includes percent increase and decrease formula.",
      canonical: "/percentage-change-calculator",
    },
    keywords: [
      "percentage change calculator", "percent change calculator", "percentage increase calculator",
      "percentage decrease calculator", "how to calculate percentage change", "percent increase formula",
      "percentage change formula", "calculate percent increase", "percent difference calculator",
      "percentage growth calculator", "price change percentage", "percent change formula",
    ],
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator",
    shortDescription: "Add or remove GST from any amount. Supports Australia (10%), New Zealand (15%), Canada (5%), India (18%), and more.",
    longDescription:
      "Calculate Goods and Services Tax (GST) for Australia, New Zealand, Canada, India, Singapore and other GST countries. Add GST to a net (ex-GST) price, or remove GST from a GST-inclusive amount to find the original price. Free, accurate, and instant.",
    category: "vat",
    relatedSlugs: ["vat-calculator", "add-vat", "remove-vat", "sales-tax-calculator", "percentage-calculator"],
    defaultInputs: { amount: 100, rate: 10, mode: "add" },
    formula: "GST Amount = Net Amount × (GST Rate ÷ 100)\nGross Amount = Net Amount + GST Amount\nNet Amount = Gross Amount ÷ (1 + GST Rate ÷ 100)",
    formulaExplanation:
      "GST works identically to VAT: to add GST, multiply the net amount by the GST rate and add it to the net. To remove (extract) GST from an inclusive price, divide by (1 + GST rate as decimal). For Australia's 10% GST, that means dividing by 1.10.",
    examples: [
      {
        title: "Adding 10% GST in Australia",
        description: "An Australian contractor invoicing A$1,500 before GST.",
        inputs: { "Net amount": "A$1,500", "GST rate": "10%" },
        result: "GST = A$150. Total inc. GST = A$1,650.",
      },
      {
        title: "Removing 15% GST in New Zealand",
        description: "Finding the pre-GST price of a NZ$230 product.",
        inputs: { "GST-inclusive price": "NZ$230", "GST rate": "15%" },
        result: "Net price = NZ$200.00. GST included = NZ$30.00.",
      },
      {
        title: "Adding 5% GST in Canada",
        description: "A Canadian freelancer adding federal GST to a C$800 invoice.",
        inputs: { "Net amount": "C$800", "GST rate": "5%" },
        result: "GST = C$40. Total = C$840.",
      },
    ],
    faq: [
      {
        question: "What is GST?",
        answer:
          "GST (Goods and Services Tax) is a value-added tax on most goods and services sold domestically. It is equivalent to VAT in the UK and EU. Countries using GST include Australia (10%), New Zealand (15%), Canada (5% federal), India (5–28%), and Singapore (9%).",
      },
      {
        question: "What is the GST rate in Australia?",
        answer:
          "Australia's standard GST rate is 10%, introduced in July 2000. It applies to most goods and services. Some items are GST-free, including most fresh food, medical services, and educational courses.",
      },
      {
        question: "What is the GST rate in New Zealand?",
        answer:
          "New Zealand's GST rate is 15%. Unlike Australia, New Zealand has very few exemptions — GST applies to almost all goods and services including food.",
      },
      {
        question: "What is the GST rate in Canada?",
        answer:
          "Canada's federal GST rate is 5%. Several provinces also charge a provincial sales tax (PST) or a Harmonized Sales Tax (HST) that combines federal and provincial rates. For example, Ontario's HST is 13% (5% federal + 8% provincial).",
      },
      {
        question: "How do I remove GST from a price that includes GST?",
        answer:
          "Divide the GST-inclusive price by (1 + GST rate as decimal). For Australia's 10%: divide by 1.10. For New Zealand's 15%: divide by 1.15. For example, A$110 ÷ 1.10 = A$100 ex-GST.",
      },
      {
        question: "Is GST the same as VAT?",
        answer:
          "Yes — GST and VAT are economically identical taxes. Both are collected at each stage of the supply chain, and the end consumer bears the full cost. The name differs by country. The UK and EU use 'VAT'; Australia, NZ, Canada, and India use 'GST'.",
      },
    ],
    seo: {
      title: "GST Calculator – Add or Remove GST (Australia, NZ, Canada) | CalcBase",
      description:
        "Free GST calculator. Add GST to a net price or remove GST from an inclusive amount. Supports Australia 10%, New Zealand 15%, Canada 5%, India 18%, Singapore 9%. Instant results.",
      canonical: "/gst-calculator",
    },
    keywords: [
      "gst calculator", "gst calculator australia", "gst calculator nz", "gst calculator canada",
      "add gst", "remove gst", "gst inclusive calculator", "gst exclusive calculator",
      "how to calculate gst", "gst formula", "australian gst calculator", "new zealand gst calculator",
      "canadian gst calculator", "gst rate", "gst calculator online free",
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
