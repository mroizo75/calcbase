import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { DiscountCalculatorUi } from "./discount-calculator-ui";

const config = getCalculator("discount-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function DiscountCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <DiscountCalculatorUi />
    </CalculatorShell>
  );
}
