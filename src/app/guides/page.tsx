import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { guides } from "@/lib/guides/registry";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Guides – VAT, Pricing, ROI, Margins & Tax | CalcBase",
  description:
    "Practical guides on VAT, sales tax, profit margins, markup, ROI, pricing strategy, discounts, and break-even analysis. Clear formulas, worked examples, and calculator links.",
  canonical: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Guides" }]} />

      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Guides
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
        Short, practical guides that explain the formulas and concepts behind each calculator.
        Written for business owners, freelancers, and anyone who wants to understand the math.
      </p>

      <div className="grid gap-4">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <Card className="transition-colors hover:border-primary/30 hover:bg-accent/50">
              <CardContent className="flex items-center justify-between pt-5">
                <div>
                  <h2 className="font-semibold">{guide.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
                </div>
                <ArrowRight className="ml-4 h-5 w-5 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
