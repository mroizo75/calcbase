import { NextResponse } from "next/server";
import { GET as runWeeklySeoCron } from "@/app/api/cron/seo-opportunities/route";
import { canRunWeeklySeo, resolveStudioRoles } from "@/lib/seo/studio-cron-auth";

export const runtime = "nodejs";
export const maxDuration = 300;

function bearerToken(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(\S+)$/.exec(header);
  return match?.[1] ?? "";
}

function projectId(): string | undefined {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
}

/**
 * Studio trigger for the weekly SEO job.
 * The browser sends the signed-in Sanity session. CRON_SECRET stays on the server.
 */
export async function POST(request: Request) {
  const token = bearerToken(request);
  if (!token) {
    return NextResponse.json(
      { code: "unauthorized", message: "Sign in to Studio first" },
      { status: 401 },
    );
  }

  const sanityProjectId = projectId();
  if (!sanityProjectId) {
    return NextResponse.json(
      { code: "misconfigured", message: "Missing Sanity project id" },
      { status: 500 },
    );
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { code: "misconfigured", message: "CRON_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    const roles = await resolveStudioRoles(token, sanityProjectId);
    if (roles.length === 0) {
      return NextResponse.json(
        { code: "unauthorized", message: "Studio session was rejected" },
        { status: 401 },
      );
    }
    if (!canRunWeeklySeo(roles)) {
      return NextResponse.json(
        { code: "forbidden", message: "Your Studio role cannot run the weekly job" },
        { status: 403 },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not verify Studio session";
    return NextResponse.json({ code: "unauthorized", message }, { status: 401 });
  }

  const cronRequest = new Request("https://internal.calcbase/api/cron/seo-opportunities", {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });
  return runWeeklySeoCron(cronRequest);
}
