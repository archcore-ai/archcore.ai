---
title: "Landing site tech stack"
status: accepted
---

## Overview

The Archcore landing site (archcore.ai) is a fully static single-page application deployed to GitHub Pages, plus a separate Astro content sub-build for the content hub (`/blog/`, `/learn/`, `/alternatives/`) merged into the same deploy artifact.

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.0 |
| Build tool | Vite | 7.2.4 |
| Styling | Tailwind CSS | 4.1.17 |
| i18n | Lingui | 5.9.0 |
| UI primitives | Radix UI | latest |
| Icons | Lucide React | latest |
| Routing | React Router DOM | 7.13.0 |
| Analytics | PostHog | latest |
| OG image | Satori + @resvg/resvg-js | latest |
| Content hub | Astro (separate `content-site/` package) | 6.x |
| Hosting | GitHub Pages | — |

## Pages

- `/` — Main landing page (`src/pages/landing.tsx`)
- `/plugin` — Claude Code & Cursor plugin page (`src/pages/plugin.tsx`)
- `/cli` — CLI page (`src/pages/cli.tsx`)
- `/how-to-use` — Interactive walkthrough (`src/pages/how-to-use.tsx`)
- `/teams/getting-started` — Team deployment guide (`src/pages/teams-getting-started.tsx`)
- `/privacy` — Privacy policy (`src/pages/privacy.tsx`)
- `/blog/`, `/learn/` — content hub listings + articles, built by `content-site/` (Astro), NOT part of the SPA. `/alternatives/` collection exists but has no content and no index page yet.

All non-root SPA pages are lazy-loaded via `React.lazy` from `src/App.tsx`.

## Key architecture decisions

- **SPA routing on GitHub Pages** — A Vite post-build plugin copies `index.html` to `404.html`. GitHub Pages serves 404.html for unknown paths, enabling client-side routing.
- **i18n via Lingui** — English (source) and Russian locales. Translations live in `src/locales/{locale}/messages.po`. Pipeline: edit .tsx → `npm run i18n:extract` → translate .po → `npm run i18n:compile`.
- **Build-time OG image generation** — `scripts/generate-og-image.mts` uses Satori (JSX → SVG) and @resvg/resvg-js (SVG → PNG) to produce 1200×630 variants driven by a `VARIANTS` array. Runs automatically via `prebuild`. See `.archcore/landing/og-image-generation.guide.md`.
- **Per-page meta tags** — Two layers cooperate so every SPA route has correct `<title>`, `<meta description>`, canonical, OG, and Twitter tags:
  - `src/hooks/use-page-meta.ts` updates the tags on the client when a route mounts (covers SPA navigation, bookmarks, and Google's JS render).
  - `scripts/prerender-routes.mts` (Vite `closeBundle` plugin) clones `dist/index.html` into `dist/{route}/index.html` after the build and rewrites the same tags statically. Route-meta config lives in the plugin's `ROUTES` array. The same plugin generates `dist/sitemap.xml` from ROUTES + homepage with the build date as lastmod (no static `public/sitemap.xml`).
  - Each route also carries a hand-written static `body` (h1 + paragraphs + site nav) that replaces the home shell's crawler fallback, and an optional `faq[]`. Because the shell is cloned wholesale, `faq[]` is how a route gets its own FAQPage JSON-LD — routes without it have the home block stripped instead of inheriting it. Both are copy surfaces governed by `messaging-alignment.rule.md`.
- **Content hub as Astro sub-build** — `content-site/` is a self-contained Astro project (own `package.json`/lockfile) with content collections `blog`, `learn`, `alternatives` (markdown + zod schema: title ≤70, description ≤170, pubDate, updatedDate, faq, ogImage, draft). Two layouts: `ArticleLayout.astro` emits canonical, OG/Twitter, Article + FAQPage JSON-LD, a visible updated date, and a raw-markdown twin per article (`/blog/<slug>.md` via `[slug].md.ts` endpoints); `ListingLayout.astro` is the shared shell for section indexes (`/blog/`, `/learn/`) and emits CollectionPage + ItemList JSON-LD. `scripts/merge-content.mts` copies `content-site/dist/{blog,learn,alternatives,_astro}` into `dist/` and appends content routes to `dist/sitemap.xml`, skipping routes already present so a repeat run cannot duplicate `<loc>` entries. Decision: `.archcore/landing/content-hub-astro-subbuild.adr.md`.
- **GitHub Actions deploy** — `dist/` deployed on every push to `main` via `.github/workflows/deploy.yml`. CI runs `npm ci` AND `npm ci --prefix content-site`.

## Build pipeline

`npm run build` runs the following chain:
1. `prebuild`: `npm run i18n:compile && npm run og:generate && npm run stars:fetch`
2. `check`: `tsc -b --noEmit && eslint .` (eslint ignores `content-site/` — it is a separate project)
3. `vite build` → `dist/`
4. Vite `closeBundle` plugins: `index.html` → `404.html` (SPA fallback), `dist/{route}/index.html` per-route static meta + body + FAQPage, `dist/sitemap.xml`
5. `build:content`: `npm --prefix content-site run build` → `content-site/dist/`
6. `merge:content`: `npx tsx scripts/merge-content.mts` → copies content sections + `_astro/` assets into `dist/`, appends new routes to sitemap

Note that the content hub and the per-route static HTML exist only in `dist/` — `npm run dev` serves the SPA fallback for `/blog/` and `/learn/`. Verify those surfaces against a built `dist/` (`npx vite preview`), not the dev server.

## Examples

Section components live in `src/components/sections/` and use Lingui `<Trans>` and `msg` for all user-facing strings. Per-page documents (e.g. `src/pages/plugin.tsx`, `src/pages/cli.tsx`) call `usePageMeta` once at the top of the page component to set route-specific meta and the matching OG image variant. A section shared by several pages takes a discriminating prop rather than being duplicated — `migration-section.tsx` uses `entryPoint: "plugin" | "cli"` so both money pages read from one copy source. Content articles are plain markdown files in `content-site/src/content/{blog,learn,alternatives}/<slug>.md` with frontmatter per the collection schema; English only (the content hub is not wired into Lingui).
