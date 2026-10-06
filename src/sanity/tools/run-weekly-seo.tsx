"use client";

import { useState } from "react";
import { definePlugin, useClient } from "sanity";

const API_VERSION = "2024-01-01";

interface JobResult {
  createdCount?: number;
  weeklyReportId?: string;
  followUpsMeasured?: string[];
  articleDrafts?: string[];
  pages?: number;
  queries?: number;
  articleDraftDiagnostics?: {
    skippedReason?: string | null;
    error?: string;
  };
}

function RunWeeklySeoTool() {
  const client = useClient({ apiVersion: API_VERSION });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JobResult | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const token = client.config().token;
      if (!token) {
        setError("Sign in to Studio, then try again.");
        return;
      }

      const response = await fetch("/api/studio/run-seo-week", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = (await response.json()) as JobResult & { message?: string };
      if (!response.ok) {
        setError(body.message || "The weekly job failed.");
        return;
      }
      setResult(body);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  const created = result?.createdCount ?? 0;

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "32px auto",
        padding: 24,
        color: "var(--card-fg-color)",
        background: "var(--card-bg-color)",
        border: "1px solid var(--card-border-color)",
        borderRadius: 6,
        fontFamily: "inherit",
      }}
    >
      <h1 style={{ fontSize: 22, margin: "0 0 8px" }}>Weekly SEO</h1>
      <p style={{ margin: "0 0 16px", lineHeight: 1.5, color: "var(--card-muted-fg-color)" }}>
        Reads Search Console and writes this week&apos;s suggestions into SEO Opportunities, plus a
        weekly report. Pages that already have a pending suggestion are skipped. Leave this tab
        open — it can take a few minutes.
      </p>
      <button
        type="button"
        onClick={() => {
          void run();
        }}
        disabled={busy}
        style={{
          background: "var(--card-focus-ring-color, #2276fc)",
          color: "#fff",
          border: 0,
          borderRadius: 4,
          padding: "10px 14px",
          fontWeight: 600,
          cursor: busy ? "wait" : "pointer",
          opacity: busy ? 0.7 : 1,
        }}
      >
        {busy ? "Running weekly job…" : "Run weekly SEO job"}
      </button>
      {error ? (
        <p role="alert" style={{ margin: "16px 0 0", color: "var(--card-badge-critical-fg-color, #d32f2f)" }}>
          {error}
        </p>
      ) : null}
      {result ? (
        <div style={{ marginTop: 16, lineHeight: 1.5 }}>
          <p style={{ margin: 0 }}>
            Created <strong>{created}</strong> suggestion{created === 1 ? "" : "s"}.
          </p>
          <p style={{ margin: "4px 0 0" }}>
            Follow-ups measured: <strong>{result.followUpsMeasured?.length ?? 0}</strong>
            {" · "}
            Article drafts: <strong>{result.articleDrafts?.length ?? 0}</strong>
          </p>
          {result.weeklyReportId ? (
            <p style={{ margin: "4px 0 0" }}>
              Report: <code>{result.weeklyReportId}</code>
            </p>
          ) : null}
          {created === 0 ? (
            <p style={{ margin: "8px 0 0" }}>
              Nothing new was queued. Open SEO Opportunities and check Pending review for packages
              already waiting.
            </p>
          ) : (
            <p style={{ margin: "8px 0 0" }}>
              Open SEO Opportunities → Pending review, and SEO Weekly Reports.
            </p>
          )}
          {result.articleDraftDiagnostics?.skippedReason ? (
            <p style={{ margin: "8px 0 0" }}>
              Article draft: {result.articleDraftDiagnostics.skippedReason}
              {result.articleDraftDiagnostics.error
                ? ` (${result.articleDraftDiagnostics.error})`
                : ""}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export const runWeeklySeoTool = definePlugin({
  name: "run-weekly-seo",
  tools: [
    {
      name: "weekly-seo",
      title: "Weekly SEO",
      component: RunWeeklySeoTool,
    },
  ],
});
