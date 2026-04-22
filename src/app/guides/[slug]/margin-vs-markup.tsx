import Link from "next/link";

export function MarginVsMarkupContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">The Core Difference</h2>
      <p>
        Margin and markup both measure profit on a sale, but they calculate it against different
        base numbers. This distinction matters — confusing them leads directly to pricing errors
        that either eat into profit or make your prices uncompetitive.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>Margin</strong> = Profit ÷ Revenue (selling price)</li>
        <li><strong>Markup</strong> = Profit ÷ Cost</li>
      </ul>
      <p>
        The same transaction always produces a higher markup percentage than margin percentage.
        A product that costs $60 and sells for $100 has a 40% margin but a 66.7% markup.
      </p>

      <h2 className="text-xl font-semibold">Formulas</h2>
      <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
        <div>
          <code className="text-sm font-medium">Margin % = ((Revenue − Cost) ÷ Revenue) × 100</code>
        </div>
        <div>
          <code className="text-sm font-medium">Markup % = ((Revenue − Cost) ÷ Cost) × 100</code>
        </div>
      </div>

      <h2 className="text-xl font-semibold">Worked Example</h2>
      <p>
        Suppose you buy a product for <strong>$50</strong> and sell it for <strong>$80</strong>.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Metric</th>
              <th className="py-2 text-left font-medium">Formula</th>
              <th className="py-2 text-left font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b"><td className="py-2">Profit</td><td>$80 − $50</td><td>$30</td></tr>
            <tr className="border-b"><td className="py-2">Margin</td><td>$30 ÷ $80 × 100</td><td>37.5%</td></tr>
            <tr><td className="py-2">Markup</td><td>$30 ÷ $50 × 100</td><td>60%</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Same transaction, same $30 profit — but the percentages differ because the denominator
        changes.
      </p>

      <h2 className="text-xl font-semibold">Conversion Table</h2>
      <p>
        Use this table to quickly convert between common margin and markup values:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Margin</th>
              <th className="py-2 text-left font-medium">Markup</th>
              <th className="py-2 text-left font-medium">Multiplier on Cost</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b"><td className="py-2">10%</td><td>11.1%</td><td>×1.111</td></tr>
            <tr className="border-b"><td className="py-2">20%</td><td>25%</td><td>×1.25</td></tr>
            <tr className="border-b"><td className="py-2">25%</td><td>33.3%</td><td>×1.333</td></tr>
            <tr className="border-b"><td className="py-2">30%</td><td>42.9%</td><td>×1.429</td></tr>
            <tr className="border-b"><td className="py-2">33.3%</td><td>50%</td><td>×1.5</td></tr>
            <tr className="border-b"><td className="py-2">40%</td><td>66.7%</td><td>×1.667</td></tr>
            <tr className="border-b"><td className="py-2">50%</td><td>100%</td><td>×2.0</td></tr>
            <tr><td className="py-2">60%</td><td>150%</td><td>×2.5</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">Converting Between Margin and Markup</h2>
      <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
        <div>
          <code className="text-sm">Margin % = Markup % ÷ (1 + Markup %)</code>
        </div>
        <div>
          <code className="text-sm">Markup % = Margin % ÷ (1 − Margin %)</code>
        </div>
      </div>
      <p>
        Example: If your markup is 50% (0.50), margin = 0.50 ÷ 1.50 = 33.3%.
        If your margin is 40% (0.40), markup = 0.40 ÷ 0.60 = 66.7%.
      </p>

      <h2 className="text-xl font-semibold">When to Use Each</h2>
      <p>
        <strong>Margin</strong> is the standard in financial reporting, P&L statements, and
        investor discussions. When someone asks &ldquo;what is your margin?&rdquo;, they mean profit
        as a percentage of revenue.
      </p>
      <p>
        <strong>Markup</strong> is common in retail and wholesale pricing. It answers the
        practical question: &ldquo;How much do I add to my cost to get the selling price?&rdquo; Keystone
        pricing — a 100% markup, doubling the wholesale cost — is a well-known retail benchmark.
      </p>

      <h2 className="text-xl font-semibold">The Costly Mistake</h2>
      <p>
        A business targeting a 50% margin sets a 50% markup instead. On a $100 cost, they price
        at $150 (50% markup), but the actual margin is only 33.3% ($50 ÷ $150). To achieve a
        true 50% margin, they needed a 100% markup — a $200 selling price. The error costs them
        $50 per unit in expected profit.
      </p>

      <p>
        Calculate your numbers with the{" "}
        <Link href="/margin-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin Calculator
        </Link>{" "}
        or{" "}
        <Link href="/markup-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Markup Calculator
        </Link>
        .
      </p>
    </>
  );
}
