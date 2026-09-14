import { describe, expect, it } from "vitest";
import {
  computeSeoOutcome,
  outcomeNote,
  shouldEvaluateFollowUp,
} from "@/lib/seo/evaluate-outcomes";

describe("computeSeoOutcome", () => {
  it("detects CTR and position wins", () => {
    expect(
      computeSeoOutcome({
        baselineCtr: 0.01,
        baselinePosition: 10,
        followUpCtr: 0.03,
        followUpPosition: 7,
      }),
    ).toBe("improved_both");
  });

  it("detects worse results", () => {
    expect(
      computeSeoOutcome({
        baselineCtr: 0.04,
        baselinePosition: 5,
        followUpCtr: 0.01,
        followUpPosition: 12,
      }),
    ).toBe("worse");
  });

  it("detects no change", () => {
    expect(
      computeSeoOutcome({
        baselineCtr: 0.02,
        baselinePosition: 8,
        followUpCtr: 0.021,
        followUpPosition: 8.2,
      }),
    ).toBe("no_change");
  });
});

describe("shouldEvaluateFollowUp", () => {
  it("waits about 7 days", () => {
    const now = Date.parse("2026-09-14T12:00:00.000Z");
    expect(
      shouldEvaluateFollowUp(
        {
          _id: "1",
          slug: "vat-calculator",
          pageUrl: "https://calcbase.io/vat-calculator",
          kind: "calculatorCtr",
          appliedAt: "2026-09-10T12:00:00.000Z",
          impressions: 100,
          clicks: 2,
          ctr: 0.02,
          position: 8,
        },
        now,
      ),
    ).toBe(false);

    expect(
      shouldEvaluateFollowUp(
        {
          _id: "1",
          slug: "vat-calculator",
          pageUrl: "https://calcbase.io/vat-calculator",
          kind: "calculatorCtr",
          appliedAt: "2026-09-01T12:00:00.000Z",
          impressions: 100,
          clicks: 2,
          ctr: 0.02,
          position: 8,
        },
        now,
      ),
    ).toBe(true);
  });
});

describe("outcomeNote", () => {
  it("mentions CTR delta", () => {
    expect(outcomeNote("improved_ctr", 0.015, 0.2)).toContain("CTR");
  });
});
