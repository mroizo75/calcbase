import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { RoiCalculatorUi } from "./roi-calculator-ui";

const config = getCalculator("roi-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function RoiCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <RoiCalculatorUi />
    </CalculatorShell>
  );
}
