import { NextResponse } from "next/server";
import { z } from "zod";
import { calculators } from "@/lib/calculators/registry";
import { suggestPageMeta } from "@/lib/seo/suggest-meta";
import type { ScoredOpportunity } from "@/lib/seo/opportunity-schema";
import { getWriteClient } from "@/sanity/lib/client";

export const runtime = "nodejs";
export const maxDuration = 120;

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

const bodySchema = z
  .object({
    opportunityId: z.string().min(1).optional(),
  })
  .strict();

interface PendingOpp {
  _id: string;
  status: string;
  kind: string;
  slug: string;
  pageUrl: string;
  targetQueries?: string[];
  impressions?: number;
  clicks?: number;
  ctr?: number;
  position?: number;
  periodDays?: number;
  rationale?: string;
  actionBrief?: string;
  currentTitle?: string;
  currentDescription?: string;
  proposedTitle?: string;
  proposedDescription?: string;
}

/**
 * Fills proposedTitle/description for pending opportunities that are missing them.
 */
export async function POST(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json: unknown = await request.json().catch(() => ({}));
    const body = bodySchema.parse(json ?? {});
    const writeClient = getWriteClient();

    const filter = body.opportunityId
      ? `*[_type == "seoOpportunity" && _id == $id][0]`
      : `*[_type == "seoOpportunity" && status == "pending" && kind in ["calculatorCtr","newsCtr","calculatorQueryGap"] && (!defined(proposedTitle) || !defined(proposedDescription))]`;

    const rows = body.opportunityId
      ? [
          await writeClient.fetch<PendingOpp | null>(filter, { id: body.opportunityId }),
        ].filter(Boolean)
      : await writeClient.fetch<PendingOpp[]>(filter);

    const existingTitles = calculators.map((c) => c.seo.title);
    const updated: string[] = [];

    for (const row of rows as PendingOpp[]) {
      if (!row?._id) continue;

      const opportunity = {
        kind: row.kind,
        pageUrl: row.pageUrl,
        slug: row.slug,
        targetQueries: row.targetQueries ?? [],
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 10,
        periodDays: row.periodDays ?? 28,
        rationale: row.rationale ?? "Backfill proposals",
        actionBrief: row.actionBrief ?? "Review proposed title/meta",
        currentTitle: row.currentTitle,
        currentDescription: row.currentDescription,
        score: 0,
      } as ScoredOpportunity;

      const suggestion = await suggestPageMeta(opportunity, existingTitles);
      existingTitles.push(suggestion.proposedTitle);
      if (suggestion.proposedTitleAlt) existingTitles.push(suggestion.proposedTitleAlt);

      await writeClient
        .patch(row._id)
        .set({
          proposedTitle: suggestion.proposedTitle,
          proposedDescription: suggestion.proposedDescription,
          ...(suggestion.proposedTitleAlt
            ? { proposedTitleAlt: suggestion.proposedTitleAlt }
            : {}),
          ...(suggestion.recommendationSummary
            ? { recommendationSummary: suggestion.recommendationSummary }
            : {}),
          ...(suggestion.recommendedSlug
            ? { recommendedSlug: suggestion.recommendedSlug }
            : {}),
        })
        .commit();

      updated.push(row._id);
    }

    return NextResponse.json({
      ok: true,
      updatedCount: updated.length,
      updated,
      openAiConfigured: Boolean(process.env.OPENAI_API_KEY),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ code: "backfill_failed", message }, { status: 500 });
  }
}
