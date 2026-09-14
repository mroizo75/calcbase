import type { Metadata } from "next";
import { getCalculatorWithSeo } from "@/lib/seo/get-calculator-with-seo";
import { buildCalculatorMetadata } from "@/lib/seo/metadata";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { AddVatUi } from "./add-vat-ui";

const SLUG = "add-vat";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCalculatorWithSeo(SLUG);
  if (!config) return {};
  return buildCalculatorMetadata(config);
}

export default async function AddVatPage() {
  const config = await getCalculatorWithSeo(SLUG);
  if (!config) return null;

  return (
    <CalculatorShell config={config}>
      <AddVatUi />
    </CalculatorShell>
  );
}
