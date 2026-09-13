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

**Marketing pages — static files written before the build.** `scripts/generate-og-image.mts` walks its `VARIANTS` array and writes one PNG per entry into `public/`. Today four: `og-image.png` (`/` and `/privacy/`), `og-image-plugin.png` (`/plugin/`), `og-image-cli.png` (`/cli/`), `og-image-how-to-use.png` (`/how-to-use/`). Headlines mirror each page's hero H1; subtitles read from `src/data/product-copy.ts`, so the card and the page cannot drift apart.

**Everything published from a collection — rendered during the build by a route.** `src/pages/og/[...slug].png.ts` emits one image per non-draft entry, from the entry's own copy. There is no file to add and no variant to register; publishing an entry produces its card.

| Source | Card path | Headline | Subtitle | Bottom label |
| --- | --- | --- | --- | --- |
| `blog`, `learn`, `alternatives` | `/og/<section>/<slug>.png` | `title` | `description` | the section name |
| `pillars` | `/og/pillars/<slug>.png` | `heading` | `description` | "Archcore reference" |
| `integrations` | `/og/integrations/<slug>.png` | `heading` | `summary` | `category` · "Integration recipe" |
| the three hubs | `/og/blog.png`, `/og/learn.png`, `/og/integrations.png` | a fixed name | the hub's own meta description, word for word | the section name |

Pillar cards are namespaced under `/og/pillars/` although the pages themselves sit at the site root, which keeps `/og/<slug>.png` free for the hubs. The hubs are listed in a `HUBS` array in the route because no collection entry describes them.

A recipe card leads with `heading` rather than `title`: a recipe page is about two named tools, and the heading is the only field where both appear together.

## How the image reaches a scraper

There is no prerender step and no SPA shell. Astro writes one static HTML file per route, and the `og:image` tag is in it at build time.

- **One component writes every head.** `src/components/SeoMeta.astro` emits the title, description, canonical, robots, the full OG block (including `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale`) and the full Twitter block. Every layout — marketing, article, pillar, listing, catalog, recipe — passes it four things that differ: `title`, `description`, `canonical`, `image`. Do not add an OG or Twitter tag to a layout; add it here, where every route gets it.
- **Which image each layout passes:** `MarketingLayout` reads `ogImage` from `src/data/marketing-meta.json`; `ArticleLayout` and `PillarLayout` use the entry's `ogImage` when the frontmatter sets one and otherwise the generated card; `ListingLayout` derives `/og/<section>.png` from its `sectionPath`; `CatalogLayout` and `RecipeLayout` name the integrations cards directly.
- **Client:** `src/hooks/use-page-meta.ts` rewrites the same tags when a visitor switches language inside a hydrated React page. It never runs for a scraper, which reads the static English head.

## Common tasks

- **Generate:** `npm run og:generate` writes all `VARIANTS` to `public/`. `npm run build` runs it through `prebuild`, together with `i18n:compile` and `stars:fetch`. The collection cards need no separate command — `astro build` renders the route.
- **Add or edit a marketing variant:** edit `VARIANTS` in `scripts/generate-og-image.mts` (`output`, `headline[]`, `subtitle`, `bottomLabel`), then point the route's `ogImage` at the new file in `src/data/marketing-meta.json`.
- **Change the shared look:** edit the constants and the Satori tree in `src/lib/og-image.ts`. Every card changes together.
- **Preview:** `npm run build && npm run preview`, then open `/og-image*.png`, an article's `/og/blog/<slug>.png`, a recipe's `/og/integrations/<slug>.png`, and check `og:image` in the built HTML under `dist/`.

## Landing-specific rules

- **Keep two layers in sync for marketing routes:** the `VARIANTS` entry (generator) and the route's `ogImage` (`src/data/marketing-meta.json`) must name the same `og-image-<page>.png`. `scripts/verify-build.mts` fails the build when a page's `og:image` points at a file that is not in `dist/`.
- **A collection page may not fall back to the site-wide card.** `scripts/verify-build.mts` requires every `/blog/*`, `/learn/*`, `/integrations/*` and pillar route to carry an `og:image` under `/og/`. Set `ogImage` in frontmatter only to replace the generated card with another specific one, never with `og-image.png`.
- **Every indexable route ships a complete card.** The build checks one each of `og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, and that the title, description, URL, and image agree with the page.
- **Every published page is in the sitemap or is `noindex`.** The build walks `dist/` for `index.html` files and fails on any route that is in neither state. `/install/` is the one deliberate exception, and it carries `noindex, follow` plus a canonical to `/cli/`.
- All headline and subtitle copy must follow `.archcore/messaging-alignment.rule.md` (the single source of truth for landing copy).
- A changed marketing title, description, or OG image also changes `scripts/fixtures/seo-baseline.json`. Update the baseline only for an intentional, reviewed change.

## Key files

`src/lib/og-image.ts`, `scripts/generate-og-image.mts`, `src/pages/og/[...slug].png.ts`, `src/components/SeoMeta.astro`, `scripts/fonts/`, `public/og-image*.png`, `public/logo.png`, `src/data/marketing-meta.json`, `src/layouts/*.astro`, `src/hooks/use-page-meta.ts`, `scripts/verify-build.mts`, `scripts/fixtures/seo-baseline.json`.
