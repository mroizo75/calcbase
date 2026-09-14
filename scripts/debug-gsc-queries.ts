import { fetchGscSnapshot } from "../src/lib/seo/gsc-client";
import { calculators } from "../src/lib/calculators/registry";

async function main() {
  const snapshot = await fetchGscSnapshot(28);
  const calculatorSlugs = calculators.map((c) => c.slug);

  const buckets = {
    total: snapshot.queries.length,
    impr40: 0,
    pos5to25: 0,
    informational: 0,
    hasCalc: 0,
    passAllRelaxed: 0,
    samples: [] as Array<Record<string, unknown>>,
  };

  const informational =
    /\b(how|what|why|vs|versus|rate|rates|formula|calculate|calculator|mean|example|guide|margin|markup|vat|gst|profit|discount|break.?even|roi|commission|percentage)\b/i;

  for (const row of snapshot.queries) {
    if (row.impressions >= 20) buckets.impr40 += 1;
    if (row.position >= 4 && row.position <= 30) buckets.pos5to25 += 1;
    const q = row.query.toLowerCase();
    if (informational.test(q)) buckets.informational += 1;

    const related = calculatorSlugs.filter((slug) => {
      const stem = slug.replace(/-calculator$/, "").replace(/-/g, " ");
      return q.includes(stem) || stem.split(" ").some((w) => w.length > 3 && q.includes(w));
    });
    if (related.length || /vat|gst|tax|margin|markup|profit/.test(q)) buckets.hasCalc += 1;

    if (
      row.impressions >= 15 &&
      row.position >= 4 &&
      row.position <= 30 &&
      informational.test(q) &&
      q.length >= 6
    ) {
      buckets.passAllRelaxed += 1;
      if (buckets.samples.length < 15) {
        buckets.samples.push({
          query: row.query,
          impressions: row.impressions,
          position: Number(row.position.toFixed(1)),
          page: row.page,
        });
      }
    }
  }

  // top queries overall
  const top = [...snapshot.queries]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)
    .map((r) => ({
      query: r.query,
      impressions: r.impressions,
      position: Number(r.position.toFixed(1)),
      page: r.page,
    }));

  console.log(JSON.stringify({ buckets, top }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
