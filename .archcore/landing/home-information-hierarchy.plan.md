---
title: "Home page rebuild — new section order, mechanism-first category sections, crawler parity"
status: draft
---

## Goal

Execute `landing/home-loop-before-categories.adr.md` on `archcore.ai/`. Move the loop above the two category sections, rewrite those two sections from definition to mechanism, add the differentiation the page has never carried, and bring the static crawler body to parity with what the browser renders.

Section count stays at eight. Every pinned string, anchor, and structured-data block stays as it is.

## Status

**Executed 2026-08-31, not committed.** All six phases are done and verified against a production build. Three findings changed the plan as written; they are recorded under Tasks and in the acceptance criteria rather than quietly dropped.

## Tasks

### Phase 1 — order [DONE]

1. [x] Reorder the section list in `@src/pages/landing.tsx` to hero, problem, Before/After, loop, context engineering, spec-driven, git-native, cross-agent.
2. [x] Move `HowToUseCycleSection variant="home"` out of the lazy `Suspense` block, since slot 4 is too early for an empty gap.
3. [x] **Reverted.** The two category sections were moved into the lazy block and moved back. A lazy section does not exist when the browser resolves a hash on a cold load, so `/#context-engineering` and `/#spec-driven-development` stopped scrolling, which the eager versions did correctly. Their chunks were 2.6KB each against a 333KB entry. FAQ and the star CTA stay lazy as before.
4. [x] Re-derive the page and band backgrounds. `git-native-section` lost its band, `cross-agent-section` gained one, so the alternation runs band, page, band, page, band from slot 4.
5. [x] Rewrite the block comment in `landing.tsx` to describe the new sequence and cite the ADR.

### Phase 2 — copy [DONE]

6. [x] Add the review verdict to the loop's closing copy, home variant only. Verified against `plugins/archcore/skills/review/SKILL.md` before writing: `spec-wrong`, `code-wrong`, `ok` are the tokens the skill emits and groups findings by.
7. [x] Cut the problem list from five failures to three.
8. [x] Replace the five-property definition list in `context-engineering-section.tsx` with the pre-edit injection moment. Claim verified against `cli/.archcore/integrations/agent-hooks-integration.doc.md`: `PreToolUse` "injects the documents that constrain the file being edited".
9. [x] Compress the five properties into one supporting line.
10. [x] Reduce the harness-engineering paragraph to the one sentence carrying the link, anchor text unchanged.
11. [x] Reframe the spec-driven support copy to where the spec lives after the feature ships. H2 unchanged.
12. [x] Add the differentiation sentence, sourced from the competitive framing table in `product/surface-descriptors`. "Workflow" not used.
13. [x] **No change made.** `git-native-section.tsx` is a heading, two sentences, five cards, and a link. There was no supporting prose to trim, and cutting a claim card to satisfy the step would have removed an argument.
14. [x] Run the `humanizer` skill over the changed English strings. Three hits, all rewritten: "No command, no paste, no reminder." (rule of three plus tailing negation), "a verdict per finding, not a summary" (tailing negation), "The work between them has none." (staccato reversal).

### Phase 3 — crawler layers [DONE]

15. [x] Reorder the H2 blocks in the static body of `@index.html` to match the rendered sequence.
16. [x] Add a Before/After block to that static body in its rendered position, written as prose.
17. [x] Mirror the phase-2 copy changes into the matching static paragraphs.
18. [x] Verify the visible FAQ and the `FAQPage` JSON-LD still match question for question and in order. Six questions, unchanged, in the same order.
19. [x] Check `@scripts/prerender-routes.mts` for per-route paragraphs repeating changed home claims. One "Capture decisions, standards, and plans" line on `/plugin`, which is plugin copy and not a home claim. No change needed.
20. [x] Confirm `@scripts/generate-og-image.mts` needs no change. No hero string moved; `git status` shows `public/*.png` unchanged after the build.
21. [x] **Added.** The static body now links `/context-engineering/`, `/spec-driven-development/`, and `/git-native-context/`. It carried only the harness link before, so three pillar links existed in the SPA and in no crawler-visible layer of the home page.

### Phase 4 — translation [DONE]

22. [x] Run `npm run i18n:extract`.
23. [x] Translate 14 new `msgstr` entries with the formal «вы», reusing the catalog's established wording for the harness sentence and the spec-is-part-of-context clause.
24. [x] Run `humanizer-ru` over the new Russian. Two hits: «а не просто X» (hard ban, the `не просто X, а Y` family) and a third caption repeating the same «X, который/которому/которое» opening.
25. [x] Remove three obsolete empty entries left by the English humanizer rewrite. Rewriting a string after extraction orphans its translation; the catalog reported 3 missing until they were dropped.
26. [x] Run `npm run i18n:compile`. English 810, Russian 811, **0 missing**.

