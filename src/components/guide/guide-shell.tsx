import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getCalculator } from "@/lib/calculators/registry";
import { getRelatedGuides } from "@/lib/guides/registry";
import { AdBanner } from "@/components/ads/ad-banner";
import { buildGuidePageGraph } from "@/lib/seo/schema";
import type { GuideConfig } from "@/lib/guides/types";

interface GuideShellProps {
  config: GuideConfig;
  children: React.ReactNode;
}

export function GuideShell({ config, children }: GuideShellProps) {
  const relatedCalcs = config.relatedCalculators
    .map((slug) => getCalculator(slug))
    .filter(Boolean);
  const relatedGuides = getRelatedGuides(config.slug);

  const graph = buildGuidePageGraph({
    title: config.title,
    description: config.description,
    canonical: config.seo.canonical,
    datePublished: config.publishedDate,
    dateModified: config.updatedDate,
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <Breadcrumb
        items={[
          { label: "Guides", href: "/guides" },
          { label: config.title },
        ]}
      />

      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {config.title}
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">{config.description}</p>

      <div className="prose-content space-y-6 text-base leading-relaxed">
        {children}
      </div>

      <AdBanner slot="guide-mid-content" />

      {relatedCalcs.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Try the Calculator</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedCalcs.map((calc) => calc && (
              <Link key={calc.slug} href={`/${calc.slug}`}>
                <Card className="transition-colors hover:border-primary/30 hover:bg-accent/50">
                  <CardContent className="flex items-center justify-between pt-5">
                    <div>
                      <h3 className="font-medium">{calc.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{calc.shortDescription}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Related Guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className="transition-colors hover:border-primary/30 hover:bg-accent/50">
                  <CardContent className="flex items-center gap-3 pt-5">
                    <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{guide.title}</h3>
                      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                        {guide.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdBanner slot="guide-below-content" />

      <p className="mt-10 text-xs text-muted-foreground">
        This guide is for educational purposes. Always consult a qualified professional for
        decisions affecting your finances, taxes, or business.
      </p>
    </article>
  );
}
