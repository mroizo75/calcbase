import type { CalculatorConfig } from "@/lib/calculators/types";

export interface CalculatorSeoOverrideFields {
  seoTitle: string;
  seoDescription: string;
}

/** Merges title/meta only — never FAQ, longDescription, or body. */
export function mergeCalculatorSeo(
  config: CalculatorConfig,
  override: CalculatorSeoOverrideFields | null | undefined,
): CalculatorConfig {
  if (!override?.seoTitle || !override?.seoDescription) {
    return config;
  }

  return {
    ...config,
    seo: {
      ...config.seo,
      title: override.seoTitle,
      description: override.seoDescription,
    },
  };
}
