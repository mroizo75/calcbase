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
    slug: "price-builder",
    title: "Price Builder",
    shortDescription: "Set a price that still hits your margin after VAT, platform fees, and payment fees.",
    longDescription:
      `You know the cost of the product. You know the margin you want. What you do not know, until the fees come out, is the price that actually leaves you that margin. VAT, an Etsy or Amazon percentage, and a card fee each take a slice, and a discount takes another. Price Builder does that sum in one place, in either direction.

Ask what you should charge, and it returns the price excluding VAT, the VAT, and what the customer pays. Ask what you make at a price you already have, and it returns the margin that is left. Up to three scenarios sit side by side, so you can test a discount or another channel without starting again.

The platform presets are filled from the fee pages linked next to them, and you can edit every figure. A fee changes when the platform says it changes. The breakdown shows the path from the customer's payment to your profit, so you can see which line ate the margin.`,
    category: "pricing",
    relatedSlugs: ["margin-calculator", "markup-calculator", "vat-calculator", "discount-calculator", "profit-calculator"],
    defaultInputs: { cost: 8, margin: 35, vat: 20 },
    formula:
      "Net price after discount = (unit costs + fixed fees) ÷ (1 − target margin − percentage fees on the net price)\nA fee charged on the VAT-inclusive price is multiplied by (1 + the VAT rate) first, so it is measured on the net price.\nCustomer pays = net price × (1 + VAT rate) when you are VAT-registered. If you are not, the customer pays the net price and no VAT is added.",
    formulaExplanation:
      "Margin is profit divided by the price excluding VAT. Profit is that price minus unit cost, shipping, other per-unit costs, the platform fee, and the payment fee. VAT is not profit: if you are registered you collect it and pass it on. Fixed fees are added to the costs before dividing, because they do not shrink when the price shrinks. If the margin plus the percentage fees use the whole price, no selling price can hit the target.",
    examples: [
      {
        title: "Etsy seller, 35% margin, UK VAT",
        description:
          "A UK seller lists a mug that costs £8 to make and £3.50 to post. They are VAT-registered and want a 35% margin after Etsy's transaction fee, regulatory operating fee, and payment processing. Fees verified 21 October 2026.",
        inputs: {
          "Unit cost": "£8.00",
          "Shipping": "£3.50",
          "Platform fee": "6.98% of the VAT-inclusive price",
          "Payment fee": "4% + £0.20 of the VAT-inclusive price",
          "VAT": "20%",
          "Target margin": "35%",
        },
        result:
          "Price excluding VAT £22.57. VAT £4.51. Customer pays £27.08. Platform fee £1.89. Payment fee £1.28. Costs £11.50. Profit £7.90. Margin 35%. Markup 68.7%.",
      },
      {
        title: "Amazon UK footwear, 25% margin",
        description:
          "A VAT-registered seller sends a pair of shoes that cost £12, plus £2.50 postage. Amazon's footwear referral fee is 15% of the amount the buyer pays. The £0.25 minimum and the selling-plan fee are not in this example. Fee verified 21 October 2026.",
        inputs: {
          "Unit cost": "£12.00",
          "Shipping": "£2.50",
          "Referral fee": "15% of the VAT-inclusive price",
          "VAT": "20%",
          "Target margin": "25%",
        },
        result:
          "Price excluding VAT £25.44. VAT £5.09. Customer pays £30.53. Platform fee £4.58. Costs £14.50. Profit £6.36. Margin 25%. Markup 43.86%.",
      },
      {
        title: "Freelancer, digital file, not VAT-registered",
        description:
          "A freelancer who is not VAT-registered sells a digital download. The cost they count per sale is £15. The buyer pays by a standard UK card through Stripe, at 1.5% + 20p. No VAT is added, and the VAT in their tools cannot be reclaimed. Fee verified 21 October 2026.",
        inputs: {
          "Other per-unit cost": "£15.00",
          "Payment fee": "1.5% + £0.20",
          "VAT registered": "No",
          "Target margin": "50%",
        },
        result:
          "Price excluding VAT £31.34. VAT £0.00. Customer pays £31.34. Payment fee £0.67. Costs £15.00. Profit £15.67. Margin 50%. Markup 104.47%. A 50% margin is not a 50% markup.",
      },
    ],
    faq: [
      {
        question: "Why is my margin lower once Etsy or Amazon takes a fee?",
        answer:
          "The fee comes off the price, and a percentage fee also grows as the price grows. A 35% margin target plus a fee on the VAT-inclusive price needs a higher price than cost divided by 0.65. Price Builder puts the fee on the correct side of VAT before it solves for the price.",
      },
      {
        question: "I think in markup. Will a 40% markup give me a 40% margin?",
        answer:
          "No. Markup is profit divided by cost. Margin is profit divided by the price excluding VAT. A 40% markup is a 28.6% margin. If you type 40 into the margin field, the note under the result says so.",
      },
      {
        question: "What changes if I am not VAT-registered?",
        answer:
          "The price the customer pays has no VAT added. You also cannot reclaim VAT on the unit cost, postage, or materials, so enter those costs as the full amount you paid. The tool says this next to the result whenever VAT-registered is off.",
      },
      {
        question: "Does a preset include every fee the platform charges?",
        answer:
          "No. Each preset states what it includes and what it leaves out, and links to the official page. Amazon and eBay rates depend on the category, so those presets name the category. Shopify's monthly plan, Amazon's selling plan, Etsy's listing fee, and Offsite Ads are not in the percentage.",
      },
      {
        question: "Why does it say the target margin is impossible?",
        answer:
          "Percentage fees and the margin both have to fit inside the price. When they add up to 100% or more, there is nothing left for the product cost, however high you set the price. Lower the margin, or the fee, before a price exists.",
      },
      {
        question: "What does a discount do to the price I need to charge?",
        answer:
          "The margin is worked out on the price the customer actually pays. A 15% discount means the listed price has to be higher if you still want the same margin after the discount. Add a scenario and change only the discount to see the difference.",
      },
    ],
    seo: {
      title: "Price Builder – Keep Your Margin After VAT and Fees",
      description:
        "Set the price that still hits your margin after VAT, platform fees and card fees. For UK and US sellers and freelancers. See where every pound goes next.",
      canonical: "/price-builder",
    },
    keywords: [
      "price builder", "pricing calculator", "margin after fees", "etsy fees calculator",
      "amazon seller fees", "vat pricing", "what price should I charge",
    ],
  },
  {
    slug: "vat-calculator",
    title: "VAT Calculator",
    shortDescription: "Add or remove VAT from any amount instantly. Supports UK, EU, and international VAT rates.",
    longDescription:
      `Value Added Tax (VAT) is charged on most goods and services at each stage of the supply chain. Unlike US sales tax — which is only applied at the final point of sale — VAT is collected incrementally by every business in the production and distribution chain. Each business pays VAT on its inputs, charges VAT on its outputs, and remits the difference to the tax authority. Understanding how VAT works is essential for anyone running a business, managing invoices, or tracking business expenses.

This calculator works in both directions. To add VAT, enter the net amount (the price before tax) and select your VAT rate — the calculator shows the VAT amount and the gross total you charge customers. To remove VAT from a gross (VAT-inclusive) price, switch to remove mode; the calculator extracts the VAT component and returns the original net price. Preset rates are provided for the UK (standard 20%, reduced 5%, zero 0%), major EU countries, Australian GST (10%), Canadian GST (5%), New Zealand GST (15%), and more.

Whether you are preparing invoices, checking receipts, pricing products for international markets, or reclaiming business expenses, this tool handles the arithmetic instantly. The formula is always displayed alongside the result so you can verify the calculation yourself and understand the logic behind it. Choose from preset country rates or enter any custom rate for less common jurisdictions.`,
    category: "vat",
    relatedSlugs: ["price-builder", "add-vat", "remove-vat", "margin-calculator", "discount-calculator"],
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
          "VAT (Value Added Tax) is a consumption tax placed on goods and services at each stage of production or distribution. It is used in over 160 countries, including the UK and EU. In the US, the equivalent is sales tax, which works differently — it is only collected at the final point of sale to the consumer.",
      },
      {
        question: "How do I add VAT to a price?",
        answer:
          "Multiply the net price by the VAT rate (e.g. 20% = 0.20), then add that to the net price. For example, £100 × 0.20 = £20 VAT, making the gross price £120. Alternatively, multiply the net price by (1 + rate): £100 × 1.20 = £120.",
      },
      {
        question: "How do I remove VAT from a gross price?",
        answer:
          "Divide the gross price by (1 + VAT rate). For a 20% rate: divide by 1.20. For example, £120 ÷ 1.20 = £100 net. Do not subtract 20% of the gross — that gives the wrong answer because VAT was added on top of the net, not on top of itself.",
      },
      {
        question: "What is the current UK VAT rate?",
        answer:
          "The standard UK VAT rate is 20%. A reduced rate of 5% applies to some goods and services such as home energy and certain renovation works. Some items such as most food, children's clothing, and books are zero-rated at 0%. Always check HMRC guidance for your specific product or service.",
      },
      {
        question: "Is VAT the same as sales tax?",
        answer:
          "No. VAT is collected at every stage of the supply chain and each business remits the tax on the value it adds. Sales tax, used in the US, is collected only at the final point of sale to the consumer. From the consumer's perspective both add to the price paid, but the accounting and compliance obligations for businesses are very different.",
      },
      {
        question: "Can I use this for GST?",
        answer:
          "Yes. GST is calculated the same way as VAT: tax equals the net amount times the rate, and the net amount equals the gross amount divided by (1 + the rate). Enter the rate that applies to your sale. This page does not keep a separate GST rate table.",
      },
      {
        question: "How do I convert net to gross (and gross to net)?",
        answer:
          "Net to gross: multiply the net amount by (1 + VAT rate). For 20% VAT: net × 1.20 = gross. Gross to net: divide the gross amount by (1 + VAT rate). For 20% VAT: gross ÷ 1.20 = net. The difference between gross and net is the VAT amount.",
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
      `When you are VAT-registered, every sale you make to a customer typically requires you to charge VAT on top of your net (pre-tax) price. The VAT you collect is not income — it is held on behalf of the tax authority and submitted on your periodic VAT return. Getting this right on every invoice matters both for legal compliance and for ensuring customers understand exactly what they are paying.

This calculator takes the net amount and your VAT rate, and instantly shows the VAT charged and the gross total — the final figure that appears on an invoice or receipt. Select from preset rates for the UK, major EU member states, Australia, Canada, and other countries, or type in any custom rate. The calculation updates immediately; there is no need to reach for a spreadsheet or work through the arithmetic manually.

Understanding the net-to-gross calculation is also important when quoting customers. Business-to-business (B2B) quotes are typically given in net terms, with VAT added separately. Consumer-facing (B2C) prices are usually shown inclusive of VAT. Knowing which applies to your context — and being able to convert between the two instantly — avoids invoicing errors and ensures customers are never surprised by the final amount they owe.`,
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
          "If you are a VAT-registered business selling goods or services, you must add VAT to your net price before invoicing the customer. The VAT amount must be shown separately on the invoice. You should only charge VAT if your business is registered — adding VAT without being registered is a serious compliance issue.",
      },
      {
        question: "What is the difference between net and gross price?",
        answer:
          "The net price (also called ex-VAT or pre-tax price) is the price before VAT is added. The gross price (also called VAT-inclusive or total price) includes the VAT. For example, a net price of £100 at 20% VAT gives a gross price of £120 — the £20 VAT appears as a separate line on the invoice. Both figures must be clearly shown on a valid VAT invoice.",
      },
      {
        question: "Can I add different VAT rates to different items on one invoice?",
        answer:
          "Yes. An invoice can include items at different VAT rates — for example, standard-rated services at 20% and zero-rated goods at 0%. Each rate must be listed separately, showing the net amount and VAT for each rate band. Use this calculator for each line item or rate group, then combine the totals.",
      },
      {
        question: "What VAT rate should I use?",
        answer:
          "The correct rate depends on the type of goods or services and the country of supply. In the UK, the standard rate is 20% for most goods and services. A reduced 5% rate applies to items like domestic energy and certain renovation works. Zero-rated items include most food, books, and children's clothing. Always check HMRC guidance for your specific product if you are unsure.",
      },
      {
        question: "Do I need to be VAT-registered to charge VAT?",
        answer:
          "You should only charge VAT to customers if your business is VAT-registered. In the UK, registration is compulsory once your taxable turnover exceeds the registration threshold (£90,000 as of 2024). You can also register voluntarily below that threshold, which lets you reclaim VAT on business purchases. Charging VAT when not registered is a criminal offence.",
      },
      {
        question: "What if my price already includes VAT?",
        answer:
          "If the price already includes VAT, you need to remove (extract) VAT instead. Use the Remove VAT calculator or the main VAT Calculator in remove mode to find the net amount and VAT component within a gross price.",
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
      `Many everyday business situations require you to work backwards from a VAT-inclusive price to find the original net amount. This is sometimes called reverse VAT, extracting VAT, or backing out VAT. Common use cases include reclaiming VAT on business expenses, comparing supplier quotes where some prices include VAT and others exclude it, calculating the cost base for accounting entries, and verifying that a supplier has charged the correct amount.

The key to removing VAT correctly is to divide — not subtract. To remove 20% VAT from a gross price, you divide by 1.20, not subtract 20% of the gross. This matters because VAT was added on top of 100% of the net to reach 120%. Subtracting 20% of £120 gives £96, while dividing by 1.20 correctly returns £100. The error might seem small on individual transactions but compounds significantly across a month of expenses or a large invoice. This calculator applies the correct formula automatically for any rate.

Enter the gross (VAT-inclusive) amount and select your VAT rate. The calculator shows the net amount (excluding VAT) and the exact VAT component within the price. This works for any rate: UK standard 20%, UK reduced 5%, German 19%, French 20%, Australian GST 10%, New Zealand GST 15%, or a custom rate you define. The breakdown is shown immediately, making it easy to verify the split against a supplier invoice or receipt.`,
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
          "Divide the gross price by (1 + VAT rate as a decimal). For a 20% VAT rate, divide by 1.20. For example, £120 ÷ 1.20 = £100 net price. The VAT amount is the difference: £120 − £100 = £20.",
      },
      {
        question: "Why can't I just subtract the percentage?",
        answer:
          "VAT is added on top of the net price, so the gross price is 120% of the net (for a 20% rate). Subtracting 20% of the gross gives the wrong answer because you would be taking 20% of 120%, not 20% of 100%. You must divide, not subtract, to correctly reverse the VAT calculation.",
      },
      {
        question: "What does 'reverse VAT' mean, and when do I need it?",
        answer:
          "Reverse VAT — also called extracting VAT or backing out VAT — means finding the net (pre-tax) amount from a VAT-inclusive price. You need this when reclaiming VAT on business expenses, when a price is quoted inclusive of VAT but you need to record the net cost in your accounts, or when comparing prices where some include VAT and others do not.",
      },
      {
        question: "Does the gross-to-net formula work the same for all VAT rates?",
        answer:
          "Yes — the formula structure is always the same: divide the gross price by (1 + VAT rate as a decimal). For 20% VAT, divide by 1.20. For 5% VAT, divide by 1.05. For 25% VAT (Sweden), divide by 1.25. The denominator changes with the rate; the logic stays the same. This calculator applies the correct denominator automatically.",
      },
      {
        question: "Is the remove VAT formula the same for all countries?",
        answer:
          "The formula structure is the same — divide by (1 + rate). Only the rate changes by country: 20% for the UK, 19% for Germany, 10% for Australia GST, 15% for New Zealand GST, and so on. Select your country from the preset list or enter a custom rate for any jurisdiction.",
      },
      {
        question: "Can I reclaim the VAT I paid on business purchases?",
        answer:
          "As a VAT-registered business, you can generally reclaim VAT on purchases made for business purposes. However, some categories are blocked — most notably cars for mixed use, client entertainment, and items used for both business and personal purposes. Consult HMRC guidance or a tax adviser to confirm what you can reclaim in your specific situation.",
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
      `Gross profit margin is the percentage of revenue that remains after subtracting the direct cost of a product or service. It is one of the most fundamental metrics in business finance, used to assess how efficiently a business turns sales into profit. A higher margin means more of each sale contributes to overheads and net income. Tracking margin consistently is essential for pricing decisions, product mix analysis, and evaluating whether a business is becoming more or less profitable over time.

To use this calculator, enter your revenue (the selling price) and your cost (what it costs to produce or deliver). The calculator shows the profit amount and the margin percentage using the standard formula: margin = (revenue minus cost) divided by revenue, then multiplied by 100. This formula makes margin a percentage of revenue — which is why margin is always a smaller number than markup for the same transaction, since markup uses cost as its base. A product costing £60 and selling for £100 has a 40% margin but a 66.7% markup.

Margin analysis is useful across many practical contexts: evaluating the profitability of individual products, comparing performance across a product range, setting minimum acceptable prices, or modelling the impact of cost increases or discounts. If a supplier raises prices by 10%, you can use this calculator to instantly see how it affects your margin — and what selling price adjustment you need to restore it. For converting between margin and markup, use the Margin to Markup Converter.`,
    category: "pricing",
    relatedSlugs: ["price-builder", "markup-calculator", "profit-calculator", "margin-markup-converter", "break-even-calculator"],
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
          "Margin is profit as a percentage of revenue (selling price). Markup is profit as a percentage of cost. A 50% markup on a £100 cost gives a £150 selling price, but the margin is only 33.3% — not 50%. Confusing the two leads to systematic pricing errors. Use the Margin to Markup Converter to translate between them accurately.",
      },
      {
        question: "What is a good profit margin?",
        answer:
          "This varies widely by industry. Software and SaaS businesses typically achieve gross margins of 70–90%. Retail margins are often 20–50%. Restaurants typically see 60–70% on food costs but lower when labour is included. Manufacturing businesses may see 25–40%. Always compare your margin against industry-specific benchmarks rather than a universal target.",
      },
      {
        question: "Can margin be negative?",
        answer:
          "Yes. A negative margin means you are selling below cost — your revenue does not cover the direct cost of the product or service. This indicates a loss on each sale. While some businesses sustain negative margins temporarily (e.g. during a promotion or market entry phase), a persistently negative margin is unsustainable.",
      },
      {
        question: "How do I convert margin to markup (and vice versa)?",
        answer:
          "Margin to markup: Markup = Margin ÷ (1 − Margin). For example, a 25% margin equals a 33.3% markup. Markup to margin: Margin = Markup ÷ (1 + Markup). A 50% markup equals a 33.3% margin. They are always different numbers for the same transaction. The Margin to Markup Converter handles this automatically.",
      },
      {
        question: "What margin do I need to cover a discount?",
        answer:
          "Your maximum safe discount is roughly equal to your margin percentage — beyond that, you are selling at a loss. But maintaining the same total profit after a discount requires a disproportionate increase in volume. A 20% discount on a product with a 40% margin requires roughly 100% more unit sales just to break even on total profit. See the Discount Impact on Margin guide for a full analysis.",
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
    shortDescription: "Calculate markup percentage from cost and price, or find selling price from a target markup. Works for retail, wholesale, and any industry.",
    longDescription:
      `Markup is the percentage added to the cost of a product to arrive at the selling price. It is the foundational calculation in cost-plus pricing and is widely used in retail, wholesale, manufacturing, and service industries when setting prices from a known cost base. Getting markup right ensures you recover your costs, contribute to overheads, and generate the profit margin your business needs to be sustainable.

This calculator works in two modes. If you know the cost and the current selling price, it calculates the markup percentage — useful for auditing existing prices or comparing products. If you know the cost and want to apply a target markup, it calculates the correct selling price. Enter the cost and either the actual or target selling price, and the calculator shows the profit amount, the markup percentage, and the equivalent margin percentage so you can see all three at once.

One of the most common sources of confusion in business pricing is the difference between markup and margin. A 50% markup on a £60 cost produces a selling price of £90 and a margin of 33.3% — not 50%. If a business target says "achieve a 40% margin" and a buyer sets prices using a 40% markup, the margin will only be 28.6%. Use the Margin to Markup Converter to translate between the two precisely, or use the Profit Calculator to set prices from a target margin directly.`,
    category: "pricing",
    relatedSlugs: ["price-builder", "margin-calculator", "margin-markup-converter", "discount-calculator", "break-even-calculator"],
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
          "Markup is calculated on cost: (Price − Cost) ÷ Cost. Margin is calculated on revenue: (Price − Cost) ÷ Price. The same transaction yields different percentages for each. A £40 profit on a £60 cost and £100 selling price is a 66.7% markup but only a 40% margin. Always clarify which measure you are using when discussing pricing targets.",
      },
      {
        question: "What is a standard markup in retail?",
        answer:
          "Keystone pricing uses a 100% markup, which doubles the cost. In practice, markups vary significantly by product category: grocery staples might carry 20–30%, fashion 100–200%, and cosmetics or electronics accessories sometimes 200–400%. The right markup for your business depends on your cost base, competition, and the margin you need to cover overheads and remain profitable.",
      },
      {
        question: "Can markup exceed 100%?",
        answer:
          "Yes. A 200% markup means the selling price is 3× the cost. Luxury goods, specialty items, and certain services commonly carry markups well over 100%. In software, the cost to produce each additional unit is near zero, so markups can be effectively unlimited. Markup has no theoretical ceiling — what matters is whether customers accept the price.",
      },
      {
        question: "What is keystone markup?",
        answer:
          "Keystone markup (also called keystone pricing) is a 100% markup, which doubles the cost to set the selling price. If an item costs £50, the keystone price is £100. This is a historical baseline in retail — especially in clothing and home goods — though actual markups vary widely depending on competition, brand positioning, and product turnover speed.",
      },
      {
        question: "How do I calculate a selling price to achieve a specific margin?",
        answer:
          "To set a price from a target margin, use the formula: Selling Price = Cost ÷ (1 − Margin). For a 30% target margin on a £60 cost: £60 ÷ 0.70 = £85.71. The Profit Calculator handles this directly — enter your cost and target margin to get the selling price and the equivalent markup percentage.",
      },
      {
        question: "Why do retailers use different markup percentages for different products?",
        answer:
          "Markup varies by product based on sales velocity, competition, perishability, and contribution to overhead recovery. High-volume commodity products carry low markups because they turn over quickly and each sale still generates enough total profit. Niche or seasonal products carry higher markups because slower sales mean each unit must contribute more margin. The blended average markup across a range determines overall business profitability.",
      },
    ],
    seo: {
      title: "Markup Calculator – Markup % from Cost & Price | CalcBase",
      description:
        "Free retail markup calculator. Find markup percentage from cost and price, or selling price from a target markup. Covers keystone, wholesale, and cost-plus.",
      canonical: "/markup-calculator",
    },
    keywords: [
      "markup calculator", "markup percentage calculator", "how to calculate markup", "markup formula",
      "markup vs margin", "cost plus markup calculator", "retail markup calculator",
      "markup to margin converter", "keystone markup", "100 percent markup",
      "what is markup", "selling price calculator", "price markup calculator",
      "calculate markup", "calculate a markup", "markup price calculator",
    ],
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    shortDescription: "Calculate the discount amount and final price after applying a percentage discount.",
    longDescription:
      `Percentage discounts are one of the most common calculations in retail, sales, and negotiations. Whether you are offering a promotional markdown, calculating the cost of a trade discount, figuring out what a sale price really means, or checking how much you actually save from an advertised deal, this calculator gives you the exact discount amount and final price in seconds.

Enter the original price and the discount percentage. The calculator shows the amount you save in currency terms and the final price you pay or charge. For example, a 25% discount on a £200 item removes £50, leaving a final price of £150. You can also reverse the calculation: if you know the sale price and the discount rate, divide the sale price by (1 − discount rate) to find the original price before the reduction.

An important caution applies when stacking multiple discounts: they are not additive. A 20% discount followed by a 10% discount on a £100 item gives £72, not £70 — because the second discount applies to the already-reduced price of £80, not the original £100. This distinction matters in negotiations, promotions, and supply chain contracts. For a deeper analysis of how discounts erode your profit margins, see the Discount Impact on Margin guide.`,
    category: "pricing",
    relatedSlugs: ["price-builder", "vat-calculator", "margin-calculator", "markup-calculator", "break-even-calculator"],
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
          "Multiply the original price by the discount percentage divided by 100. For 30% off £80: £80 × 0.30 = £24 discount. Final price = £80 − £24 = £56. Equivalently, multiply the original price by (1 − discount rate): £80 × 0.70 = £56.",
      },
      {
        question: "Do multiple discounts stack?",
        answer:
          "Successive discounts are applied one after another, not added together. A 20% discount followed by a 10% discount on £100 gives £72 — not £70. Each discount applies to the reduced price from the previous step: 20% off £100 = £80, then 10% off £80 = £72. Always calculate sequentially rather than adding the percentages.",
      },
      {
        question: "How do I find the original price from a discounted price?",
        answer:
          "Divide the final price by (1 − discount rate as a decimal). If you paid £75 after a 25% discount: £75 ÷ 0.75 = £100 original price. This works because the discounted price represents 75% of the original, so dividing by 0.75 reverses the reduction.",
      },
      {
        question: "What is 20 percent off a price?",
        answer:
          "To find 20% off, multiply the original price by 0.20 to get the discount amount, then subtract. For example, 20% off £80 = £80 × 0.20 = £16 discount. Final price = £80 − £16 = £64. Alternatively, multiply directly by 0.80: £80 × 0.80 = £64.",
      },
      {
        question: "How much does a discount actually cost my profit margin?",
        answer:
          "Discounts damage profit margin disproportionately to their size. With a 40% gross margin, a 20% price discount reduces your margin from 40% to 25% — and you need approximately 100% more unit sales to recover the same total profit. The lower your margin, the more damaging any given discount percentage is. For a complete analysis, see the Discount Impact on Margin guide.",
      },
      {
        question: "How do I calculate the percentage discount from original and sale price?",
        answer:
          "Subtract the sale price from the original price to get the discount amount, then divide by the original price and multiply by 100. For example, if an item originally costs £80 and is now £60: discount = (£80 − £60) ÷ £80 × 100 = 25%. This tells you what percentage was taken off the original price.",
      },
    ],
    seo: {
      title: "Discount Calculator – Sale Price & Profit Impact | CalcBase",
      description:
        "Free discount calculator. Enter original price and discount % to see savings, sale price, and profit impact. Works for 10%, 20%, 25%, 30% and 50% off.",
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
      `Margin and markup both measure profitability, but they use different denominators — and confusing them is one of the most common and costly pricing errors in business. Margin divides profit by revenue (the selling price). Markup divides profit by cost. Because revenue is always larger than cost for any profitable sale, margin is always a smaller percentage than markup for the same transaction. A 33.3% margin and a 50% markup describe exactly the same deal.

This converter works in both directions. Enter a margin percentage to see the equivalent markup, or enter a markup percentage to see the equivalent margin. A dynamic reference table shows common conversion pairs side by side, making it easy to build intuition about the relationship without recalculating each time. The formulas are displayed alongside the results so you can verify the arithmetic and apply it in other contexts.

Knowing the relationship between margin and markup is most important when finance teams and pricing teams use different metrics. Accountants and investors typically work in margin terms; purchasing managers and retailers often work in markup terms. Being able to translate instantly between the two prevents the kind of pricing mistakes where someone targets a 40% markup but the business expected a 40% margin — a gap of nearly 7 percentage points that compounds across every sale in the product range.`,
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
        result: "Markup = 33.33%. For every £1 of cost, you charge £1.33.",
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
          "Margin uses revenue as the denominator, markup uses cost. Since revenue is always larger than cost when profitable, margin is always a smaller number than markup for the same transaction. A 50% markup equals only a 33.3% margin. They can never be equal except at 0% profit.",
      },
      {
        question: "When should I use margin vs markup?",
        answer:
          "Margin is standard in financial reporting, investor communication, and income statements. Markup is common in retail pricing, purchasing, and cost-plus contracts. Use whichever your industry or audience expects, but always clarify which measure you mean when discussing pricing targets — the same percentage means very different things depending on which metric you are using.",
      },
      {
        question: "Can margin ever be higher than markup?",
        answer:
          "No. For any profitable sale, margin is always lower than markup. They are only equal at 0%. As profit increases, the gap widens: a 50% markup gives a 33.3% margin, a 100% markup gives a 50% margin, and a 200% markup gives a 66.7% margin. As margin approaches 100%, markup approaches infinity.",
      },
      {
        question: "What markup gives a 50% margin?",
        answer:
          "A 50% margin requires a 100% markup (doubling the cost). Use the formula: Markup = Margin ÷ (1 − Margin) = 0.50 ÷ 0.50 = 1.00 = 100%. This means the selling price is twice the cost — which is why 50% margin and 100% markup (keystone pricing) describe the same pricing point.",
      },
      {
        question: "Is there a quick reference table for common margin and markup equivalents?",
        answer:
          "Some common pairs: 20% margin = 25% markup; 25% margin = 33.3% markup; 30% margin = 42.9% markup; 33.3% margin = 50% markup; 40% margin = 66.7% markup; 50% margin = 100% markup. The converter above shows a full table. Always use the formula or converter rather than estimating — the relationship is non-linear and errors compound at higher percentages.",
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
      `The break-even point is the level of sales at which total revenue exactly equals total costs — the threshold where a business stops making a loss and begins generating profit. Every unit sold below the break-even point represents a net loss; every unit sold above it contributes to profit. Knowing your break-even point is one of the most important pieces of information when evaluating whether a new product, service, or business venture is financially viable.

Enter your fixed costs (the costs that remain constant regardless of output — rent, salaries, insurance, software subscriptions), the variable cost per unit (costs that increase with each unit produced or delivered — materials, packaging, direct labour, shipping), and the selling price per unit. The calculator finds the break-even quantity and the break-even revenue, along with the contribution margin per unit — the amount each sale contributes toward covering fixed costs before profit begins.

Break-even analysis has wide practical applications: assessing whether a new product can realistically reach profitability at your expected sales volume, understanding how a price increase or cost reduction changes your break-even threshold, evaluating the minimum viable scale for a business or project, and stress-testing financial projections. It is most powerful when used alongside margin and ROI analysis to build a complete picture of a venture's economics before committing resources.`,
    category: "business",
    relatedSlugs: ["margin-calculator", "profit-calculator", "markup-calculator", "commission-calculator"],
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
          "Fixed costs remain constant regardless of how much you produce or sell — rent, salaries, insurance, loan repayments, and equipment leases. They must be paid even if you sell zero units. In break-even analysis, fixed costs are the total burden that must be recovered before any profit is possible.",
      },
      {
        question: "What are variable costs?",
        answer:
          "Variable costs change in proportion to production or sales volume — raw materials, packaging, direct labour per unit, shipping, and sales commissions. They increase as you produce and sell more. Keeping variable costs low increases your contribution margin and reduces the number of units you need to break even.",
      },
      {
        question: "What if selling price equals variable cost?",
        answer:
          "If the selling price equals (or is lower than) the variable cost per unit, each sale contributes nothing — or loses money — toward covering fixed costs. Break-even becomes mathematically impossible. You must either raise the selling price above variable cost or reduce variable costs below the selling price to achieve any positive contribution margin.",
      },
      {
        question: "How can I lower my break-even point?",
        answer:
          "Reduce fixed costs (renegotiate rent, cut overheads), lower variable costs per unit (source cheaper materials, improve processes), or increase the selling price (if the market allows). Each of these increases the contribution margin per unit, meaning fewer units are needed to cover fixed costs. Small improvements in all three simultaneously can dramatically reduce the break-even threshold.",
      },
      {
        question: "What is contribution margin?",
        answer:
          "Contribution margin is the selling price per unit minus the variable cost per unit. It represents how much each unit sold contributes toward covering fixed costs. Once enough units are sold to cover all fixed costs (the break-even point), additional units generate the contribution margin as pure profit. Contribution margin ratio = contribution margin ÷ selling price.",
      },
      {
        question: "How do I calculate break-even revenue?",
        answer:
          "Break-even revenue = break-even units × selling price per unit. Alternatively, use the contribution margin ratio: break-even revenue = fixed costs ÷ contribution margin ratio, where the ratio is (selling price − variable cost) ÷ selling price. Both approaches give the same answer — total sales value needed to cover all costs.",
      },
    ],
    seo: {
      title: "Break-even Calculator – Units & Sales Revenue Needed | CalcBase",
      description:
        "Free break-even calculator. Enter fixed costs, variable costs, and selling price to find how many units and how much sales revenue you need to break even.",
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
    slug: "profit-calculator",
    title: "Profit Calculator",
    shortDescription: "Calculate profit, selling price, and margins from cost and revenue. Three flexible input modes.",
    longDescription:
      `Profit is the financial reward for running a business — the amount that remains from revenue after all costs are subtracted. This calculator goes beyond a simple profit figure: it shows profit amount, gross margin percentage, and markup percentage simultaneously, giving you a complete financial picture of any sale or product line. Understanding all three together makes pricing decisions much clearer.

Three input modes cover different real-world scenarios. If you know your cost and revenue, the calculator shows profit, margin, and markup. If you know your cost and want to target a specific margin, it calculates the selling price and resulting markup. If you know your cost and want a specific markup, it finds the selling price and the corresponding margin. This flexibility means you can use it both to analyse current performance and to set prices for new products or services.

The distinction between profit, margin, and markup — three closely related but different concepts — is a frequent source of confusion. Profit is an absolute amount in currency. Margin is profit as a percentage of revenue. Markup is profit as a percentage of cost. The same deal produces three different numbers, and confusing them leads to systematic pricing errors. This calculator makes the relationship concrete by showing all three at once and labelling them clearly, so you always know exactly which metric you are working with.`,
    category: "pricing",
    relatedSlugs: ["price-builder", "margin-calculator", "markup-calculator", "break-even-calculator", "discount-calculator"],
    defaultInputs: { cost: 60, revenue: 100, mode: "fromRevenue" },
    formula: "Profit = Revenue − Cost\nMargin % = (Profit ÷ Revenue) × 100\nMarkup % = (Profit ÷ Cost) × 100",
    formulaExplanation:
      "Profit is the difference between what you sell for and what it costs. Margin expresses that profit as a percentage of revenue; markup expresses it as a percentage of cost. Both describe the same profit from different perspectives.",
    examples: [
      {
        title: "Margin on a $100 sale at $60 cost",
        description: "A product that costs $60 to produce is sold for $100.",
        inputs: { Cost: "$60", Revenue: "$100" },
        result: "Profit = $40. Margin = 40%. Markup = 66.67%.",
      },
      {
        title: "Setting price from a 30% margin target",
        description: "A product costs $50 and you need a 30% margin.",
        inputs: { Cost: "$50", "Target margin": "30%" },
        result: "Selling price = $71.43. Profit = $21.43.",
      },
    ],
    faq: [
      {
        question: "How do I calculate profit?",
        answer:
          "Subtract the total cost from the total revenue. If you sell a product for $100 and it costs $60 to produce and deliver, your gross profit is $40. Net profit subtracts all other business expenses (overheads, taxes, interest) on top of that — this calculator focuses on gross profit.",
      },
      {
        question: "What is the difference between gross and net profit?",
        answer:
          "Gross profit is revenue minus the direct cost of goods sold (materials, direct labour, manufacturing costs). Net profit subtracts all expenses from gross profit — rent, salaries, marketing, taxes, interest, and depreciation. A business can have a healthy gross profit but thin or negative net profit if overheads are high. This calculator shows gross profit.",
      },
      {
        question: "How do I find selling price from a target margin?",
        answer:
          "Divide the cost by (1 − margin as a decimal). For a 30% margin on a $50 cost: $50 ÷ 0.70 = $71.43 selling price. This formula is essential for pricing products where you have a required margin target — it ensures you set the price correctly rather than applying a markup and hoping the margin works out.",
      },
      {
        question: "Is profit the same as margin?",
        answer:
          "No. Profit is an absolute amount in currency (e.g. $40). Margin is profit expressed as a percentage of revenue (e.g. 40%). A high margin on a small sale can mean less total profit than a low margin on a large sale. Both matter — margin tells you how efficiently each sale generates profit; total profit tells you the actual financial result.",
      },
      {
        question: "What is a good gross profit margin?",
        answer:
          "Gross profit margin benchmarks vary by industry. Software and SaaS businesses typically achieve 70–90% gross margins. Retail ranges from 20–50%. Restaurants see 60–70% on food cost alone but much lower all-in. Professional services and consulting often run 50–70%. Compare your margin to industry-specific benchmarks, not a universal standard.",
      },
      {
        question: "How do I improve my profit margin?",
        answer:
          "There are two levers: increase revenue while holding costs steady, or reduce costs while maintaining revenue. In practice this means: raising prices (even small increases have outsized impact on margin), reducing variable costs through supplier negotiation or process improvement, increasing average order value through upselling, and discontinuing low-margin products. Use this calculator to model the impact of each change before implementing it.",
      },
    ],
    seo: {
      title: "Profit Calculator Online: Profit, Margin & Markup | CalcBase",
      description:
        "Free profit calculator. Enter cost and revenue to get profit, margin and markup at once, or set a target margin to find the selling price. Formula and examples included.",
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
    slug: "commission-calculator",
    title: "Commission Calculator",
    shortDescription: "Calculate sales commission earned and net amount. Supports percentage-based commissions.",
    longDescription:
      `Commission is the percentage of a sale paid to the person or organisation who facilitated or closed that transaction. It is the primary compensation structure for sales professionals, real estate agents, mortgage brokers, financial advisers, and affiliate marketers. Understanding how commission is calculated — and what each party receives after commission is deducted — is essential for anyone working in or managing a commission-based environment.

Enter the total sales amount and the commission rate. The calculator shows the commission earned and the net amount — what remains after commission is deducted. For example, a real estate agent earning 6% on a $350,000 sale earns $21,000, and the seller receives $329,000 net of commission. The same arithmetic applies to wholesale transactions, franchise royalties, payment processor fees, and any situation where a percentage is deducted from a transaction value.

Commission structures vary considerably across industries and roles. Flat-rate commission (as calculated here) is the simplest structure. Tiered commissions pay an increasing rate once a volume target is reached, rewarding high performers disproportionately. Split commissions divide the fee between multiple parties, such as a listing agent and a buyer's agent in real estate. Gross profit commissions pay a percentage of margin rather than revenue, aligning the salesperson's incentive more closely with business profitability.`,
    category: "business",
    relatedSlugs: ["profit-calculator", "margin-calculator", "discount-calculator", "break-even-calculator"],
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
        description: "A sales rep earning 8% on $25,000 in monthly sales.",
        inputs: { "Sales amount": "$25,000", "Commission rate": "8%" },
        result: "Commission earned = $2,000. Net to company = $23,000.",
      },
    ],
    faq: [
      {
        question: "What is a typical sales commission rate?",
        answer:
          "Commission rates vary significantly by industry. Real estate agents typically earn 3–6% (often split between listing and buying agent). SaaS sales representatives earn 8–15%. Retail salespeople receive 1–5%. Affiliate marketers earn 5–30% depending on product margin and program. Financial advisers may earn 0.5–2% on assets or a flat fee. Rates are generally higher for complex, high-value, or long-cycle sales.",
      },
      {
        question: "How do tiered commissions work?",
        answer:
          "Tiered commission structures increase the rate as sales volume grows. For example: 5% on the first $50,000 in sales, then 8% on sales above that threshold. Calculate each tier separately and add the results: for $75,000 in sales, the commission is ($50,000 × 5%) + ($25,000 × 8%) = $2,500 + $2,000 = $4,500. This calculator uses a flat rate — for tiered structures, calculate each tier separately.",
      },
      {
        question: "Is commission calculated on revenue or profit?",
        answer:
          "Most commissions are calculated on gross revenue — the total sale amount. Some businesses calculate commission on gross profit instead, which directly incentivises salespeople to protect margin and avoid unnecessary discounting. Commission on margin is more complex to administer but tends to produce better pricing discipline. Always clarify the commission base in any employment or contract agreement.",
      },
      {
        question: "What is the difference between commission and markup?",
        answer:
          "Commission is a percentage paid to a third party (salesperson, agent, intermediary) as compensation for facilitating a sale. Markup is the percentage added to the cost of a product to set the selling price. They are completely different concepts: commission is a payment for services; markup is a pricing method. Both are calculated as percentages of a transaction, but they serve entirely different purposes.",
      },
      {
        question: "How do tiered commissions affect my total calculation?",
        answer:
          "For tiered structures, you must calculate each tier separately. If the rate is 5% on the first $50,000 and 8% on sales above $50,000, a $75,000 sale earns: ($50,000 × 0.05) + ($25,000 × 0.08) = $2,500 + $2,000 = $4,500. This is different from applying 8% to the entire $75,000, which would give $6,000. Use this calculator for each tier and sum the results.",
      },
      {
        question: "How is commission income taxed?",
        answer:
          "Commission income is taxable income in most jurisdictions, treated the same as regular earnings. For employees, commission is usually included in payroll and taxed via PAYE (UK) or income tax withholding (US). For self-employed individuals and freelancers, commission is reported as business income and subject to income tax and National Insurance or self-employment tax. Consult a tax professional for advice specific to your situation.",
      },
      {
        question: "How do I calculate commission on a sale, for example $31,000 at 3%?",
        answer:
          "Multiply the sale amount by the rate as a decimal. $31,000 × 0.03 = $930 commission. The net amount after commission is $31,000 − $930 = $30,070. The same method works for any amount: $50,000 at 2% is $1,000, and $450,000 at 1.5% is $6,750.",
      },
    ],
    seo: {
      title: "Sales Commission Calculator: $ in Sales at % Commission | CalcBase",
      description:
        "Free commission calculator. Enter any sale amount and rate, e.g. $31,000 at 3% = $930 commission. Shows commission and net amount for reps and agents.",
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
    slug: "percentage-change-calculator",
    title: "Percentage Change Calculator",
    shortDescription: "Calculate the percentage increase or decrease between two numbers, or find the new value after applying a percentage change.",
    longDescription:
      `Percentage change — the relative increase or decrease between two values — is one of the most important metrics in business analysis, finance, and reporting. It tells you not just how much something changed in absolute terms, but how large that change was relative to where it started. A $5 price increase means something very different when the original price was $10 versus $100. Percentage change captures this proportional relationship and makes comparisons meaningful.

This calculator works in two modes. The first finds the percentage change between two numbers — enter the original (old) value and the new value to see the exact percentage increase or decrease. The second applies a known percentage change to a starting value — enter the original value and the change percentage to calculate the resulting figure. A 25% increase from $80 gives $100; this can be immediately verified by running the reverse calculation in the first mode. Both directions show the formula used.

Percentage change is used in virtually every type of business and financial analysis: year-on-year revenue growth, price movement tracking, salary review calculations, portfolio performance measurement, and comparing results across reporting periods. An important distinction to understand is the difference between percentage change and percentage points — a variable moving from 4% to 6% is a 2 percentage-point increase but a 50% relative change. Confusing these two measures is one of the most common errors in financial communication and reporting.`,
    category: "business",
    relatedSlugs: ["discount-calculator", "margin-calculator", "profit-calculator", "markup-calculator"],
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
        description: "A $42,000 salary after an 8% pay rise.",
        inputs: { "Original value": "$42,000", "Change": "+8%" },
        result: "New salary = $45,360.",
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
          "Percentage change = ((New Value − Old Value) ÷ |Old Value|) × 100. A positive result means the value increased; a negative result means it decreased. Always divide by the original (old) value, not the new one — dividing by the wrong value is the most common formula error.",
      },
      {
        question: "How do I calculate a percentage increase?",
        answer:
          "Subtract the original value from the new value, divide by the original, and multiply by 100. For example, from 80 to 100: (100 − 80) ÷ 80 × 100 = 25% increase. Alternatively, the new value is 125% of the original (100 ÷ 80 = 1.25), confirming a 25% increase.",
      },
      {
        question: "How do I calculate a percentage decrease?",
        answer:
          "The formula is the same as for a percentage increase — the result will simply be negative when the new value is lower. For example, from 100 to 75: (75 − 100) ÷ 100 × 100 = −25%. This indicates a 25% decrease. The magnitude of a decrease and a subsequent increase are not symmetric: a 25% decrease followed by a 25% increase returns you to only 93.75% of the original, not 100%.",
      },
      {
        question: "What is the difference between percentage change and percentage points?",
        answer:
          "Percentage change is relative: if a rate moves from 20% to 25%, the percentage change is (25 − 20) ÷ 20 × 100 = 25%. Percentage points measure the absolute arithmetic difference: 25% − 20% = 5 percentage points. These are very different quantities and are often confused. In financial reporting, it is critical to specify which measure is being used.",
      },
      {
        question: "How do I reverse a percentage change to find the original value?",
        answer:
          "If you know the current value and the percentage change, divide by (1 + change ÷ 100). For example, a value is now $120 after a 20% increase: $120 ÷ 1.20 = $100 original. For a decrease, divide by (1 − rate ÷ 100): if a value is now $80 after a 20% decrease, the original was $80 ÷ 0.80 = $100.",
      },
      {
        question: "How is percentage change different from ROI?",
        answer:
          "ROI (Return on Investment) uses the same percentage change formula but applied specifically to financial returns: (Gain − Investment) ÷ Investment × 100. Percentage change is the general-purpose version of the same calculation applied to any two values. When the 'old value' is your initial investment and the 'new value' is the total return, percentage change equals ROI.",
      },
      {
        question: "How do I find a percentage of a number?",
        answer:
          "Multiply the number by the percent and divide by 100. For example, 15% of 80 is 80 × 15 ÷ 100 = 12. A discount uses the same idea on a price — use the discount calculator when you are taking a percent off what you charge.",
      },
    ],
    seo: {
      title: "% Change Calculator: Percentage Increase & Decrease | CalcBase",
      description:
        "Free % change calculator. Enter old and new values for the percentage increase or decrease, or apply a % to a number. Formula and worked examples included.",
      canonical: "/percentage-change-calculator",
    },
    keywords: [
      "percentage change calculator", "percent change calculator", "percentage increase calculator",
      "percentage decrease calculator", "how to calculate percentage change", "percent increase formula",
      "percentage change formula", "calculate percent increase", "percent difference calculator",
      "percentage growth calculator", "price change percentage", "percent change formula",
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
