import { NextResponse } from "next/server";
import { getHouseAds } from "@/lib/ads/get-house-ads";
import { resolveVisitorCountry } from "@/lib/ads/visitor-country";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Per-visitor ads. The HTML pages are prerendered, so geo cannot be decided there. */
export async function GET(request: Request) {
  try {
    const country = await resolveVisitorCountry(request.headers);
    const ads = await getHouseAds();
    const eligible = ads.filter(
      (ad) => ad.countries.length === 0 || (country !== null && ad.countries.includes(country)),
    );

    return NextResponse.json(
      { country, ads: eligible },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ code: "house_ads_failed", message }, { status: 500 });
  }
}
