# SEO opportunity system (GSC → insight → human)

This is a **review queue**, not a content farm.

## What it does

1. Weekly cron reads Google Search Console (`sc-domain:calcbase.io` by default).
2. Scores CTR gaps and query gaps on **existing** pages.
3. Creates `seoOpportunity` documents in Sanity for human review.
4. Optionally suggests **title + meta description only** for calculators (`OPENAI_API_KEY`).
5. After approval, applies `calculatorSeoOverride` (title/meta only).

## What it must never do

- Generate or publish AI articles / Portable Text
- Auto-write FAQ or `longDescription`
- Mass-create `/news` pages for keywords

Doing so risks Google [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies) penalties and [AdSense content policy](https://support.google.com/adsense/answer/10502938) rejection. Humans write substantive content.

## Setup

1. Google Cloud: enable **Search Console API**, create a service account, add the SA email as a user on the Search Console property `sc-domain:calcbase.io`.
2. Sanity: create a write token with create/update on `seoOpportunity` and `calculatorSeoOverride`.
3. Set env vars (see `.env.example`).
4. Deploy on Vercel so `vercel.json` cron runs Mondays 06:00 UTC.
5. Trigger manually: `GET /api/cron/seo-opportunities` with `Authorization: Bearer $CRON_SECRET`.
6. Apply via Studio action **Approve & apply title/meta**, or `POST /api/seo/apply` with `{ "opportunityId": "..." }` and the same Bearer secret.
7. In Sanity → API → Webhooks, create a webhook on `calculatorSeoOverride` create/update:
   - URL: `https://<domain>/api/seo/revalidate?secret=$CRON_SECRET`
   - HTTP method: POST
   - Projection: `{ "slug": slug }`
   This busts the calculator page cache immediately after Studio apply. Without it, overrides refresh within 5 minutes.

## Studio workflow

- **Pending review** → read rationale + action brief.
- Calculator CTR with proposals → **Approve & apply title/meta** (or edit proposed fields first).
- Query-gap / news briefs → do the work yourself in registry/Studio → **Mark done (manual)**.
- Junk → **Reject**.
