import Link from "next/link";

export function VatExplainedContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">What is VAT?</h2>
      <p>
        VAT — Value Added Tax — is a consumption tax applied to goods and services at each stage
        of the supply chain. Unlike a sales tax, which is charged only at the final point of sale,
        VAT is collected incrementally. Every business in the chain charges VAT on its sales and
        reclaims the VAT it paid on its purchases, so the tax burden falls on the end consumer.
      </p>
      <p>
        Over 160 countries use some form of VAT or GST (Goods and Services Tax). The United
        Kingdom, the European Union, Australia, Canada, India, and New Zealand all operate
        VAT/GST systems, each with their own rates and rules.
      </p>

      <h2 className="text-xl font-semibold">VAT vs Sales Tax</h2>
      <p>
        In the United States, most states charge a sales tax at the retail level only. The
        retailer collects the tax and remits it to the state. Businesses earlier in the supply
        chain — manufacturers, wholesalers — do not charge or pay sales tax on B2B transactions.
      </p>
      <p>
        VAT works differently. Each business charges VAT on its output (sales) and deducts the
        VAT on its input (purchases). The net VAT — the difference — is what the business remits
        to the tax authority. This means the tax is collected at every stage, but only on the
        value that each business adds.
      </p>

      <h2 className="text-xl font-semibold">How to Calculate VAT</h2>
      <p>There are two common calculations:</p>

      <h3 className="font-medium">Adding VAT to a net price</h3>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">VAT Amount = Net Price × (VAT Rate ÷ 100)</code>
        <br />
        <code className="text-sm">Gross Price = Net Price + VAT Amount</code>
      </div>
      <p>
        Example: A UK consultant charges £1,000 for a project. At the standard 20% rate:
        £1,000 × 0.20 = £200 VAT. The invoice total is £1,200.
      </p>

      <h3 className="font-medium">Removing VAT from a gross price</h3>
      <div className="rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">Net Price = Gross Price ÷ (1 + VAT Rate ÷ 100)</code>
        <br />
        <code className="text-sm">VAT Amount = Gross Price − Net Price</code>
      </div>
      <p>
        Example: A receipt shows £240 including VAT at 20%. Divide £240 by 1.20 to get £200 net.
        The VAT portion is £40. A common mistake is subtracting 20% of £240 (£48) — this gives
        the wrong answer because VAT is calculated on the net, not the gross.
      </p>

      <h2 className="text-xl font-semibold">Common VAT Rates by Country</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Country</th>
              <th className="py-2 text-left font-medium">Standard Rate</th>
              <th className="py-2 text-left font-medium">Reduced Rate(s)</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b"><td className="py-2">United Kingdom</td><td>20%</td><td>5%, 0%</td></tr>
            <tr className="border-b"><td className="py-2">Germany</td><td>19%</td><td>7%</td></tr>
            <tr className="border-b"><td className="py-2">France</td><td>20%</td><td>10%, 5.5%, 2.1%</td></tr>
            <tr className="border-b"><td className="py-2">Italy</td><td>22%</td><td>10%, 4%</td></tr>
            <tr className="border-b"><td className="py-2">Spain</td><td>21%</td><td>10%, 4%</td></tr>
            <tr className="border-b"><td className="py-2">Netherlands</td><td>21%</td><td>9%</td></tr>
            <tr className="border-b"><td className="py-2">Sweden</td><td>25%</td><td>12%, 6%</td></tr>
            <tr className="border-b"><td className="py-2">Australia (GST)</td><td>10%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">Canada (GST)</td><td>5%</td><td>Varies by province</td></tr>
            <tr><td className="py-2">India (GST)</td><td>18%</td><td>5%, 12%, 28%</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">When Do You Need to Register for VAT?</h2>
      <p>
        In the UK, businesses must register for VAT when their taxable turnover exceeds £90,000
        in a 12-month period (as of 2024). Below this threshold, registration is voluntary.
        VAT-registered businesses must charge VAT on qualifying sales, file VAT returns
        (typically quarterly), and can reclaim VAT on business purchases.
      </p>
      <p>
        EU countries have varying registration thresholds, and some have no threshold at all for
        certain types of businesses. If you sell goods or digital services across EU borders,
        additional rules such as the One Stop Shop (OSS) scheme may apply.
      </p>

      <h2 className="text-xl font-semibold">Key Takeaways</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>VAT is charged at every stage of the supply chain, not just at retail.</li>
        <li>The end consumer bears the full cost — businesses act as collectors.</li>
        <li>To add VAT: multiply by the rate. To remove: divide by (1 + rate).</li>
        <li>Rates vary significantly by country and product category.</li>
        <li>Registration thresholds and filing requirements differ by jurisdiction.</li>
      </ul>

      <p>
        Use the{" "}
        <Link href="/vat-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT Calculator
        </Link>{" "}
        to add or remove VAT from any amount, or try the specialized{" "}
        <Link href="/add-vat" className="font-medium underline underline-offset-4 hover:text-primary">
          Add VAT
        </Link>{" "}
        and{" "}
        <Link href="/remove-vat" className="font-medium underline underline-offset-4 hover:text-primary">
          Remove VAT
        </Link>{" "}
        calculators.
      </p>
    </>
  );
}
