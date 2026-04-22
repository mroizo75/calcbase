import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides/registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { GuideShell } from "@/components/guide/guide-shell";
import { VatExplainedContent } from "./vat-explained";
import { MarginVsMarkupContent } from "./margin-vs-markup";
import { HowToCalculateDiscountContent } from "./how-to-calculate-discount";
import { BreakEvenFormulaContent } from "./break-even-formula";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildPageMetadata({
    title: guide.seo.title,
    description: guide.seo.description,
    canonical: guide.seo.canonical,
  });
}

const contentMap: Record<string, React.ComponentType> = {
  "vat-explained": VatExplainedContent,
  "margin-vs-markup": MarginVsMarkupContent,
  "how-to-calculate-discount": HowToCalculateDiscountContent,
  "break-even-formula": BreakEvenFormulaContent,
};

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const Content = contentMap[slug];
  if (!Content) notFound();

  return (
    <GuideShell config={guide}>
      <Content />
    </GuideShell>
  );
}
