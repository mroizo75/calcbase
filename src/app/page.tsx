import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  Check,
  Globe,
  Percent,
  Receipt,
  ShieldCheck,
  Store,
  Tag,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBox } from "@/components/layout/search-box";
import { AdBanner } from "@/components/ads/ad-banner";
import { CurrencyToggle } from "@/components/calculator/currency-toggle";
import { HeroPreview } from "@/components/home/hero-preview";
import { getBaseUrl } from "@/lib/utils/urls";

export const metadata: Metadata = {
  title: "Profit, Margin & VAT Calculators for Sellers",
  description:
    "Free profit, margin, markup, VAT and marketplace fee calculators for UK and US sellers. Work out the price you need before you publish it.",
  alternates: { canonical: getBaseUrl() },
  robots: { index: true, follow: true },
};

type CategoryCard = {
  title: string;
  description: string;
  icon: typeof Calculator;
  links: { label: string; href: string }[];
};

const benefits = [
  { icon: Zap, title: "Instant results", text: "Change one number and every result updates at once." },
  { icon: Globe, title: "USD and GBP", text: "Switch currency in one click. Formulas stay the same." },
  { icon: ShieldCheck, title: "Free, no signup", text: "Open the page and start calculating. Nothing to install." },
];

const categories: CategoryCard[] = [
  {
    title: "Pricing",
    description: "Set a selling price that still covers VAT, fees and the margin you want.",
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

const steps = [
  {
    n: "1",
    title: "Start with your cost",
    text: "Add the purchase price, packaging and shipping. That is your real cost per unit.",
  },
  {
    n: "2",
    title: "Add the margin you need",
    text: "Set the profit you want to keep per sale. The Price Builder shows the price that delivers it.",
  },
  {
    n: "3",
    title: "Add fees and VAT",
    text: "Include marketplace commission and payment fees. Then check the result as profit per sale and as a percentage.",
  },
];

const guides = [
  { title: "How to Price a Product", href: "/guides/how-to-price-a-product", desc: "Pricing formulas, strategies and the mistakes that cost sellers margin." },
  { title: "Margin vs Markup", href: "/guides/margin-vs-markup", desc: "The difference between margin and markup, with examples in dollars and pounds." },
  { title: "VAT Explained", href: "/guides/vat-explained", desc: "How VAT works, when you must charge it and how it changes your prices." },
  { title: "Discount Impact on Margin", href: "/guides/discount-impact-on-margin", desc: "Why a small discount can wipe out profit, and how many more sales you need." },
];

const faqs = [
  {
    q: "How do I calculate profit margin?",
    a: "Subtract your cost from your selling price, divide the result by the selling price and multiply by 100. For example, a $50 item that costs $30 gives a profit of $20 and a margin of 40%. The profit calculator does this for you and shows each step.",
  },
  {
    q: "What is the difference between margin and markup?",
    a: "Margin is profit as a share of the selling price. Markup is profit as a share of the cost. A 50% markup gives a margin of 33.3%, not 50%. The margin vs markup guide has a conversion table.",
  },
  {
    q: "Can I use the calculators for VAT and US sales tax?",
    a: "The VAT calculators add or remove UK-style VAT from a price. US sales tax depends on the state and the buyer's location, so the calculators do not replace a tax advisor. They do show the net and gross amounts clearly.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePrototype() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 px-4 py-14 text-white sm:px-6 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
              Free for UK and US sellers
            </p>
            <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Profit, Margin and VAT Calculators for Sellers
            </h1>
            <p className="mb-5 text-xl font-medium text-zinc-200">
              The price that still leaves your margin
            </p>
            <p className="mb-8 max-w-xl text-base text-zinc-300 sm:text-lg">
              Enter your cost and the margin you want. Add VAT and marketplace fees, and see where every
              dollar or pound goes before you publish a price.
            </p>
            <div className="mb-6 max-w-md rounded-xl bg-background p-4 text-foreground shadow-lg">
              <SearchBox />
              <div className="mt-4 flex justify-start">
                <CurrencyToggle />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/price-builder"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                Open the Price Builder
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="text-sm text-zinc-400">No signup. Works in $ and £.</p>
            </div>
          </div>
          <div className="w-full max-w-md justify-self-center lg:justify-self-end">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="border-b bg-background" aria-label="Why use CalcBase">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {benefits.map((b) => (
            <li key={b.title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <b.icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="py-16" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-primary">
            Calculators
          </p>
          <h2 id="categories-heading" className="mb-3 text-center text-3xl font-bold tracking-tight">
            Pick what you want to calculate
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
            Five groups, all free. Each calculator shows the formula it uses.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Card
                key={cat.title}
                className="h-full border-border/70 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <cat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{cat.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{cat.description}</p>
                  <ul className="space-y-2 border-t pt-4">
                    {cat.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between text-sm font-medium text-foreground hover:text-primary"
                        >
                          {link.label}
                          <ArrowRight
                            className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
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

      {/* How to price */}
      <section className="border-t bg-muted/20 py-16" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="how-heading" className="mb-3 text-center text-3xl font-bold tracking-tight">
            How to price a product in three steps
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
            The same order works for a handmade item, a store product or a marketplace listing.
          </p>
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border bg-background p-6">
                <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {s.n}
                </span>
                <h3 className="mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-muted-foreground">
            <p>
              VAT is handled separately. In the UK, VAT is added on top of the net price for most businesses
              above the registration threshold. In the US, sales tax depends on the state and is usually
              charged to the buyer, so it should not reduce your margin. Use the{" "}
              <Link href="/vat-calculator" className="font-medium text-primary hover:underline">
                VAT calculators
              </Link>{" "}
              to convert between net and gross prices.
            </p>
            <p>
              Not sure whether you need margin or markup? Read{" "}
              <Link href="/guides/margin-vs-markup" className="font-medium text-primary hover:underline">
                Margin vs Markup
              </Link>
              . To see how a sale changes your numbers, try the{" "}
              <Link href="/discount-calculator" className="font-medium text-primary hover:underline">
                Discount Calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <AdBanner slot="home-below-featured" />

      {/* Guides */}
      <section className="py-16" aria-labelledby="guides-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="guides-heading" className="mb-3 text-center text-3xl font-bold tracking-tight">
            Guides to the numbers
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            Short guides that explain the formulas behind the calculators.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="group block">
                <Card className="h-full border-border/70 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="mb-2 font-semibold group-hover:text-primary">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/guides" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              See all guides
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t py-16" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 id="faq-heading" className="mb-8 text-center text-3xl font-bold tracking-tight">
            Common questions
          </h2>
          <div className="divide-y rounded-xl border bg-background">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AdBanner slot="home-below-guides" />
    </>
  );
}
