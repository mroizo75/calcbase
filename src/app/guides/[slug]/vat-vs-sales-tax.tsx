import Link from "next/link";

export function VatVsSalesTaxContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">Two Systems, One Purpose</h2>
      <p>
        Both VAT (Value Added Tax) and sales tax are consumption taxes — they increase the price
        consumers pay for goods and services, and the revenue goes to the government. However, the
        mechanics of how each tax is collected, who is responsible at each stage, and how the tax
        cascades through the supply chain are fundamentally different. Understanding these
        differences matters whether you are pricing products, expanding internationally, or simply
        trying to make sense of a receipt.
      </p>

      <h2 className="text-xl font-semibold">How VAT Works</h2>
      <p>
        VAT is a multi-stage tax. Every business in the supply chain charges VAT on its sales
        (output tax) and reclaims the VAT it paid on its purchases (input tax). The business remits
        only the difference to the tax authority. This means the tax is collected incrementally at
        each stage of production and distribution, but the cumulative burden falls entirely on the
        end consumer.
      </p>
      <p>
        Consider a simplified example in the UK at the standard 20% rate. A raw materials supplier
        sells goods worth £100 to a manufacturer and charges £20 VAT (total £120). The manufacturer
        turns those materials into a finished product and sells it to a retailer for £200 plus £40
        VAT (total £240). The manufacturer remits £40 − £20 = £20 to HMRC. The retailer sells the
        product to a consumer for £300 plus £60 VAT (total £360). The retailer remits £60 − £40 =
        £20. Total VAT collected by the government: £20 + £20 + £20 = £60 — exactly 20% of the
        final retail price of £300.
      </p>

      <h2 className="text-xl font-semibold">How Sales Tax Works</h2>
      <p>
        Sales tax is a single-stage tax collected only at the final point of sale to the consumer.
        Businesses earlier in the chain — manufacturers, wholesalers, distributors — do not charge or
        collect sales tax on their B2B transactions. The retailer adds the tax to the consumer price
        and remits the full amount to the state or local government.
      </p>
      <p>
        In the United States, sales tax rates vary by state, county, and city. A purchase in
        Portland, Oregon carries 0% sales tax, while the same item in Chicago, Illinois might carry
        a combined rate exceeding 10%. There is no federal sales tax in the US — each of the 45
        states that levy sales tax sets its own rate and rules independently.
      </p>

      <h2 className="text-xl font-semibold">Key Differences at a Glance</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Feature</th>
              <th className="py-2 text-left font-medium">VAT</th>
              <th className="py-2 text-left font-medium">Sales Tax</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Collection point</td>
              <td className="py-2">Every stage of the supply chain</td>
              <td className="py-2">Final sale to the consumer only</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Who collects</td>
              <td className="py-2">All VAT-registered businesses</td>
              <td className="py-2">Retailers (final sellers)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Cascading / tax-on-tax</td>
              <td className="py-2">No — input tax is credited</td>
              <td className="py-2">Possible if applied at multiple levels</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Price transparency</td>
              <td className="py-2">Often included in displayed price</td>
              <td className="py-2">Added at checkout (US convention)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Compliance complexity</td>
              <td className="py-2">Higher — every business files returns</td>
              <td className="py-2">Lower — only retailers file</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-foreground">Fraud resistance</td>
              <td className="py-2">Stronger — self-policing chain</td>
              <td className="py-2">Weaker — single point of collection</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-foreground">Typical adopters</td>
              <td className="py-2">170+ countries (UK, EU, Australia, India)</td>
              <td className="py-2">US states, some Canadian provinces</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">Which Countries Use VAT vs Sales Tax?</h2>
      <p>
        The vast majority of the world uses VAT or GST. The European Union requires all member
        states to operate a VAT system. The UK retained VAT after Brexit. Australia, New Zealand,
        India, Japan, South Korea, Brazil, Mexico, and South Africa all use VAT or GST variants.
        For a full list of current rates, see our{" "}
        <Link href="/guides/vat-rates-by-country" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT Rates by Country
        </Link>{" "}
        guide.
      </p>
      <p>
        The United States is the largest economy that does not use a national VAT. Instead, 45
        states levy their own sales taxes, and many allow counties and cities to add surcharges.
        Canada uses a hybrid model: a federal GST of 5% operates alongside provincial sales taxes
        (PST) in some provinces, while others combine both into a Harmonized Sales Tax (HST).
      </p>

      <h2 className="text-xl font-semibold">Impact on Prices</h2>
      <p>
        In VAT countries, the displayed price in shops typically includes the tax. A £120 price tag
        in the UK means the consumer pays £120, and the retailer extracts £20 as VAT. In the US,
        prices are displayed before tax — a $100 item might cost $108.75 at the register once state
        and local sales tax is added. This difference in convention causes confusion for shoppers
        crossing between systems.
      </p>
      <p>
        For businesses, VAT is theoretically neutral because input VAT is reclaimed. The cost is
        passed entirely to the final consumer. Sales tax is also intended to be consumer-borne, but
        because businesses in the supply chain cannot reclaim taxes paid on their own purchases (like
        office equipment or supplies), there can be hidden tax costs embedded in B2B prices, a
        phenomenon known as tax cascading.
      </p>

      <h2 className="text-xl font-semibold">Which Is Better for Businesses?</h2>
      <p>
        Neither system is inherently better — each has trade-offs. VAT spreads the compliance burden
        across every business in the supply chain. This makes it harder to evade (since each
        business in the chain has an incentive to ensure the previous one reported correctly), but it
        also means higher administrative costs. Small businesses in VAT countries must register once
        they exceed the threshold, maintain VAT records, and file periodic returns.
      </p>
      <p>
        Sales tax concentrates the compliance burden on retailers. This simplifies matters for
        manufacturers and wholesalers, but creates a single point of failure for tax collection. If
        a retailer fails to collect or remit the tax, the government loses the entire amount.
        Online retail has further complicated US sales tax since the 2018 Supreme Court decision in
        <em> South Dakota v. Wayfair</em>, which allows states to require out-of-state sellers to
        collect sales tax based on economic nexus.
      </p>
      <p>
        For international businesses, understanding both systems is essential. Selling into the UK
        or EU means dealing with VAT registration, compliance, and returns. Selling into the US
        means navigating thousands of state and local tax jurisdictions.
      </p>

      <h2 className="text-xl font-semibold">Calculate Either Tax Instantly</h2>
      <p>
        Use the{" "}
        <Link href="/vat-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT Calculator
        </Link>{" "}
        to add or remove VAT at any rate, or the{" "}
        <Link href="/sales-tax-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Sales Tax Calculator
        </Link>{" "}
        for US-style tax calculations. You can also{" "}
        <Link href="/add-vat" className="font-medium underline underline-offset-4 hover:text-primary">
          Add VAT
        </Link>{" "}
        or{" "}
        <Link href="/remove-vat" className="font-medium underline underline-offset-4 hover:text-primary">
          Remove VAT
        </Link>{" "}
        directly with our specialized tools.
      </p>
      <p>
        For a deeper explanation of how VAT works including registration thresholds and filing
        obligations, see{" "}
        <Link href="/guides/vat-explained" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT Explained
        </Link>
        .
      </p>
    </>
  );
}
