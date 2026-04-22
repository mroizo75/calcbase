import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { BreakEvenCalculatorUi } from "./break-even-calculator-ui";

const config = getCalculator("break-even-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function BreakEvenCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <BreakEvenCalculatorUi />
    </CalculatorShell>
  );
}
