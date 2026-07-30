---
title: "SEO growth plan — foundation, three-wedge content program, authority assets"
status: draft
---

## Goal

Grow non-brand organic traffic from ~zero by fixing the technical/measurement foundation, then shipping a three-wedge content program ({host}-memory cluster, empty product-key SERPs, SDD-afterlife + skills junction) on the apex domain. Grounded in `landing/seo-research-sdd-context-skills.rnd.md`. Must not violate `messaging-alignment.rule.md`: H1 stays pain-first; category keywords move into title tags, subheads, and new pages.

Work is split into three tracks by surface: **A — landing site (this repo)**, **B — documentation (docs repo, see its `.archcore/docs-seo-fixes.plan.md`)**, **C — external (no code in either repo)**. Tracks are independent and can run in parallel; C1 (Search Console) should start first since every later result is measured through it.

Key decisions are recorded and accepted (2026-07-29): `landing/home-title-category-keyword.adr.md`, `landing/drop-ru-hreflang-until-ru-routes.adr.md`, `landing/content-hub-astro-subbuild.adr.md`. The semantic core, article queue, and distribution checklist live in `landing/seo-content-backlog.doc.md`.

**Second-opinion audit (2026-07-30, `deep-research-report.md` at repo root).** An independent competitor / semantic-core review was cross-checked against this plan. It confirms the category positioning ("repo memory + context engineering for AI coding agents"), and most of its "quick wins" were already shipped in A1/A2 or already covered by A5/C2. Adopted from it: **A7** (money pages are thin versus SERP competitors), **A8** (hub + schema gaps), the docs→commercial link direction in Track B, and the C2/C3 additions below.

**Deliberately not adopted**, recorded so it does not get re-litigated:

- Rewriting H1s on `/`, `/plugin`, `/cli` into category keywords — contradicts `landing/home-title-category-keyword.adr.md`, where title and H1 are decoupled on purpose (title = category + brand disambiguation, H1 = conversion). The category layer already moved into title tags and new pages.
- Hub pages for `context engineering`, `spec-driven development`, `agents.md` — `seo-research-sdd-context-skills.rnd.md` classified these as heads held by IBM / Anthropic / LangChain / official agents.md and routed them to glossary/AEO. The report names the same SERP holders and then recommends competing with them, without evidence to reverse the call; it also omits the SDD-afterlife and skills-junction wedges entirely, so it is narrower than the RnD, not newer.
- A 2–3 posts/week cadence for 8–10 weeks — incompatible with the fact-checked long-form the AEO requirements depend on. Cadence stays 2–4 evergreen pieces/month.
- A second GSC property for `docs.archcore.ai` — the DNS domain property in C1 already covers the subdomain; page-group segments are what is missing, not another property.

The report also carries stale snapshot facts (it reports two blog posts and the 18-vs-19 document-type drift, both outdated by A1/A5) and no volume/KD data, so it supplements the RnD rather than superseding it.

## Tasks

### Track A — Landing site (this repo)

A1. **[DONE 2026-07-29, deployed]** Quick fixes: sitemap includes /how-to-use/ and is now build-generated with fresh lastmod; `public/llms.txt` live; "eighteen"→"nineteen" drift fixed (missing RnD added to Vision lists); `?lang=ru` hreflang removed per ADR.

A2. **[DONE 2026-07-29, deployed]** Home title change: meta title "Archcore — repo memory for AI coding agents"; H1/og:title keep the pain phrase; `messaging-alignment.rule.md` amended in the same change.

A3. Iteration-2 leftovers that gate content quality (M): code-split 514KB bundle, GIF→video, trailing slashes in internal links, /plugin meta length. Source of truth: `landing-improvement-iteration-2.plan.md`. (Sitemap lastmod automation done via A1. Note on "full-body prerender": `scripts/prerender-routes.mts` already emits a hand-written static body per route — h1, several paragraphs, site nav — so crawlers without JS are not seeing an empty page. What remains from that item is deciding whether hand-written bodies stay or a headless render replaces them; hand-written is cheaper but must be kept in sync with the page, which is exactly the drift A9 had to clean up.)

