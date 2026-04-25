---
title: "Landing site tech stack"
status: accepted
---

## Overview

The Archcore landing site (archcore.ai) is a fully static single-page application deployed to GitHub Pages.

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
| Hosting | GitHub Pages | — |

## Pages

- `/` — Main landing page (`src/pages/landing.tsx`)
- `/plugin` — Claude Code & Cursor plugin page (`src/pages/plugin.tsx`)
- `/cli` — CLI page (`src/pages/cli.tsx`)
- `/teams/getting-started` — Team deployment guide (`src/pages/teams-getting-started.tsx`)
- `/privacy` — Privacy policy (`src/pages/privacy.tsx`)

All non-root pages are lazy-loaded via `React.lazy` from `src/App.tsx`.

## Key architecture decisions

- **SPA routing on GitHub Pages** — A Vite post-build plugin copies `index.html` to `404.html`. GitHub Pages serves 404.html for unknown paths, enabling client-side routing.
- **i18n via Lingui** — English (source) and Russian locales. Translations live in `src/locales/{locale}/messages.po`. Pipeline: edit .tsx → `npm run i18n:extract` → translate .po → `npm run i18n:compile`.
- **Build-time OG image generation** — `scripts/generate-og-image.mts` uses Satori (JSX → SVG) and @resvg/resvg-js (SVG → PNG) to produce three 1200×630 variants: `public/og-image.png` (home), `public/og-image-plugin.png`, `public/og-image-cli.png`. Driven by a `VARIANTS` array in the script. Runs automatically via `prebuild`. See `.archcore/landing/og-image-generation.guide.md`.
- **Per-page meta tags** — Two layers cooperate so every route has correct `<title>`, `<meta description>`, canonical, OG, and Twitter tags:
  - `src/hooks/use-page-meta.ts` updates the tags on the client when a route mounts (covers SPA navigation, bookmarks, and Google's JS render).
  - `scripts/prerender-routes.mts` (Vite `closeBundle` plugin) clones `dist/index.html` into `dist/{route}/index.html` after the build and rewrites the same tags statically. Required because social scrapers (Twitter, Facebook, LinkedIn, Slack) do not execute JS. Route-meta config (title, description, OG image) lives in the plugin's `ROUTES` array.
- **GitHub Actions deploy** — `dist/` deployed on every push to `main` via `.github/workflows/deploy.yml`.

## Build pipeline

`npm run build` runs the following chain:
1. `prebuild`: `npm run i18n:compile && npm run og:generate` (compiles message catalogs and generates all 3 OG images)
2. `check`: `tsc -b --noEmit && eslint .`
3. `vite build` → `dist/`
4. Vite `closeBundle` plugins: `index.html` → `404.html` (SPA fallback) and `dist/{plugin,cli}/index.html` (per-route static meta for scrapers)

## Examples

Section components live in `src/components/sections/` and use Lingui `<Trans>` and `msg` for all user-facing strings. Per-page documents (e.g. `src/pages/plugin.tsx`, `src/pages/cli.tsx`) call `usePageMeta` once at the top of the page component to set route-specific meta and the matching OG image variant.
