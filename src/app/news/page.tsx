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
        <p className="text-muted-foreground">
          Practical reading lives in the{" "}
          <Link href="/guides" className="underline underline-offset-4 hover:text-foreground">
            guides
          </Link>
          . News is only for a topic that no guide or calculator already covers.
        </p>
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
