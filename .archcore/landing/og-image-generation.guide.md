---
title: "How to update OG image for social media previews"
status: accepted
---

## Prerequisites

- Node.js installed
- Project dependencies installed (`npm install`)
- Font files present at `scripts/fonts/Inter-Bold.ttf` and `scripts/fonts/Inter-Regular.ttf`

## How it works

OG images (1200×630 PNG) are generated at build time using **Satori** (JSX → SVG) and **@resvg/resvg-js** (SVG → PNG). Layouts are defined as code in `scripts/generate-og-image.mts` — no Figma or external design tools needed.

The generator emits one image per entry in its `VARIANTS` array. Today it emits three variants, one per top-level page that needs a distinct social preview:

| Variant key (`output`) | Page | Headline mirrors |
|---|---|---|
| `og-image.png` | `/` (default) | Home hero H1 |
| `og-image-plugin.png` | `/plugin` | Plugin page hero H1 |
| `og-image-cli.png` | `/cli` | CLI page hero H1 |

All variants share the same chrome: light theme (Solarized Light, `#fdf6e3`) with a 70px grid pattern, the archcore logo and wordmark in the top-left, the headline at 56px, the subtitle at 22px, and `archcore.ai` plus a right-aligned label in the bottom bar.

Per-route propagation to social scrapers happens in two places:

- **Static (build-time)** — `scripts/prerender-routes.mts` is a Vite `closeBundle` plugin that, after build, clones `dist/index.html` into `dist/{plugin,cli}/index.html` and rewrites `<meta property="og:image">` (plus title/description/canonical/Twitter) per route. Each entry in its `ROUTES` array sets `ogImage: "/og-image-{variant}.png"`.
- **Client (runtime)** — `src/hooks/use-page-meta.ts` updates the same tags on SPA navigation. `src/pages/plugin.tsx` and `src/pages/cli.tsx` pass the matching `ogImage` path to `usePageMeta`.

Both layers must agree on the OG image path. When you add a variant, update three places: `VARIANTS` (generator), `ROUTES` (prerender plugin), and the page component's `usePageMeta` call.

## Steps

### 1. Generate the images manually

```bash
npm run og:generate
```

Runs `scripts/generate-og-image.mts` and writes all `VARIANTS` to `public/`.

### 2. Auto-generation on build

The `prebuild` hook in `package.json` runs `og:generate` automatically:

```bash
npm run build  # prebuild → i18n:compile + og:generate
```

No manual step needed in CI — GitHub Actions runs `npm run build`, which triggers prebuild.

### 3. Add or edit a variant

Open `scripts/generate-og-image.mts` and modify the `VARIANTS` array. Each entry is:

```ts
{
  output: "og-image-<page>.png",
  headline: ["Line 1", "Line 2"],   // both rendered at 56px, mirror page hero H1
  subtitle: "...",                  // 22px, mirrors hero subhead
  bottomLabel: "...",               // 16px, right-side label in the bottom bar
}
```

Shared visual constants live above the array: `BG_COLOR`, `TEXT_PRIMARY`, `TEXT_MUTED`, `TEXT_DIM`, `GRID_COLOR`, `WIDTH`, `HEIGHT`. The logo (`public/logo.png`) is loaded once.

When adding a brand-new variant for a new route:

1. Append a `VARIANTS` entry with the `output` filename.
2. Add (or set `ogImage` on) a matching entry in `scripts/prerender-routes.mts` `ROUTES`.
3. In the page component, pass `ogImage: "/og-image-<page>.png"` to `usePageMeta`.

Keep all three text sections aligned with `.archcore/messaging-alignment.rule.md` (the single source of truth for landing copy). After editing, run `npm run og:generate` and inspect each `public/og-image*.png`.

### 4. Preview locally

```bash
npm run build && npm run preview
```

Open `http://localhost:4173/og-image.png`, `/og-image-plugin.png`, `/og-image-cli.png` in a browser to verify each one. To verify the per-route HTML carries the correct meta, open `http://localhost:4173/plugin/` and `/cli/` and inspect `og:image` in the rendered DOM.

## Verification

After deploying to production:

1. **opengraph.xyz** — paste each URL (`https://archcore.ai`, `/plugin`, `/cli`) to preview the per-route card
2. **Telegram** — paste each URL in any chat, preview appears instantly
3. **X/Twitter** — compose a tweet with each URL
4. **Discord** — paste each URL in a message

Social platforms cache OG images aggressively. If an image doesn't update:

- Facebook: use [Sharing Debugger](https://developers.facebook.com/tools/debug/) → "Scrape Again"
- Telegram: wait ~24h or use `@WebpageBot` to purge cache
- Twitter: cache expires on its own within hours

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails with "Unsupported OpenType signature" | Wrong font format (OTF instead of TTF) | Ensure `.ttf` files in `scripts/fonts/` |
| Image not showing on social media | File missing from build output | Check `public/og-image*.png` exists after build |
| Wrong image on `/plugin` or `/cli` social card | Static per-route HTML missing or out of sync | Verify `scripts/prerender-routes.mts` ran (check `dist/{plugin,cli}/index.html`) and inspect its `og:image` content |
| Stale preview on social platform | Platform cached old image | Use platform-specific cache purge (see Verification) |
| Satori layout broken | Unsupported CSS (e.g., `position: absolute`, CSS Grid) | Satori only supports a Flexbox subset — use `display: flex` |

## Key files

- `scripts/generate-og-image.mts` — multi-variant image generator
- `scripts/fonts/` — Inter TTF fonts for Satori
- `public/og-image.png`, `og-image-plugin.png`, `og-image-cli.png` — generated outputs
- `public/logo.png` — dark logo used on light OG background
- `scripts/prerender-routes.mts` — Vite plugin that bakes per-route static HTML with the right `og:image` for scrapers
- `src/hooks/use-page-meta.ts` — runtime per-page meta updater for SPA navigation
- `index.html` — default OG and Twitter Card meta tags (the home page / SPA fallback)
