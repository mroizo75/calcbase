# CalcBase – AI Agent Guidelines

## Project Purpose

CalcBase (https://www.calcbase.io) is a production-ready, SEO-first calculator platform.
The audience is small online sellers and freelancers in the UK and EU who need to price
products and services correctly with VAT, platform fees, and a target margin. The job is:
tell them what price to charge so they actually make the margin they want after VAT and fees,
and show why.

## Architecture

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Validation:** Zod
- **Testing:** Vitest + Testing Library
- **Deployment:** Vercel

### Key patterns

- Server components by default; client components only for interactive calculator UIs.
- Calculator configs live in `src/lib/calculators/registry.ts` — this registry drives the index,
  metadata, sitemap, search, related tools, and structured data.
- Math logic lives in pure utility functions (`src/lib/utils/math.ts`) with unit tests.
- Metadata is generated via helpers in `src/lib/seo/metadata.ts`.
- Structured data uses @graph JSON-LD pattern via `src/lib/seo/schema.ts`.

## Rules

### SEO

- Every page must have unique title (50-60 chars) and meta description (150-160 chars).
- Self-referencing canonical URLs on all pages.
- Sitemap includes only canonical, indexable URLs.
- robots.ts allows all public pages and AI crawlers.
- Structured data must reflect visible page content exactly — no misleading schema.
- Internal links must be standard crawlable `<a>` elements with descriptive anchor text.
- No duplicate or near-duplicate pages targeting the same search intent.

### Content Quality

- No thin pages. Every page must have substantial, original content.
- No templated SEO spam (same FAQ, same examples, just different title).
- Calculator pages must include: intro, calculator UI, formula, worked examples, FAQ, related tools.
- Guides must be practical, original, and linked to relevant calculators.
- No new page without a distinct job for the target audience. Do not add a page or feature
  that does not help UK and EU sellers and freelancers price with VAT, fees, and margin.

### Performance

- Minimize JS payload. Prefer server rendering for content.
- Isolate calculator interactivity to small client components.
- Use `display: "optional"` on fonts so a late font file does not move the page.
- Lazy-load non-critical components.
- Target LCP < 2.5s, INP < 200ms, CLS < 0.1.

### Code Style

- TypeScript strict mode.
- Named exports only.
- camelCase for variables/functions, PascalCase for components.
- One concept per file. Keep functions small and pure.
- Validate inputs with guard clauses.
- No console.log in production code.

### Adding New Calculators

1. Add math functions to `src/lib/utils/math.ts` with tests.
2. Add config to `src/lib/calculators/registry.ts` with unique SEO metadata, FAQ, examples.
3. Create `src/app/[slug]/page.tsx` and `[slug]-ui.tsx` (client component).
4. The page uses `CalculatorShell` which auto-generates structured data, breadcrumbs, and sections.
5. Update related calculator slugs in existing configs.
6. Verify build passes and all tests pass.
7. Do not add a calculator, guide, or article unless it does a distinct job for the target audience.

### Version Guidance

- Always reference current Next.js App Router APIs and conventions.
- Do not use Pages Router patterns.
- Prefer Next.js native metadata, sitemap, and robots file conventions.
