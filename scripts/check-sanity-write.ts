import { createClient } from "next-sanity";

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    console.log(JSON.stringify({ ok: false, error: "NEXT_PUBLIC_SANITY_PROJECT_ID missing" }));
    process.exit(1);
  }
  if (!token) {
    console.log(JSON.stringify({ ok: false, error: "SANITY_API_WRITE_TOKEN missing" }));
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });

  const id = `seoOpportunity.test-connection`;
  await client.createOrReplace({
    _id: id,
    _type: "seoOpportunity",
    status: "rejected",
    kind: "newsReview",
    pageUrl: "https://calcbase.io/",
    slug: "test-connection",
    targetQueries: [],
    impressions: 0,
    clicks: 0,
    ctr: 0,
    position: 99,
    periodDays: 7,
    rationale: "Connection test — safe to delete",
    actionBrief: "Connection test document. Auto-deleted after verify.",
  });

  await client.delete(id);

  console.log(
    JSON.stringify({
      ok: true,
      projectId,
      dataset,
      write: "create+delete ok",
    }),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
});
