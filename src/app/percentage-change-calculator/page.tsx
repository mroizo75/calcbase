import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { PercentageChangeCalculatorUi } from "./percentage-change-calculator-ui";

const config = getCalculator("percentage-change-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function PercentageChangeCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <PercentageChangeCalculatorUi />
    </CalculatorShell>
  );
}