A4. **[DONE 2026-07-29]** Content infrastructure per `content-hub-astro-subbuild.adr.md`: `content-site/` Astro sub-build (collections blog/learn/alternatives, zod schema, ArticleLayout with Article + FAQPage JSON-LD, canonical, visible dateModified, raw-markdown twin per article), `scripts/merge-content.mts` merges into `dist/` and appends routes to sitemap, CI runs `npm ci --prefix content-site`, Blog linked from footer nav + static fallbacks. Remaining from A4: author entity / about page (E-E-A-T) — pending.

A5. Beachhead content (months 1–2, cadence 2–4 evergreen pieces/month): execute the 10-piece three-wave queue from `seo-content-backlog.doc.md`.
  - Wave 1 item 1 **[DONE 2026-07-29]**: "Cursor Removed Memories: What to Use Instead" → `/blog/cursor-memories-removed/` (fact-checked against primary sources).
  - Wave 1 item 4 **[DONE 2026-07-30]**: "What Is Repo Memory?" definitional pillar → `/learn/repo-memory/` (term claim; comparison table repo memory vs cloud agent memory vs RAG vs instruction files).
  - Wave 1 item 2 **[DONE 2026-07-30]**: "How Claude Code Memory Works: CLAUDE.md, Auto Memory, MEMORY.md" → `/blog/claude-code-memory/` (fact-checked: official docs confirm 200-line/25KB MEMORY.md limit; AGENTS.md issue #6235 = top-voted issue, 4,475 👍; Auto Memory machine-local by design).
  - Wave 1 item 3 **[DONE 2026-07-30]**: "MCP server for project context" guide → `/blog/mcp-server-project-context/`.
  - Next: "CLAUDE.md vs AGENTS.md vs SKILL.md" comparison matrix (Wave 1 item 5).
  - Cross-linking so far: cursor post ↔ repo-memory pillar ↔ claude-code-memory post (all interlinked); `/learn/` and `/blog/` indexes now cross-link each other and both point at `/plugin` and `/cli` (A8).

A6. Authority assets (months 3–6): per `seo-content-backlog.doc.md` — original CLAUDE.md/AGENTS.md data study, per-host integration pages (8 agents), alternatives vs memory clouds, candidate repo-memory benchmark.

A7. **[DONE 2026-07-30]** Money-page depth — mid-funnel sections on `/plugin` and `/cli`. Shipped in the hosts + migration scope; use-case blocks deliberately deferred.
  - `/plugin`: new `plugin-hosts-section.tsx` — host matrix (Claude Code Production, Cursor 2.5+ Implemented, Codex CLI 0.117+ Implemented, GitHub Copilot Planned), mirroring `docs/plugin/supported-hosts.mdx`, plus a "any other MCP agent → CLI" exit. Placed after the command catalog, before Showcase.
  - `/cli`: new `cli-agents-section.tsx` — the 8 agent integrations as a grid (not a table; eight table rows are unreadable at 390px), each with its wiring mechanism, linking to `docs/cli/agent-integrations`.
  - Both pages: shared `migration-section.tsx` with an `entryPoint: "plugin" | "cli"` prop (one component, one copy source — the two pages cannot drift). Three sources — CLAUDE.md, AGENTS.md/.cursor/rules, docs/ — and what the import produces, linking to the docs migration guide and `/learn/repo-memory/`. Placed after Problem, before FAQ (it answers an objection).
  - Section order on `/plugin` still satisfies `plugin-page-action-framing.adr.md` (Hero → Pillars → Showcase → Problem → FAQ); the command catalog did not move and did not change structure, so no new ADR was needed.
  - H1s, titles, descriptions and OG variants untouched — the new blocks are body content. Static prerender bodies got a summary paragraph each so non-JS crawlers see the same claims. 40 new strings extracted and translated to RU (formal «вы»); catalog shows 0 missing.
  - Verified: correct section order and zero horizontal overflow at 390px and 1280px, RU renders with no «ты» forms.
  - **Deferred:** use-case blocks on both pages.

A8. **[DONE 2026-07-30]** Hub architecture and structured data.
  - `content-site/src/pages/learn/index.astro` added, so the `/learn/repo-memory/` pillar is no longer reachable only from the sitemap. Rather than clone the blog listing, the shared shell was extracted into `content-site/src/layouts/ListingLayout.astro` and both indexes now use it.
  - `CollectionPage` + `ItemList` JSON-LD now on both `/learn/` and `/blog/` (the blog listing previously had no structured data at all).
  - `/learn/` linked from the content-site header, the landing footer (`site-nav.tsx`, `reload: true` — it is a static Astro page, not a SPA route), `INTERNAL_LINKS`, the `index.html` crawler fallback nav, and the per-route static nav in `prerender-routes.mts`. `/learn/` lands in the sitemap automatically via `collectRoutes`.
  - `.page > p a` styling added to `content.css` — listing cross-links were rendering as default browser blue.
  - **Deferred:** `/alternatives/` index — the collection is still empty, and an index over zero entries is a thin page. Ship it with the first comparison article.

A9. **[DONE 2026-07-30]** Prerender integrity in `scripts/prerender-routes.mts` — two defects found while implementing A7/A8, neither from the audit report.
  - **Wrong FAQPage on every route.** The script clones `dist/index.html` and rewrote only `<head>` meta, so the home page's FAQPage JSON-LD (6 product questions) shipped on `/plugin/`, `/cli/`, `/how-to-use/` and `/privacy/` — the privacy policy claimed the product FAQ as its own structured data. `RouteMeta` now takes an optional `faq[]`: routes that have one override the block, routes that do not have it stripped. `/plugin` and `/cli` carry their own four questions, mirroring their visible FAQ sections; the emitter throws if the marker block ever disappears from `index.html` rather than silently shipping the wrong schema. Verified: all JSON-LD parses, home 6 questions, plugin/cli 4 each, privacy and how-to-use zero.
  - **Copy drift in the static bodies.** `/plugin` described a `/archcore:standard` command that does not exist in the seven from `plugin-page-action-framing.adr.md`; `/how-to-use` called the plugin "the recommended runtime", against the messaging rule's equals framing. Both rewritten from the shipped command catalog and the "choose by your agent" framing.
  - Also made `scripts/merge-content.mts` idempotent — it appended content routes to the sitemap unconditionally, so any second run (or a CI step order change) emitted duplicate `<loc>` entries. It now skips routes already present.

### Track B — Documentation (docs repo, docs.archcore.ai)

**[DONE 2026-07-29, deployed]** — see `.archcore/docs-seo-fixes.plan.md` in the docs repo: homepage title fixed via head override, 5 generic page titles sharpened, `starlight-llms-txt@0.10.0` shipping llms.txt/llms-full.txt/llms-small.txt, descriptions aligned with the category phrase.

**Docs→commercial linking [DONE 2026-07-30]** — the specific gap was direction: link flow ran marketing → docs only, and the intent-rich pages had zero editorial links back (`concepts/vs-flat-files`, `concepts/use-cases`, `cli/agent-integrations`, `concepts/document-types` had no `archcore.ai` mention at all; `start/migrate-from-flat-files` had one, the install curl). Fixed in the docs repo: a "Product" sidebar group (archcore.ai, plugin page, CLI page, "What is repo memory?", blog) renders on all 45 pages, plus one or two contextual links inside each of those five pages. Verified in the built output.

Remaining in the docs repo: `.md` twins (waits for Astro 7 upgrade).

### Track C — External (no code in these repos)

C1. Measurement (week 1, before everything): Google Search Console — DNS domain property for archcore.ai (covers docs subdomain); Bing Webmaster (import from GSC). Submit both sitemaps. **Owner action — not yet confirmed done.** Add page-group segments (home/plugin/cli, blog, learn, alternatives, docs) so docs-vs-marketing cannibalization is visible without a second property.
C2. Listings/backlinks (weeks 1–2): work through the distribution checklist in `seo-content-backlog.doc.md` (awesome-lists PRs, MCP catalogs, listicle pitches). Added 2026-07-30: Spec Kit community layers (Friends / Extensions / Bundles / Walkthroughs), GitHub topic pages (`context-engineering`, `repo-memory`, `mcp-server`), and AGENTS.md ecosystem / migration threads.
C3. GitHub as SEO surface: org/repo taglines "Git-native repo memory for AI coding agents", repo topics, README funnel to archcore.ai. **README as a search-first surface** (`archcore-ai/cli`, `archcore-ai/plugin` — code lives outside this repo, hence Track C): the first ~120 characters must state the category, the audience and the supported agents; then sections for "what is repo memory", supported agents, install, comparison with AGENTS.md / CLAUDE.md / Cursor Rules, why git-native, and links to the matching landing and docs pages.
  - **Open question to settle here — GitHub Copilot status.** The three surfaces disagree: the plugin README says Copilot CLI is `Implemented`, with an install command and a documented caveat that the MCP server must be registered per project by hand (github/copilot-cli#4234); `docs/plugin/supported-hosts.mdx` says `Planned`; the landing site said "on the roadmap". Decided 2026-07-30 not to resolve it yet, so the new landing host matrix (A7) was written to match the docs (`Planned`) — landing and docs are consistent and the divergence is isolated to the README. Resolve it while rewriting the README, and update whichever two surfaces are wrong in the same change.
C4. Distribution per published piece: dev.to cross-post, relevant Reddit/HN when the piece warrants it; YouTube demo/walkthrough. First candidates: Cursor Memories post (freshness window), Claude Code memory post (hot cluster).
C5. Ongoing: weekly GSC review (non-brand impressions, new queries), quarterly SERP re-check of the three wedges.
C6. Note: huggingface.co/archcore is squatted by an unrelated org — low priority, monitor only.

## Acceptance Criteria

- C1 done week 1: GSC + Bing verified, both sitemaps submitted, data flowing, page-group segments configured.
- [x] A1 shipped: sitemap complete and fresh; llms.txt live; no 18-vs-19 drift; no dishonest hreflang.
- [x] A2 shipped with zero rule-vs-site drift.
- [x] Track B first pass executed in docs repo: unique titles, llms.txt live.
- ≥10 content pages live by end of month 2, each with Article/FAQPage schema and answer-first structure (**4/10 as of 2026-07-30**).
- [x] A7: `/plugin` and `/cli` each carry a supported-hosts block and a migration block; the `/plugin` command catalog keeps its position and structure; H1s unchanged; RU translated (0 missing); host support identical across landing and docs. Use-case blocks deferred.
- [x] A8: `/learn/` index live and linked from footer nav, header, and crawler fallbacks; `/learn/` and `/blog/` both emit CollectionPage/ItemList. `/alternatives/` index deferred until it has content.
- [x] A9: `/plugin` and `/cli` emit their own FAQPage JSON-LD; `/privacy/` and `/how-to-use/` emit none; no route serves the home FAQ; no `/archcore:standard`, no "recommended runtime" in any built HTML; sitemap has no duplicate `<loc>`.
- [x] Track B: the five intent-rich docs pages link back to the commercial pages, and a Product sidebar group returns readers to `/`, `/plugin`, `/cli`, `/learn/repo-memory/` and `/blog/` from every docs page.
- Listed in ≥5 external catalogs/awesome-lists; GitHub taglines updated; both READMEs state the category within the first 120 characters.
- Non-brand impressions visible and trending in GSC by month 3; ≥10 long-tail queries in top-20 by month 6.
- H1 remains pain-first everywhere; every copy change follows the messaging rule's 4-layer enforcement.

## Dependencies

- A5/A6 depend on A4 (done); C4 depends on A5 output.
- A3 executes `landing-improvement-iteration-2.plan.md` phases; that plan stays the source of truth for those tasks. If A3 replaces the hand-written prerender bodies with a headless render, the `faq[]` emitter from A9 must be carried over.
- A7 was constrained by `landing/plugin-page-action-framing.adr.md` (section order and command-catalog primacy) and `messaging-alignment.rule.md` (4-layer copy enforcement, i18n, unchanged H1s). Its host matrix and C3's README must ship consistent host support — see the open Copilot question in C3.
- A8(a) depended on A4's content-site infrastructure. `/alternatives/` index depends on the first Wave 2 comparison article.
- Track B happens in the docs repository (`.archcore/docs-seo-fixes.plan.md` there).
- `landing-tech-stack.doc.md` updated for the content-site sub-build (done 2026-07-29); the `ListingLayout.astro` addition from A8 belongs there too.
