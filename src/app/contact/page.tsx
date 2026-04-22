import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the CalcBase team. Report a bug, suggest a new calculator, or ask a question.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Contact" }]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Contact Us
      </h1>

      <div className="space-y-6 text-base leading-relaxed">
        <p>
          We would love to hear from you. Whether you have found a calculation error, want to
          suggest a new calculator, or have a question about how a formula works — reach out
          and we will get back to you.
        </p>

        <h2 className="text-xl font-semibold">Get in Touch</h2>
        <p>
          Email us at{" "}
          <a
            href="mailto:hello@calcbase.com"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            hello@calcbase.com
          </a>
        </p>

        <h2 className="text-xl font-semibold">What We Can Help With</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Bug reports:</strong> If a calculator gives incorrect results, let us know the inputs and expected output.</li>
          <li><strong>Feature requests:</strong> Suggest a new calculator or improvement to an existing one.</li>
          <li><strong>Content corrections:</strong> If you spot an error in our guides or explanations, we appreciate the heads up.</li>
          <li><strong>General questions:</strong> Questions about formulas, calculations, or how to use the tools.</li>
        </ul>

        <h2 className="text-xl font-semibold">Response Time</h2>
        <p>
          We aim to respond to all inquiries within 1–2 business days.
        </p>
      </div>
    </div>
  );
}
