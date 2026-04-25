---
title: "Add build-time OG image generation with Satori"
status: accepted
---

## Pattern Name

Build-time OG image generation for a static site (Vite SPA on GitHub Pages).

## When to Apply

- Landing site needs Open Graph / Twitter Card social media previews
- No SSR/edge functions available (e.g., GitHub Pages, plain static hosting)
- Want version-controlled, code-defined OG images instead of manual Figma exports
- Need the image to auto-regenerate when content or branding changes

## Typical Steps

### 1. Install dependencies

```bash
npm install --save-dev satori @resvg/resvg-js tsx
```

- **satori** — Vercel's JSX-to-SVG renderer (Flexbox CSS, no browser)
- **@resvg/resvg-js** — SVG-to-PNG via Rust/WASM, works in CI
- **tsx** — TypeScript execution for the build script

### 2. Add font files

Satori requires raw `.ttf` font buffers. Download the project's font (e.g., Inter) and place in `scripts/fonts/`.

Google Fonts doesn't provide direct TTF download links — use the font's GitHub releases instead (e.g., `https://github.com/rsms/inter/releases`).

### 3. Create generator script

Create `scripts/generate-og-image.mts`:

1. Load fonts as `readFileSync` buffers
2. Load logo, encode as base64 data URI
3. Define a `VARIANTS` array — one entry per page that needs a distinct preview (or a single entry for a single image)
4. For each variant, render: `satori()` → SVG string → `new Resvg(svg)` → `.render().asPng()` → write to `public/<variant.output>`

Key constraints for the Satori layout:

- Only Flexbox (`display: flex`), no CSS Grid, no `position: absolute`
- `backgroundImage` supports `linear-gradient` for patterns
- Images must be base64 data URIs or remote URLs
- Font data passed as ArrayBuffer in the `fonts` option

Design should match site theme. Archcore uses light Solarized palette (#fdf6e3 background, dark text) with 70px grid pattern.

### 4. Wire into build pipeline

```json
"og:generate": "npx tsx scripts/generate-og-image.mts",
"prebuild": "npm run i18n:compile && npm run og:generate"
```

### 5. Add/verify meta tags in the SPA shell

Required OG tags in `index.html` (the SPA fallback / home page):

```html
<meta property="og:image" content="https://example.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://example.com/og-image.png" />
```

### 6. Per-route OG (required if pages need distinct previews)

A naive SPA only ships one `index.html`, so all routes share the same OG image — social scrapers don't execute JS, so client-side meta updates are invisible to them. To give each route its own preview without leaving GitHub Pages, combine three layers:

1. **Generator** — define multiple entries in the `VARIANTS` array (e.g., `og-image.png`, `og-image-plugin.png`).
2. **Static per-route HTML** — add a Vite `closeBundle` plugin that, after build, clones `dist/index.html` into `dist/<route>/index.html` and rewrites `<title>`, `<meta description>`, canonical, OG, and Twitter tags per route. Drive it from a `ROUTES` array that mirrors your router. This is the layer scrapers actually read.
3. **Client-side meta hook** — a small `usePageMeta` hook that updates the same tags on client navigation, so SPA users (and Google's JS render) see the right meta after a route change.

All three layers must agree on the image path. The generator's `VARIANTS`, the prerender plugin's `ROUTES`, and the page component's `usePageMeta` call all reference the same `og-image-<page>.png`.

### 7. Exclude build script from linting

Add `scripts` to ESLint's `globalIgnores` if using TypeScript-checked ESLint config.

## Expected Outcome

- One `public/og-image*.png` per variant (1200×630, ~60KB each) generated on every build
- Social media platforms show branded preview cards when URLs are shared — distinct cards per route once step 6 is implemented
- Image content is version-controlled and easy to update by editing the script

## Pitfalls

- **OTF fonts don't work with Satori** — must use `.ttf` format
- **Social platforms cache aggressively** — after first deploy, use platform debuggers to force refresh
- **Static per-route HTML is required for distinct previews** — without step 6, all routes share `index.html`'s OG image because scrapers do not execute JS. The client-side `usePageMeta` hook alone is not enough for social cards (it only helps Google's JS render and bookmarks).
- **Three layers can drift** — when changing a page's hero copy, update `VARIANTS` (generator), `ROUTES` (prerender), and the page's `usePageMeta` together. A `npm run build` will surface broken OG image paths but cannot catch mismatched titles.
- **Satori CSS subset** — no Grid, no absolute positioning, no `calc()`, no `clamp()` — keep layouts simple with Flexbox.

## Related Files

- `scripts/generate-og-image.mts` — multi-variant generator
- `scripts/fonts/` — TTF font files
- `scripts/prerender-routes.mts` — Vite plugin that bakes per-route static HTML
- `src/hooks/use-page-meta.ts` — client-side per-page meta updater
- `public/og-image*.png` — generated outputs
- `index.html` — default OG/Twitter meta tags
- `package.json` — build scripts
- `eslint.config.js` — script exclusion
