---
title: "Three build-time mechanisms hold the first-load JavaScript down, and 300 KB raw is the budget"
status: accepted
tags:
  - "infrastructure"
  - "web"
---

## Context

`landing/single-astro-site.adr.md` says the decision is superseded when "measurements show page-level React hydration exceeds the agreed interaction or JavaScript budget". No budget was ever recorded and no measurement was kept, so the trigger could not fire.

Three mechanisms that hold the number down already exist in the build. Each carries its reasoning only as a code comment, so a routine refactor can remove one without contradicting any document:

1. Astro discovers an island's scripts only after its inline hydration script runs. The browser then walks HTML → inline script → component chunk → renderer chunk → react-dom one round trip at a time.
2. The Lingui macro strips the English source text out of production bundles by default. Every page then has to load the full compiled English catalog to render its own copy, so the home page ships every other page's strings.
3. Astro's HTML whitespace compression is opt-in per project.

Measured on the `dist/` built at commit `41aba0a`, home page: 295 KB raw first-load JavaScript across 9 files — `client.VM1wvrnP.js` 176 KB (react-dom), 63 KB, `sections` 33 KB, the rest under 12 KB each. posthog-js (268 KB) is deferred and absent from first load, per `landing/analytics-event-taxonomy.doc.md`. All four marketing routes hydrate their whole page body with `client:load`.

## Decision

Keep all three mechanisms, and record 300 KB raw first-load JavaScript on the home page as the budget named by `landing/single-astro-site.adr.md`.

1. `preloadIslandChunks()` in @astro.config.mjs stays. It is an `astro:build:done` hook: it reads each built HTML file, collects the `component-url` and `renderer-url` chunks, follows their static imports transitively, and injects a `modulepreload` link for every chunk into `<head>`. The whole island graph is then requested together instead of one round trip at a time. It only adds link tags — an unresolvable chunk is skipped, and a stale preload costs a console warning, never a broken page.
2. `stripMessageField: false` on the Lingui babel macro in @astro.config.mjs stays, and @src/i18n.ts keeps loading an empty English catalog (`i18n.load("en", {})`). English source text stays inline in each component, so a page chunk carries only the strings it renders. Russian still ships as a catalog, imported on demand in `activateLocale`. There is no English catalog at runtime; removing either half puts every page's copy into the first chunk the browser downloads.
3. `compressHTML: true` in @astro.config.mjs stays. `landing/single-astro-site.adr.md` requires HTML-aware whitespace compression to preserve the pre-migration article output.

Measure before and after any change to hydration, island boundaries, or the i18n runtime: sum the sizes of the `.js` files referenced by `dist/index.html` (`href`/`src` plus `component-url`/`renderer-url`), and compare against the 295 KB baseline above.

## Alternatives Considered

- Narrower hydration — replace the four whole-body `client:load` islands with per-component islands, or move some to `client:visible` or `client:idle`. Not decided here: the page bodies share one Lingui provider tree, and splitting it is a rework rather than a build setting. This is the first lever to pull if the budget is breached.
- Astro's own `prefetch` instead of the preload hook — rejected because it targets link navigation, not the island chunk chain on the current page.
- Shipping the compiled English catalog and dropping the inline messages — rejected on measurement: it moves the copy of every page into one shared chunk.

## Consequences

Positive:

- The three mechanisms are now decisions with recorded reasons, not comments. Removing one needs a superseding ADR.
- `landing/single-astro-site.adr.md`'s supersede trigger has a number and a procedure behind it.

Tradeoffs:

- `preloadIslandChunks()` parses built HTML and chunk source with regular expressions. An Astro change to the island markup or to chunk import formatting makes it silently add nothing; the build log line "added island preloads to N page(s)" is the only signal, and N dropping to 0 is the symptom.
- The inline-message strategy means an English string exists in two places conceptually — the component and the PO catalog — and only the component's copy renders. `i18n-workflow.guide` already covers the extract → translate → compile flow.
- Nothing in the build enforces the 300 KB budget. It is checked by hand at the measurement step above.

## Superseded when

- A measurement shows home-page first-load JavaScript above 300 KB raw and the fix is a different architecture rather than narrower hydration.
- Astro ships island preloading itself, making the build hook redundant.
- Russian gets its own indexed routes, which changes what the runtime catalog has to carry.
