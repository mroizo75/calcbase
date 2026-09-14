import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

const bodySchema = z
  .object({
    slug: z.string().min(1).optional(),
  })
  .strict();

/** Bust /news list + optional article page cache after Studio publish. */
export async function POST(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json: unknown = await request.json().catch(() => ({}));
    const { slug } = bodySchema.parse(json ?? {});

    revalidatePath("/news");
    if (slug) {
      revalidatePath(`/news/${slug}`);
    }

    return NextResponse.json({ ok: true, slug: slug ?? null });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { code: "validation_error", message: error.message },
        { status: 400 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ code: "revalidate_failed", message }, { status: 500 });
  }
}
