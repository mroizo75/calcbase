import Link from "next/link";
import { ArrowRight, Calculator, Zap, Shield, Globe, Share2, FileText, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBox } from "@/components/layout/search-box";
import { AdBanner } from "@/components/ads/ad-banner";
import { calculators } from "@/lib/calculators/registry";

const categoryLabels: Record<string, string> = {
  vat: "VAT & Tax",
  pricing: "Pricing",
  business: "Business",
};

const whyReasons = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "Calculations update in real time as you type. No page reloads, no waiting.",
  },
  {
    icon: Shield,
    title: "Accurate & Transparent",
    description: "Every calculator shows the formula used and step-by-step breakdowns so you can verify results.",
  },
  {
    icon: Globe,
    title: "International Support",
    description: "Built-in VAT rates for the UK, EU, Australia, Canada, and more. Works for any currency.",
  },
  {
    icon: Calculator,
    title: "Built for Business",
    description: "Focused on the calculations businesses actually need — margins, markup, VAT, and break-even analysis.",
  },
];

const features = [
  {
    icon: Share2,
    title: "Shareable Links",
    description: "Share any calculation with pre-filled values. Recipients see exactly what you calculated.",
  },
  {
    icon: FileText,
    title: "Export to PDF & CSV",
    description: "Download results as a professional PDF summary or a spreadsheet-ready CSV file.",
  },
  {
    icon: History,
    title: "Calculation History",
    description: "Your recent calculations are saved locally so you can quickly revisit them from the search bar.",
  },
];

export default function HomePage() {
  const grouped = calculators.reduce<Record<string, typeof calculators>>(
    (acc, calc) => {
      const cat = calc.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(calc);
      return acc;
    },
    {},
  );

  return (
    <>
      <section className="border-b bg-gradient-to-b from-background to-muted/30 px-4 py-12 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The base for practical business calculations
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Free online calculators for VAT, profit margins, markup, discounts, and break-even analysis.
            Accurate, fast, and built for professionals.
          </p>
          <div className="mx-auto mb-6 max-w-md">
            <SearchBox />
          </div>
          <Link
            href="/vat-calculator"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try the VAT Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">
            All Calculators
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Choose a calculator to get started — all free, no signup required.
          </p>
          {Object.entries(grouped).map(([category, calcs]) => (
            <div key={category} className="mb-8 last:mb-0">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {categoryLabels[category] ?? category}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {calcs.map((calc) => (
                  <Link key={calc.slug} href={`/${calc.slug}`}>
                    <Card className="h-full transition-colors hover:border-primary/30 hover:bg-accent/50">
                      <CardContent className="pt-5">
                        <h4 className="mb-1 font-semibold">{calc.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {calc.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdBanner slot="home-below-featured" />

      <section className="border-t bg-muted/20 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
            Why CalcBase?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyReasons.map((reason) => (
              <div key={reason.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <reason.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">
            Powerful Features
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            More than a calculator — tools designed for how you actually work.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/20 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Learn the Fundamentals
          </h2>
          <p className="mb-8 text-muted-foreground">
            Short, practical guides that explain the formulas and concepts behind each calculator.
          </p>
          <div className="grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "VAT Explained", href: "/guides/vat-explained", desc: "What VAT is, how it works, and how it differs from sales tax." },
              { title: "VAT Rates by Country", href: "/guides/vat-rates-by-country", desc: "Complete 2026 reference of VAT and GST rates for major economies." },
              { title: "VAT vs Sales Tax", href: "/guides/vat-vs-sales-tax", desc: "Key differences between VAT and sales tax explained simply." },
              { title: "Margin vs Markup", href: "/guides/margin-vs-markup", desc: "The crucial difference and why confusing them costs money." },
              { title: "How to Price a Product", href: "/guides/how-to-price-a-product", desc: "Pricing formulas, strategies, and common mistakes to avoid." },
              { title: "Pricing Strategy Guide", href: "/guides/pricing-strategy-explained", desc: "Cost-plus, value-based, competitive, and premium pricing." },
              { title: "How to Calculate ROI", href: "/guides/how-to-calculate-roi", desc: "ROI formula, worked examples, and common pitfalls." },
              { title: "Discount Impact on Margin", href: "/guides/discount-impact-on-margin", desc: "How discounts destroy profit and how much more you need to sell." },
              { title: "How to Calculate Discount", href: "/guides/how-to-calculate-discount", desc: "Percentage discounts, stacking, and reverse calculations." },
              { title: "Break-even Formula", href: "/guides/break-even-formula", desc: "Fixed costs, variable costs, and finding your break-even point." },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href}>
                <Card className="transition-colors hover:border-primary/30 hover:bg-accent/50">
                  <CardContent className="pt-5">
                    <h3 className="mb-1 font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdBanner slot="home-below-guides" />
    </>
  );
}
