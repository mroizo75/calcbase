import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getRelatedCalculators } from "@/lib/calculators/registry";

interface RelatedCalculatorsProps {
  currentSlug: string;
}

export function RelatedCalculators({ currentSlug }: RelatedCalculatorsProps) {
  const related = getRelatedCalculators(currentSlug);
  if (related.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">Related Calculators</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((calc) => (
          <Link key={calc.slug} href={`/${calc.slug}`}>
            <Card className="transition-colors hover:border-primary/30 hover:bg-accent/50">
              <CardContent className="flex items-center justify-between pt-5">
                <div>
                  <h3 className="font-medium">{calc.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {calc.shortDescription}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
