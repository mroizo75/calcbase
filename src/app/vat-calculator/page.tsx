import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { VatCalculatorUi } from "./vat-calculator-ui";

const config = getCalculator("vat-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function VatCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <VatCalculatorUi />
    </CalculatorShell>
  );
}
