---
title: "Home meta title carries the category keyword (repo memory), H1 stays pain-first"
status: accepted
---

## Context

SEO research (2026-07-28, `landing/seo-research-sdd-context-skills.rnd.md`) found zero non-brand visibility for archcore.ai and a brand SERP for "archcore" dominated by archcore.com (a US steel-buildings company). The current home meta title — "Archcore — Stop re-explaining your repo to every AI agent" — contains no category term, so the page competes for nothing and does not disambiguate the brand. Meanwhile `messaging-alignment.rule.md` deliberately keeps the H1 pain-first (decision of 2026-07-06: the pain hook outperformed the category-first phrase in clarity) and currently requires meta title = brand + pain phrase.

## Decision

The home page meta `<title>` becomes category-led: **"Archcore — repo memory for AI coding agents"**. The H1 stays pain-first ("Stop re-explaining your repo to every AI agent.") per the messaging rule; `og:title` and Twitter title may keep the pain phrase (social cards optimize for the hook, SERPs for the category).

Title tag and H1 are decoupled: the title serves search intent and brand disambiguation, the H1 serves conversion. This does not reverse the 2026-07-06 pain-first decision.

## Alternatives

- **Keep title = pain phrase (status quo):** preserves single-phrase purity but leaves the only high-authority page with no category term and no disambiguation from archcore.com. Rejected.
- **Change H1 to category phrase:** contradicts the documented 2026-07-06 decision and its conversion rationale. Rejected.
- **Longer combined title ("Archcore — repo memory… | Stop re-explaining…"):** exceeds ~60 visible chars, truncates in SERPs. Rejected.

## Consequences

- `messaging-alignment.rule.md` must be amended (meta-title line and copy-hierarchy section) **in the same PR** as the code change — the rule's own enforcement section forbids rule-vs-site drift.
- Implementation touches the rule's copy layers: `index.html` (title + twitter:title decision), `scripts/prerender-routes.mts` (home is not in ROUTES — verify), `scripts/generate-og-image.mts` (OG image subtitle unchanged), `src/hooks/use-page-meta.ts` usage on the landing page, i18n workflow for any visible strings (none expected — title only).
- Follow-up: docs and GitHub taglines should converge on the same category phrase ("Git-native repo memory for AI coding agents") for entity consistency.