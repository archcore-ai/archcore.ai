---
title: "SEO research: winnable organic clusters (SDD, context engineering, agent memory, skills)"
status: accepted
---

## Goal

Determine where archcore.ai can realistically win organic traffic across the SDD / context engineering / agent memory / agent skills clusters, and which competitor content patterns to adopt. Basis for `landing/seo-growth.plan.md`.

## Questions

1. What is the current search baseline (indexation, non-brand visibility, backlinks)?
2. Which keyword clusters are winnable vs. occupied?
3. Which competitor content patterns demonstrably rank and are portable to Archcore?

## Approach

Four parallel research passes on 2026-07-28: (a) live SERP sampling, ~100 US-index queries across SDD / context-engineering / memory / skills clusters; (b) content-strategy teardowns of mem0, Zep, Letta, Supermemory, Augment Code, Continue.dev, Tessl, GitHub Spec Kit, Kiro (sitemaps, blogs, ranking checks); (c) Archcore visibility baseline (indexation, brand SERP, mentions, catalogs); (d) local repo audit. Demand ratings are expert estimates from SERP density/freshness — no Ahrefs/GSC data existed at research time.

## Findings

### Baseline (July 2026)

- Confidently indexed: 2–3 landing pages + docs home. The 44 docs pages are invisible in SERPs; docs ship a broken title template ("Archcore | archcore").
- Non-brand visibility is zero — the site does not rank even for the exact non-brand phrase of its own /cli/ title.
- Backlinks: claudepluginhub.com and cursor.directory only. Absent from all awesome-lists and MCP catalogs (glama.ai, mcp.so, mcpservers.org…) — free quick wins.
- Brand SERP for "archcore" is dominated by archcore.com (US steel company); huggingface.co/archcore is squatted by an unrelated org.
- No llms.txt on either domain; no Search Console verification found in the repo.

### Winnable wedges (weak or empty SERPs with direct product fit)

1. **"{host} memory" cluster** — "claude code memory", "cursor memory", "codex context": at most one vendor URL per SERP; "cursor memory" has none. Two freshness windows: Cursor removed Memories in v2.1.x (half the SERP recommends a dead feature); Claude Code Auto Memory / MEMORY.md limits (200 lines / 25KB) are being farmed by mem0/Milvus already.
2. **Empty product-key SERPs** — "MCP server for project context" (no articles at all, only GitHub READMEs); "repo memory" as a term has no definitional page (mem0 just started; whoever defines it gets the LLM citations).
3. **SDD afterlife gap** — the whole niche answers "how to write a spec before code"; nobody answers "where the spec lives after merge". Fowler names spec-anchored an open problem; Spec Kit/Kiro specs are ephemeral per-feature artifacts. "spec drift", "living specs", "where to store specs for AI agents" are being claimed right now by thin sites. "tessl alternative" and "openspec alternative" SERPs are nearly empty; Tessl is pivoting away to skills-registry.
4. **Skills junction** — skills are portable precisely because they contain no project context. Red Hat (2026-07-27) explicitly deferred ADR storage / project memory / cross-tool sync — printed confirmation of the gap. "SKILL.md vs CLAUDE.md vs AGENTS.md" is held by thin affiliate sites.
5. **ADR for AI agents** — 2–3 weak pages (actual.ai, mnemehq) on a growing topic that is Archcore's core.

### Not winnable (heads — target only via glossary/AEO)

"context engineering" (IBM, Gartner, Anthropic, DataCamp), "agent memory" (IBM, Letta, DeepLearning.AI), "spec-driven development" (Wikipedia, IBM, GitHub, Augment), "AGENTS.md" (official agents.md), "llms.txt" (SEO grands; the file itself has ~10% adoption and no proven citation effect — ship it, expect little).

### Competitor patterns that demonstrably work

- **Alternative/vs pages**: Zep's 8 `/{x}-alternative/` pages rank #1–2 for "mem0 alternatives"; mem0 runs 8 compare pages + blog duplicates.
- **Per-host integration pages**: mem0 docs/integrations, Augment ~100 `/mcp/*` pages capture "X memory / X MCP" long-tail.
- **Definitional hubs**: Zep `/ai-agents/` mini-glossary ranks; Augment `/guides/what-is-spec-driven-development` sits in the SDD head SERP — proof a vendor guide can.
- **Benchmark/research assets**: the whole memory category argues via LoCoMo/LongMemEval; no repo-memory benchmark for coding agents exists — first mover defines the rules.
- **llms.txt + .md page twins**: 6 of 8 competitors ship them (Letta/Kiro pattern).
- **OSS repo as SEO magnet**: spec-kit = 124k★ repo with keyword tagline + one pillar post ranking for a year.
- **Antipatterns**: blog on a subdomain (Zep — authority leak); news-style non-evergreen blog (Tessl — rots, doesn't rank).

### Defensible thesis

None of the eight competitors can say: "memory lives in your repo, versioned by git, reviewed in PRs, works offline" — it breaks their cloud business models (mem0/Zep/Supermemory/Letta/Augment) or their ephemeral-spec design (Spec Kit/Kiro). This is the content thesis to repeat on every surface.

### AEO/GEO notes

Dev-topic AI answers cite official docs, GitHub READMEs, arXiv, vendor engineering blogs, dev.to. Requirements: answer-first structure (definition in first 2 sentences, question-form H2s, tables), citable numbers (available: SkillsBench 6.2/12, +16.2pp curated; Snyk 36% injectable skills; MEMORY.md 200-line limit; arXiv "LLM-generated AGENTS.md = −2% success, +23% cost"), freshness (clusters flip quarterly), and an original data study — "we analyzed N public CLAUDE.md/AGENTS.md files" does not exist in public and would be the flagship citable asset.

## Recommendation

Do not fight the heads. Build a three-wedge content program on the apex domain (`/blog/`, `/learn/`, `/alternatives/`): (1) {host} memory cluster with the two freshness windows first, (2) empty product-key SERPs ("MCP project context", "repo memory" term claim), (3) SDD afterlife + skills junction. Fix foundation first (GSC, sitemap bug, llms.txt, docs titles, catalog listings). Keep pain-first H1 per messaging rule; carry category terms in title tags and new pages instead.

## Next Action

Execute `landing/seo-growth.plan.md`.