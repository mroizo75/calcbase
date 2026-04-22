import { ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";

export function GET() {
  const publisherId = ADSENSE_PUBLISHER_ID || "pub-XXXXXXXXXXXXXXXX";

  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
