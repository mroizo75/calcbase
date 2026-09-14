import { describe, expect, it } from "vitest";
import { buildFallbackPageMeta, fitSeoLength } from "@/lib/seo/suggest-meta";

describe("fitSeoLength", () => {
  it("pads short strings and trims long ones", () => {
    const short = fitSeoLength("VAT Calculator", 50, 60);
    expect(short.length).toBeGreaterThanOrEqual(50);
    expect(short.length).toBeLessThanOrEqual(60);

    const long = fitSeoLength("x".repeat(200), 150, 160);
    expect(long.length).toBeGreaterThanOrEqual(150);
    expect(long.length).toBeLessThanOrEqual(160);
  });
});

describe("buildFallbackPageMeta", () => {
  it("always returns valid title and description lengths", () => {
    const meta = buildFallbackPageMeta(
      {
        kind: "calculatorCtr",
        slug: "vat-calculator",
        targetQueries: ["vat calculator uk"],
        currentTitle: "VAT Calculator",
        currentDescription: "Short",
      },
      [],
    );
    expect(meta.proposedTitle.length).toBeGreaterThanOrEqual(50);
    expect(meta.proposedTitle.length).toBeLessThanOrEqual(60);
    expect(meta.proposedDescription.length).toBeGreaterThanOrEqual(150);
    expect(meta.proposedDescription.length).toBeLessThanOrEqual(160);
    expect(meta.proposedTitleAlt?.length).toBeGreaterThanOrEqual(50);
  });
});
