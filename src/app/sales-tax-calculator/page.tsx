import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { SalesTaxCalculatorUi } from "./sales-tax-calculator-ui";

const config = getCalculator("sales-tax-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function SalesTaxCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <SalesTaxCalculatorUi />
    </CalculatorShell>
  );
}
