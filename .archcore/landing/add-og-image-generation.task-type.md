---
title: "Add build-time OG image generation with Satori"
status: accepted
---

## Pattern Name

Build-time OG image generation for a static site (Vite SPA on GitHub Pages).

## When to Apply

- Landing site or static site needs Open Graph / Twitter Card social media previews
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

Google Fonts doesn't provide direct TTF download links — use the font's GitHub releases instead.

### 3. Create generator script

Create `scripts/generate-og-image.mts`:

1. Load fonts as `readFileSync` buffers
2. Load logo from `public/`, encode as base64 data URI
3. Define layout as Satori object tree (not JSX — plain `{ type, props, children }`)
4. Render: `satori()` → SVG string → `new Resvg(svg)` → `.render().asPng()`
5. Write to `public/og-image.png`

Key constraints for the Satori layout:
- Only Flexbox (`display: flex`), no CSS Grid, no `position: absolute`
- `backgroundImage` supports `linear-gradient` for patterns
- Images must be base64 data URIs or remote URLs
- Font data passed as ArrayBuffer in the `fonts` option

### 4. Wire into build pipeline

```json
"scripts": {
  "og:generate": "npx tsx scripts/generate-og-image.mts",
  "prebuild": "npm run i18n:compile && npm run og:generate"
}
```

The prebuild hook ensures CI (GitHub Actions `npm run build`) always has a fresh image.

### 5. Add/verify meta tags in index.html

Required OG tags:
```html
<meta property="og:image" content="https://example.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://example.com/og-image.png" />
```

### 6. Exclude build script from linting

Add `scripts` to ESLint's `globalIgnores` if using TypeScript-checked ESLint config.

## Expected Outcome

- `public/og-image.png` (1200x630, ~60KB) generated on every build
- Social media platforms show branded preview card when URL is shared
- Image content is version-controlled and easy to update by editing the script

## Pitfalls

- **OTF fonts don't work with Satori** — must use `.ttf` format
- **Social platforms cache aggressively** — after first deploy, use platform debuggers to force refresh
- **SPA limitation** — crawlers only see `index.html` head, so all routes share the same OG image unless you add prerendering or static HTML files per route
- **Satori CSS subset** — no Grid, no absolute positioning, no `calc()`, no `clamp()` — keep layouts simple with Flexbox

## Related Files

- `scripts/generate-og-image.mts` — generator script
- `scripts/fonts/` — TTF font files
- `public/og-image.png` — generated output
- `index.html` — OG/Twitter meta tags
- `package.json` — build scripts
- `eslint.config.js` — script exclusion