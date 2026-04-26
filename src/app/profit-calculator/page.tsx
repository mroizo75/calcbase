import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { ProfitCalculatorUi } from "./profit-calculator-ui";

const config = getCalculator("profit-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function ProfitCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <ProfitCalculatorUi />
    </CalculatorShell>
  );
}
