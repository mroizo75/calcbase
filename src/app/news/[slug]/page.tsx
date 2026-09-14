import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { calculators } from "@/lib/calculators/registry";
import { getSanityClient, isSanityConfigured } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { portableTextComponents } from "@/sanity/lib/portableText";
import type { Article } from "@/sanity/types";
import { categoryLabels } from "@/sanity/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  const slugs: { slug: string }[] = await getSanityClient()
    .fetch(ARTICLE_SLUGS_QUERY)
    .catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article: Article | null = await getSanityClient()
    .fetch(ARTICLE_BY_SLUG_QUERY, { slug })
    .catch(() => null);
  if (!article) return {};
  return buildPageMetadata({
    title: `${article.title} | CalcBase`,
    description: article.excerpt,
    canonical: `/news/${slug}`,
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article: Article | null = await getSanityClient()
    .fetch(ARTICLE_BY_SLUG_QUERY, { slug })
    .catch(() => null);

  if (!article) notFound();

  const relatedCalcs = calculators.filter(
    (c) => article.relatedCalculators?.includes(c.slug),
  );
  const coverUrl = article.coverImage?.asset?.url;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />

      <Link
        href="/news"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to News
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Tag className="h-3 w-3" />
            {categoryLabels[article.category] ?? article.category}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
      </header>

      {coverUrl ? (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={coverUrl}
            alt={article.coverImage?.alt || article.title}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      ) : null}

      <article className="prose-base space-y-4">
        <PortableText value={article.body} components={portableTextComponents} />
      </article>

      {relatedCalcs.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="mb-4 text-lg font-semibold">Related Calculators</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedCalcs.map((calc) => (
              <Link key={calc.slug} href={`/${calc.slug}`}>
                <Card className="h-full transition-colors hover:border-primary/30 hover:bg-accent/50">
                  <CardContent className="pt-4">
                    <p className="font-medium">{calc.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{calc.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
