import Link from "next/link";

export function PricingStrategyExplainedContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">Why Pricing Strategy Matters</h2>
      <p>
        Pricing strategy is the deliberate method a business uses to set the price of its products
        or services. The right strategy maximizes revenue and profit while remaining competitive.
        The wrong strategy leaves money on the table, alienates customers, or — worst of all —
        generates sales at a loss. There is no single &quot;best&quot; strategy. The right choice
        depends on your cost structure, competitive landscape, customer base, and business goals.
      </p>
      <p>
        This guide covers the five most common pricing strategies, explains the math behind each,
        and provides a framework for choosing the one that fits your situation.
      </p>

      <h2 className="text-xl font-semibold">1. Cost-Plus Pricing</h2>
      <p>
        Cost-plus pricing adds a fixed percentage markup to the total cost of producing or acquiring
        a product. It is the simplest strategy and guarantees that every sale covers its cost plus a
        defined profit.
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">Selling Price = Total Cost per Unit × (1 + Markup %)</code>
      </div>
      <p>
        Example: A bakery makes a cake for £8 in ingredients and labor. With a 75% markup, the
        selling price is £8 × 1.75 = £14. Profit per cake: £6. Use the{" "}
        <Link href="/markup-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Markup Calculator
        </Link>{" "}
        to calculate this instantly.
      </p>
      <p>
        <strong>Best for:</strong> Commodity products, manufacturing, retail with stable costs.
      </p>
      <p>
        <strong>Weakness:</strong> Ignores customer willingness to pay and competitor pricing. You
        may underprice high-value products or overprice in competitive markets.
      </p>

      <h2 className="text-xl font-semibold">2. Value-Based Pricing</h2>
      <p>
        Value-based pricing sets the price according to the perceived value the product delivers to
        the customer — not what it costs to make. This strategy decouples price from cost and is
        common in software, consulting, and luxury goods.
      </p>
      <p>
        A CRM tool that helps a sales team close £100,000 more per year can reasonably charge
        £12,000 annually, even if the marginal cost of serving that customer is £200. The customer
        pays for the outcome, not the input.
      </p>
      <p>
        <strong>How to find willingness to pay:</strong>
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Survey potential customers using Van Westendorp or Gabor-Granger pricing research.</li>
        <li>Analyze what alternatives cost (competitor prices, DIY costs, cost of doing nothing).</li>
        <li>Quantify the economic benefit your product delivers (time saved, revenue gained, costs avoided).</li>
        <li>Test different prices with A/B experiments or tiered offerings.</li>
      </ul>
      <p>
        <strong>Best for:</strong> SaaS, professional services, differentiated or innovative products.
      </p>
      <p>
        <strong>Weakness:</strong> Requires deep customer understanding. Hard to implement without
        research data. Customers may push back if they perceive the cost of production is low.
      </p>

      <h2 className="text-xl font-semibold">3. Competitive Pricing</h2>
      <p>
        Competitive pricing uses competitor prices as the primary reference point. You can price at
        parity, slightly below (to undercut), or slightly above (to signal higher quality). This
        strategy works in markets where products are similar and customers actively comparison-shop.
      </p>
      <p>
        Example: Three competitors sell a similar wireless mouse at £29.99, £32.99, and £34.99.
        Pricing yours at £31.99 positions you competitively. However, you must verify that £31.99
        covers your costs — matching a competitor&apos;s price means nothing if their cost structure
        is lower than yours.
      </p>
      <p>
        <strong>Best for:</strong> Commoditized markets, e-commerce, categories where customers
        compare on price (electronics, office supplies, basic consumer goods).
      </p>
      <p>
        <strong>Weakness:</strong> Can trigger price wars. Does not account for differences in cost
        structure or brand value.
      </p>

      <h2 className="text-xl font-semibold">4. Penetration Pricing</h2>
      <p>
        Penetration pricing sets an intentionally low price to capture market share quickly. The goal
        is to attract a large customer base, build brand recognition, and then gradually raise prices
        once the product is established.
      </p>
      <p>
        This strategy is common with subscription services, streaming platforms, and new entrants in
        competitive markets. A new project management tool might launch at £5/month when competitors
        charge £15–25/month, aiming to acquire users rapidly.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>Pro:</strong> Fast market entry and customer acquisition.</li>
        <li><strong>Pro:</strong> Deters competitors from entering if margins become too thin.</li>
        <li><strong>Con:</strong> Initial losses that must be funded.</li>
        <li><strong>Con:</strong> Customers may resist price increases later.</li>
        <li><strong>Con:</strong> Attracts price-sensitive buyers who churn when you raise prices.</li>
      </ul>
      <p>
        Before committing to penetration pricing, run a{" "}
        <Link href="/break-even-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          break-even analysis
        </Link>{" "}
        to understand how much volume you need at the low price and how long you can sustain losses.
      </p>

      <h2 className="text-xl font-semibold">5. Premium Pricing</h2>
      <p>
        Premium pricing sets a high price to position the product as superior, exclusive, or
        aspirational. The price itself is part of the value proposition — it signals quality and
        status. Apple, Rolex, and Tesla all use premium pricing strategies, though each combines it
        with genuine product differentiation.
      </p>
      <p>
        Premium pricing works only when the product delivers genuine quality, the brand has
        credibility, and the market contains customers willing to pay more for perceived superiority.
        Slapping a high price on a mediocre product will not create premium positioning — it will
        create returns and bad reviews.
      </p>
      <p>
        <strong>Best for:</strong> Luxury goods, high-end services, products with strong brand equity
        or unique features.
      </p>
      <p>
        <strong>Weakness:</strong> Limits addressable market. Requires consistent quality and brand
        investment.
      </p>

      <h2 className="text-xl font-semibold">How to Choose the Right Strategy</h2>
      <p>
        Use this decision framework based on your market position and product type:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Situation</th>
              <th className="py-2 text-left font-medium">Recommended Strategy</th>
              <th className="py-2 text-left font-medium">Why</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-2">Stable costs, commodity product</td>
              <td className="py-2">Cost-plus</td>
              <td className="py-2">Simple, predictable margins</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Unique product, measurable customer benefit</td>
              <td className="py-2">Value-based</td>
              <td className="py-2">Captures maximum willingness to pay</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Crowded market, similar products</td>
              <td className="py-2">Competitive</td>
              <td className="py-2">Customers compare prices directly</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">New market entry, need volume fast</td>
              <td className="py-2">Penetration</td>
              <td className="py-2">Low price attracts trial and adoption</td>
            </tr>
            <tr>
              <td className="py-2">Strong brand, differentiated quality</td>
              <td className="py-2">Premium</td>
              <td className="py-2">Price reinforces quality positioning</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Many businesses combine strategies. A SaaS company might use value-based pricing for its
        enterprise tier and penetration pricing for its starter plan. A retailer might use cost-plus
        for standard products and premium pricing for exclusive lines.
      </p>

      <h2 className="text-xl font-semibold">The Math Behind Each Strategy</h2>
      <p>
        Regardless of strategy, you need to validate that the final price delivers an acceptable
        margin. Use the{" "}
        <Link href="/margin-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin Calculator
        </Link>{" "}
        to verify your gross margin at any price point. Use the{" "}
        <Link href="/markup-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Markup Calculator
        </Link>{" "}
        to translate a cost-plus markup into a selling price. And always check your{" "}
        <Link href="/break-even-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          break-even point
        </Link>{" "}
        to confirm the price is viable given your fixed costs and expected volume.
      </p>
      <p>
        For the specific formulas behind pricing decisions, see our{" "}
        <Link href="/guides/how-to-price-a-product" className="font-medium underline underline-offset-4 hover:text-primary">
          How to Price a Product
        </Link>{" "}
        guide. To understand the critical difference between margin and markup when applying these
        strategies, read{" "}
        <Link href="/guides/margin-vs-markup" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin vs Markup
        </Link>
        . And to evaluate the overall profitability of your investment in product development or
        marketing, use our{" "}
        <Link href="/guides/how-to-calculate-roi" className="font-medium underline underline-offset-4 hover:text-primary">
          How to Calculate ROI
        </Link>{" "}
        guide.
      </p>
    </>
  );
}
