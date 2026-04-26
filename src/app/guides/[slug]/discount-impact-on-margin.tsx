import Link from "next/link";

export function DiscountImpactOnMarginContent() {
  return (
    <>
      <p>
        Offering a discount feels like a small trade-off — give up a little revenue to win more customers.
        But the math tells a different story. A discount comes straight out of your profit, not your revenue,
        and the volume increase you need to compensate is almost always larger than business owners expect.
      </p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        Why discounts hurt more than they seem
      </h2>
      <p>
        When you sell a product for $100 with a 40% margin, your profit is $40 and your cost is $60.
        If you offer a 20% discount, the selling price drops to $80 — but the cost stays at $60.
        Your new profit is just $20, and your new margin is 25%. A 20% discount cut your profit in <strong>half</strong>.
      </p>
      <p>
        The key insight: discounts reduce your <em>profit</em>, not your <em>revenue</em>, proportionally.
        A 20% discount on a 40% margin product eliminates 50% of your profit per unit.
      </p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        The formula: required sales increase
      </h2>
      <p>
        To maintain the same total profit after a discount, you need to sell more units.
        The formula for the required volume increase is:
      </p>
      <div className="my-6 rounded-lg border bg-muted/30 p-4">
        <code className="text-sm font-semibold">
          Required Volume Increase = Discount % ÷ (Margin % − Discount %)
        </code>
      </div>
      <p>
        Using our example: 20% discount on a 40% margin:
      </p>
      <div className="my-4 rounded-lg border bg-muted/30 p-4">
        <code className="text-sm">
          20% ÷ (40% − 20%) = 20% ÷ 20% = 100% increase
        </code>
      </div>
      <p>
        You need to <strong>double</strong> your sales volume just to maintain the same total profit.
        If you were selling 100 units per month, you now need 200. That is rarely realistic from a discount alone.
      </p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        What if the discount exceeds your margin?
      </h2>
      <p>
        If you offer a discount equal to or greater than your margin, you lose money on every sale.
        No amount of volume increase can fix this — more sales means more losses.
        For example, a 40% discount on a 30% margin product means every unit sold loses 10% of its cost.
      </p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        Complete reference table
      </h2>
      <p>
        This table shows the required sales volume increase to maintain the same total profit,
        for common margin and discount combinations. A dash (—) means the discount exceeds the margin
        and no volume increase can compensate.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-3 py-2 text-left font-semibold">Margin</th>
              <th className="px-3 py-2 text-right font-semibold">5% off</th>
              <th className="px-3 py-2 text-right font-semibold">10% off</th>
              <th className="px-3 py-2 text-right font-semibold">15% off</th>
              <th className="px-3 py-2 text-right font-semibold">20% off</th>
              <th className="px-3 py-2 text-right font-semibold">25% off</th>
              <th className="px-3 py-2 text-right font-semibold">30% off</th>
              <th className="px-3 py-2 text-right font-semibold">40% off</th>
              <th className="px-3 py-2 text-right font-semibold">50% off</th>
            </tr>
          </thead>
          <tbody>
            {[
              { margin: 20, values: ["33%", "100%", "300%", "—", "—", "—", "—", "—"] },
              { margin: 25, values: ["25%", "67%", "150%", "400%", "—", "—", "—", "—"] },
              { margin: 30, values: ["20%", "50%", "100%", "200%", "600%", "—", "—", "—"] },
              { margin: 35, values: ["17%", "40%", "75%", "133%", "250%", "600%", "—", "—"] },
              { margin: 40, values: ["14%", "33%", "60%", "100%", "167%", "300%", "—", "—"] },
              { margin: 45, values: ["13%", "29%", "50%", "80%", "125%", "200%", "900%", "—"] },
              { margin: 50, values: ["11%", "25%", "43%", "67%", "100%", "150%", "400%", "—"] },
              { margin: 60, values: ["9%", "20%", "33%", "50%", "71%", "100%", "200%", "500%"] },
              { margin: 70, values: ["8%", "17%", "27%", "40%", "56%", "75%", "133%", "250%"] },
            ].map((row) => (
              <tr key={row.margin} className="border-b">
                <td className="px-3 py-2 font-medium">{row.margin}%</td>
                {row.values.map((val, i) => (
                  <td
                    key={i}
                    className={`px-3 py-2 text-right ${val === "—" ? "text-destructive font-semibold" : "text-muted-foreground"}`}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground">
        Reading the table: with a 40% margin and a 20% discount, you need 100% more sales (double the volume)
        to earn the same total profit.
      </p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        Worked example: seasonal sale
      </h2>
      <p>
        A clothing retailer sells 500 jackets per month at $120 each with a 35% margin.
        Monthly profit: 500 × $120 × 0.35 = <strong>$21,000</strong>.
      </p>
      <p>
        They run a 15% off sale. New price: $102. Cost per jacket: $78. New profit per jacket: $24 (down from $42).
        New margin: 23.5%.
      </p>
      <p>
        Required volume increase: 15% ÷ (35% − 15%) = 75%. They need to sell <strong>875 jackets</strong> instead of 500
        just to maintain the same $21,000 total profit. That is 375 additional sales — a massive increase
        that most promotions will not deliver.
      </p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        When discounts do make sense
      </h2>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>Clearing dead stock</strong> — inventory that will not sell at full price has a carrying cost.
          A discount that moves it quickly can free up cash and warehouse space.
        </li>
        <li>
          <strong>Customer acquisition</strong> — if the lifetime value of a new customer significantly exceeds
          the margin lost on the first sale, a discount can be a profitable investment.
        </li>
        <li>
          <strong>Volume commitments</strong> — when a discount secures a large, guaranteed order that
          reduces your per-unit costs through economies of scale.
        </li>
        <li>
          <strong>Competitive necessity</strong> — when competitors are discounting and you risk losing
          market share. Even then, match selectively rather than across the board.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        Alternatives to straight discounts
      </h2>
      <p>
        Instead of cutting prices, consider strategies that preserve margin:
      </p>
      <ul className="ml-6 list-disc space-y-2">
        <li><strong>Bundling</strong> — sell two products together at a slight discount. You move more inventory while keeping the per-unit margin higher.</li>
        <li><strong>Value-adds</strong> — offer free shipping, extended warranties, or bonus items instead of a price cut. The perceived value may exceed the cost.</li>
        <li><strong>Tiered pricing</strong> — offer discounts only above a quantity threshold, ensuring higher total revenue.</li>
        <li><strong>Limited-time offers</strong> — create urgency without training customers to always wait for sales.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        Calculate it yourself
      </h2>
      <p>
        Use these tools to model the impact of discounts on your business:
      </p>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <Link href="/discount-calculator" className="font-medium text-primary underline underline-offset-4">
            Discount Calculator
          </Link>{" "}
          — calculate the final price after a percentage discount
        </li>
        <li>
          <Link href="/margin-calculator" className="font-medium text-primary underline underline-offset-4">
            Margin Calculator
          </Link>{" "}
          — find your current profit margin from revenue and cost
        </li>
        <li>
          <Link href="/profit-calculator" className="font-medium text-primary underline underline-offset-4">
            Profit Calculator
          </Link>{" "}
          — calculate profit from cost and revenue with margin and markup
        </li>
        <li>
          <Link href="/break-even-calculator" className="font-medium text-primary underline underline-offset-4">
            Break-even Calculator
          </Link>{" "}
          — find how many units you need to sell to cover your costs
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">
        Related guides
      </h2>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <Link href="/guides/how-to-price-a-product" className="font-medium text-primary underline underline-offset-4">
            How to Price a Product
          </Link>{" "}
          — pricing formulas and strategies
        </li>
        <li>
          <Link href="/guides/margin-vs-markup" className="font-medium text-primary underline underline-offset-4">
            Margin vs Markup
          </Link>{" "}
          — the difference that costs businesses money
        </li>
        <li>
          <Link href="/guides/pricing-strategy-explained" className="font-medium text-primary underline underline-offset-4">
            Pricing Strategy Explained
          </Link>{" "}
          — from cost-plus to value-based pricing
        </li>
        <li>
          <Link href="/guides/how-to-calculate-discount" className="font-medium text-primary underline underline-offset-4">
            How to Calculate Discount
          </Link>{" "}
          — percentage discounts, stacking, and reverse calculations
        </li>
      </ul>
    </>
  );
}
