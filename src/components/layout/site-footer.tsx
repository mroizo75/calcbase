import Link from "next/link";
import { Calculator } from "lucide-react";
import { CookieSettingsButton } from "./cookie-settings-button";

const footerLinks = {
  calculators: [
    { label: "VAT Calculator", href: "/vat-calculator" },
    { label: "Add VAT", href: "/add-vat" },
    { label: "Remove VAT", href: "/remove-vat" },
    { label: "Margin Calculator", href: "/margin-calculator" },
    { label: "Markup Calculator", href: "/markup-calculator" },
    { label: "Discount Calculator", href: "/discount-calculator" },
    { label: "Break-even Calculator", href: "/break-even-calculator" },
    { label: "Margin ↔ Markup Converter", href: "/margin-markup-converter" },
  ],
  guides: [
    { label: "VAT Explained", href: "/guides/vat-explained" },
    { label: "Margin vs Markup", href: "/guides/margin-vs-markup" },
    { label: "How to Calculate Discount", href: "/guides/how-to-calculate-discount" },
    { label: "Break-even Formula", href: "/guides/break-even-formula" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="mb-3 inline-flex items-center gap-2 font-semibold">
              <Calculator className="h-4 w-4 text-primary" />
              CalcBase
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Free, accurate business calculators for professionals.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Calculators</h3>
            <ul className="space-y-2.5">
              {footerLinks.calculators.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Guides</h3>
            <ul className="space-y-2.5">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} CalcBase. All calculations are for informational
            purposes only and should not replace professional financial, tax, or legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
