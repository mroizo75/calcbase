import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { MarkupCalculatorUi } from "./markup-calculator-ui";

const config = getCalculator("markup-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function MarkupCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <MarkupCalculatorUi />
    </CalculatorShell>
  );
}
