---
title: "How to update OG image for social media previews"
status: accepted
---

The build-time OG technique (Satori → SVG → resvg → PNG, fonts, Satori CSS limits, social-cache verification, common issues) is shared across Archcore web properties and documented in the `archcore` global source `web/og-image-generation`. This guide covers only the **landing site (Astro) specifics**.

## Prerequisites

- Node.js, `npm install`
- Fonts at `scripts/fonts/Inter-Bold.ttf` and `scripts/fonts/Inter-Regular.ttf`
- The logo at `public/logo.png`, inlined as base64 by the renderer

## Two generators, one renderer

`src/lib/og-image.ts` holds the shared renderer: `renderOgImage(variant)` takes a headline array, a subtitle, and a bottom label, and returns PNG bytes. It also owns the visual constants — 1200×630, Solarized Light `#fdf6e3`, a 70 px grid, logo plus wordmark top-left, and the `archcore.ai` bottom bar with a right-aligned label. Both generators call it.

**Marketing pages — static files written before the build.** `scripts/generate-og-image.mts` walks its `VARIANTS` array and writes one PNG per entry into `public/`. Today four: `og-image.png` (`/`), `og-image-plugin.png` (`/plugin/`), `og-image-cli.png` (`/cli/`), `og-image-how-to-use.png` (`/how-to-use/`). Headlines mirror each page's hero H1; subtitles read from `src/data/product-copy.ts`, so the card and the page cannot drift apart.

**Articles — rendered during the build by a route.** `src/pages/og/[...slug].png.ts` emits one image per non-draft entry of the `blog`, `learn`, and `alternatives` collections, using the entry's own `title` and `description`. There is no file to add and no variant to register; publishing an article produces its card.

## How the image reaches a scraper

There is no prerender step and no SPA shell. Astro writes one static HTML file per route, and the `og:image` tag is in it at build time.

- **Marketing routes:** `src/data/marketing-meta.json` names each route's `title`, `ogImage`, `schemas`, and `descriptionKey`; `src/layouts/MarketingLayout.astro` writes the OG and Twitter tags from it. This is the layer scrapers read.
- **Articles and pillars:** `src/layouts/ArticleLayout.astro` and `src/layouts/PillarLayout.astro` use the entry's `ogImage` when the frontmatter sets one, and otherwise fall back to `/og/<section>/<slug>.png` — the route above.
- **Client:** `src/hooks/use-page-meta.ts` rewrites the same tags when a visitor switches language inside a hydrated React page. It never runs for a scraper, which reads the static English head.

## Common tasks

- **Generate:** `npm run og:generate` writes all `VARIANTS` to `public/`. `npm run build` runs it through `prebuild`, together with `i18n:compile` and `stars:fetch`.
- **Add or edit a marketing variant:** edit `VARIANTS` in `scripts/generate-og-image.mts` (`output`, `headline[]`, `subtitle`, `bottomLabel`), then point the route's `ogImage` at the new file in `src/data/marketing-meta.json`.
- **Change the shared look:** edit the constants and the Satori tree in `src/lib/og-image.ts`. Every marketing card and every article card changes together.
- **Preview:** `npm run build && npm run preview`, then open `/og-image*.png`, an article's `/og/blog/<slug>.png`, and check `og:image` in the built HTML under `dist/`.

## Landing-specific rules

- **Keep two layers in sync for marketing routes:** the `VARIANTS` entry (generator) and the route's `ogImage` (`src/data/marketing-meta.json`) must name the same `og-image-<page>.png`. `scripts/verify-build.mts` fails the build when a page's `og:image` points at a file that is not in `dist/`.
- Articles need no synchronization. Set `ogImage` in frontmatter only to override the generated card.
- All headline and subtitle copy must follow `.archcore/messaging-alignment.rule.md` (the single source of truth for landing copy).
- A changed marketing title or description also changes `scripts/fixtures/seo-baseline.json`. Update the baseline only for an intentional, reviewed change.

## Key files

`src/lib/og-image.ts`, `scripts/generate-og-image.mts`, `src/pages/og/[...slug].png.ts`, `scripts/fonts/`, `public/og-image*.png`, `public/logo.png`, `src/data/marketing-meta.json`, `src/layouts/MarketingLayout.astro`, `src/layouts/ArticleLayout.astro`, `src/layouts/PillarLayout.astro`, `src/hooks/use-page-meta.ts`.
