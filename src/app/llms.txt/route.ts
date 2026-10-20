import { getBaseUrl } from "@/lib/utils/urls";
import { calculators } from "@/lib/calculators/registry";
import { guides } from "@/lib/guides/registry";

export function GET() {
  const base = getBaseUrl();

  const calcLines = calculators
    .map((c) => `- [${c.title}](${base}/${c.slug}): ${c.shortDescription}`)
    .join("\n");

  const guideLines = guides
    .map((g) => `- [${g.title}](${base}/guides/${g.slug}): ${g.description.slice(0, 120)}`)
    .join("\n");

  const body = `# CalcBase – Free Business Calculators

> CalcBase helps small online sellers and freelancers in the UK and EU price products and services with VAT, margin, markup, discounts, commission, and break-even.

## Calculators

${calcLines}

## Guides

${guideLines}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
