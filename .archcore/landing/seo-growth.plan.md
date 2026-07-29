---
title: "SEO growth plan — foundation, three-wedge content program, authority assets"
status: draft
---

## Goal

Grow non-brand organic traffic from ~zero by fixing the technical/measurement foundation, then shipping a three-wedge content program ({host}-memory cluster, empty product-key SERPs, SDD-afterlife + skills junction) on the apex domain. Grounded in `landing/seo-research-sdd-context-skills.rnd.md`. Must not violate `messaging-alignment.rule.md`: H1 stays pain-first; category keywords move into title tags, subheads, and new pages.

Work is split into three tracks by surface: **A — landing site (this repo)**, **B — documentation (docs repo, see its `.archcore/docs-seo-fixes.plan.md`)**, **C — external (no code in either repo)**. Tracks are independent and can run in parallel; C1 (Search Console) should start first since every later result is measured through it.

Key decisions are recorded and accepted (2026-07-29): `landing/home-title-category-keyword.adr.md`, `landing/drop-ru-hreflang-until-ru-routes.adr.md`, `landing/content-hub-astro-subbuild.adr.md`. The semantic core, article queue, and distribution checklist live in `landing/seo-content-backlog.doc.md`.

## Tasks

### Track A — Landing site (this repo)

A1. Quick fixes (S, week 1):
  1. `public/sitemap.xml`: add missing `/how-to-use/` entry.
  2. Ship `public/llms.txt`.
  3. Fix the "eighteen typed document categories" (index.html static fallback) vs "19 document types" (docs) drift — one number everywhere.
  4. Remove `?lang=ru` hreflang claims (index.html, prerender-routes.mts, sitemap) per `drop-ru-hreflang-until-ru-routes.adr.md`.

A2. Home title change (S): implement `home-title-category-keyword.adr.md` — meta title "Archcore — repo memory for AI coding agents", H1/og:title keep the pain phrase. Amend `messaging-alignment.rule.md` in the same PR (rule's 4-layer enforcement).

A3. Iteration-2 leftovers that gate content quality (M): full-body prerender, automated sitemap lastmod, code-split 514KB bundle, GIF→video, trailing slashes in internal links, /plugin meta length. Source of truth: `landing-improvement-iteration-2.plan.md`.

A4. Content infrastructure (M, weeks 2–4):
  1. Build the content hub per `content-hub-astro-subbuild.adr.md`: Astro sub-build emitted into `dist/blog/`, `dist/learn/`, `dist/alternatives/`, merged into the same GitHub Pages deploy.
  2. Article template: Article + FAQPage schema, visible dateModified, answer-first layout, .md twin per page.
  3. Author entity + about page (E-E-A-T, bylines).

A5. Beachhead content (months 1–2, cadence 2–4 evergreen pieces/month): execute the 10-piece three-wave queue from `seo-content-backlog.doc.md` (Wave 1: Cursor Memories freshness window, Claude Code memory, MCP project context, repo-memory pillar, CLAUDE.md vs AGENTS.md matrix; Wave 2: SDD afterlife; Wave 3: skills junction + ADR pillar).

A6. Authority assets (months 3–6): per `seo-content-backlog.doc.md` — original CLAUDE.md/AGENTS.md data study, per-host integration pages (8 agents), alternatives vs memory clouds, candidate repo-memory benchmark.

### Track B — Documentation (docs repo, docs.archcore.ai)

Documented in the docs repo: `.archcore/docs-seo-fixes.plan.md`. Summary: fix "Archcore | archcore" title template (44 pages invisible in SERPs), llms.txt + .md twins, canonical verification, cross-linking to landing content hub once A5 ships.

### Track C — External (no code in these repos)

C1. Measurement (week 1, before everything): Google Search Console — DNS domain property for archcore.ai (covers docs subdomain); Bing Webmaster (import from GSC). Submit both sitemaps.
C2. Listings/backlinks (weeks 1–2): work through the distribution checklist in `seo-content-backlog.doc.md` (awesome-lists PRs, MCP catalogs, listicle pitches).
C3. GitHub as SEO surface: org/repo taglines "Git-native repo memory for AI coding agents", repo topics, README funnel to archcore.ai (spec-kit formula: repo + one pillar post).
C4. Distribution per published piece: dev.to cross-post, relevant Reddit/HN when the piece warrants it; YouTube demo/walkthrough (most-cited source type in AI Overviews).
C5. Ongoing: weekly GSC review (non-brand impressions, new queries), quarterly SERP re-check of the three wedges (clusters flip quarterly — e.g. Cursor Memories removal).
C6. Note: huggingface.co/archcore is squatted by an unrelated org — low priority, monitor only.

## Acceptance Criteria

- C1 done week 1: GSC + Bing verified, both sitemaps submitted, data flowing.
- A1 shipped: sitemap contains all indexable pages incl. /how-to-use/; llms.txt live; no 18-vs-19 drift; no dishonest hreflang.
- A2 shipped with zero rule-vs-site drift (rule amended in the same PR).
- Track B plan executed in docs repo: unique titles, llms.txt live.
- ≥10 content pages live by end of month 2, each with Article/FAQPage schema and answer-first structure.
- Listed in ≥5 external catalogs/awesome-lists; GitHub taglines updated.
- Non-brand impressions visible and trending in GSC by month 3; ≥10 long-tail queries in top-20 by month 6.
- H1 remains pain-first everywhere; every copy change follows the messaging rule's 4-layer enforcement.

## Dependencies

- A2 implements `home-title-category-keyword.adr.md` (accepted) — amend `messaging-alignment.rule.md` in the same PR.
- A1.4 implements `drop-ru-hreflang-until-ru-routes.adr.md` (accepted) — resolves the iteration-2 Phase 4 task 2 open decision.
- A4 implements `content-hub-astro-subbuild.adr.md` (accepted); update `landing-tech-stack.doc.md` when it lands.
- A5/A6 depend on A4; C4 depends on A5 output; Track B cross-linking depends on A5.
- A3 executes `landing-improvement-iteration-2.plan.md` phases; that plan stays the source of truth for those tasks.
- Track B happens in the docs repository (`.archcore/docs-seo-fixes.plan.md` there).