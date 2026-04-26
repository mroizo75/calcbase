import { ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";

export function GET() {
  const rawId = ADSENSE_PUBLISHER_ID || "";
  const publisherId = rawId.startsWith("ca-") ? rawId.slice(3) : rawId;

  if (!publisherId) {
    return new Response("# ads.txt — publisher ID not configured\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
