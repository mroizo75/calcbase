import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCalculator } from "@/lib/calculators/registry";
import { assertNoContentBodyFields, proposedMetaSchema } from "@/lib/seo/opportunity-schema";
import { calculatorSeoOverrideId } from "@/lib/seo/get-calculator-with-seo";
import { getWriteClient } from "@/sanity/lib/client";
import { SEO_OPPORTUNITY_BY_ID_QUERY } from "@/sanity/lib/queries";

export const runtime = "nodejs";

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

const applyBodySchema = z
  .object({
    opportunityId: z.string().min(1),
    useAltTitle: z.boolean().optional(),
  })
  .strict();

interface OpportunityDoc {
  _id: string;
  status: string;
  kind: string;
  slug: string;
  proposedTitle?: string;
  proposedDescription?: string;
  proposedTitleAlt?: string;
}

/**
 * Applies approved calculator title/meta overrides only.
 * Never patches article body, FAQ, or longDescription.
 */
export async function POST(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json: unknown = await request.json();
    const body = applyBodySchema.parse(json);
    assertNoContentBodyFields(body as unknown as Record<string, unknown>);

    const writeClient = getWriteClient();
    const opportunity = await writeClient.fetch<OpportunityDoc | null>(
      SEO_OPPORTUNITY_BY_ID_QUERY,
      { id: body.opportunityId },
    );

    if (!opportunity) {
      return NextResponse.json(
        { code: "not_found", message: "Opportunity not found" },
        { status: 404 },
      );
    }

    if (opportunity.kind !== "calculatorCtr") {
      return NextResponse.json(
        {
          code: "not_applicable",
          message:
            "Only calculatorCtr title/meta can be applied automatically. Mark brief items done manually.",
        },
        { status: 400 },
      );
    }

    if (opportunity.status === "rejected" || opportunity.status === "doneManual") {
      return NextResponse.json(
        { code: "invalid_status", message: `Cannot apply status ${opportunity.status}` },
        { status: 400 },
      );
    }

    if (!getCalculator(opportunity.slug)) {
      return NextResponse.json(
        { code: "invalid_slug", message: "Unknown calculator slug" },
        { status: 400 },
      );
    }

    const title = body.useAltTitle
      ? opportunity.proposedTitleAlt
      : opportunity.proposedTitle;
    const description = opportunity.proposedDescription;

    if (!title || !description) {
      return NextResponse.json(
        {
          code: "missing_proposal",
          message: "Opportunity has no proposed title/description to apply",
        },
        { status: 400 },
      );
    }

    const meta = proposedMetaSchema.parse({
      proposedTitle: title,
      proposedDescription: description,
      ...(opportunity.proposedTitleAlt
        ? { proposedTitleAlt: opportunity.proposedTitleAlt }
        : {}),
    });

    const overrideDoc = {
      _id: calculatorSeoOverrideId(opportunity.slug),
      _type: "calculatorSeoOverride" as const,
      slug: opportunity.slug,
      seoTitle: meta.proposedTitle,
      seoDescription: meta.proposedDescription,
      updatedAt: new Date().toISOString(),
      sourceOpportunityId: opportunity._id,
    };

    assertNoContentBodyFields(overrideDoc as unknown as Record<string, unknown>);
    await writeClient.createOrReplace(overrideDoc);
    await writeClient.patch(opportunity._id).set({ status: "applied" }).commit();

    revalidateTag(`calculator-seo-${opportunity.slug}`, "max");
    revalidatePath(`/${opportunity.slug}`);

    return NextResponse.json({
      ok: true,
      slug: opportunity.slug,
      overrideId: overrideDoc._id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { code: "validation_error", message: error.message, details: error.flatten() },
        { status: 400 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ code: "seo_apply_failed", message }, { status: 500 });
  }
}
