import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { RemoveVatUi } from "./remove-vat-ui";

const config = getCalculator("remove-vat")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function RemoveVatPage() {
  return (
    <CalculatorShell config={config}>
      <RemoveVatUi />
    </CalculatorShell>
  );
}
