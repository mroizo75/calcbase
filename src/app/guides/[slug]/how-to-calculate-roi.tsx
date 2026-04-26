import Link from "next/link";

export function HowToCalculateRoiContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">What Is ROI?</h2>
      <p>
        Return on Investment (ROI) is one of the most widely used financial metrics. It measures the
        efficiency of an investment by comparing the gain (or loss) to its cost. ROI is expressed as
        a percentage, making it easy to compare investments of different sizes and types — from a
        £5,000 marketing campaign to a £500,000 real estate purchase.
      </p>

      <h2 className="text-xl font-semibold">The ROI Formula</h2>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">ROI = ((Net Profit) ÷ Cost of Investment) × 100</code>
      </div>
      <p>
        Where <strong>Net Profit</strong> = Total Return − Cost of Investment. A positive ROI means
        you earned more than you spent. A negative ROI means you lost money.
      </p>

      <h2 className="text-xl font-semibold">Step-by-Step Example: Marketing Campaign</h2>
      <p>
        Suppose you spend £8,000 on a paid advertising campaign. The campaign generates £22,000 in
        attributable revenue and the cost of goods sold on those sales is £10,000.
      </p>
      <ol className="list-decimal space-y-1 pl-5">
        <li>Calculate net profit: £22,000 revenue − £10,000 COGS − £8,000 ad spend = £4,000</li>
        <li>Divide net profit by investment: £4,000 ÷ £8,000 = 0.50</li>
        <li>Multiply by 100: 0.50 × 100 = <strong>50% ROI</strong></li>
      </ol>
      <p>
        For every pound invested in advertising, you earned £1.50 back (your original £1 plus £0.50
        profit). Use the{" "}
        <Link href="/roi-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          ROI Calculator
        </Link>{" "}
        to run this calculation with your own numbers.
      </p>

      <h2 className="text-xl font-semibold">ROI for Different Investments</h2>

      <h3 className="font-medium">Marketing &amp; Advertising</h3>
      <p>
        Marketing ROI measures whether campaigns generate more revenue than they cost. When
        calculating, include all associated costs: ad spend, agency fees, creative production,
        software tools, and staff time. Attribute revenue carefully — a common pitfall is crediting
        an ad campaign for sales that would have happened anyway (organic demand).
      </p>

      <h3 className="font-medium">Real Estate</h3>
      <p>
        For a property investment, the calculation includes purchase price, renovation costs,
        ongoing maintenance, and taxes as the investment cost. The return includes rental income
        and/or the sale price minus the purchase price. A house bought for £200,000 with £30,000 in
        renovations and sold for £280,000 yields: (£280,000 − £230,000) ÷ £230,000 × 100 =
        21.7% ROI. This does not account for holding time — a 21.7% return over five years is very
        different from the same return over one year.
      </p>

      <h3 className="font-medium">Equipment &amp; Capital Expenditure</h3>
      <p>
        A manufacturer buying a £50,000 machine that saves £15,000 per year in labor costs has an
        annual ROI of 30%. The payback period — how long until the machine pays for itself — is
        £50,000 ÷ £15,000 = 3.33 years. ROI is useful for comparing alternative equipment
        purchases: the machine with the highest ROI delivers the best return per pound invested.
      </p>

      <h3 className="font-medium">Stock Market</h3>
      <p>
        For stocks, ROI includes both capital gains (price increase) and dividends received. If you
        buy shares for £10,000, receive £400 in dividends, and sell for £11,500: net profit =
        £11,500 + £400 − £10,000 = £1,900. ROI = £1,900 ÷ £10,000 × 100 = 19%.
      </p>

      <h2 className="text-xl font-semibold">Limitations of ROI</h2>
      <p>
        ROI is powerful but has blind spots. Being aware of them prevents poor decisions:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Time is ignored.</strong> A 50% ROI over one year is excellent. A 50% ROI over
          ten years is mediocre (roughly 4.1% per year). Standard ROI does not factor in how long
          the investment takes to deliver returns.
        </li>
        <li>
          <strong>Risk is invisible.</strong> A 20% ROI from government bonds and a 20% ROI from
          a speculative startup are not equivalent. ROI says nothing about the probability of
          achieving the return.
        </li>
        <li>
          <strong>Opportunity cost is excluded.</strong> Every pound invested in one project is a
          pound not invested elsewhere. An ROI of 15% looks good until you realize the alternative
          investment offered 25%.
        </li>
        <li>
          <strong>Cash flow timing matters.</strong> Two investments may have the same total ROI, but
          one returns cash in year one while the other returns cash in year five. The earlier cash
          flow is more valuable (time value of money).
        </li>
      </ul>

      <h2 className="text-xl font-semibold">Annualized ROI</h2>
      <p>
        To compare investments held for different time periods, convert to annualized ROI:
      </p>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">
          Annualized ROI = ((1 + ROI) ^ (1 / Years)) − 1
        </code>
      </div>
      <p>
        Example: An investment returns 50% over 3 years. Annualized ROI = (1.50)^(1/3) − 1 =
        14.5% per year. This makes it directly comparable to an investment that returned 12% in one
        year.
      </p>

      <h2 className="text-xl font-semibold">ROI vs Other Metrics</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Metric</th>
              <th className="py-2 text-left font-medium">What It Measures</th>
              <th className="py-2 text-left font-medium">When to Use</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">ROI</td>
              <td className="py-2">Overall return relative to cost</td>
              <td className="py-2">Comparing investment efficiency</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Profit Margin</td>
              <td className="py-2">Profit as % of revenue</td>
              <td className="py-2">Evaluating ongoing business operations</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">ROAS</td>
              <td className="py-2">Revenue generated per ad dollar</td>
              <td className="py-2">Measuring advertising effectiveness</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-foreground">Payback Period</td>
              <td className="py-2">Time to recover the initial investment</td>
              <td className="py-2">Cash flow planning and capital budgeting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">Calculate Your ROI</h2>
      <p>
        Use the{" "}
        <Link href="/roi-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          ROI Calculator
        </Link>{" "}
        to find your return on any investment. For broader profitability analysis, try the{" "}
        <Link href="/profit-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Profit Calculator
        </Link>{" "}
        or the{" "}
        <Link href="/break-even-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Break-even Calculator
        </Link>{" "}
        to determine how many units you need to sell before an investment becomes profitable.
      </p>
      <p>
        If you are evaluating the profitability of a product rather than an investment, see our
        guide on{" "}
        <Link href="/guides/how-to-price-a-product" className="font-medium underline underline-offset-4 hover:text-primary">
          How to Price a Product
        </Link>{" "}
        for practical pricing formulas and strategies.
      </p>
    </>
  );
}
