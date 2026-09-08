# Archcore Landing

<https://archcore.ai>

Archcore is a git-native context layer for AI coding agents. It keeps specs, architecture, decisions, rules, and plans in Git, and makes the right project context available to AI coding agents as they work.

## Links

- **Website:** [archcore.ai](https://archcore.ai)
- **Docs:** [docs.archcore.ai](https://docs.archcore.ai)
- **GitHub:** [github.com/archcore-ai](https://github.com/archcore-ai)

## Development

Use Node.js 22.12 or newer. This repository is one Astro project. Astro generates every route as static HTML; React handles interactive marketing pages and Lingui translations.

```bash
npm ci
cp .env.example .env
npm run dev
```

Set the public PostHog key in `.env`. The local site opens at `http://localhost:4321/`.

## Build and verify

```bash
npm run build
npx playwright install chromium
npm run test:browser
npm run preview
```

For an intentional build without analytics, run `ALLOW_MISSING_ANALYTICS_KEY=1 npm run build`.

The build runs type checking, ESLint, Astro generation, and output verification. The verifier checks existing route metadata, article content and dates, local links, FAQ parity, and installer/download bytes. Browser tests cover every sitemap page at mobile, tablet, and desktop widths, plus localization and installation flows.

## Source map

- `src/pages/`: Astro routes and static download endpoints.
- `src/layouts/SiteLayout.astro`: shared HTML shell, navigation, footer, theme, and analytics.
- `src/components/pages/`: React page bodies and their Lingui providers. No client-side router.
- `src/content/`: articles, reference pages, integration recipes, and walkthrough content.
- `src/index.css`: shared design tokens and Tailwind utilities.
- `src/styles/content.css`: shared shell and article/integration layouts.
- `src/data/marketing-meta.json`: marketing metadata. FAQ data stays with its visible component.
- `public/`: installers, redirects, images, demos, robots, and other unchanged public URLs.

[Deployment and rollback](docs/deployment.md) describes the GitHub Pages workflows. Build output is `dist/`; no separate content build or merge step is needed.
