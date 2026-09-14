import { fetchGscSnapshot } from "../src/lib/seo/gsc-client";

async function main() {
  const snap = await fetchGscSnapshot(7);
  const sample = snap.pages[0];
  console.log(
    JSON.stringify(
      {
        ok: true,
        periodDays: snap.periodDays,
        pages: snap.pages.length,
        queries: snap.queries.length,
        samplePage: sample
          ? {
              page: sample.page,
              impressions: sample.impressions,
              clicks: sample.clicks,
              position: Number(sample.position.toFixed(1)),
            }
          : null,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
});
