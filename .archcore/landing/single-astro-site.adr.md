---
title: "One static Astro site with shared layouts and React islands"
status: accepted
tags:
  - "infrastructure"
  - "web"
---

## Context

The site used a React/Vite build and a separate Astro content build with duplicated navigation, style tokens, and crawler copy. The production audit on 2026-09-08 found 27 sitemap URLs and a React team-setup route that returned HTTP 404. The owner requested a complete Astro migration and one visual style; @scripts/fixtures/seo-baseline.json records the existing metadata and article content.

## Decision

Adopt Astro 7.3.2 as the single static site generator, with React 19 and Lingui 5 page islands, shared Astro layouts, and the existing GitHub Pages deployment.

## Alternatives Considered

- React/Vite plus Astro 6 sub-build: rejected because it keeps two dependency installations, separate routing, and duplicated site chrome.
- Pure Astro templates without React: deferred because rewriting the working installation controls and Russian localization would add migration risk.
- Astro server rendering on a new host: rejected because the current site requires no request-time server and GitHub Pages already serves its static output.

## Consequences

Positive:

- @astro.config.mjs and @package.json define one build producing every route in dist/.
- @src/layouts/SiteLayout.astro shares navigation, footer, fonts, theme, and analytics across all pages.
- @src/components/faq-list.tsx renders visible FAQ answers and JSON-LD from one array.
- @src/pages/teams/getting-started/index.astro produces a real page instead of depending on a 404 fallback.
- @scripts/verify-build.mts compares 29 pre-migration routes, article content, schemas, and public downloads.

Tradeoffs:

- Localized marketing pages hydrate a React page tree to keep the Lingui context intact; articles and recipes use Astro templates.
- Russian remains a client-selected locale. No independently indexed Russian routes or hreflang are introduced.
- Astro 7 keeps the remark Markdown processor and HTML-aware whitespace compression to preserve existing article output.
- @.github/workflows/rollback.yml can restore only retained release artifacts; the migration does not recreate expired production artifacts.

## Superseded when

- A published route requires authenticated or request-specific server rendering.
- Russian content requires independently indexed locale URLs.
- Measurements show page-level React hydration exceeds the agreed interaction or JavaScript budget.
