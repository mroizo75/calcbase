import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import type { ArticleSummary } from "@/sanity/types";
import { categoryLabels } from "@/sanity/types";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Business & Tax News – Finance Updates | CalcBase",
  description:
    "Daily news and analysis on VAT changes, tax law updates, pricing strategy, and business finance. Stay current with economic developments that affect your business.",
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
  const articles: ArticleSummary[] = isSanityConfigured()
    ? await client.fetch(ARTICLES_QUERY).catch(() => [])
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "News" }]} />

      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Business &amp; Tax News
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
        Daily updates on VAT, tax law changes, pricing strategy, and economic developments
        relevant to business owners and finance professionals.
      </p>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">No articles published yet. Check back soon.</p>
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
