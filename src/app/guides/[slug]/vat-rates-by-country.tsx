import Link from "next/link";

export function VatRatesByCountryContent() {
  return (
    <>
      <h2 className="text-xl font-semibold">What Is VAT?</h2>
      <p>
        Value Added Tax (VAT) is a consumption tax levied on goods and services at each stage of the
        supply chain. Unlike a single-stage sales tax, VAT is collected incrementally — every
        business charges VAT on its sales and reclaims the VAT it paid on its purchases. The end
        consumer bears the full tax burden. Governments worldwide rely on VAT because it is
        self-policing and generates substantial revenue.
      </p>
      <p>
        Over 170 countries now operate a VAT or GST (Goods and Services Tax) system. The names
        differ, but the mechanism is essentially the same: tax is applied to the value added at each
        stage of production and distribution, and only the final consumer cannot reclaim it.
      </p>

      <h2 className="text-xl font-semibold">Standard VAT &amp; GST Rates by Country (2026)</h2>
      <p>
        The table below lists current standard and reduced VAT/GST rates for major economies. Rates
        are subject to change — always verify with the relevant tax authority before filing.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Country</th>
              <th className="py-2 text-left font-medium">Tax Type</th>
              <th className="py-2 text-left font-medium">Standard Rate</th>
              <th className="py-2 text-left font-medium">Reduced Rate(s)</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b"><td className="py-2">United Kingdom</td><td>VAT</td><td>20%</td><td>5%, 0%</td></tr>
            <tr className="border-b"><td className="py-2">Germany</td><td>VAT (MwSt)</td><td>19%</td><td>7%</td></tr>
            <tr className="border-b"><td className="py-2">France</td><td>VAT (TVA)</td><td>20%</td><td>10%, 5.5%, 2.1%</td></tr>
            <tr className="border-b"><td className="py-2">Italy</td><td>VAT (IVA)</td><td>22%</td><td>10%, 5%, 4%</td></tr>
            <tr className="border-b"><td className="py-2">Spain</td><td>VAT (IVA)</td><td>21%</td><td>10%, 4%</td></tr>
            <tr className="border-b"><td className="py-2">Netherlands</td><td>VAT (BTW)</td><td>21%</td><td>9%</td></tr>
            <tr className="border-b"><td className="py-2">Belgium</td><td>VAT (BTW/TVA)</td><td>21%</td><td>12%, 6%</td></tr>
            <tr className="border-b"><td className="py-2">Ireland</td><td>VAT</td><td>23%</td><td>13.5%, 9%, 0%</td></tr>
            <tr className="border-b"><td className="py-2">Sweden</td><td>VAT (Moms)</td><td>25%</td><td>12%, 6%</td></tr>
            <tr className="border-b"><td className="py-2">Denmark</td><td>VAT (Moms)</td><td>25%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">Norway</td><td>VAT (MVA)</td><td>25%</td><td>15%, 12%</td></tr>
            <tr className="border-b"><td className="py-2">Poland</td><td>VAT</td><td>23%</td><td>8%, 5%</td></tr>
            <tr className="border-b"><td className="py-2">Austria</td><td>VAT (USt)</td><td>20%</td><td>13%, 10%</td></tr>
            <tr className="border-b"><td className="py-2">Portugal</td><td>VAT (IVA)</td><td>23%</td><td>13%, 6%</td></tr>
            <tr className="border-b"><td className="py-2">Switzerland</td><td>VAT (MWST)</td><td>8.1%</td><td>3.8%, 2.6%</td></tr>
            <tr className="border-b"><td className="py-2">Australia</td><td>GST</td><td>10%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">New Zealand</td><td>GST</td><td>15%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">Canada</td><td>GST/HST</td><td>5%</td><td>Varies by province (HST 13–15%)</td></tr>
            <tr className="border-b"><td className="py-2">India</td><td>GST</td><td>18%</td><td>5%, 12%, 28%</td></tr>
            <tr className="border-b"><td className="py-2">South Africa</td><td>VAT</td><td>15%</td><td>0% (basic food)</td></tr>
            <tr className="border-b"><td className="py-2">Japan</td><td>Consumption Tax</td><td>10%</td><td>8% (food &amp; beverages)</td></tr>
            <tr className="border-b"><td className="py-2">Singapore</td><td>GST</td><td>9%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">Brazil</td><td>ICMS/IPI</td><td>17–25%</td><td>Varies by state &amp; product</td></tr>
            <tr className="border-b"><td className="py-2">Mexico</td><td>VAT (IVA)</td><td>16%</td><td>0% (food, medicines)</td></tr>
            <tr className="border-b"><td className="py-2">South Korea</td><td>VAT</td><td>10%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">Thailand</td><td>VAT</td><td>7%</td><td>—</td></tr>
            <tr className="border-b"><td className="py-2">Turkey</td><td>VAT (KDV)</td><td>20%</td><td>10%, 1%</td></tr>
            <tr><td className="py-2">United Arab Emirates</td><td>VAT</td><td>5%</td><td>0% (certain sectors)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold">Standard vs Reduced Rates</h2>
      <p>
        Most countries that levy VAT apply a standard rate to the majority of goods and services,
        alongside one or more reduced rates for specific categories. Reduced rates typically apply
        to essential items such as food, children&apos;s clothing, books, public transport, and
        medical supplies. Some jurisdictions also apply a zero rate — the item is technically taxable
        but at 0%, allowing the seller to reclaim input VAT.
      </p>
      <p>
        The distinction matters because the applicable rate directly affects the final price a
        consumer pays. A product taxed at the UK reduced rate of 5% costs significantly less than
        the same product at the standard 20%. Businesses selling mixed-rate goods need systems that
        apply the correct rate to each line item — errors lead to under- or over-collection and
        potential penalties from the tax authority.
      </p>
      <p>
        Zero-rated goods (common in the UK for food staples and children&apos;s clothes) benefit the
        seller: they charge 0% to customers but can still reclaim the VAT paid on business inputs.
        Exempt goods, by contrast, carry no VAT charge but the seller cannot reclaim input VAT
        either — a critical difference for cash flow.
      </p>

      <h2 className="text-xl font-semibold">Regional Highlights</h2>

      <h3 className="font-medium">European Union</h3>
      <p>
        EU member states must maintain a standard VAT rate of at least 15%. In practice, rates range
        from 17% (Luxembourg) to 27% (Hungary). Cross-border sales within the EU follow special
        rules, including the One Stop Shop (OSS) scheme for digital services, which allows
        businesses to file a single VAT return for all EU sales.
      </p>

      <h3 className="font-medium">Asia-Pacific</h3>
      <p>
        GST systems in Australia (10%), New Zealand (15%), and Singapore (9%) are broad-based with
        few exemptions. India&apos;s GST, introduced in 2017, replaced a patchwork of central and
        state taxes with a four-tier structure (5%, 12%, 18%, 28%). Japan&apos;s consumption tax sits
        at 10% with a reduced 8% rate for food and non-alcoholic beverages.
      </p>

      <h3 className="font-medium">Americas</h3>
      <p>
        Canada combines a federal GST (5%) with provincial sales taxes, resulting in effective rates
        of 5% to 15% depending on province. Brazil operates one of the most complex indirect tax
        systems in the world, with multiple overlapping state and federal levies. Mexico applies a
        flat 16% IVA with a 0% rate on food and medicines.
      </p>

      <h2 className="text-xl font-semibold">How to Use These Rates</h2>
      <p>
        If you know the net (pre-tax) price of a product or service, multiply by the applicable VAT
        rate to find the tax amount. For a £500 item in the UK at 20%: £500 × 0.20 = £100 VAT, so
        the gross price is £600. To extract the VAT from a gross price, divide by (1 + rate). For
        the same £600: £600 ÷ 1.20 = £500 net.
      </p>
      <p>
        Use the{" "}
        <Link href="/vat-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT Calculator
        </Link>{" "}
        to compute VAT for any rate instantly, or jump directly to{" "}
        <Link href="/add-vat" className="font-medium underline underline-offset-4 hover:text-primary">
          Add VAT
        </Link>{" "}
        or{" "}
        <Link href="/remove-vat" className="font-medium underline underline-offset-4 hover:text-primary">
          Remove VAT
        </Link>{" "}
        for the specific calculation you need. If you operate in the US and deal with sales tax
        instead, try the{" "}
        <Link href="/sales-tax-calculator" className="font-medium underline underline-offset-4 hover:text-primary">
          Sales Tax Calculator
        </Link>
        .
      </p>
      <p>
        For a broader explanation of how VAT works, including registration thresholds and filing
        requirements, see our guide on{" "}
        <Link href="/guides/vat-explained" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT Explained
        </Link>
        . To understand how VAT compares to US-style sales tax, read{" "}
        <Link href="/guides/vat-vs-sales-tax" className="font-medium underline underline-offset-4 hover:text-primary">
          VAT vs Sales Tax
        </Link>
        .
      </p>
    </>
  );
}
