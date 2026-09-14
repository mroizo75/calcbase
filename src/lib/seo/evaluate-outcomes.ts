import type { GscPageRow, GscSnapshot } from "@/lib/seo/gsc-scoring";
import { extractSlugFromPageUrl } from "@/lib/seo/gsc-scoring";

export type SeoOutcome =
  | "awaiting_followup"
  | "improved_ctr"
  | "improved_position"
  | "improved_both"
  | "mixed"
  | "no_change"
  | "worse";

export interface AppliedOpportunityForFollowUp {
  _id: string;
  slug: string;
  pageUrl: string;
  kind: string;
  appliedAt?: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  followUpAt?: string;
  proposedTitle?: string;
  proposedDescription?: string;
}

const FOLLOW_UP_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

function findPageMetrics(
  snapshot: GscSnapshot,
  pageUrl: string,
  slug: string,
  siteHost: string,
): GscPageRow | null {
  const direct = snapshot.pages.find((p) => p.page === pageUrl);
  if (direct) return direct;

  for (const page of snapshot.pages) {
    const pageSlug = extractSlugFromPageUrl(page.page, siteHost);
    if (pageSlug === slug || pageSlug === slug.replace(/^news\//, "") || `news/${pageSlug}` === slug) {
      return page;
    }
    // Calculator slugs are bare paths
    if (pageSlug === slug) return page;
  }
  return null;
}

export function computeSeoOutcome(input: {
  baselineCtr: number;
  baselinePosition: number;
  followUpCtr: number;
  followUpPosition: number;
}): SeoOutcome {
  const ctrDelta = input.followUpCtr - input.baselineCtr;
  const posDelta = input.baselinePosition - input.followUpPosition; // positive = better (lower pos)

  const ctrImproved = ctrDelta >= 0.002; // +0.2pp
  const ctrWorse = ctrDelta <= -0.002;
  const posImproved = posDelta >= 0.5;
  const posWorse = posDelta <= -0.5;

  if (ctrImproved && posImproved) return "improved_both";
  if (ctrImproved && !posWorse) return "improved_ctr";
  if (posImproved && !ctrWorse) return "improved_position";
  if (ctrWorse || posWorse) {
    if ((ctrImproved && posWorse) || (posImproved && ctrWorse)) return "mixed";
    return "worse";
  }
  return "no_change";
}

export function outcomeNote(outcome: SeoOutcome, ctrDelta: number, posDelta: number): string {
  const ctrPct = `${(ctrDelta * 100).toFixed(2)}pp`;
  const posTxt = `${posDelta >= 0 ? "+" : ""}${posDelta.toFixed(1)} positions (lower is better)`;
  switch (outcome) {
    case "improved_both":
      return `Worked: CTR ${ctrPct}, position ${posTxt}. Keep this title/meta pattern.`;
    case "improved_ctr":
      return `CTR improved (${ctrPct}). Title/meta likely helped clicks. Position ${posTxt}.`;
    case "improved_position":
      return `Position improved (${posTxt}). CTR delta ${ctrPct}. Content relevance may have helped.`;
    case "mixed":
      return `Mixed: CTR ${ctrPct}, position ${posTxt}. Review query mix before next change.`;
    case "worse":
      return `Worse: CTR ${ctrPct}, position ${posTxt}. Consider reverting title/meta.`;
    case "no_change":
      return `No meaningful change yet (CTR ${ctrPct}, position ${posTxt}). Wait another week or try a stronger angle.`;
    default:
      return "Awaiting follow-up.";
  }
}

export function shouldEvaluateFollowUp(opportunity: AppliedOpportunityForFollowUp, now = Date.now()): boolean {
  if (opportunity.followUpAt) return false;
  if (!opportunity.appliedAt) return false;
  const applied = Date.parse(opportunity.appliedAt);
  if (Number.isNaN(applied)) return false;
  return now - applied >= FOLLOW_UP_AFTER_MS;
}

export function buildFollowUpPatch(input: {
  opportunity: AppliedOpportunityForFollowUp;
  snapshot: GscSnapshot;
  siteHost: string;
}): {
  followUpImpressions: number;
  followUpClicks: number;
  followUpCtr: number;
  followUpPosition: number;
  followUpAt: string;
  outcome: SeoOutcome;
  outcomeNotes: string;
} | null {
  const metrics = findPageMetrics(
    input.snapshot,
    input.opportunity.pageUrl,
    input.opportunity.slug,
    input.siteHost,
  );
  if (!metrics) return null;

  const outcome = computeSeoOutcome({
    baselineCtr: input.opportunity.ctr,
    baselinePosition: input.opportunity.position,
    followUpCtr: metrics.ctr,
    followUpPosition: metrics.position,
  });

  const ctrDelta = metrics.ctr - input.opportunity.ctr;
  const posDelta = input.opportunity.position - metrics.position;

  return {
    followUpImpressions: metrics.impressions,
    followUpClicks: metrics.clicks,
    followUpCtr: metrics.ctr,
    followUpPosition: metrics.position,
    followUpAt: new Date().toISOString(),
    outcome,
    outcomeNotes: outcomeNote(outcome, ctrDelta, posDelta),
  };
}
