---
title: "Home page is a two-column hero and one grid of four claims (superseded)"
status: rejected
tags:
  - "web"
---

## Context

The home page ran eight stacked sections: hero, problem, Before/After, the loop, context engineering, spec-driven development, git-native, cross-agent, then FAQ and the star CTA. `landing/home-loop-before-categories.adr.md` fixed that sequence on 2026-08-31 and it did the job it was written for. The reader met a concrete use of the product at slot 4 instead of slot 8.

The owner read the shipped result on 2026-09-12 and reported a different defect. The page is too long for the job it does. Every claim owns a full screen, so the answer to "what is this and what does it give me" arrives one screen at a time, and the two category sections spend most of their words defining their own term. The measured page was 7844 CSS pixels tall and 1081 words in `main`.

**Competitor scan, 2026-09-12**, measured on the shipped pages rather than recalled: conductor.build is 285 words and leads with one product screenshot; opencode.ai is 358 words with the install command in the first screen; entire.io is 657 words with one visual per claim; ampcode.com and kiro.dev are longer but open on a product visual, not on a problem statement. None of the five carries a standalone "problem" section or a before/after comparison. Archcore carried both.

Three review rounds with the owner settled the shape. A calm single-column variant and a loop-spine variant were built and rejected; a tile grid was chosen, with the instruction that it must not read as busy or dense.

**Two blocks were removed on the owner's explicit instruction.**

1. Before/After. It argued from a hypothetical agent session what the loop now shows with real commands and real documents.
2. The standalone context-engineering section, including its `Agent opens src/api/rate-limit.ts` list and its hook paragraph. The owner asked for the block to go and chose to keep the term elsewhere on the page rather than lose it.

## Decision

The home page is four blocks: hero, grid, FAQ, star CTA.

1. **The hero is two columns.** The H1, the product description, and the one install path sit on the left; the demo recording and the example `.archcore/` directory stack on the right. Both columns end on the same line, and the works-with strip runs under both. The install block is pushed to the bottom of the copy column so the two columns resolve as one object rather than two.
2. **The directory enters the hero.** The owner asked to show how documents appear in `.archcore/`. A fixed 8:5 recording cannot fill a tall column on its own, so the directory takes the remaining height and answers the question the recording raises: the agent read something, and this is what it read.
3. **One grid replaces six sections.** Two rows of wide plus narrow: the four skills and the spec-driven chain, then the Git claim and the agent list. The wide tiles carry what the reader asks for first, the narrow tiles argue why it holds.
4. **The tile headings stay H2s and keep their anchors.** `#problem`, `#how-it-works`, `#spec-driven-development`, `#git-native`, `#cross-agent` all still resolve. `#install` and `#top` are unchanged.
5. **Eyebrows are dropped.** A two-word uppercase label above every tile is the templated rhythm this rebuild removes. The category terms live in the H2s and the body, which is what `product/seo-information-architecture` requires of this page.
6. **The context-engineering term moves to the cross-agent tile.** That tile already states how context reaches an agent: hooks where the host supports them, MCP everywhere else. The sentence ends on the descriptive anchor `context engineering for AI coding agents`, pointing at the pillar page that owns the query. Harness engineering keeps its single mention, in the loop tile.
7. **The loop keeps its content contract.** Four stages in order, vertical at every breakpoint, each showing the skill with its prompt, all four on one running example, the three review verdicts named. The home tile renders a shorter outcome line per stage; `/how-to-use` renders the full sentence. Both come from `CYCLE_STAGES` in `src/content/how-to-use/cycle.tsx`, which gained a `leaves` field for this.
8. **The Git tile shows a diff, not the directory.** The hero already shows the directory. The tile shows the one thing a directory listing cannot: a rule arriving as a diff on a pull request.
9. **The FAQ runs in two columns** from one `FaqList`, so the `FAQPage` block still describes every visible question exactly once.
10. **Nothing in the pinned set changes.** H1, the product description, the meta title, the meta description, the canonical URL, the OG image, the install path, the works-with strip, the star CTA, and both JSON-LD blocks are untouched.

## Alternatives

- **Keep the eight sections and cut prose.** Rejected: the measured problem is the number of screens, not the word count inside each one.
- **The calm single-column variant.** Hairlines instead of tiles, the folder as the hero visual, three full-width rows under it. Rejected by the owner on 2026-09-12 as still too long.
- **The loop-spine variant.** Four steps down a left rail, each pinned topic beside the step that produces it. Rejected in the same round.
- **Keep the context-engineering section and only cut its file list.** Offered to the owner with the SEO consequence stated. The owner chose to remove the section and relocate the term.
- **Give the context-engineering term its own tile.** Rejected: a fifth tile for one sentence, against the instruction not to make the grid dense.
- **Drop the demo recording.** Rejected: it is the only surface on the site that shows an agent reading and writing project context in a real session.

## Consequences

- **`landing/home-loop-before-categories.adr.md` is superseded** and marked rejected. `landing/home-information-hierarchy.plan.md` implemented it and is marked rejected with it. Read this ADR before restoring either.
- **The section-order table in `messaging-alignment.rule.md` changes in the same pull request**, as that rule's enforcement section requires.
- **Context engineering is no longer an H2 on this page.** It stays in the H1, in the meta title, in the meta description, and in the cross-agent tile body with the pillar link. `product/seo-information-architecture` gives the head query to `/context-engineering/` and gives the home page the combined brand-plus-category query, so the term still has to appear here, and it does. This is a measurable risk on the home page's own ranking for the category phrase and was accepted by the owner on 2026-09-12. Watch the home page's impressions for "context engineering" queries in Search Console.
- **Six component files are deleted**: `problem-section`, `before-after-section`, `spec-driven-section`, `context-engineering-section`, `git-native-section`, `cross-agent-section`, and `how-to-use-cycle-section`. Their claims live in `home-grid-section.tsx`. `/how-to-use` never used the cycle section component and is unaffected.
- **`main` drops from 1081 to 823 words and the page from 7844 to 3527 pixels**, measured on the built output at 1280 pixels wide.
- **Analytics is unchanged.** `home_hero_install`, `home_loop_how_to_use`, `home_faq`, and `star_cta_section` all still fire on the same surfaces.
- **The install command no longer breaks mid-word.** The hero column is narrower than the old centred block, so the commands scroll instead of wrapping on desktop, and keep wrapping on phones.
- **Grid and flex children carry `min-w-0`.** Without it a no-wrap command or a wide `pre` stretched the hero track to 503 pixels inside a 350 pixel column, clipped by the section's `overflow-hidden` and invisible to any build check.
- **The SEO baseline's `headings` entry for `/` is updated.** `scripts/verify-build.mts` does not compare headings on non-article routes, so nothing in the build would have caught the drift.
