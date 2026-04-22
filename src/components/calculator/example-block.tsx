import type { WorkedExample } from "@/lib/calculators/types";
import { Card, CardContent } from "@/components/ui/card";

interface ExampleBlockProps {
  examples: WorkedExample[];
}

export function ExampleBlock({ examples }: ExampleBlockProps) {
  if (examples.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">Worked Examples</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {examples.map((ex) => (
          <Card key={ex.title}>
            <CardContent className="pt-5">
              <h3 className="mb-1 font-medium">{ex.title}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{ex.description}</p>
              <dl className="mb-3 space-y-1">
                {Object.entries(ex.inputs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="font-medium tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="rounded bg-muted/60 px-3 py-2 text-sm font-medium">
                {ex.result}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
