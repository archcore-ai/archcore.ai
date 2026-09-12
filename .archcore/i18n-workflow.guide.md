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

## Translating a static Astro page

Astro pages have no Lingui runtime. They read the same catalogs at build time and ship both languages in the HTML.

### Where the strings come from

`src/data/navigation.ts` exports `label(msg\`...\`)`, which resolves one message against both compiled catalogs and returns `{ en, ru }`. `labelWith` does the same for a sentence whose embedded value also differs by language (`1. Install Archcore and Serena` against «1. Установите Archcore и Serena»). Page chrome collects these pairs in a data module — `src/data/recipe-labels.ts` holds the integration catalog, the recipe page, and the install dialog — so the strings still go through extract → translate → compile.

### Swapping one node's text

Emit the pair as attributes on the node that holds the text:

```astro
<h3 data-en={L.addInstructions.en} data-ru={L.addInstructions.ru}>
  {L.addInstructions.en}
</h3>
```

`src/lib/site-locale.ts` replaces `textContent` for every `[data-en][data-ru]` node and sets that node's `lang`. The rendered HTML carries the English text, so crawlers and a visitor without JavaScript read English, and `html[lang]` stays `en` (see `landing/drop-ru-hreflang-until-ru-routes`).

Rules:

- Give both attributes or neither. A node with only `data-ru` never swaps.
- The node must hold plain text. The swap replaces all of its children, so a sentence with a link inside it cannot use this pattern.
- A shared component takes the Russian text as an optional prop and emits the pair only when it is present (`PageIntro`, `CatalogLayout`, `ClosingCta` via its `localized` prop).
- `data-en-label` / `data-ru-label` swap `aria-label`, and `title` only where the node already had one.

### Swapping a whole block

A sentence with links, or a whole prose body, ships as two blocks:

```astro
<p data-locale-block="en">Install <a href="…">Archcore</a> in your agent.</p>
<p lang="ru" data-locale-block="ru" hidden>Установите <a href="…">Archcore</a>…</p>
```

The locale switch hides the blocks whose `data-locale-block` is not the active locale. The Russian block ships `hidden`, so English is what a crawler sees.

### Strings a script writes

A script that writes text at runtime (a copy button, an expand toggle) reads its strings from an inline JSON island and picks the set with `getSiteLocale()`, then re-renders them on `SITE_LOCALE_EVENT`. `RecipeSetup.astro` is the worked example.

## The integration section

- Card and page copy for one recipe lives in the optional `ru` block of its entry in `src/content/integrations/`: `summary`, `category`, `toolRoles` (keyed by tool name), `workflow`, `pilot`, `limits`. `workflow.steps`, `pilot.findings`, and `limits` are matched to the English ones by position, and `src/content.config.ts` fails the build when the lengths disagree.
- Prose bodies live in `src/content/integrations/ru/<slug>.md` (the `integrationsRu` collection). The page renders both bodies and toggles them as locale blocks. The English body stays the document the markdown twin and the crawlers read.
- The recipe instruction text under `src/recipes/` is never translated. It is the file the agent reads, imported verbatim and pinned by digest.
- The page head stays English. Changing a published `<title>` or meta description also means updating `scripts/fixtures/seo-baseline.json`, which `npm run build` verifies.

## Verification

- `npm run build` completes with 0 errors
- `npm run dev` — visually check updated sections in both English and Russian (`?lang=ru`)
- `npx playwright test -g "integration catalog switches"` and `-g "an integration page translates"` cover the integration section in both languages

## Common Issues

- **Forgetting to run extract** — New strings won't appear in .po files and will show as untranslated.
- **Stale compiled files** — If translations don't appear, run `npm run i18n:compile` again.
- **Lingui `<0/>` placeholders** — In .po files, `<0/>` represents JSX elements like `<br/>`. Keep these in the translated `msgstr` at the correct position.
- **Per-route static HTML out of sync** — If you change a page's hero copy via Lingui but forget to update `scripts/prerender-routes.mts` `ROUTES[].title`/`description`, social scrapers will still see the old text on `/plugin` and `/cli`. (The runtime `usePageMeta` is correct because it reads the Lingui-compiled string.)
- **A swapped node that holds markup** — the swap deletes the link. Use a locale block instead.
