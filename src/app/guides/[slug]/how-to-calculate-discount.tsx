import Link from "next/link";

export function HowToCalculateDiscountContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">The Basic Formula</h2>
      <p>
        Calculating a percentage discount is straightforward: multiply the original price by
        the discount rate, then subtract the result from the original price.
      </p>
      <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
        <div>
          <code className="text-sm">Discount Amount = Original Price × (Discount % ÷ 100)</code>
        </div>
        <div>
          <code className="text-sm">Final Price = Original Price − Discount Amount</code>
        </div>
      </div>
      <p>
        Or in one step: <code className="rounded bg-muted px-1 py-0.5 text-sm">Final Price = Original Price × (1 − Discount % ÷ 100)</code>
      </p>

      <h2 className="text-xl font-semibold">Example: 30% Off $250</h2>
      <p>
        Discount amount: $250 × 0.30 = $75. Final price: $250 − $75 = <strong>$175</strong>.
        Alternatively: $250 × 0.70 = $175.
      </p>

      <h2 className="text-xl font-semibold">Stacking Discounts (Successive Discounts)</h2>
      <p>
        When two discounts are applied in sequence — say 20% off, then an additional 10% off —
        they do <strong>not</strong> add up to 30%. The second discount applies to the
        already-reduced price.
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">Original: $100</p>
        <p className="text-sm">After 20% off: $100 × 0.80 = $80</p>
        <p className="text-sm">After additional 10% off: $80 × 0.90 = <strong>$72</strong></p>
        <p className="mt-2 text-sm text-muted-foreground">Combined effective discount: 28%, not 30%.</p>
      </div>
      <p>
        The general formula for stacked discounts: multiply the complements together.
        For discounts of d₁ and d₂:
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">Final Price = Original × (1 − d₁) × (1 − d₂)</code>
      </div>

      <h2 className="text-xl font-semibold">Finding the Original Price from a Discounted Price</h2>
      <p>
        If you know the final price and the discount percentage, you can reverse the calculation:
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">Original Price = Final Price ÷ (1 − Discount % ÷ 100)</code>
      </div>
      <p>
        Example: You paid $67.50 after a 25% discount. What was the original price?
        $67.50 ÷ 0.75 = <strong>$90</strong>.
      </p>

      <h2 className="text-xl font-semibold">Discount as a Fraction</h2>
      <p>
        Some common discounts map to simple fractions, which makes mental math easier:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Discount</th>
              <th className="py-2 text-left font-medium">Fraction Off</th>
              <th className="py-2 text-left font-medium">You Pay</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b"><td className="py-2">10%</td><td>1/10</td><td>9/10</td></tr>
            <tr className="border-b"><td className="py-2">20%</td><td>1/5</td><td>4/5</td></tr>
            <tr className="border-b"><td className="py-2">25%</td><td>1/4</td><td>3/4</td></tr>
            <tr className="border-b"><td className="py-2">33.3%</td><td>1/3</td><td>2/3</td></tr>
            <tr className="border-b"><td className="py-2">50%</td><td>1/2</td><td>1/2</td></tr>
            <tr><td className="py-2">75%</td><td>3/4</td><td>1/4</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">Business Applications</h2>
      <p>
        Discounts are not just about consumer sales. Businesses use percentage discounts in
        trade pricing (wholesale vs retail), early payment terms (e.g. &ldquo;2/10 net 30&rdquo; means
        a 2% discount for paying within 10 days), volume discounts, and promotional campaigns.
        Understanding the math ensures you know the real impact on your margins.
      </p>
      <p>
        A 20% discount on a product with a 30% margin wipes out two-thirds of your profit.
        Always calculate the margin impact before setting discount levels.
      </p>

      <p>
        Try the{" "}
        <Link href="/discount-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Discount Calculator
        </Link>{" "}
        to compute any percentage discount, or check the impact on your bottom line with the{" "}
        <Link href="/margin-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin Calculator
        </Link>
        .
      </p>
    </>
  );
}
