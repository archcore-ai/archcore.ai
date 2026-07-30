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

A1. **[DONE 2026-07-29, deployed]** Quick fixes: sitemap includes /how-to-use/ and is now build-generated with fresh lastmod; `public/llms.txt` live; "eighteen"→"nineteen" drift fixed (missing RnD added to Vision lists); `?lang=ru` hreflang removed per ADR.

A2. **[DONE 2026-07-29, deployed]** Home title change: meta title "Archcore — repo memory for AI coding agents"; H1/og:title keep the pain phrase; `messaging-alignment.rule.md` amended in the same change.

A3. Iteration-2 leftovers that gate content quality (M): full-body prerender, code-split 514KB bundle, GIF→video, trailing slashes in internal links, /plugin meta length. Source of truth: `landing-improvement-iteration-2.plan.md`. (Sitemap lastmod automation is already done via A1.)

A4. **[DONE 2026-07-29]** Content infrastructure per `content-hub-astro-subbuild.adr.md`: `content-site/` Astro sub-build (collections blog/learn/alternatives, zod schema, ArticleLayout with Article + FAQPage JSON-LD, canonical, visible dateModified, raw-markdown twin per article), `scripts/merge-content.mts` merges into `dist/` and appends routes to sitemap, CI runs `npm ci --prefix content-site`, Blog linked from footer nav + static fallbacks. Remaining from A4: author entity / about page (E-E-A-T) — pending.

A5. Beachhead content (months 1–2, cadence 2–4 evergreen pieces/month): execute the 10-piece three-wave queue from `seo-content-backlog.doc.md`.
  - Wave 1 item 1 **[DONE 2026-07-29]**: "Cursor Removed Memories: What to Use Instead" → `/blog/cursor-memories-removed/` (fact-checked against primary sources).
  - Wave 1 item 4 **[DONE 2026-07-30]**: "What Is Repo Memory?" definitional pillar → `/learn/repo-memory/` (term claim; comparison table repo memory vs cloud agent memory vs RAG vs instruction files).
  - Wave 1 item 2 **[DONE 2026-07-30]**: "How Claude Code Memory Works: CLAUDE.md, Auto Memory, MEMORY.md" → `/blog/claude-code-memory/` (fact-checked: official docs confirm 200-line/25KB MEMORY.md limit; AGENTS.md issue #6235 = top-voted issue, 4,475 👍; Auto Memory machine-local by design).
  - Next: "MCP server for project context" guide (write from local docs-repo sources) → "CLAUDE.md vs AGENTS.md vs SKILL.md" comparison matrix.
  - Cross-linking so far: cursor post ↔ repo-memory pillar ↔ claude-code-memory post (all interlinked).

A6. Authority assets (months 3–6): per `seo-content-backlog.doc.md` — original CLAUDE.md/AGENTS.md data study, per-host integration pages (8 agents), alternatives vs memory clouds, candidate repo-memory benchmark.

### Track B — Documentation (docs repo, docs.archcore.ai)

**[DONE 2026-07-29, deployed]** — see `.archcore/docs-seo-fixes.plan.md` in the docs repo: homepage title fixed via head override, 5 generic page titles sharpened, `starlight-llms-txt@0.10.0` shipping llms.txt/llms-full.txt/llms-small.txt, descriptions aligned with the category phrase. Remaining there: cross-linking with the landing content hub (waits for more A5 content); `.md` twins (waits for Astro 7 upgrade).

### Track C — External (no code in these repos)

C1. Measurement (week 1, before everything): Google Search Console — DNS domain property for archcore.ai (covers docs subdomain); Bing Webmaster (import from GSC). Submit both sitemaps. **Owner action — not yet confirmed done.**
C2. Listings/backlinks (weeks 1–2): work through the distribution checklist in `seo-content-backlog.doc.md` (awesome-lists PRs, MCP catalogs, listicle pitches).
C3. GitHub as SEO surface: org/repo taglines "Git-native repo memory for AI coding agents", repo topics, README funnel to archcore.ai.
C4. Distribution per published piece: dev.to cross-post, relevant Reddit/HN when the piece warrants it; YouTube demo/walkthrough. First candidates: Cursor Memories post (freshness window), Claude Code memory post (hot cluster).
C5. Ongoing: weekly GSC review (non-brand impressions, new queries), quarterly SERP re-check of the three wedges.
C6. Note: huggingface.co/archcore is squatted by an unrelated org — low priority, monitor only.

## Acceptance Criteria

- C1 done week 1: GSC + Bing verified, both sitemaps submitted, data flowing.
- [x] A1 shipped: sitemap complete and fresh; llms.txt live; no 18-vs-19 drift; no dishonest hreflang.
- [x] A2 shipped with zero rule-vs-site drift.
- [x] Track B executed in docs repo: unique titles, llms.txt live.
- ≥10 content pages live by end of month 2, each with Article/FAQPage schema and answer-first structure (**3/10 as of 2026-07-30**).
- Listed in ≥5 external catalogs/awesome-lists; GitHub taglines updated.
- Non-brand impressions visible and trending in GSC by month 3; ≥10 long-tail queries in top-20 by month 6.
- H1 remains pain-first everywhere; every copy change follows the messaging rule's 4-layer enforcement.

## Dependencies

- A5/A6 depend on A4 (done); C4 depends on A5 output; Track B cross-linking depends on A5.
- A3 executes `landing-improvement-iteration-2.plan.md` phases; that plan stays the source of truth for those tasks.
- Track B happens in the docs repository (`.archcore/docs-seo-fixes.plan.md` there).
- `landing-tech-stack.doc.md` updated for the content-site sub-build (done 2026-07-29).