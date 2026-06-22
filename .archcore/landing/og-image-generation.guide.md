---
title: "How to update OG image for social media previews"
status: accepted
---

The build-time OG technique (Satori → SVG → resvg → PNG, fonts, Satori CSS limits, social-cache verification, common issues) is shared across Archcore web properties and documented in the `archcore` global source `web/og-image-generation`. This guide covers only the **landing site (Vite SPA) specifics**.

## Prerequisites

- Node.js, `npm install`
- Fonts at `scripts/fonts/Inter-Bold.ttf` and `scripts/fonts/Inter-Regular.ttf`

## How landing OG works

The generator emits one image per `VARIANTS` entry — today three: `og-image.png` (`/`), `og-image-plugin.png` (`/plugin`), `og-image-cli.png` (`/cli`). Each headline mirrors that page's hero H1. Shared chrome: Solarized Light (`#fdf6e3`) + 70px grid, logo+wordmark top-left, headline 56px, subtitle 22px, `archcore.ai` plus a right-aligned label in the bottom bar.

Per-route propagation to social scrapers uses two layers:

- **Static (build):** `scripts/prerender-routes.mts` (a Vite `closeBundle` plugin) clones `dist/index.html` → `dist/{plugin,cli}/index.html` and rewrites og/title/description/canonical/Twitter per `ROUTES` entry. This is the layer scrapers read.
- **Client:** `src/hooks/use-page-meta.ts` updates the same tags on SPA navigation; `src/pages/plugin.tsx` and `cli.tsx` pass the matching `ogImage`.

## Common tasks

- **Generate:** `npm run og:generate` (writes all `VARIANTS` to `public/`). Build runs it via `prebuild` (`npm run build` → `i18n:compile` + `og:generate`).
- **Add/edit a variant:** edit the `VARIANTS` array in `scripts/generate-og-image.mts` (`output`, `headline[]`, `subtitle`, `bottomLabel`; shared visual constants above the array; logo `public/logo.png`). For a new route also add a `ROUTES` entry in `scripts/prerender-routes.mts` and pass `ogImage` to `usePageMeta` in the page.
- **Preview:** `npm run build && npm run preview`, open `/og-image*.png` and inspect `og:image` in the `/plugin/` and `/cli/` DOM.

## Landing-specific rules

- **Keep three layers in sync:** `VARIANTS` (generator), `ROUTES` (prerender), and `usePageMeta` (page) must all reference the same `og-image-<page>.png`.
- All headline/subtitle copy must follow `.archcore/messaging-alignment.rule.md` (the single source of truth for landing copy).

## Key files

`scripts/generate-og-image.mts`, `scripts/fonts/`, `public/og-image*.png`, `public/logo.png`, `scripts/prerender-routes.mts`, `src/hooks/use-page-meta.ts`, `index.html`.
