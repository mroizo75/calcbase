# SEO opportunity system (GSC → anbefaling → menneske → læring)

This is a **review + learning loop**, not a content farm.

## Weekly red thread

1. Cron reads GSC and builds **recommendation packages** (slug where relevant, title, meta, why).
2. You review in Studio and apply/publish manually.
3. ~7 days later the next cron run measures CTR/position again and writes **outcome** + notes.
4. A **SEO Weekly Report** summarizes wins/losses so you see what patterns work.

## What each recommendation includes

| Kind | Package |
|------|---------|
| Calculator CTR | `proposedTitle`, `proposedTitleAlt`, `proposedDescription`, `recommendationSummary`. **Slug stays fixed** (URL changes hurt SEO). |
| News CTR | Same + optional `recommendedSlug` if current slug is weak. |
| Article draft | Full draft article + recommended slug/title/excerpt. **Not live** until Publish to site. |
| Query gap / news review | Action brief only (you edit content yourself). |

## What it must never do

- Auto-publish articles
- Auto-change calculator URLs
- Leave thin unedited AI text live
- Mass-create keyword pages

## Studio workflow

1. **SEO Opportunities → Pending** — open each package, edit proposals if needed.
2. Calculator: **Approve & apply title/meta** → status `applied`, outcome `awaiting_followup`.
3. Article: edit draft → **Publish to site** when ready.
4. Next week: **Outcomes — what worked** + **SEO Weekly Reports**.
5. If outcome is `worse`, revert override / unpublish and note the pattern.

## Manual cron

```bash
curl -sS -H "Authorization: Bearer $CRON_SECRET" \
  "https://www.calcbase.io/api/cron/seo-opportunities"
```

Response includes `recommendationPackages` and `weeklyReportId`.

## Env

See `.env.example`. `OPENAI_API_KEY` fills title/meta packages and article drafts.
