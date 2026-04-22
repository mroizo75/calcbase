import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { MarginCalculatorUi } from "./margin-calculator-ui";

const config = getCalculator("margin-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function MarginCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <MarginCalculatorUi />
    </CalculatorShell>
  );
}
