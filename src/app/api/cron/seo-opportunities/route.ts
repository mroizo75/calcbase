import { NextResponse } from "next/server";
import { calculators } from "@/lib/calculators/registry";
import { createReviewArticleDraft } from "@/lib/seo/create-article-draft";
import {
  buildFollowUpPatch,
  shouldEvaluateFollowUp,
  type AppliedOpportunityForFollowUp,
  type SeoOutcome,
} from "@/lib/seo/evaluate-outcomes";
import { fetchGscSnapshot } from "@/lib/seo/gsc-client";
import { generateArticleDraft } from "@/lib/seo/generate-article-draft";
import { assertNoContentBodyFields } from "@/lib/seo/opportunity-schema";
import {
  buildCalculatorMetaMap,
  scoreOpportunities,
} from "@/lib/seo/score-opportunities";
import { scoreArticleTopics, topicToSlug } from "@/lib/seo/score-article-topics";
import { suggestPageMeta } from "@/lib/seo/suggest-meta";
import { getBaseUrl } from "@/lib/utils/urls";
import { getWriteClient } from "@/sanity/lib/client";
import {
  ALL_ARTICLE_SLUGS_QUERY,
  APPLIED_AWAITING_FOLLOWUP_QUERY,
  PENDING_SEO_OPPORTUNITY_KEYS_QUERY,
  RECENT_OUTCOMES_QUERY,
} from "@/sanity/lib/queries";

export const runtime = "nodejs";
export const maxDuration = 300;

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function siteHost(): string {
  const gsc = process.env.GSC_SITE_URL ?? "sc-domain:calcbase.io";
  if (gsc.startsWith("sc-domain:")) return gsc.replace("sc-domain:", "");
  try {
    return new URL(gsc).hostname.replace(/^www\./, "");
  } catch {
    return "calcbase.io";
  }
}

function isImproved(outcome: SeoOutcome): boolean {
  return (
    outcome === "improved_ctr" ||
    outcome === "improved_position" ||
    outcome === "improved_both"
  );
}

/**
 * Weekly SEO loop:
 * 1) Recommend title/meta/(optional news slug) packages for human review
 * 2) Optionally create one article DRAFT (not live)
 * 3) Measure outcomes ~7 days after apply — the red thread of what worked
 */
