import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { calculators } from "@/lib/calculators/registry";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Business Calculators – VAT, Margin, ROI, Sales Tax & More",
  description:
    "Browse all 12 free calculators: VAT, sales tax, profit margin, markup, ROI, commission, discount, and break-even. Accurate, instant results for business professionals.",
  canonical: "/calculators",
});

const categoryLabels: Record<string, string> = {
  vat: "VAT & Tax",
  pricing: "Pricing",
  business: "Business",
};

export default function CalculatorsPage() {
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Calculators" }]} />

      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        All Calculators
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
        Free, accurate business calculators — from VAT and margins to break-even analysis.
        Pick a calculator to get started.
      </p>

      {Object.entries(grouped).map(([category, calcs]) => (
        <section key={category} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">{categoryLabels[category] ?? category}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calcs.map((calc) => (
              <Link key={calc.slug} href={`/${calc.slug}`}>
                <Card className="h-full transition-colors hover:border-primary/30 hover:bg-accent/50">
                  <CardContent className="pt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="font-semibold">{calc.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[calc.category] ?? calc.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {calc.shortDescription}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
