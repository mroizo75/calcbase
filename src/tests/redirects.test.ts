import { describe, expect, it } from "vitest";
import { permanentRedirects } from "@/lib/seo/redirects";

const removedPaths = [
  "/percentage-calculator",
  "/roi-calculator",
  "/gst-calculator",
  "/sales-tax-calculator",
  "/news/calculate-pre-vat-price",
  "/news/margin-vs-markup-practical-examples",
  "/news/markup-vs-margin",
  "/news/how-to-calculate-commission",
];

describe("permanentRedirects", () => {
  it("sends every removed URL to a different page", () => {
    for (const source of removedPaths) {
      const redirect = permanentRedirects.find((item) => item.source === source);
      expect(redirect?.destination).toBeTruthy();
      expect(redirect?.destination).not.toBe(source);
      expect(redirect?.destination.startsWith("/")).toBe(true);
    }
  });

  it("does not redirect a kept calculator", () => {
    const sources = new Set(permanentRedirects.map((item) => item.source));
    expect(sources.has("/vat-calculator")).toBe(false);
    expect(sources.has("/percentage-change-calculator")).toBe(false);
  });
});
