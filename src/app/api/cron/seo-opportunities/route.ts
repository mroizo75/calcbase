import { NextResponse } from "next/server";
import { calculators } from "@/lib/calculators/registry";
import { fetchGscSnapshot } from "@/lib/seo/gsc-client";
import {
  buildCalculatorMetaMap,
  scoreOpportunities,
} from "@/lib/seo/score-opportunities";
import { suggestCalculatorMeta } from "@/lib/seo/suggest-meta";
import { assertNoContentBodyFields } from "@/lib/seo/opportunity-schema";
import { getWriteClient } from "@/sanity/lib/client";
import { PENDING_SEO_OPPORTUNITY_KEYS_QUERY } from "@/sanity/lib/queries";

export const runtime = "nodejs";
export const maxDuration = 60;

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

function siteHost(): string {
  const gsc = process.env.GSC_SITE_URL ?? "sc-domain:calcbase.io";
  if (gsc.startsWith("sc-domain:")) {
    return gsc.replace("sc-domain:", "");
  }
  try {
    return new URL(gsc).hostname.replace(/^www\./, "");
  } catch {
    return "calcbase.io";
  }
}

/**
 * Weekly SEO opportunity sync from Google Search Console.
 * Creates review items only — never publishes articles or FAQ/body content.
 */
export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await fetchGscSnapshot(28);
    const writeClient = getWriteClient();

    const pendingRows = await writeClient.fetch<Array<{ key: string }>>(
      PENDING_SEO_OPPORTUNITY_KEYS_QUERY,
    );
    const pendingKeys = new Set(pendingRows.map((r) => r.key).filter(Boolean));

    const scored = scoreOpportunities({
      snapshot,
      siteHost: siteHost(),
      calculatorSlugs: new Set(calculators.map((c) => c.slug)),
      calculatorMeta: buildCalculatorMetaMap(calculators),
      pendingKeys,
    });

    const existingTitles = calculators.map((c) => c.seo.title);
    const created: string[] = [];

    for (const opportunity of scored) {
      assertNoContentBodyFields(opportunity as unknown as Record<string, unknown>);

      let proposedTitle = opportunity.proposedTitle;
      let proposedDescription = opportunity.proposedDescription;
      let proposedTitleAlt = opportunity.proposedTitleAlt;

      if (opportunity.kind === "calculatorCtr") {
        const suggestion = await suggestCalculatorMeta(opportunity, existingTitles);
        if (suggestion) {
          proposedTitle = suggestion.proposedTitle;
          proposedDescription = suggestion.proposedDescription;
          proposedTitleAlt = suggestion.proposedTitleAlt;
          existingTitles.push(suggestion.proposedTitle);
          if (suggestion.proposedTitleAlt) {
            existingTitles.push(suggestion.proposedTitleAlt);
          }
        }
      }

      const doc = {
        _type: "seoOpportunity" as const,
        status: "pending" as const,
        kind: opportunity.kind,
        pageUrl: opportunity.pageUrl,
        slug: opportunity.slug,
        targetQueries: opportunity.targetQueries,
        impressions: opportunity.impressions,
        clicks: opportunity.clicks,
        ctr: opportunity.ctr,
        position: opportunity.position,
        periodDays: opportunity.periodDays,
        rationale: opportunity.rationale,
        actionBrief: opportunity.actionBrief,
        currentTitle: opportunity.currentTitle,
        currentDescription: opportunity.currentDescription,
        ...(proposedTitle ? { proposedTitle } : {}),
        ...(proposedDescription ? { proposedDescription } : {}),
        ...(proposedTitleAlt ? { proposedTitleAlt } : {}),
      };

      assertNoContentBodyFields(doc as unknown as Record<string, unknown>);
      const createdDoc = await writeClient.create(doc);
      created.push(createdDoc._id);
    }

    return NextResponse.json({
      ok: true,
      periodDays: snapshot.periodDays,
      pages: snapshot.pages.length,
      queries: snapshot.queries.length,
      createdCount: created.length,
      created,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { code: "seo_cron_failed", message },
      { status: 500 },
    );
  }
}
