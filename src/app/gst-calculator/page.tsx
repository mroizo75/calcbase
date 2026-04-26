import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { GstCalculatorUi } from "./gst-calculator-ui";

const config = getCalculator("gst-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(config);

export default function GstCalculatorPage() {
  return (
    <CalculatorShell config={config}>
      <GstCalculatorUi />
    </CalculatorShell>
  );
}
