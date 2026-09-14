import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getCalculator } from "@/lib/calculators/registry";
import { slugFromRevalidatePayload } from "@/lib/seo/revalidate-payload";

export const runtime = "nodejs";

function authorize(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (request.headers.get("authorization") === `Bearer ${secret}`) return true;
  return request.nextUrl.searchParams.get("secret") === secret;
}

/** Revalidate a calculator page after SEO override changes. */
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json: unknown = await request.json();
    const slug = slugFromRevalidatePayload(json);

    if (!slug) {
      return NextResponse.json(
        { code: "invalid_payload", message: "Expected { slug } or a calculatorSeoOverride document" },
        { status: 400 },
      );
    }

    if (!getCalculator(slug)) {
      return NextResponse.json(
        { code: "invalid_slug", message: "Unknown calculator slug" },
        { status: 400 },
      );
    }

    revalidateTag(`calculator-seo-${slug}`, "max");
    revalidatePath(`/${slug}`);

    return NextResponse.json({ ok: true, slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ code: "revalidate_failed", message }, { status: 500 });
  }
}
