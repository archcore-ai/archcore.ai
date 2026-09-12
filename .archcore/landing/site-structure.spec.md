---
title: "Site structure: routes, home page blocks, and shared chrome"
status: accepted
tags:
  - "web"
---

## Purpose & Scope

This contract pins the shape of archcore.ai: which routes exist, what blocks the home page is made of, and what the shared chrome carries. Anything that reads or links the site depends on it.

In scope: the route set, the home page block order and anchors, header and footer contents, and the checks that prove them.

Out of scope: copy, positioning, and per-page wording, which belong to `messaging-alignment.rule.md`; visual design, which belongs to `DESIGN.md`; and the reasoning behind the current home page, which belongs to `landing/home-plain-language-rail.adr.md`.

## Surface

### Routes

29 indexable routes. Every route ends in a trailing slash except the root.

| Group | Routes | Source |
|---|---|---|
| Home | `/` | `src/pages/index.astro` |
| Product | `/plugin/`, `/cli/`, `/how-to-use/` | `src/pages/` |
| Legal | `/privacy/` | `src/pages/privacy/` |
| Pillars | `/context-engineering/`, `/spec-driven-development/`, `/project-context/`, `/git-native-context/`, `/mcp/` | `src/content/pillars/` |
| Hosts | `/claude-code/`, `/cursor/`, `/codex/`, `/github-copilot/`, `/gemini-cli/` | `src/content/pillars/` |
| Blog | `/blog/` and one route per article | `src/content/blog/` |
| Learn | `/learn/` and one route per article | `src/content/learn/` |
| Integrations | `/integrations/` and one route per recipe | `src/content/integrations/` |

Non-indexable: `/404`, `/install/`, `/og/*`, `sitemap.xml`, `robots.txt`, `llms.txt`, and a `.md` twin for each root and hub page.

### Home page blocks

| # | Block | Component | Anchor |
|---|---|---|---|
| 1 | Category H1, two plain sentences, one install path | `hero-section` | `#top`, `#install` |
| 2 | What you get: three claims, each with its mechanism | `outcomes-section` | `#problem` |
| 3 | The example `.archcore/` directory | `documents-section` | `#git-native` |
| 4 | The four skills | `skills-section` | `#how-it-works` |
| 5 | Cross-agent support | `agents-section` | `#cross-agent` |
| 6 | FAQ | `faq-section` | `#faq` |
| 7 | Closing row | `star-cta-section` | none |

Blocks 2 to 6 render through `rail-section`: the H2 on a left rail, content on the right.

### Shared chrome

The header carries the wordmark, five links in the order How to use, Integrations, Docs, Blog, Learn, then the language selector, the GitHub Star link, and the Install action. The footer carries the wordmark, the tagline, both component guides, both repositories, and the social links.

## Normative Behavior

1. WHEN the site builds, the build MUST emit every route in the Surface table.
2. WHEN a route is removed or renamed, the author MUST record a decision and add a redirect.
3. Each indexable route MUST render exactly one `h1`.
4. Each indexable route MUST carry a unique `title` of 60 characters or fewer.
5. Each indexable route MUST carry a unique meta description of 160 characters or fewer.
6. Each indexable route MUST carry a canonical URL matching its own path.
7. The home page MUST render the seven blocks in the Surface order.
8. The home page MUST expose the anchors `#top`, `#install`, `#problem`, `#git-native`, `#how-it-works`, `#cross-agent`, and `#faq`.
9. WHEN a home block is added or removed, the author MUST update this spec in the same change.
10. The home page MUST render exactly one `FAQPage` block, generated from the visible questions.
11. A page without a visible FAQ MUST NOT emit `FAQPage` markup.
12. The home page MUST offer exactly one install path.
13. The home page MUST NOT compare the plugin against the CLI.
14. Blocks 2 to 6 MUST use `rail-section` rather than their own layout.
15. Every reader-facing string MUST resolve through Lingui in English and Russian.
16. WHEN an English string changes, the author MUST extract, translate, and compile before building.
17. Every in-page link MUST resolve to an element that exists on the target page.
18. The page body MUST NOT scroll horizontally at any viewport width from 320 pixels up.
19. IF a block must exceed the viewport width, THEN it MUST scroll inside its own container.

## Constraints & Invariants

- The home page is one Astro route rendering one React tree, so the served HTML and the hydrated page cannot diverge.
- The route set and the sitemap are generated from the same content collections; a page that is not in a collection is not in the sitemap.
- Blog, Learn, and Integrations grow by adding a content file, never by adding a route.
- Anchors are part of the contract because other pages, the shared CTA, and external links point at them.
- One product: no surface asks the reader to choose between the CLI and the plugin.
- The demo recording is not embedded on any page. Its assets stay in `public/`.

## Failure Behavior

- IF a build emits a duplicate `title` or description, THEN `scripts/verify-build.mts` fails the build.
- IF an in-page link points at a missing anchor, THEN `scripts/verify-build.mts` fails the build.
- IF a preserved route disappears, THEN `scripts/verify-build.mts` fails against `scripts/fixtures/seo-baseline.json`.
- IF the Russian catalog has a missing entry, THEN `npm run i18n:compile` reports it and the string ships in English.
- IF a block overflows its container, THEN no build check fails; only a browser check at 320, 390, and 768 pixels catches it.

## Conformance

Run `npm run build`, which runs `npm run check`, compiles catalogs, generates OG images, and ends in `scripts/verify-build.mts`. Then run `npx playwright test tests/site.spec.ts` against `dist/`, which renders every route at four widths in both themes and both languages.

Verify the home block order and anchors in the built `dist/index.html`, not in the dev server.
