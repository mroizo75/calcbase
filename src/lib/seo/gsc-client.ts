import { google } from "googleapis";
import type { GscPageRow, GscQueryRow, GscSnapshot } from "@/lib/seo/gsc-scoring";

const DEFAULT_PERIOD_DAYS = 28;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function getSearchConsoleClient() {
  const email = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const key = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return google.searchconsole({ version: "v1", auth });
}

function siteUrl(): string {
  return process.env.GSC_SITE_URL ?? "sc-domain:calcbase.io";
}

function dateDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function fetchGscSnapshot(
  periodDays = DEFAULT_PERIOD_DAYS,
): Promise<GscSnapshot> {
  const searchconsole = getSearchConsoleClient();
  const startDate = dateDaysAgo(periodDays);
  const endDate = todayUtc();
  const site = siteUrl();

  const [pageRes, queryRes] = await Promise.all([
    searchconsole.searchanalytics.query({
      siteUrl: site,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 250,
      },
    }),
    searchconsole.searchanalytics.query({
      siteUrl: site,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page", "query"],
        rowLimit: 1000,
      },
    }),
  ]);

  const pages: GscPageRow[] = (pageRes.data.rows ?? []).map((row) => ({
    page: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 100,
  })).filter((r) => r.page);

  const queries: GscQueryRow[] = (queryRes.data.rows ?? []).map((row) => ({
    page: row.keys?.[0] ?? "",
    query: row.keys?.[1] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 100,
  })).filter((r) => r.page && r.query);

  return { periodDays, pages, queries };
}
