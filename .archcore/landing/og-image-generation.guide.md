---
title: "How to update OG image for social media previews"
status: accepted
---

## Prerequisites

- Node.js installed
- Project dependencies installed (`npm install`)
- Font files present at `scripts/fonts/Inter-Bold.ttf` and `scripts/fonts/Inter-Regular.ttf`

## How it works

The OG image (1200x630 PNG) is generated at build time using **Satori** (JSX → SVG) and **@resvg/resvg-js** (SVG → PNG). The layout is defined as code in `scripts/generate-og-image.mts` — no Figma or external design tools needed.

The image uses the site's light theme (warm beige `#fdf6e3`, Solarized Light palette) with the 70px grid pattern, matching the landing page appearance. Renders across X/Twitter, Telegram, Discord, Slack, LinkedIn, and Facebook.

Meta tags in `index.html` reference `https://archcore.ai/og-image.png` with `summary_large_image` Twitter Card type.

## Steps

### 1. Generate the image manually

```bash
npm run og:generate
```

This runs `scripts/generate-og-image.mts` and outputs `public/og-image.png`.

### 2. Auto-generation on build

The `prebuild` hook in `package.json` runs `og:generate` automatically:

```bash
npm run build  # prebuild → i18n:compile + og:generate
```

No manual step needed in CI — GitHub Actions runs `npm run build` which triggers prebuild.

### 3. Edit the image content

Open `scripts/generate-og-image.mts` and modify:

- **Headline text** — two `fontSize: "56px"` children containing the two hero lines. Should mirror the site's current hero H1. If the H1 changes, update both lines here to match.
- **Subtitle** — the `fontSize: "22px"` block. Should mirror the hero subhead.
- **Bottom bar** — the `justifyContent: "space-between"` section: URL on the left, short tagline on the right.
- **Colors** — constants at the top: `BG_COLOR` (#fdf6e3), `TEXT_PRIMARY` (#1a1a1a), `TEXT_MUTED` (#6b6b6b), `TEXT_DIM` (#93a1a1)
- **Logo** — reads `public/logo.png` (dark logo for light background)

Keep all three text sections aligned with `.archcore/messaging-alignment.rule.md` (the single source of truth for landing copy). After editing, run `npm run og:generate` and inspect `public/og-image.png`.

### 4. Preview locally

```bash
npm run build && npm run preview
```

Open `http://localhost:4173/og-image.png` in browser to verify.

## Verification

After deploying to production:

1. **opengraph.xyz** — paste `https://archcore.ai` to preview the card
2. **Telegram** — paste URL in any chat, preview appears instantly
3. **X/Twitter** — compose a tweet with the URL
4. **Discord** — paste URL in a message

Social platforms cache OG images aggressively. If the image doesn't update:
- Facebook: use [Sharing Debugger](https://developers.facebook.com/tools/debug/) → "Scrape Again"
- Telegram: wait ~24h or use `@WebpageBot` to purge cache
- Twitter: cache expires on its own within hours

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails with "Unsupported OpenType signature" | Wrong font format (OTF instead of TTF) | Ensure `.ttf` files in `scripts/fonts/` |
| Image not showing on social media | File missing from build output | Check `public/og-image.png` exists after build |
| Stale preview on social platform | Platform cached old image | Use platform-specific cache purge (see Verification) |
| Satori layout broken | Unsupported CSS (e.g., `position: absolute`, CSS Grid) | Satori only supports Flexbox subset — use `display: flex` |

## Key files

- `scripts/generate-og-image.mts` — image generator script
- `scripts/fonts/` — Inter TTF fonts for Satori
- `public/og-image.png` — generated output (1200x630)
- `public/logo.png` — dark logo used on light OG background
- `index.html` lines 28-46 — OG and Twitter Card meta tags