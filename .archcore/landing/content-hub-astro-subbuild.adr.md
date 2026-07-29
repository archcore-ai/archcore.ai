---
title: "Content hub (/blog, /learn, /alternatives) as an Astro sub-build merged into the GitHub Pages deploy"
status: accepted
---

## Context

The SEO growth plan (`landing/seo-growth.plan.md`) requires 20+ content pages (articles, definitional pillars, comparison pages) on the apex domain. The landing is a Vite + React SPA with a custom prerender plugin (`scripts/prerender-routes.mts`) that rewrites heads and static fallbacks for 4 routes — fine for product pages, painful for a markdown content pipeline (no md source format, no per-article schema/dateModified tooling, every article would be a React component). Competitor teardown showed blogs on subdomains leak authority (Zep antipattern) — content must live on archcore.ai itself.

## Decision

Content sections `/blog/`, `/learn/`, `/alternatives/` are produced by a **separate Astro project inside this repo** (e.g. `content-site/`), built in CI and emitted into `dist/blog/`, `dist/learn/`, `dist/alternatives/` of the same GitHub Pages artifact. The Vite SPA keeps owning `/`, `/plugin/`, `/cli/`, `/how-to-use/`, `/privacy/`. One domain, one deploy, two builds.

Astro gives the markdown pipeline for free: content collections, per-page titles/canonicals, Article/FAQPage schema injection, sitemap generation for the content subtree, .md twins, and reuses the team's existing Starlight/Astro competence from the docs repo.

## Alternatives

- **Extend prerender ROUTES:** fastest start, but articles-as-React-components with hand-rolled meta does not scale to 20+ pages and makes authoring expensive. Rejected.
- **Blog on a subdomain (blog.archcore.ai):** splits authority away from the apex — the exact Zep antipattern the competitor research flagged. Rejected.
- **Migrate the whole landing to Astro:** cleanest long-term but rewrites a working, heavily-tuned SPA (wizard, i18n, OG pipeline) for no user-facing gain now. Deferred; may be revisited if maintaining two builds hurts.

## Consequences

- CI deploy workflow must run both builds and merge outputs; sitemap strategy: SPA sitemap.xml stays authoritative for product routes, Astro emits its own sitemap for content routes, robots.txt lists both (or a sitemap index).
- Shared visual shell (header/footer/theme) needs a lightweight port to Astro components — accept some duplication rather than a premature shared-UI package.
- Content pages get the article template requirements from the growth plan: answer-first layout, Article + FAQPage schema, visible dateModified, .md twin per page.
- `landing-tech-stack.doc.md` must be updated when the sub-build lands.