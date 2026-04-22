# CalcBase

Free online business calculators — VAT, profit margins, markup, discounts, and break-even analysis.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/) for validation
- [Vitest](https://vitest.dev/) + Testing Library for tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    vat-calculator/       # Each calculator has a page.tsx + UI component
    add-vat/
    remove-vat/
    margin-calculator/
    markup-calculator/
    discount-calculator/
    break-even-calculator/
    guides/[slug]/        # Guide pages with original content
    calculators/          # Calculator index
    about/, contact/      # Trust/legal pages
    privacy-policy/, terms/
    robots.ts, sitemap.ts # SEO files
  components/
    calculator/           # Reusable calculator components
    layout/               # Header, footer, breadcrumb, search
    guide/                # Guide page shell
    ui/                   # shadcn/ui components
  lib/
    calculators/          # Calculator registry, types, configs
    guides/               # Guide registry
    seo/                  # Metadata and structured data helpers
    utils/                # Math, formatting, URL utilities
  tests/                  # Unit tests
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Adding a New Calculator

1. Add math functions to `src/lib/utils/math.ts`
2. Add config to `src/lib/calculators/registry.ts`
3. Create `src/app/[slug]/page.tsx` and `[slug]-ui.tsx`
4. Write tests for the math functions
5. Update related slugs in existing configs

See `AGENTS.md` for detailed guidelines.

## Deployment

Optimized for Vercel. Push to main to deploy.

## License

All rights reserved.
