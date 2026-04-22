import Link from "next/link";

export function BreakEvenFormulaContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">What Is the Break-even Point?</h2>
      <p>
        The break-even point is the level of sales at which total revenue equals total costs —
        you are neither making a profit nor incurring a loss. Every unit sold beyond this point
        generates profit; every unit below it means you are operating at a loss.
      </p>
      <p>
        Break-even analysis is one of the most fundamental tools in business planning. It answers
        a critical question: <em>How much do I need to sell to cover my costs?</em>
      </p>

      <h2 className="text-xl font-semibold">The Formula</h2>
      <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
        <div>
          <code className="text-sm font-medium">Break-even Units = Fixed Costs ÷ (Selling Price per Unit − Variable Cost per Unit)</code>
        </div>
        <div>
          <code className="text-sm font-medium">Break-even Revenue = Break-even Units × Selling Price per Unit</code>
        </div>
      </div>
      <p>
        The denominator — Selling Price minus Variable Cost — is called the{" "}
        <strong>contribution margin per unit</strong>. It represents how much each unit sold
        contributes toward covering fixed costs.
      </p>

      <h2 className="text-xl font-semibold">Understanding the Components</h2>

      <h3 className="font-medium">Fixed Costs</h3>
      <p>
        Fixed costs stay the same regardless of how many units you produce or sell. Examples
        include rent, salaries, insurance premiums, loan payments, and software subscriptions.
        Even if you sell zero units, you still pay these costs.
      </p>

      <h3 className="font-medium">Variable Costs</h3>
      <p>
        Variable costs change directly with production or sales volume. Examples include raw
        materials, packaging, shipping, payment processing fees, and sales commissions. If you
        sell nothing, your variable costs are zero.
      </p>

      <h3 className="font-medium">Contribution Margin</h3>
      <p>
        This is the amount left over from each sale after covering the variable cost for that
        unit. It &ldquo;contributes&rdquo; to paying off fixed costs. Once fixed costs are fully covered,
        the contribution margin becomes pure profit.
      </p>

      <h2 className="text-xl font-semibold">Worked Example</h2>
      <p>
        A small business sells handmade candles:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Fixed costs: $3,000/month (rent, insurance, tools)</li>
        <li>Variable cost per candle: $8 (wax, wick, jar, label, packaging)</li>
        <li>Selling price per candle: $24</li>
      </ul>
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">Contribution margin = $24 − $8 = $16 per candle</p>
        <p className="text-sm">Break-even units = $3,000 ÷ $16 = <strong>188 candles</strong></p>
        <p className="text-sm">Break-even revenue = 188 × $24 = <strong>$4,512</strong></p>
      </div>
      <p>
        The business must sell 188 candles per month to cover all costs. Candle number 189 is
        where profit begins. If they sell 250 candles, profit = (250 − 188) × $16 = $992.
      </p>

      <h2 className="text-xl font-semibold">When Break-even Is Impossible</h2>
      <p>
        If the variable cost per unit equals or exceeds the selling price, the contribution
        margin is zero or negative. Every sale either contributes nothing or actively loses
        money. In this situation, no amount of volume will cover fixed costs — the business
        model must change before it can become viable.
      </p>

      <h2 className="text-xl font-semibold">How to Lower Your Break-even Point</h2>
      <p>There are three levers:</p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <strong>Reduce fixed costs:</strong> Negotiate lower rent, switch to cheaper tools,
          or eliminate unnecessary subscriptions.
        </li>
        <li>
          <strong>Reduce variable costs:</strong> Source cheaper materials, optimize production,
          negotiate supplier discounts.
        </li>
        <li>
          <strong>Increase selling price:</strong> Add value through better branding, features,
          or premium positioning to justify a higher price.
        </li>
      </ol>

      <h2 className="text-xl font-semibold">Limitations of Break-even Analysis</h2>
      <p>
        Break-even analysis assumes that all units are sold at the same price, that variable
        costs per unit remain constant, and that fixed costs do not change. In reality, volume
        discounts, seasonal pricing, and scaling effects mean these numbers shift. Use break-even
        as a planning tool, not a guarantee.
      </p>

      <p>
        Run your own numbers with the{" "}
        <Link href="/break-even-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Break-even Calculator
        </Link>
        , then check your unit-level profitability with the{" "}
        <Link href="/margin-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Margin Calculator
        </Link>
        .
      </p>
    </>
  );
}
