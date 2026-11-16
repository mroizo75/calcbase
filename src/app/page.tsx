import Link from "next/link";
import { ArrowRight, Calculator, Percent, Receipt, Store, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBox } from "@/components/layout/search-box";
import { AdBanner } from "@/components/ads/ad-banner";
import { CurrencyToggle } from "@/components/calculator/currency-toggle";

type CategoryCard = {
  title: string;
  description: string;
  icon: typeof Calculator;
  links: { label: string; href: string }[];
};

const categories: CategoryCard[] = [
  {
    title: "Pricing",
    description: "Set a price that still leaves the margin you want after VAT and fees.",
    icon: Tag,
    links: [
      { label: "Price Builder", href: "/price-builder" },
      { label: "Profit Calculator", href: "/profit-calculator" },
      { label: "Break-even Calculator", href: "/break-even-calculator" },
    ],
  },
  {
    title: "Margin and markup",
    description: "Convert between margin and markup, the two numbers that are easy to mix up.",
    icon: Percent,
    links: [
      { label: "Margin Calculator", href: "/margin-calculator" },
      { label: "Markup Calculator", href: "/markup-calculator" },
      { label: "Margin and Markup Converter", href: "/margin-markup-converter" },
    ],
  },
  {
    title: "Discounts",
    description: "See what a discount does to your price, your margin and your break-even point.",
    icon: Receipt,
    links: [
      { label: "Discount Calculator", href: "/discount-calculator" },
      { label: "Percentage Change Calculator", href: "/percentage-change-calculator" },
    ],
  },
  {
    title: "VAT and tax",
    description: "Add or remove VAT, and convert between net and gross prices.",
    icon: Calculator,
    links: [
      { label: "VAT Calculator", href: "/vat-calculator" },
      { label: "Add VAT", href: "/add-vat" },
      { label: "Remove VAT", href: "/remove-vat" },
    ],
  },
  {
    title: "Marketplace fees",
    description: "Work out what Etsy, Amazon, eBay or Shopify take from each sale.",
    icon: Store,
    links: [
      { label: "Commission Calculator", href: "/commission-calculator" },
      { label: "Price Builder with platform presets", href: "/price-builder" },
    ],
  },
];

const guides = [
  { title: "How to Price a Product", href: "/guides/how-to-price-a-product", desc: "Pricing formulas, strategies, and common mistakes to avoid." },
  { title: "Margin vs Markup", href: "/guides/margin-vs-markup", desc: "The crucial difference and why confusing them costs money." },
  { title: "VAT Explained", href: "/guides/vat-explained", desc: "What VAT is, how it works, and how it differs from sales tax." },
  { title: "Discount Impact on Margin", href: "/guides/discount-impact-on-margin", desc: "How discounts destroy profit and how much more you need to sell." },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-background to-muted/30 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The price that still leaves your margin
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Free pricing calculators for UK and US sellers and freelancers. Work out what to charge
            after VAT, platform fees and the margin you want, then see where the money goes.
          </p>
          <div className="mx-auto mb-4 max-w-md">
            <SearchBox />
          </div>
          <div className="mb-8 flex justify-center">
            <CurrencyToggle />
          </div>
          <Link
            href="/price-builder"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open the Price Builder
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">Free. No signup. UK and US.</p>
        </div>
      </section>

      <section className="py-14" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="categories-heading" className="mb-2 text-center text-2xl font-bold tracking-tight">
            Pick what you want to calculate
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Five groups, all free. Each calculator shows the formula it uses.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Card key={cat.title} className="h-full">
                <CardContent className="pt-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <cat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-semibold">{cat.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{cat.description}</p>
                  <ul className="space-y-2">
                    {cat.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm font-medium text-primary hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdBanner slot="home-below-featured" />

      <section className="border-t bg-muted/20 py-14" aria-labelledby="guides-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="guides-heading" className="mb-2 text-center text-2xl font-bold tracking-tight">
            Guides to the numbers
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Short guides that explain the formulas behind the calculators.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href}>
                <Card className="h-full transition-colors hover:border-primary/30 hover:bg-accent/50">
                  <CardContent className="pt-5">
                    <h3 className="mb-1 font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/guides" className="text-sm font-medium text-primary hover:underline">
              See all guides
            </Link>
          </div>
        </div>
      </section>

      <AdBanner slot="home-below-guides" />
    </>
  );
}
