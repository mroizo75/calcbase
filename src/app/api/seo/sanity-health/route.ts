import { NextResponse } from "next/server";
import { getSanityClient, isSanityConfigured } from "@/sanity/lib/client";

export const runtime = "nodejs";

/**
 * Diagnostics for why /news may be empty. No secrets in response.
 */
export async function GET() {
  const configured = isSanityConfigured();
  const hasReadToken = Boolean(
    process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
  );
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!configured) {
    return NextResponse.json({
      ok: false,
      configured: false,
      hasReadToken,
      dataset,
      projectIdSet: Boolean(projectId),
      error: "Sanity project id missing in runtime env",
    });
  }

  try {
    const client = getSanityClient();
    const [allCount, live] = await Promise.all([
      client.fetch<number>(`count(*[_type == "article"])`),
      client.fetch<
        Array<{ _id: string; slug: string; editorialStatus?: string; publishedAt?: string }>
      >(
        `*[_type == "article" && defined(slug.current) && (editorialStatus == "published" || !defined(editorialStatus)) && publishedAt <= now()]{
          _id,
          "slug": slug.current,
          editorialStatus,
          publishedAt
        }`,
      ),
    ]);

    return NextResponse.json({
      ok: true,
      configured: true,
      hasReadToken,
      dataset,
      projectIdSet: Boolean(projectId),
      articleCountAll: allCount,
      articleCountLive: live.length,
      liveSlugs: live.map((a) => a.slug),
      hint:
        allCount > 0 && live.length === 0
          ? "Articles exist but none pass editorialStatus=published filter. Use Publish to site (/news)."
          : allCount === 0 && !hasReadToken
            ? "No articles visible — private dataset likely needs SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN on the server."
            : allCount === 0
              ? "Token present but zero articles returned — check project/dataset."
              : "Live articles should appear on /news.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        hasReadToken,
        dataset,
        projectIdSet: Boolean(projectId),
        error: error instanceof Error ? error.message : "Unknown Sanity error",
      },
      { status: 500 },
    );
  }
}
