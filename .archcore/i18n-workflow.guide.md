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
   The `prebuild` script runs `i18n:compile` automatically, so `npm run build` is sufficient for a full check.

### Strings NOT in Lingui

Some strings are raw HTML or JS and bypass Lingui:
- `index.html`: `<title>`, `<meta>`, Open Graph, Twitter Card, JSON-LD structured data
- `teams-getting-started.tsx`: `document.title` and meta description set via `useEffect`

These must be updated directly in the source files.

## Verification

- `npm run build` completes with 0 errors
- `npm run dev` — visually check updated sections in both English and Russian (`?lang=ru`)

## Common Issues

- **Forgetting to run extract** — New strings won't appear in .po files and will show as untranslated.
- **Stale compiled files** — If translations don't appear, run `npm run i18n:compile` again.
- **Lingui `<0/>` placeholders** — In .po files, `<0/>` represents JSX elements like `<br/>`. Keep these in the translated `msgstr` at the correct position.