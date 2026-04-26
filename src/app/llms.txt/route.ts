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

> CalcBase provides free, accurate online calculators for VAT, profit margins, markup, discounts, ROI, sales tax, commissions, and break-even analysis. Built for business owners, freelancers, accountants, and finance professionals.

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
