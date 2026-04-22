import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { AddVatUi } from "./add-vat-ui";

const config = getCalculator("add-vat")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function AddVatPage() {
  return (
    <CalculatorShell config={config}>
      <AddVatUi />
    </CalculatorShell>
  );
}
