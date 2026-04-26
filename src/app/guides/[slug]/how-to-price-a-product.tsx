import Link from "next/link";

export function HowToPriceAProductContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">Why Pricing Matters More Than You Think</h2>
      <p>
        Price is the single most powerful lever for profitability. A 1% improvement in price — all
        else being equal — typically improves operating profit by 8–11%, far more than the same
        improvement in volume or cost reduction. Yet many businesses set prices by guesswork,
        copying competitors, or applying an arbitrary markup without understanding what that markup
        actually means for their margins.
      </p>
      <p>
        This guide walks through the practical steps of pricing a product: understanding your costs,
        choosing a pricing method, applying the formulas, and avoiding the mistakes that quietly
        erode profit.
      </p>

      <h2 className="text-xl font-semibold">Step 1: Know Your Costs</h2>
      <p>
        Before you can set a profitable price, you need to know exactly what the product costs you.
        Costs fall into two categories:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Fixed costs</strong> — expenses that do not change with production volume: rent,
          salaries, insurance, software subscriptions. These exist whether you sell one unit or ten
          thousand.
        </li>
        <li>
          <strong>Variable costs</strong> — expenses that scale with each unit produced or sold: raw
          materials, packaging, shipping, payment processing fees, sales commissions.
        </li>
      </ul>
      <p>
        Your total cost per unit is the variable cost per unit plus a share of fixed costs allocated
        across your expected sales volume. Underestimating costs — especially hidden ones like
        returns, warranty claims, or payment processor fees — is one of the most common pricing
        errors.
      </p>

      <h2 className="text-xl font-semibold">Step 2: Choose a Pricing Method</h2>

      <h3 className="font-medium">Cost-Plus Pricing</h3>
      <p>
        The simplest approach. Add a fixed percentage (the markup) to your total cost per unit.
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">Selling Price = Cost × (1 + Markup %)</code>
      </div>
      <p>
        Example: Your product costs £20 to make. You apply a 50% markup. Selling price = £20 ×
        1.50 = £30. Your profit per unit is £10. Use the{" "}
        <Link href="/markup-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Markup Calculator
        </Link>{" "}
        to run this calculation instantly.
      </p>
      <p>
        Cost-plus is easy to implement and guarantees each sale covers its cost plus profit.
        However, it ignores what customers are willing to pay and what competitors charge. You might
        leave money on the table — or price yourself out of the market.
      </p>

      <h3 className="font-medium">Margin-Based Pricing</h3>
      <p>
        Instead of adding a markup to cost, you set a target profit margin and work backwards to
        find the price.
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">Selling Price = Cost ÷ (1 − Target Margin %)</code>
      </div>
      <p>
        Example: Your product costs £20 and you want a 40% margin. Selling price = £20 ÷ (1 −
        0.40) = £20 ÷ 0.60 = £33.33. Your profit is £13.33. The{" "}
        <Link href="/margin-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin Calculator
        </Link>{" "}
        handles this formula for you.
      </p>
      <p>
        Margin-based pricing is popular because margin is how profitability is reported in financial
        statements. A common mistake is confusing margin and markup — they produce different prices
        from the same cost. A 50% markup on £20 gives £30 (33.3% margin), while a 50% margin on
        £20 gives £40. See our{" "}
        <Link href="/guides/margin-vs-markup" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin vs Markup
        </Link>{" "}
        guide for a full explanation.
      </p>

      <h3 className="font-medium">Competitive Pricing</h3>
      <p>
        Set your price based on what competitors charge for similar products. This works well in
        commoditized markets where customers compare on price. The risk is that you may match a
        competitor whose cost structure is very different from yours — their profitable price might
        be your loss-making price.
      </p>

      <h3 className="font-medium">Value-Based Pricing</h3>
      <p>
        Set price based on the perceived value to the customer rather than your cost. A software
        tool that saves a business £10,000 per year can reasonably charge £2,000 even if it costs
        £200 to deliver. Value-based pricing requires understanding your customer deeply — what
        problem you solve, what alternatives exist, and what the customer would lose without your
        product. It produces the highest margins but demands the most research.
      </p>

      <h2 className="text-xl font-semibold">Step 3: The Pricing Formulas</h2>
      <p>
        Whichever method you choose, the core math is straightforward:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Formula</th>
              <th className="py-2 text-left font-medium">Equation</th>
              <th className="py-2 text-left font-medium">Example (Cost = £20)</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Price from markup</td>
              <td className="py-2">Cost × (1 + Markup%)</td>
              <td className="py-2">£20 × 1.50 = £30 (50% markup)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Price from margin</td>
              <td className="py-2">Cost ÷ (1 − Margin%)</td>
              <td className="py-2">£20 ÷ 0.60 = £33.33 (40% margin)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Margin from price</td>
              <td className="py-2">(Price − Cost) ÷ Price × 100</td>
              <td className="py-2">(£30 − £20) ÷ £30 = 33.3%</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-foreground">Markup from price</td>
              <td className="py-2">(Price − Cost) ÷ Cost × 100</td>
              <td className="py-2">(£30 − £20) ÷ £20 = 50%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">Step 4: Setting Your Target Margin</h2>
      <p>
        Target margins vary by industry. Grocery retail typically operates on 2–5% net margins.
        Software companies may achieve 70–85% gross margins. Luxury goods can exceed 60%. Research
        industry benchmarks and set a margin that covers your fixed costs, provides a return on
        investment, and leaves room for the inevitable discounts and promotions.
      </p>
      <p>
        A useful cross-check: calculate your{" "}
        <Link href="/break-even-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          break-even point
        </Link>{" "}
        at the proposed price. If you need to sell more units than the market supports, the price is
        too low or the cost structure needs work.
      </p>

      <h2 className="text-xl font-semibold">Step 5: Test and Adjust</h2>
      <p>
        Pricing is not a set-and-forget exercise. Monitor sales volume, conversion rates, and
        competitor movements after launch. A/B testing different price points (where appropriate) can
        reveal the price elasticity of your product — how sensitive demand is to price changes. Small
        price increases often have negligible impact on volume but meaningful impact on profit.
      </p>

      <h2 className="text-xl font-semibold">Common Pricing Mistakes</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <strong>Confusing margin and markup.</strong> A 50% markup is not a 50% margin. This error
          alone can swing your profit by 15–20 percentage points.
        </li>
        <li>
          <strong>Ignoring hidden costs.</strong> Returns, freight, payment fees, and support hours
          are real costs that must be factored in.
        </li>
        <li>
          <strong>Racing to the bottom.</strong> Competing solely on price attracts price-sensitive
          customers who will leave the moment someone undercuts you.
        </li>
        <li>
          <strong>Failing to re-evaluate.</strong> Raw material prices, shipping costs, and currency
          exchange rates change. A price set two years ago may no longer be profitable.
        </li>
        <li>
          <strong>Pricing without knowing break-even.</strong> If you do not know how many units you
          must sell to cover costs, you cannot know whether your price works.
        </li>
      </ol>

      <h2 className="text-xl font-semibold">Tools to Help You Price</h2>
      <p>
        Use the{" "}
        <Link href="/margin-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin Calculator
        </Link>{" "}
        to find the price that hits your target margin. Use the{" "}
        <Link href="/markup-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Markup Calculator
        </Link>{" "}
        to apply a percentage markup to your cost. Check your{" "}
        <Link href="/profit-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Profit Calculator
        </Link>{" "}
        to see the bottom line, and run a{" "}
        <Link href="/break-even-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Break-even Analysis
        </Link>{" "}
        to confirm the price is viable at your expected volume.
      </p>
      <p>
        For a deeper look at different pricing approaches, see our guide on{" "}
        <Link href="/guides/pricing-strategy-explained" className="font-medium underline underline-offset-4 hover:text-primary">
          Pricing Strategy Explained
        </Link>
        .
      </p>
    </>
  );
}
