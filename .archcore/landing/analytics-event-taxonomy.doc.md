---
title: "PostHog analytics — event taxonomy and wiring across the three surfaces"
status: accepted
---

## Overview

One PostHog project covers all three deployed surfaces. They are told apart by
the `site` super property, never by separate projects — separate projects would
break every cross-surface funnel.

| Surface | Build | `site` | Analytics entry |
| --- | --- | --- | --- |
| archcore.ai SPA | Vite + React (repo root) | `landing` | `src/main.tsx` → `setupAnalytics` |
| /blog, /learn, /alternatives | Astro (`content-site/`) | `content` | `content-site/src/components/Analytics.astro` |
| docs.archcore.ai | Astro Starlight (separate repo) | `docs` | `docs/src/components/Analytics.astro` via the Head override |

Cross-subdomain identity works because posthog-js scopes its cookie to
`.archcore.ai` (`cross_subdomain_cookie`, pinned explicitly). A visitor who
reads the marketing site and continues into the docs stays one person in one
session.

## Content

### Code layout

`src/lib/analytics/` in the landing repo is the source of truth:

- `events.ts` — the typed `AnalyticsEventMap`. `track()` is generic over it, so
  a renamed or misspelled event is a build error rather than an empty funnel.
- `core.ts` — config, deferred loading, and all automatic instrumentation.
- `faq.ts` — landing-only Radix accordion helper (not shared).
- `index.ts` — barrel for the SPA.

`events.ts` and `core.ts` are alias-free and depend only on posthog-js so they
can cross build systems:

- `content-site` imports them by relative path (`../../../src/lib/analytics/`).
  `astro.config.mjs` sets `vite.server.fs.allow: ['..']` for dev.
  It deliberately does **not** declare posthog-js: the `import "posthog-js"`
  statement lives in the parent project's source tree, so it resolves from the
  repo-root `node_modules`. Both builds therefore share one copy at one
  version. Adding posthog-js to `content-site/package.json` would create a
  second copy free to drift to a different version — don't.
- `docs` is a separate repository and vendors byte-for-byte copies in
  `docs/src/lib/analytics/`, plus its own posthog-js dependency pinned to the
  same version. Re-sync after any change to the shared core and verify with:
  `diff docs/src/lib/analytics/core.ts landing/src/lib/analytics/core.ts`
  Starlight-specific code lives in `docs/src/lib/analytics/docs-instrumentation.ts`
  so the copies stay diffable.

### Configuration decisions

- `defaults: "2025-11-30"` — history-based pageviews (SPA route changes need no
  router wiring), pageleave, rageclick, `identified_only` person profiles.
- `respect_dnt: true` — posthog-js defaults this to **false**, which made the
  Do Not Track promise on /privacy untrue. Do not remove.
- `cross_subdomain_cookie: true` — currently the library default; pinned so a
  future flip cannot silently split the cross-surface funnel.
- Session replay is **off**. /privacy enumerates what is collected and replay is
  not on that list; turning it on requires updating that copy first.
- posthog-js is loaded with a dynamic `import()` after the first interaction,
  visibility change, or 2.5 s idle. This moved ~170 kB out of the SPA entry
  bundle (496 kB → 328 kB).

### Super properties

Registered inside the `loaded` callback, which posthog-js invokes *before* the
initial `$pageview` (queued on a 1 ms timeout) — so they land on it too.

`site`, `locale`, `color_scheme`.

### Automatic instrumentation (all surfaces, no per-component wiring)

- **Links** — one delegated capture-phase listener applying four rules in
  order: an anchor inside `[data-analytics-handled]` is skipped because it
  reports a richer event itself (the GitHub star links), so one click never
  produces both a semantic and a generic event; an anchor inside
  `[data-analytics-cta]` reports `cta_clicked`; a link off archcore.ai reports
  `outbound_link_clicked` (docs.archcore.ai is not outbound); a link in site
  chrome or crossing surfaces reports `nav_link_clicked`. Body links within one
  surface are left to autocapture, which keeps in-content prose out of the
  navigation funnel.
- **Host classification** is written to behave the same locally as in
  production: the current hostname counts as our own, and a same-host link from
  a docs page stays `docs`. Without that, every local click reported as
  outbound traffic and docs → landing navigation that never happened.
