---
title: "SEO content backlog — semantic core, article queue, authority assets, distribution checklist"
status: accepted
---

## Overview

Working reference for the content program defined in `landing/seo-growth.plan.md` (Track A5/A6, Track C). Derived from live SERP research of 2026-07-28 (`landing/seo-research-sdd-context-skills.rnd.md`). Demand/chance ratings are expert estimates from SERP density, not tool volumes — re-verify each SERP before writing (clusters flip quarterly).

## Content

### Semantic core by cluster

Chance = realistic shot at top-10 within ~6 months. Page types: pillar (definitional long-form in /learn/), guide (tutorial in /blog/), comparison (in /alternatives/ or /blog/).

**Cluster 1 — {host} memory (closest to product, weakest defended):**

| Key | Intent | Chance | Page |
|---|---|---|---|
| cursor memory / cursor removed memories | problem, fresh | High (freshness window) | guide |
| claude code memory / auto memory / MEMORY.md limits | info+problem | High | guide |
| codex CLI context / GEMINI.md | info | High (low volume) | guide series |
| AI agent forgets context between sessions | problem | High | guide |
| give coding agent persistent repo memory | commercial | High | guide → product |

**Cluster 2 — empty product-key SERPs:**

| Key | Intent | Chance | Page |
|---|---|---|---|
| MCP server for project context | commercial | Very high (emptiest SERP found) | product-led guide |
| repo memory (term) | info | Very high (term unclaimed) | pillar /learn/repo-memory/ |
| structured repo context / git-native context | commercial | High | pillar sections |

**Cluster 3 — SDD afterlife:**

| Key | Intent | Chance | Page |
|---|---|---|---|
| where do specs live after the feature ships / specs in git | info | Very high (no canon) | pillar |
| spec drift | info, term forming | High | pillar section or own page |
| living specs | info, term forming | High | pillar section |
| spec kit alternative(s) | commercial | High (junk listicles in top) | comparison |
| openspec alternative / openspec vs archcore | commercial | High (near-empty) | comparison |
| tessl alternative / review | commercial | High (near-empty; Tessl pivoted away) | comparison |
| spec-driven development claude code | tutorial | Medium | guide "Spec Kit + Archcore" |
| PRD for AI coding agents (dev-side) | info | Medium-high | guide + template |

**Cluster 4 — skills junction:**

| Key | Intent | Chance | Page |
|---|---|---|---|
| SKILL.md vs CLAUDE.md vs AGENTS.md | comparison | High (thin affiliates in top) | comparison matrix |
| agent skills vs project context | info, forming | Very high (Red Hat deferred it 2026-07-27) | pillar |
| CLAUDE.md vs AGENTS.md | comparison | High | comparison (data-backed) |
| AGENTS.md too long / context bloat | problem | High | guide |

**Cluster 5 — ADR & typed docs:**

| Key | Intent | Chance | Page |
|---|---|---|---|
| ADR for AI coding agents | info, growing | Very high (2–3 weak pages) | pillar |
| spec/PRD/plan markdown templates for agents | info | High | template hub |
| architecture decisions for AI agents | info | High | pillar section |

**Heads — glossary/AEO only, do not chase rankings:** context engineering, agent memory, spec-driven development, AGENTS.md, llms.txt.

### Beachhead article queue (10 pieces, three waves — order matters)

Wave 1 (freshness + empty SERPs):
1. "Cursor removed Memories: what to use instead" — time-sensitive, ship first.
2. "How Claude Code memory works: Auto Memory, MEMORY.md limits, CLAUDE.md — and what none of them can hold".
3. "MCP server for project context" — product-led guide.
4. /learn/repo-memory/ — definitional pillar claiming the term.
5. "CLAUDE.md vs AGENTS.md (vs SKILL.md): what goes where" — data-backed matrix.

Wave 2 (SDD afterlife):
6. "Where do specs live after the feature ships?" — pillar (spec drift, living specs).
7. "GitHub Spec Kit + Archcore: keep generated specs alive" tutorial + "Spec Kit alternatives" comparison.
8. "OpenSpec vs Archcore" + "Tessl alternative" pages.

Wave 3 (skills + ADR):
9. "Agent Skills vs project context: what SKILL.md can't hold".
10. "ADRs for AI coding agents" pillar + typed markdown template hub.

Cadence: 2–4 evergreen pieces/month. Every piece: answer-first layout, Article + FAQPage schema, visible dateModified, .md twin, internal links to product pages and docs.

### Authority assets (months 3–6)

- Original data study: analyze N public CLAUDE.md/AGENTS.md files via GitHub API — flagship citable asset (nothing comparable exists publicly).
- Per-host integration pages for all 8 supported agents (Claude Code, Cursor, Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, Cline).
- Alternatives vs memory clouds (mem0, OpenMemory, Zep) — angle: "memory in your git, not someone's cloud; no per-retrieval billing".
- Candidate: repo-memory benchmark for coding agents (cross-session task continuity) — first mover defines category rules.

### AEO/GEO writing requirements

- Definition in the first two sentences; question-form H2s; comparison tables; TL;DR block.
- Cite verifiable numbers: SkillsBench avg skill quality 6.2/12 (+16.2pp from curated skills); Snyk: 36% of skills prompt-injectable; MEMORY.md limit 200 lines / 25KB; arXiv: LLM-generated AGENTS.md = −2% success, +23% cost; llms.txt adoption ~10.13%.
- Do NOT cite the unsourced "AI traffic converts 14.2% vs 2.8%" claim (vendor-claimed, no primary source).
- Freshness: restate dateModified on every substantive update; re-check cluster SERPs quarterly.

### Track C distribution checklist

- [ ] PRs: awesome-claude-code-plugins, awesome-claude-plugins, awesome-ai-plugins
- [ ] Catalogs: mcpservers.org, glama.ai, mcp.so, mcpserver.directory, openalternative.co, AlternativeTo
- [ ] Listicle pitches: MarkTechPost SDD tools, intent-driven.dev alternatives pages
- [ ] GitHub taglines/topics: "Git-native repo memory for AI coding agents"; README funnel to archcore.ai
- [ ] Per published article: dev.to cross-post; Reddit/HN when warranted; YouTube walkthrough for flagship pieces
- Already listed: claudepluginhub.com, cursor.directory

## Examples

Answer-first opening pattern for pillars: "Repo memory is project context — decisions, rules, specs, plans — stored as versioned files in the repository itself, so AI coding agents can read it in every session. Unlike cloud memory layers, it lives in git: reviewed in PRs, versioned with the code it describes, available offline." Then question-form H2s ("How is repo memory different from RAG?", "What belongs in repo memory?"), a comparison table, and a worked `.archcore/` example.