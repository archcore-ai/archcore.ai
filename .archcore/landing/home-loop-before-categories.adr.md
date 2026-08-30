---
title: "Home page shows the loop before the two category sections, and those sections argue mechanism instead of definition"
status: accepted
---

## Context

A visitor read `archcore.ai/` and reported that he could not say what the tool would do for him. The page is not thin and not badly written, so the failure is in the order the meaning is released.

**Where the current page breaks.** The first three sections are already inverted correctly: category and product, then the problem, then Before/After, which is the concrete proof. The break is what follows. Sections 4 and 5 are definitional. Section 4 shows the `idea → prd → spec → plan` chain and explains what spec-driven development is. Section 5 shows five properties of engineered context and adds a paragraph that introduces a third term, harness engineering. Only section 8 shows what the reader types and what comes back. The first concrete use of the product sits roughly six screens down, behind two blocks that answer "what is this" for the third and fourth time.

**Competitor scan, 2026-08-31.** Kiro, OpenSpec, Spec Kit, BMad, Tessl, Augment Cosmos, Warp, mem0, and Linear were read as shipped pages. Three patterns hold across all of them.

1. The median is six to eight content sections. Augment Cosmos and Warp run four. The current Archcore home page has eight, so the section count is not the problem.
2. None of them explains its own architecture before it shows a changed result. Kiro's system is not simpler than Archcore's, and its hero states three jobs rather than its structure.
3. The products closest to Archcore sell a loop, not a document set. BMad leads with Clarify → Plan → Build and Verify → Learn and Adjust. Augment leads with "moves work from spec to verification". Archcore has the same asset and shows it last.

**SERP check, 2026-08-31.** "spec-driven development" returns Wikipedia, IBM, Microsoft Developer, the GitHub Blog, Microsoft Learn, and Augment. "context engineering for AI coding agents" returns Anthropic, LangChain, Sourcegraph, and four arXiv papers. Both heads are held by definitional authorities, which confirms the finding already recorded in `landing/seo-research-sdd-context-skills.rnd.md`.

**This is the fact that unblocks the change.** `product/seo-information-architecture` assigns the two category queries to `/spec-driven-development/` and `/context-engineering/`, and gives the homepage the combined brand and category query: Archcore + Spec-Driven Development + Context Engineering. The homepage is therefore not competing for the head, and the definitional prose inside sections 4 and 5 buys no ranking that the pillar pages do not already own. What the homepage needs from those two sections is the category term in the H2, the term used naturally in the body, and a descriptive anchor to the pillar. All three survive a rewrite that replaces definition with mechanism.

**Two defects found in the code while diagnosing this.**

- The Before/After section has no counterpart in the static crawler body in `index.html`. That body runs problem, spec-driven, context engineering, git-native, cross-agent, loop, and is 807 words. The strongest block on the page is invisible to crawlers that do not execute JavaScript and to answer engines that read the same HTML.
- The page never situates Archcore against the tools the reader arrives from. `/alternatives/` is still empty, so nothing on the site does this.

## Decision

The homepage releases meaning in this order: what breaks, what changes, how you use it, why it works, why you can trust it.

1. **The section order becomes** hero, problem, Before/After, the loop, context engineering, spec-driven development, git-native, cross-agent, FAQ, CTA. The loop moves from slot 8 to slot 4. The two category sections move down behind it and swap places, so the section that explains what reaches the agent during an edit follows directly from the loop that shows the edit.
2. **The loop keeps its content and gains one fact.** The four stages, the running rate-limiting example, and the vertical list are unchanged under `landing/how-to-use-cases.adr.md`. The section states the review verdict explicitly: `/archcore:review` returns code-wrong, spec-wrong, or ok. That is the most concrete outcome the product has and it is not named anywhere on the home page today.
3. **The context-engineering section leads with the moment, not the property list.** It shows the pre-edit injection: the agent opens a source file, and Archcore supplies the applicable spec, ADR, and rules before the edit, with no command. The five properties compress from a definition list to one line. The harness-engineering paragraph reduces to the single sentence that carries the link, which is what the "Good" example in `product/seo-information-architecture` describes: name the term once, in this section's body, linking to the page that owns it.
4. **The spec-driven-development section is reframed from "what SDD is" to "where the spec goes after it ships".** The `idea → prd → spec → plan` chain stays, because it is the shipped `sdd` track. It gains the differentiation the page has never carried, taken from the competitive framing table in `product/surface-descriptors`: methodology tools define a development process; Archcore keeps the resulting project knowledge alive, connected, versioned, and available to agents throughout implementation. The word "workflow" is not used, per the ban in `product/messaging-and-voice`.
5. **Before/After enters the static crawler body in `index.html`,** in its rendered position, with the two panels reduced to prose.
6. **The problem section drops from five failures to three.** The five are the ones listed in `product/surface-descriptors` section 2. The three kept are the ones the rest of the page then answers.
7. **Nothing in the pinned set changes.** Hero eyebrow, H1, subhead, supporting promise, both CTA labels, the install block and its position in the hero, the works-with strip, both category H2 strings, every section anchor, every pillar anchor and its anchor text, the FAQ, and both JSON-LD blocks are untouched. The owner confirmed on 2026-08-31 that the subhead stays as pinned and that the install block stays in the hero.
8. **This is a deliberate local override of `product/surface-descriptors`, now at the sequence level.** The global homepage section sequence already deviated at slot 8 under `landing/how-to-use-cases.adr.md`, and at the Before/After addition. It now deviates in order as well. Anyone reconciling the landing against the global descriptor reads this ADR first.

