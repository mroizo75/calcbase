import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Terms of Service",
    description: "CalcBase terms of service. Understand the terms under which you use our calculators and content.",
    canonical: "/terms",
  }),
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Terms of Service" }]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

      <div className="space-y-6 text-base leading-relaxed">
        <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
        <p>
          By accessing and using CalcBase (calcbase.com), you agree to these Terms of Service.
          If you do not agree, please do not use the site.
        </p>

        <h2 className="text-xl font-semibold">Description of Service</h2>
        <p>
          CalcBase provides free online business calculators and educational guides. The service
          includes tools for calculating VAT, profit margins, markup, discounts, break-even
          points, and related financial computations.
        </p>

        <h2 className="text-xl font-semibold">Informational Purpose Only</h2>
        <p>
          All calculations, content, and guides provided by CalcBase are for informational and
          educational purposes only. They do not constitute financial, tax, accounting, or legal
          advice. You should not rely solely on CalcBase for any financial decision.
        </p>
        <p>
          While we make every effort to ensure accuracy, we cannot guarantee that all calculations
          are error-free. VAT rates, tax rules, and financial regulations change over time and
          vary by jurisdiction. Always verify results and consult a qualified professional.
        </p>

        <h2 className="text-xl font-semibold">No Warranty</h2>
        <p>
          CalcBase is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, whether
          express or implied. We do not warrant that the service will be uninterrupted, error-free,
          or that the results will be accurate or reliable.
        </p>

        <h2 className="text-xl font-semibold">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, CalcBase and its operators shall not be liable
          for any damages arising from the use of, or inability to use, the service. This includes
          but is not limited to direct, indirect, incidental, consequential, or punitive damages
          resulting from incorrect calculations, outdated tax rates, or any other errors.
        </p>

        <h2 className="text-xl font-semibold">Intellectual Property</h2>
        <p>
          The content, design, and code of CalcBase are protected by copyright. You may use the
          calculators for personal and commercial purposes. You may not reproduce, redistribute,
          or create derivative works from the site content without permission.
        </p>

        <h2 className="text-xl font-semibold">User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Use the service for any unlawful purpose.</li>
          <li>Attempt to disrupt or compromise the site&apos;s infrastructure.</li>
          <li>Scrape or bulk-extract content without permission.</li>
          <li>Misrepresent CalcBase results as certified financial advice.</li>
        </ul>

        <h2 className="text-xl font-semibold">Advertising</h2>
        <p>
          CalcBase displays advertisements through Google AdSense. These advertisements are served
          by Google and may use cookies and tracking technologies. By using CalcBase with
          advertising cookies enabled, you acknowledge that Google may collect and use data as
          described in{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
        <p>
          You may decline advertising cookies when first visiting the site or at any time through
          the cookie settings link in the footer. CalcBase is not responsible for the content,
          accuracy, or practices of advertisements displayed on the site.
        </p>

        <h2 className="text-xl font-semibold">Third-Party Links</h2>
        <p>
          CalcBase may contain links to external websites or third-party advertisements. We are
          not responsible for the content, accuracy, or practices of third-party sites or
          advertisers.
        </p>

        <h2 className="text-xl font-semibold">Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be posted on this
          page. Continued use of the service after changes constitutes acceptance.
        </p>

        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:hello@calcbase.com" className="underline underline-offset-4 hover:text-primary">
            hello@calcbase.com
          </a>.
        </p>
      </div>
    </div>
  );
}
