import { client, isSanityConfigured } from "@/sanity/lib/client";
import { CALCULATOR_SEO_OVERRIDE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { getCalculator } from "@/lib/calculators/registry";
import type { CalculatorConfig } from "@/lib/calculators/types";
import {
  mergeCalculatorSeo,
  type CalculatorSeoOverrideFields,
} from "@/lib/seo/merge-calculator-seo";

export interface CalculatorSeoOverrideDoc extends CalculatorSeoOverrideFields {
  slug: string;
  updatedAt?: string;
  sourceOpportunityId?: string;
}

export async function getCalculatorSeoOverride(
  slug: string,
): Promise<CalculatorSeoOverrideDoc | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    const override = await client.fetch<CalculatorSeoOverrideDoc | null>(
      CALCULATOR_SEO_OVERRIDE_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 300, tags: [`calculator-seo-${slug}`] } },
    );
    return override;
  } catch {
    return null;
  }
}

export async function getCalculatorWithSeo(
  slug: string,
): Promise<CalculatorConfig | undefined> {
  const base = getCalculator(slug);
  if (!base) return undefined;

  const override = await getCalculatorSeoOverride(slug);
  return mergeCalculatorSeo(base, override);
}

export function calculatorSeoOverrideId(slug: string): string {
  return `calculatorSeoOverride.${slug}`;
}
