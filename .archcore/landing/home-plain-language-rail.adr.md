---
title: "Home page opens in plain language and lays every block out on a heading rail"
status: accepted
tags:
  - "web"
---

## Context

The home page was rebuilt twice on 2026-09-12 and rejected twice by the owner. The first rebuild collapsed eight stacked sections into a tile grid; the verdict was "too dense, and it is not clear what this is". The second attempt kept the grid and was told the impact was not clear either. Both rebuilds changed the arrangement of the same sentences.

The sentences were the defect. The H1 is the category line fixed by `product/two-discovery-categories`: "Spec-Driven Development & Context Engineering for AI Coding Agents". The paragraph under it was `productCopy.expanded`: "Archcore keeps specs, architecture, decisions, rules, and plans in Git, and makes the right project context available to AI coding agents as they work." Both are accurate and both are written for a reader who already holds the category. "Spec-driven development", "context engineering", "project context" and "git-native context layer" are the vocabulary of someone who has already decided this class of tool exists. A first-time reader gets four abstractions and no picture, so no arrangement of those blocks can answer "what is this".

The second complaint has the same shape. The page asserted properties (reviewable in pull requests, portable across tools, versioned with code) and never said what changes for the person reading. `product/jobs-to-be-done` already names what changes, and none of it was on the page in those words.

A third problem was structural rather than editorial. Prose stopped at its own measure around 620 to 680 pixels inside a 1040 pixel container, so the right side of every block was air. The owner asked for that space to be used.

## Decision

The page opens in plain language, states what the reader gets before it explains anything, and lays every block on a heading rail.

1. **Two sentences under the H1.** The first says what Archcore is with no term that needs a glossary: "Archcore keeps your project's decisions, specs, and rules in the repo." The second says what changes: "Your coding agent reads them before it writes, so it builds by this repo's rules instead of the ones it happens to know." The H1 above them is unchanged, so the category terms still hold the title, the H1, and the meta description.
2. **The home hero stops using `productCopy.expanded`.** That descriptor stays in `src/data/product-copy.ts` and stays in use on the pillar CTAs and in `llms.txt`. The home hero is the one surface where a shared, category-led sentence was costing the reader more than it bought.
3. **What you get comes second, with the mechanism beside each claim.** Three rows: code that fits this repo on the first try, nothing to re-explain in a new session, a broken decision caught before merge. Each names the document, the path, or the verdict that makes it true. A claim without its mechanism is a slogan, and this audience discounts slogans.
4. **Every block is a rail.** The H2 sits in a 250 pixel left column, the content in the right column, so a block fills the container without stretched prose. `RailSection` is the one layout primitive; sections do not invent their own.
5. **One framed object on the page**, the example `.archcore/` directory with a decision record open. It is the fastest answer to "what is this", and the owner asked for it twice.
6. **Four sections, then FAQ and the closing row**: outcomes, documents, skills, agents. The demo recording is hidden for now at the owner's request; the section that carried it is gone rather than left empty.
7. **The closing CTA is one row**, a sentence on the left and the actions on the right above a hairline, replacing the centred card with its own icon and heading.
8. **Anchors are unchanged**: `#top`, `#install`, `#problem`, `#git-native`, `#how-it-works`, `#cross-agent`, `#faq` all still resolve.

## Alternatives

- **Rearrange the existing sentences again.** Rejected after two rebuilds failed that way. The vocabulary was the defect, not the order.
- **Change the H1 to plain language.** Rejected: the H1 is pinned by `product/two-discovery-categories` and carries the page's search intent. The plain sentence sits under it instead, which costs nothing in the title or the meta description.
- **Keep the demo recording in the hero.** Rejected by the owner on 2026-09-12. A fixed 8:5 recording also cannot fill a tall column, which is what produced the imbalance reported in the previous round.
- **Keep the tile grid and only rewrite the copy.** Rejected: the grid put four topics on one screen at small type, which is what "too dense" described.
- **Narrow the container instead of using a rail.** Rejected: it removes the empty space by removing the page width, and the owner asked for the space to be used.
- **Two-column FAQ.** Built in the previous round and dropped here. One list on the rail reads calmer, and a single `FaqList` keeps one `FAQPage` block.

## Consequences

- **`landing/home-one-grid.adr.md` is superseded** the day it was accepted, and marked rejected. `landing/home-loop-before-categories.adr.md` and `landing/home-information-hierarchy.plan.md` were already rejected under it.
- **Neither category term is an H2 any more.** Spec-driven development and context engineering appear in the H1, the meta title, the meta description, and as descriptive anchors in the agents section pointing at the two pillar pages. `product/seo-information-architecture` gives the head queries to those pillars and gives this page the combined brand-plus-category query, so the terms are still present, but this page's own ranking for the category phrases is a measurable risk. The owner accepted it on 2026-09-12. Watch impressions for both category queries in Search Console.
- **The hero no longer renders a shared descriptor**, so the clause in `messaging-alignment.rule.md` requiring `productCopy.expanded` in the home hero is retired, and `tests/site.spec.ts` asserts the new sentence in both languages instead.
- **Six component files are gone and five are new.** `home-grid-section` and the earlier per-topic sections are replaced by `rail-section`, `outcomes-section`, `documents-section`, `skills-section`, and `agents-section`.
- **`main` drops to 696 words**, from 823 in the grid version and 1081 before that.
- **The review verdict tokens moved into `cycle.tsx`.** The home page must name all three, so they live in the `leaves` field beside the prompt they belong to, and a rename in the review skill is caught in one file.
- **Grid and flex children carry `min-w-0`.** A no-wrap install command widened the hero track past the viewport at 768 pixels, clipped by the section's `overflow-hidden`. The build does not catch this; the browser test does, and it did.
- **Analytics is unchanged.** `home_hero_install`, `home_loop_how_to_use`, `home_faq`, and `star_cta_section` fire on the same surfaces.
