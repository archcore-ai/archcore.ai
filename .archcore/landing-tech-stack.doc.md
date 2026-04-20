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
- `/teams/getting-started` — Team deployment guide (`src/pages/teams-getting-started.tsx`)

## Key architecture decisions

- **SPA routing on GitHub Pages** — A Vite post-build plugin copies `index.html` to `404.html`. GitHub Pages serves 404.html for unknown paths, enabling client-side routing.
- **i18n via Lingui** — English (source) and Russian locales. Translations live in `src/locales/{locale}/messages.po`. Pipeline: edit .tsx → `npm run i18n:extract` → translate .po → `npm run i18n:compile`.
- **Build-time OG image generation** — `scripts/generate-og-image.mts` uses Satori (JSX → SVG) and @resvg/resvg-js (SVG → PNG) to produce `public/og-image.png` (1200x630). Runs automatically via `prebuild`. See `.archcore/landing/og-image-generation.guide.md`.
- **No SSR** — Fully static client-rendered SPA. Meta tags and JSON-LD are in `index.html` directly.
- **GitHub Actions deploy** — `dist/` deployed on every push to `main` via `.github/workflows/deploy.yml`.

## Build pipeline

`npm run build` runs the following chain:
1. `prebuild`: `npm run i18n:compile && npm run og:generate`
2. `check`: `tsc -b --noEmit && eslint .`
3. `vite build` → `dist/`

## Examples

Section components live in `src/components/sections/` and use Lingui `<Trans>` and `msg` for all user-facing strings.
