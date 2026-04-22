import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { MarginMarkupConverterUi } from "./margin-markup-converter-ui";

const config = getCalculator("margin-markup-converter")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function MarginMarkupConverterPage() {
  return (
    <CalculatorShell config={config}>
      <MarginMarkupConverterUi />
    </CalculatorShell>
  );
}
