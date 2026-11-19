import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSanityClient, isSanityConfigured } from "@/sanity/lib/client";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import type { ArticleSummary } from "@/sanity/types";
import { categoryLabels } from "@/sanity/types";
import { retiredArticleDestinations } from "@/lib/seo/redirects";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "News – Only Topics No Guide or Calculator Covers Yet",
  description:
    "News is reserved for a topic no calculator or guide already covers. VAT, margin, markup, fees, and pricing for UK and US sellers live in the tools and guides.",
  canonical: "/news",
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const published: ArticleSummary[] = isSanityConfigured()
    ? await getSanityClient().fetch(ARTICLES_QUERY).catch(() => [])
    : [];
  const articles = published.filter((article) => !retiredArticleDestinations[article.slug]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "News" }]} />

      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        News
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
        A page here only exists when the topic is not already covered by a calculator or a guide.
        Pricing, VAT, margin, and fees live in those tools.
      </p>

      {articles.length === 0 ? (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Practical reading lives in the{" "}
            <Link href="/guides" className="underline underline-offset-4 hover:text-foreground">
              guides
            </Link>
            . News is only for a topic that no guide or calculator already covers.
          </p>
          <Card>
            <CardContent className="pt-5">
              <h2 className="mb-2 font-semibold">Start with the tools</h2>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/price-builder" className="underline underline-offset-4 hover:text-foreground">Price Builder</Link>
                  {" "}— the price that still hits your margin after VAT and fees.
                </li>
                <li>
                  <Link href="/marketplace-profit-calculator" className="underline underline-offset-4 hover:text-foreground">Marketplace Profit Calculator</Link>
                  {" "}— profit per sale on Etsy, eBay and Amazon.
                </li>
                <li>
                  <Link href="/commission-calculator" className="underline underline-offset-4 hover:text-foreground">Commission Calculator</Link>
                  {" "}— commission from a sale and a rate.
                </li>
                <li>
                  <Link href="/reverse-commission-calculator" className="underline underline-offset-4 hover:text-foreground">Reverse Commission Calculator</Link>
                  {" "}— the sales you need for a commission target.
                </li>
                <li>
                  <Link href="/percentage-change-calculator" className="underline underline-offset-4 hover:text-foreground">Percentage Change Calculator</Link>
                  {" "}— increase or decrease between two values.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-muted/30">
            <CardContent className="pt-5">
              <h2 className="mb-2 font-semibold">Read the guides</h2>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/guides/how-to-calculate-discount" className="underline underline-offset-4 hover:text-foreground">How to Calculate Discount</Link>
                  {" "}— formulas, stacking and reverse calculations.
                </li>
                <li>
                  <Link href="/guides/margin-vs-markup" className="underline underline-offset-4 hover:text-foreground">Margin vs Markup</Link>
                  {" "}— why the two numbers differ.
                </li>
                <li>
                  <Link href="/guides/how-to-calculate-sales-commission" className="underline underline-offset-4 hover:text-foreground">How to Calculate Sales Commission</Link>
                  {" "}— tiered rates and gross versus net sales.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Link key={article._id} href={`/news/${article.slug}`}>
              <Card className="transition-colors hover:border-primary/30 hover:bg-accent/50">
                <CardContent className="flex items-start justify-between gap-4 pt-5">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {categoryLabels[article.category] ?? article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h2 className="font-semibold">{article.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