- **Scroll depth** — 25/50/75/100 %, once each per pageview, skipped on pages
  that barely scroll.
- **Section views** — first meaningful visibility of each `<section id>`.
- **Code copies** — matches our own `[data-analytics-copy]`, Expressive
  Code/Starlight (`button[data-code]` inside `div.copy`, labelled by `title`
  rather than `aria-label`, with `data-language` on the inner `<pre>`), and the
  generic `.copy` class, plus text selections inside code blocks. The copied
  text is classified: the two installer one-liners report
  `install_command_copied` wherever they appear, so install intent from docs and
  blog posts is comparable with the landing hero.

### Event reference

Install and conversion: `install_command_copied`, `install_platform_switched`,
`code_snippet_copied`, `cta_clicked`, `github_star_clicked`.

Navigation: `outbound_link_clicked`, `nav_link_clicked`. `destination` is a path
for same-host links and a full URL for cross-host ones, because a bare path is
ambiguous — `archcore.ai/` and `docs.archcore.ai/` are both `/`.

Engagement: `section_viewed`, `scroll_depth_reached`, `faq_item_opened`,
`locale_switched`, `theme_switched`.

Content hub: `article_read_completed` (fires at the end of the article body,
before the FAQ and CTA, so it is not a duplicate of 100 % scroll depth).

Docs: `docs_search_opened`, `docs_search_submitted` (debounced to one event per
settled query; search terms are the strongest content-backlog signal available).

Walkthrough: `wizard_branch_started`, `wizard_step_viewed`,
`wizard_mode_switched`, `wizard_completed`, `wizard_restarted`. Property names
follow the walkthrough's own vocabulary (branch, mode, step).

`faq_item_opened.question` carries localised text, so break FAQ reports down by
the `locale` super property rather than expecting one string per question.

### Deliberate gaps

- No event for the raw-markdown twins (`/blog/x.md`) or the generated
  `llms*.txt` sets. Nothing in the UI links to them and they are served as plain
  text where no script runs; the traffic is only visible in server logs, which
  GitHub Pages does not expose.
- No dialog or lead-form events. `ContactDialog`, `TeamSetupDialog`,
  `DockerStartDialog`, `InlineEmailCapture`, `DualCTA`, `StickyCTABar` and
  `SectionCTACard` are dead code — referenced only from their own files. Add
  events when they are actually rendered.

### Key delivery

The project API key is public by design (it ships in every client bundle) and
lives in a GitHub **repository variable** `POSTHOG_KEY` (plus optional
`POSTHOG_HOST`), set identically in both repositories. Each workflow maps it to
the prefix its bundler reads — Vite wants `VITE_PUBLIC_*`, Astro wants
`PUBLIC_*`.

Locally, only the `VITE_` names go in `.env` (gitignored);
`scripts/build-content.mts` mirrors them into `PUBLIC_*` before spawning the
content build, because Astro's project root is `content-site/` and it never
reads the repo-root `.env`.

## Examples

### Firing an event

```ts
import { track } from "@/lib/analytics";

track("install_command_copied", {
  command,
  platform,
  surface: "home_hero_cli_panel",
  install_target: "cli",
});
```

### Marking a CTA instead of wiring a handler

```tsx
<Link to={INTERNAL_LINKS.howToUse} data-analytics-cta="header_how_to_use">
```

### Opting a link out of generic tracking

```tsx
<a href={LINKS.org} data-analytics-handled onClick={() => track("github_star_clicked", …)}>
```

### Why the build fails without a key

archcore.ai shipped for an unknown period calling
`posthog.init(undefined, { api_host: undefined })`: `.env` is gitignored and the
deploy workflow never passed the variable through, so every visit downloaded the
analytics bundle and reported nothing. A runtime warning goes to a console
nobody watches in production, so both builds now fail instead:

- landing — `requireAnalyticsKeyPlugin` in `vite.config.ts`
- docs — `requireAnalyticsKey` in `astro.config.mjs`
- content hub — the check in `scripts/build-content.mts`

Escape hatch for a deliberate build without analytics:
`ALLOW_MISSING_ANALYTICS_KEY=1`.
