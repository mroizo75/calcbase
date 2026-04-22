import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Privacy Policy",
    description: "CalcBase privacy policy. Learn how we handle your data and protect your privacy.",
    canonical: "/privacy-policy",
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

      <div className="space-y-6 text-base leading-relaxed">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p>
          CalcBase (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website
          calcbase.com. This Privacy Policy explains what information we collect, how we use it,
          and your rights regarding that information.
        </p>
        <p>
          Our calculators run entirely in your browser. We do not require you to create an account,
          and we do not sell your personal data.
        </p>

        <h2 className="text-xl font-semibold">Information We Collect</h2>

        <h3 className="font-medium">Automatically Collected Information</h3>
        <p>
          When you visit CalcBase, our hosting provider (Vercel) may collect standard server logs
          including your IP address, browser type, operating system, referring URL, and pages
          visited. This data is used for security, performance monitoring, and aggregate analytics.
        </p>

        <h3 className="font-medium">Calculator Inputs</h3>
        <p>
          All calculator computations happen locally in your browser. We do not send, store, or
          have access to the numbers you enter into our calculators.
        </p>

        <h3 className="font-medium">Analytics</h3>
        <p>
          We may use privacy-friendly analytics tools to understand how our site is used in
          aggregate (e.g. which pages are most popular, how visitors navigate the site). These
          tools are configured to respect your privacy and do not collect personally identifiable
          information.
        </p>

        <h2 className="text-xl font-semibold">Advertising</h2>
        <p>
          CalcBase uses Google AdSense to display advertisements. Google AdSense is a third-party
          advertising service provided by Google LLC. To serve ads, Google may collect and use
          certain information about your visits to this and other websites.
        </p>

        <h3 className="font-medium">How Google Uses Your Data</h3>
        <p>Google AdSense may use the following technologies:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Cookies:</strong> Small text files placed on your device to track preferences
            and display relevant advertisements.
          </li>
          <li>
            <strong>Web beacons:</strong> Tiny graphics used to measure ad effectiveness and user
            engagement.
          </li>
          <li>
            <strong>Device identifiers:</strong> Information about your device, browser, and
            operating system.
          </li>
        </ul>
        <p>
          Google may use this data to show you personalized ads based on your browsing history
          across websites that use Google services. You can learn more about how Google uses your
          data by visiting{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Google&apos;s Partner Sites Policy
          </a>
          .
        </p>

        <h3 className="font-medium">Opting Out of Personalized Ads</h3>
        <p>
          You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Google Ads Settings
          </a>
          . You can also opt out of third-party vendor cookies by visiting{" "}
          <a
            href="https://optout.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            aboutads.info
          </a>
          .
        </p>
        <p>
          When you first visit CalcBase, we ask for your consent before enabling personalized
          advertising cookies. You can change your cookie preferences at any time using the cookie
          settings link in our website footer.
        </p>

        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>CalcBase and its third-party partners use the following types of cookies:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Essential cookies:</strong> Required for basic site functionality and security.
            These cannot be disabled.
          </li>
          <li>
            <strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant
            advertisements. These are only activated with your consent.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how visitors use the site so we
            can improve it.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Vercel:</strong> Hosting and edge delivery. See{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google AdSense:</strong> Advertising. See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google Search Console:</strong> To monitor how our site appears in search
            results.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Data Retention</h2>
        <p>
          Server logs are retained for a limited period (typically 30 days) and then deleted. We do
          not maintain persistent databases of visitor information. Advertising cookies set by
          Google have their own retention periods as described in{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Google&apos;s Cookie Policy
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold">Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Object to or restrict processing of your data.</li>
          <li>Withdraw consent for advertising cookies at any time.</li>
          <li>Lodge a complaint with a data protection authority.</li>
        </ul>
        <p>
          Since we collect minimal data, there is typically no personal data to retrieve. For any
          data-related requests, contact us at{" "}
          <a
            href="mailto:hello@calcbase.com"
            className="underline underline-offset-4 hover:text-primary"
          >
            hello@calcbase.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold">GDPR Compliance (EEA/UK)</h2>
        <p>
          If you are located in the European Economic Area or the United Kingdom, we process your
          data under the following legal bases:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Legitimate interest:</strong> For essential site operation and security.
          </li>
          <li>
            <strong>Consent:</strong> For advertising and analytics cookies. You can withdraw
            consent at any time.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">CCPA Compliance (California)</h2>
        <p>
          If you are a California resident, you have the right to know what personal information we
          collect, request its deletion, and opt out of the sale of personal information. CalcBase
          does not sell personal information. For requests, contact{" "}
          <a
            href="mailto:hello@calcbase.com"
            className="underline underline-offset-4 hover:text-primary"
          >
            hello@calcbase.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold">Children</h2>
        <p>
          CalcBase is not directed at children under 13 (or under 16 in the EEA). We do not
          knowingly collect personal information from children.
        </p>

        <h2 className="text-xl font-semibold">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated date. Continued use of the site constitutes acceptance of the revised
          policy. For significant changes, we will provide a prominent notice on the site.
        </p>

        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a
            href="mailto:hello@calcbase.com"
            className="underline underline-offset-4 hover:text-primary"
          >
            hello@calcbase.com
          </a>
          .
        </p>
        <p>
          For more information about our site, visit our{" "}
          <Link href="/about" className="underline underline-offset-4 hover:text-primary">
            About page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
