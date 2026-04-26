import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { CommissionCalculatorUi } from "./commission-calculator-ui";

const config = getCalculator("commission-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function CommissionCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <CommissionCalculatorUi />
    </CalculatorShell>
  );
}
