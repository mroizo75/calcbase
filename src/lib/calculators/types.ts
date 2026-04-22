export type CalculatorCategory = "vat" | "pricing" | "business";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface WorkedExample {
  title: string;
  description: string;
  inputs: Record<string, string>;
  result: string;
}

export interface CalculatorConfig {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: CalculatorCategory;
  relatedSlugs: string[];
  faq: FaqEntry[];
  formula: string;
  formulaExplanation: string;
  examples: WorkedExample[];
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  defaultInputs: Record<string, number | string>;
  keywords: string[];
}

export interface CalculatorResult {
  label: string;
  value: number;
  formatted: string;
  highlight?: boolean;
}

export interface VatPreset {
  country: string;
  rate: number;
  label: string;
}
