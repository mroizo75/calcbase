import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { PercentageCalculatorUi } from "./percentage-calculator-ui";

const config = getCalculator("percentage-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function PercentageCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <PercentageCalculatorUi />
    </CalculatorShell>
  );
}