### Phase 5 — rule sync [DONE]

27. [x] Replace the section-order table in `@.archcore/messaging-alignment.rule.md`.
28. [x] Rewrite the notes under the table so both describe the new sequence.
29. [x] State that the sequence now overrides `product/surface-descriptors` in order, citing the ADR.
30. [x] Add the differentiation sentence and the mechanism-over-definition example to the rule's Examples, plus four new Bad entries.
31. [x] Add the review verdict tokens, the Copilot pre-write caveat, the humanizer ordering rule, and a section-order enforcement item.

### Phase 6 — verification [DONE]

32. [x] `npm run check`: 0 errors, 3 pre-existing warnings (`use-locale.tsx` fast-refresh, two generated locale files).
33. [x] `npm run build`: clean. Only the pre-existing empty `alternatives` collection warning.
34. [x] Rendered section order and background alternation confirmed in the built `dist/` through a real browser, EN and RU.
35. [x] `dist/index.html` static H2 order matches `landing.tsx`, Before/After included.
36. [x] 390px and 1280px: zero horizontal overflow, no element extending past the viewport.
37. [x] Russian render: correct order, zero informal «ты» in shipped strings.
38. [x] Section anchors resolve from a cold load.

## Findings

- **Anchor regression, found and fixed in flight.** Making the two category sections lazy broke `/#context-engineering` and `/#spec-driven-development` on a cold load. Caught by the anchor check, not by the build; nothing in the toolchain relates a `Suspense` boundary to a hash target.
- **Pre-existing and out of scope: `?lang=` plus a hash does not scroll.** `/?lang=en#git-native` lands at scroll 0 on a section that was eager before and after this change, so the locale query parameter resets the scroll position independently of section order. Reproduce before fixing; do not attribute it to this rebuild.
- **The page did not get shorter.** Home-section copy went from 2041 to 2095 translatable words, **+54 (+2.6%)**: spec-driven +32 (differentiation), the loop +28 (verdict), context engineering +8, problem -14. The static crawler body went from 807 to 1020 words because it gained the Before/After section it never had. The original acceptance criterion asked for a shorter page and was wrong: the defect was sequence, and two of the three additions are content the owner explicitly approved.

## Acceptance Criteria

- [x] `landing.tsx` renders the eight sections in the ADR's order, and the block comment cites the ADR.
- [x] The loop is the fourth section and states the three review verdicts.
- [x] The context-engineering section leads with the pre-edit injection and names harness engineering once, with the link.
- [x] The spec-driven section states where the spec lives after the feature ships and carries the differentiation sentence.
- [x] "Workflow" appears nowhere in the changed positioning copy.
- [x] Both category H2 strings, both section anchors, and both pillar anchor texts are unchanged.
- [x] Hero eyebrow, H1, subhead, supporting promise, install block, and works-with strip are unchanged.
- [x] `dist/index.html` static body carries the same eight sections in the same order as the SPA, including Before/After.
- [x] `SoftwareApplication` and `FAQPage` JSON-LD are unchanged, and the visible FAQ still mirrors the `FAQPage` block.
- [x] The RU catalog has zero missing entries and no informal address.
- [x] Every home section anchor resolves from a cold load without `?lang=`.
- [x] The entry bundle grew by 3.8KB (333410 to 337244 bytes, +1.1%), which is the cost of the loop and the two category sections being eager.
- [ ] **Replaced.** "The page has fewer words than before" is retired as a criterion. The measured change is +54 words of section copy; see Findings.

## Dependencies

- `landing/home-loop-before-categories.adr.md` is the decision this plan executes.
- `messaging-alignment.rule.md` phase 5 lands in the same pull request as phase 1, per the rule's enforcement section.
- `landing/how-to-use-cases.adr.md` governs the loop's content. This plan moved the section and added one fact; it did not restructure the stages.
- `landing/home-install-single-path.adr.md` is unchanged and still binds the hero.
- `product/surface-descriptors` and `product/seo-information-architecture` are read-only global sources. The deviation is recorded locally in the ADR. If the global repository is writable, its Homepage section sequence table should be updated to match, or the next agent reconciling the two will read drift.
- `/alternatives/` comparison pages are the follow-on for the intent the differentiation sentence creates. Tracked in `landing/seo-content-backlog.doc.md` and `landing/seo-growth.plan.md` A8, not here.
