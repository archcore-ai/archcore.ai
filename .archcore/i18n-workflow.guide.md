---
title: "How to update landing site copy (i18n workflow)"
status: accepted
---

## Prerequisites

- Node.js installed
- `npm install` completed in the landing project root

## Steps

1. **Edit source strings in .tsx files.** User-facing text uses two Lingui patterns:
   - `<Trans>Text here</Trans>` — for JSX content
   - `` msg`Text here` `` — for string props and variables

2. **Run extraction** to update .po catalog files:
   ```bash
   npm run i18n:extract
   ```
   This updates `src/locales/en/messages.po` and `src/locales/ru/messages.po` with new `msgid` entries.

3. **Translate new Russian strings.** Open `src/locales/ru/messages.po` and fill in empty `msgstr ""` entries for any new or changed `msgid` values.

4. **Compile translations** to generate runtime JS files:
   ```bash
   npm run i18n:compile
   ```
   This generates `src/locales/{locale}/messages.ts` used at runtime.

5. **Verify the build** passes:
   ```bash
   npm run build
   ```
   The `prebuild` script runs `i18n:compile && og:generate`, so `npm run build` is sufficient for a full check — it will also regenerate every OG image variant under `public/og-image*.png` (see `.archcore/landing/og-image-generation.guide.md`).

### Strings NOT in Lingui

Some strings are raw HTML or build-time JS and bypass Lingui — they must be edited directly in source:

- `index.html` — `<title>`, `<meta>`, Open Graph, Twitter Card, JSON-LD structured data. These are the home-page defaults baked into the static shell and consumed by social scrapers when `/` is shared.
- `src/pages/teams-getting-started.tsx` — `document.title` and meta description are set imperatively in a `useEffect`. This page predates the `usePageMeta` hook and still updates the title that way.
- `scripts/prerender-routes.mts` — `ROUTES[].title` and `ROUTES[].description` are used to rewrite per-route static HTML (`dist/plugin/index.html`, `dist/cli/index.html`) for social scrapers. **Must mirror the page's hero copy** and stay in sync with the corresponding Lingui-translated `usePageMeta` arguments inside the page component (`src/pages/plugin.tsx`, `src/pages/cli.tsx`).
- `scripts/generate-og-image.mts` — `VARIANTS[].headline` / `subtitle` / `bottomLabel` are the text rendered into each OG image PNG. Same sync requirement as the prerender routes.

For pages that DO use Lingui meta (`/plugin`, `/cli`), the title and description go through `msg\`...\`` → `_(msg\`...\`)` → `usePageMeta`, so they appear in `messages.po` and follow the standard extract → translate → compile flow.

## Verification

- `npm run build` completes with 0 errors
- `npm run dev` — visually check updated sections in both English and Russian (`?lang=ru`)

## Common Issues

- **Forgetting to run extract** — New strings won't appear in .po files and will show as untranslated.
- **Stale compiled files** — If translations don't appear, run `npm run i18n:compile` again.
- **Lingui `<0/>` placeholders** — In .po files, `<0/>` represents JSX elements like `<br/>`. Keep these in the translated `msgstr` at the correct position.
- **Per-route static HTML out of sync** — If you change a page's hero copy via Lingui but forget to update `scripts/prerender-routes.mts` `ROUTES[].title`/`description`, social scrapers will still see the old text on `/plugin` and `/cli`. (The runtime `usePageMeta` is correct because it reads the Lingui-compiled string.)
