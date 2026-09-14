import { POST } from "../src/app/api/seo/backfill-proposals/route";

async function main() {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    throw new Error("CRON_SECRET missing");
  }

  const req = new Request("http://localhost/api/seo/backfill-proposals", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });

  const res = await POST(req);
  console.log(JSON.stringify(await res.json(), null, 2));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
