import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getGuidesForCalculator } from "@/lib/guides/registry";

interface RelatedGuidesProps {
  calculatorSlug: string;
}

export function RelatedGuides({ calculatorSlug }: RelatedGuidesProps) {
  const guides = getGuidesForCalculator(calculatorSlug);
  if (guides.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">Learn More</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
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
  );
}
