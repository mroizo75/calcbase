import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About CalcBase – Practical Business Calculators",
  description:
    "CalcBase provides free, accurate online calculators for VAT, profit margins, markup, discounts, and break-even analysis. Built for business owners, freelancers, and finance professionals.",
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "About" }]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        About CalcBase
      </h1>

      <div className="space-y-6 text-base leading-relaxed">
        <p>
          CalcBase is a free online platform for practical business calculations. We build tools
          that business owners, freelancers, accountants, and finance professionals use every day —
          from adding VAT to an invoice to figuring out break-even points for a new product.
        </p>

        <h2 className="text-xl font-semibold">Why We Built This</h2>
        <p>
          Most calculator websites are cluttered with ads, use confusing interfaces, or give you
          a number without explaining how it was calculated. We believe a calculator tool should
          be fast, transparent, and genuinely helpful.
        </p>
        <p>
          Every calculator on CalcBase shows the formula used, explains the result in plain
          language, and includes worked examples so you can verify the math yourself. We also
          provide supporting guides that explain the concepts behind the calculations — not
          generic filler, but practical knowledge you can apply immediately.
        </p>

        <h2 className="text-xl font-semibold">What We Cover</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>VAT & Tax:</strong>{" "}
            <Link href="/vat-calculator" className="underline underline-offset-4 hover:text-primary">
              Add or remove VAT
            </Link>
            {" "}with support for UK, EU, GST, and custom rates.
          </li>
          <li>
            <strong>Pricing:</strong>{" "}
            <Link href="/margin-calculator" className="underline underline-offset-4 hover:text-primary">
              Profit margin
            </Link>
            ,{" "}
            <Link href="/markup-calculator" className="underline underline-offset-4 hover:text-primary">
              markup
            </Link>
            , and{" "}
            <Link href="/discount-calculator" className="underline underline-offset-4 hover:text-primary">
              discount
            </Link>
            {" "}calculations for informed pricing decisions.
          </li>
          <li>
            <strong>Business Planning:</strong>{" "}
            <Link href="/break-even-calculator" className="underline underline-offset-4 hover:text-primary">
              Break-even analysis
            </Link>
            {" "}to understand when your business becomes profitable.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Our Principles</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Accuracy:</strong> Every formula is tested and validated. We show our work.</li>
          <li><strong>Transparency:</strong> No hidden logic. The formula and calculation steps are always visible.</li>
          <li><strong>Speed:</strong> Results update instantly as you type. No page reloads.</li>
          <li><strong>Privacy:</strong> We do not require accounts, track personal data, or sell information.</li>
          <li><strong>No clutter:</strong> Clean, focused tools without dark patterns or misleading design.</li>
        </ul>

        <h2 className="text-xl font-semibold">Disclaimer</h2>
        <p>
          CalcBase provides calculations for informational and educational purposes only. While we
          strive for accuracy, the results should not be used as a substitute for professional
          financial, tax, accounting, or legal advice. Always consult a qualified professional
          before making decisions that affect your finances or business.
        </p>

        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          Have a question, found a bug, or want to suggest a new calculator?{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