## Alternatives

- **Fold the six explanation sections into three and rewrite the H1** (the reviewer proposal that started this). Rejected on two counts. The proposed H1 drops "Context Engineering", which is one of the two discovery categories fixed by `product/two-discovery-categories`, and the two category H2s are the only category anchors on the highest-authority page, which `messaging-alignment.rule.md` forbids softening.
- **Add a "What changes" before/after section.** Rejected: it already exists and has since 2026-08-10. The work is to make it visible to crawlers and to stop burying the loop underneath it.
- **Give differentiation its own section.** Rejected: a ninth section for one paragraph, against an explicit instruction not to grow the page. The paragraph lives in the spec-driven section, and the depth belongs in `/alternatives/`.
- **Rewrite the hero subhead to state outcome and mechanism in one sentence.** Deferred by the owner on 2026-08-31. Recorded so it is not re-proposed as a fix for the same complaint without a decision.
- **Move the install block below the loop.** Rejected by the owner on 2026-08-31. `landing/home-install-single-path.adr.md` stands unchanged.
- **Keep the loop at slot 8 and only cut prose.** Rejected: shorter definitions do not change the fact that the first concrete use of the product is six screens down. Order is the defect. Length is a symptom.
- **Delete the two category sections and rely on the pillar pages.** Rejected: the pillars own the head queries, but the homepage still has to state which category the product belongs to, for entity consistency and for the combined brand-plus-category query it does own.

## Consequences

- **The section-order table in `messaging-alignment.rule.md` changes in the same pull request as `landing.tsx`.** The rule's own enforcement section forbids rule-versus-site drift, and this ADR is worthless if the table still describes the old order.
- **The background alternation is recalculated.** Backgrounds alternate page and band from section 4 on, so a moved section moves its background with it and the rhythm is re-derived rather than carried over.
- **The copy layers move together:** `landing.tsx`, the static body in `index.html`, `scripts/prerender-routes.mts`, and the OG variants. The home page is not in `ROUTES`, so `index.html` is the home crawler body and the only static layer that changes here. The prerender script is still checked, because its `renderBody()` nav and per-route bodies repeat home claims.
- **Every changed string goes through extract, RU translation with the formal «вы», and compile.** English gets the `humanizer` pass and Russian gets `humanizer-ru`. Russian keeps its grammatical dash.
- **Analytics is unaffected.** No anchor changes and no CTA changes, so `home_loop_how_to_use`, the install-copy events, and the FAQ events keep firing on the same surfaces. Deep links to `#how-it-works`, `#spec-driven-development`, `#context-engineering`, `#git-native`, and `#cross-agent` all still resolve. Only their vertical position changes.
- **AEO improves as a side effect.** The concrete answer to "how does this work" moves into the top third of the document, and Before/After becomes readable by engines that never execute the SPA.
- **The differentiation sentence is a competitive claim on the highest-authority page,** so a competitor's release can falsify it in a way the rest of the page cannot. It states what Archcore does rather than what OpenSpec or Spec Kit fail to do, which is why it is safe to ship before `/alternatives/` exists.
- **`/alternatives/` becomes the next content gap rather than a nice-to-have.** The home paragraph creates the intent and the comparison pages have to catch it. `landing/seo-content-backlog.doc.md` rates "spec kit alternative" and "openspec alternative" as high chance, and `landing/seo-growth.plan.md` A8 defers the `/alternatives/` index until it has one entry.
- **The loop section is still the surface a release falsifies first.** It now sits higher, so a stale claim there is more visible. The check against the plugin's skill files on every release is unchanged and matters more.
