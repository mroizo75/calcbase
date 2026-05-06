import { Suspense } from "react";
import type { CalculatorConfig } from "@/lib/calculators/types";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { FormulaBlock } from "./formula-block";
import { ExampleBlock } from "./example-block";
import { FaqBlock } from "./faq-block";
import { RelatedCalculators } from "./related-calculators";
import { RelatedGuides } from "./related-guides";
import { AdBanner } from "@/components/ads/ad-banner";
import { AdSidebar } from "@/components/ads/ad-sidebar";
import { buildCalculatorPageGraph } from "@/lib/seo/schema";

interface CalculatorShellProps {
  config: CalculatorConfig;
  children: React.ReactNode;
}

export function CalculatorShell({ config, children }: CalculatorShellProps) {
  const graph = buildCalculatorPageGraph(config);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <div className="flex gap-8">
        <div className="min-w-0 max-w-4xl flex-1">
          <Breadcrumb
            items={[
              { label: "Calculators", href: "/calculators" },
              { label: config.title },
            ]}
          />

          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {config.title}
          </h1>
          <div className="mb-8 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground">
            {config.longDescription.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <AdBanner slot="calc-below-intro" />

          <Suspense>
            <div className="mb-12">{children}</div>
          </Suspense>

          <AdBanner slot="calc-below-result" />

          <FormulaBlock formula={config.formula} explanation={config.formulaExplanation} />

          <ExampleBlock examples={config.examples} />

          <FaqBlock entries={config.faq} />

          <AdBanner slot="calc-below-faq" />

          <RelatedCalculators currentSlug={config.slug} />

          <RelatedGuides calculatorSlug={config.slug} />

          <p className="mt-8 text-xs text-muted-foreground">
            All calculations are for informational purposes only. They should not replace professional
            financial, tax, or legal advice. Always consult a qualified professional for decisions
            affecting your finances or business.
          </p>
        </div>

        <AdSidebar slot="calc-sidebar" />
      </div>
    </div>
  );
}