export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await fetchGscSnapshot(28);
    const writeClient = getWriteClient();
    const host = siteHost();
    const calculatorSlugs = calculators.map((c) => c.slug);

    // --- Follow-up: learn from last week's applied changes ---
    const awaiting = await writeClient.fetch<AppliedOpportunityForFollowUp[]>(
      APPLIED_AWAITING_FOLLOWUP_QUERY,
    );
    const followUps: string[] = [];
    for (const item of awaiting) {
      if (!shouldEvaluateFollowUp(item)) continue;
      const patch = buildFollowUpPatch({ opportunity: item, snapshot, siteHost: host });
      if (!patch) continue;
      await writeClient.patch(item._id).set(patch).commit();
      followUps.push(item._id);
    }

    const pendingRows = await writeClient.fetch<Array<{ key: string }>>(
      PENDING_SEO_OPPORTUNITY_KEYS_QUERY,
    );
    const pendingKeys = new Set(pendingRows.map((r) => r.key).filter(Boolean));

    const existingArticles = await writeClient.fetch<Array<{ slug: string }>>(
      ALL_ARTICLE_SLUGS_QUERY,
    );
    const existingArticleSlugs = new Set(existingArticles.map((a) => a.slug).filter(Boolean));

    const scored = scoreOpportunities({
      snapshot,
      siteHost: host,
      calculatorSlugs: new Set(calculatorSlugs),
      calculatorMeta: buildCalculatorMetaMap(calculators),
      pendingKeys,
    });

    const existingTitles = calculators.map((c) => c.seo.title);
    const created: string[] = [];
    const articleDrafts: string[] = [];
    const recommendationPackages: Array<{
      slug: string;
      kind: string;
      proposedTitle?: string;
      proposedDescription?: string;
      recommendedSlug?: string;
    }> = [];

    for (const opportunity of scored) {
      assertNoContentBodyFields(opportunity as unknown as Record<string, unknown>);

      let proposedTitle = opportunity.proposedTitle;
      let proposedDescription = opportunity.proposedDescription;
      let proposedTitleAlt = opportunity.proposedTitleAlt;
      let recommendedSlug: string | undefined;
      let recommendationSummary: string | undefined;

      if (opportunity.kind === "calculatorCtr" || opportunity.kind === "newsCtr") {
        const suggestion = await suggestPageMeta(opportunity, existingTitles);
        if (suggestion) {
          proposedTitle = suggestion.proposedTitle;
          proposedDescription = suggestion.proposedDescription;
          proposedTitleAlt = suggestion.proposedTitleAlt;
          recommendedSlug = suggestion.recommendedSlug;
          recommendationSummary = suggestion.recommendationSummary;
          existingTitles.push(suggestion.proposedTitle);
          if (suggestion.proposedTitleAlt) existingTitles.push(suggestion.proposedTitleAlt);
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
        ...(recommendedSlug ? { recommendedSlug } : {}),
        ...(recommendationSummary ? { recommendationSummary } : {}),
      };

      assertNoContentBodyFields(doc as unknown as Record<string, unknown>);
      const createdDoc = await writeClient.create(doc);
      created.push(createdDoc._id);
      recommendationPackages.push({
        slug: opportunity.slug,
        kind: opportunity.kind,
        proposedTitle,
        proposedDescription,
        recommendedSlug,
      });
    }

    if (process.env.OPENAI_API_KEY) {
      const topics = scoreArticleTopics({
        snapshot,
        calculatorSlugs,
        existingArticleSlugs,
        pendingTopicKeys: pendingKeys,
      });

      for (const topic of topics) {
        const slug = topicToSlug(topic.query);
        if (!slug || existingArticleSlugs.has(slug)) continue;

        const draft = await generateArticleDraft({ topic, calculatorSlugs });
        if (!draft) continue;

        const opportunityId = `seoOpportunity.articleDraft.${draft.slug}`;
        await writeClient.createOrReplace({
          _id: opportunityId,
          _type: "seoOpportunity",
          status: "pending",
          kind: "articleDraft",
          pageUrl: `${getBaseUrl()}/news/${draft.slug}`,
          slug: draft.slug,
          recommendedSlug: draft.slug,
          proposedTitle: draft.title.slice(0, 60),
          proposedDescription: draft.excerpt,
          recommendationSummary: `Draft article for "${topic.query}". Edit in Articles → Drafts, then Publish to site.`,
          targetQueries: [topic.query],
          impressions: topic.impressions,
          clicks: topic.clicks,
          ctr: topic.ctr,
          position: topic.position,
          periodDays: snapshot.periodDays,
          rationale: `GSC topic "${topic.query}" — ${topic.impressions} impr. at pos ${topic.position.toFixed(1)}. Draft only.`,
          actionBrief:
            "Review draft thoroughly. Publish to site only when quality is AdSense-safe. Then Mark done.",
        });

        const { articleId } = await createReviewArticleDraft({
          client: writeClient,
          draft,
          sourceOpportunityId: opportunityId,
          baseUrl: getBaseUrl(),
        });

        await writeClient.patch(opportunityId).set({ draftArticleId: articleId }).commit();
        created.push(opportunityId);
        articleDrafts.push(articleId);
        existingArticleSlugs.add(draft.slug);
        recommendationPackages.push({
          slug: draft.slug,
          kind: "articleDraft",
          proposedTitle: draft.title,
          proposedDescription: draft.excerpt,
          recommendedSlug: draft.slug,
        });
      }
    }

    // --- Weekly learning report (red thread) ---
    const recentOutcomes = await writeClient.fetch<
      Array<{
        slug: string;
        outcome: SeoOutcome;
        outcomeNotes?: string;
        proposedTitle?: string;
      }>
    >(RECENT_OUTCOMES_QUERY);

    const improved = recentOutcomes.filter((o) => isImproved(o.outcome));
    const worse = recentOutcomes.filter((o) => o.outcome === "worse");
    const flat = recentOutcomes.filter(
      (o) => o.outcome === "no_change" || o.outcome === "mixed",
    );
    const stillWaiting = awaiting.filter((a) => !shouldEvaluateFollowUp(a)).length;

    const weekId = new Date().toISOString().slice(0, 10);
    await writeClient.createOrReplace({
      _id: `seoWeeklyReport.${weekId}`,
      _type: "seoWeeklyReport",
      weekOf: new Date().toISOString(),
      createdCount: created.length,
      appliedAwaitingFollowUp: stillWaiting,
      outcomesImproved: improved.length,
      outcomesWorse: worse.length,
      outcomesFlat: flat.length,
      topWins: improved.slice(0, 5).map(
        (o) => `${o.slug}: ${o.proposedTitle ?? ""} — ${o.outcomeNotes ?? o.outcome}`,
      ),
      topLosses: worse.slice(0, 5).map(
        (o) => `${o.slug}: ${o.proposedTitle ?? ""} — ${o.outcomeNotes ?? o.outcome}`,
      ),
      summary: [
        `New recommendation packages: ${created.length}.`,
        `Follow-ups measured this run: ${followUps.length}.`,
        `Still awaiting ~7 day follow-up: ${stillWaiting}.`,
        `Recent wins: ${improved.length}. Worse: ${worse.length}. Flat/mixed: ${flat.length}.`,
        improved[0]?.outcomeNotes
          ? `Latest win pattern: ${improved[0].outcomeNotes}`
          : "No measured wins yet — apply pending title/meta this week, compare next cron.",
        worse[0]?.outcomeNotes
          ? `Watch-out: ${worse[0].outcomeNotes}`
          : "No measured losses yet.",
      ].join(" "),
    });

    return NextResponse.json({
      ok: true,
      periodDays: snapshot.periodDays,
      pages: snapshot.pages.length,
      queries: snapshot.queries.length,
      createdCount: created.length,
      created,
      articleDrafts,
      followUpsMeasured: followUps,
      recommendationPackages,
      weeklyReportId: `seoWeeklyReport.${weekId}`,
      note: "Review packages in Studio. Apply/publish manually. Outcomes fill in ~7 days later.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ code: "seo_cron_failed", message }, { status: 500 });
  }
}
