---
title: "/how-to-use interactive walkthrough — implementation plan"
status: draft
---

## Goal

Ship the 5-branch interactive walkthrough on `/how-to-use` as specified in [[how-to-use-interactive-walkthrough]] (PRD). The implementation lands incrementally so each branch is reviewable on its own and the page is never broken — the placeholder wizard stays live until phase 2 lands a feature-complete replacement.

## Tasks

### Phase 0 — Content schema and runtime refactor

Set up the data shape and rewire the wizard so it consumes branch modules. The old placeholder steps are deleted in the same PR — Phase 1 lands the install branch alongside the refactor, so there is no transitional state to preserve.

1. Create `src/content/how-to-use/types.ts` defining `Surface` (`"plugin" | "cli"`), `ExampleVariant` (`command: string`, `caption: ReactNode`, `outputLines?: ReactNode[]`, `note: ReactNode`), `Choice` (`id`, `label`, `blurb?`, `example: ReactNode | ExampleVariant`), `Step` (`id`, `question: ReactNode`, `description?: ReactNode`, and either `choices: Choice[]` or `variants: Record<Surface, ExampleVariant>`), `Branch` (`id`, `label: MessageDescriptor`, `blurb: MessageDescriptor`, `intro?: ReactNode`, `steps: Step[]`, `supportsToggle: boolean`).
2. Create `src/content/how-to-use/index.ts` exporting `BRANCHES: Branch[]` (registry).
3. Refactor `src/components/sections/how-to-use-wizard-section.tsx`:
   - Add the branch-picker view as the entry state. Selecting a branch sets `activeBranchId` and starts the wizard.
   - Delete the existing local `STEPS` constant — Phase 1 lands the install branch in the same PR, so there is no transitional state to preserve.
   - Add a `mode: Surface` state (default `"plugin"`); render the segmented control above `ExamplePanel` only when `branch.supportsToggle && step.variants`.
   - Replace `ExamplePanel` with a thin renderer that accepts either a static `ReactNode` (legacy / branch 1) or an `ExampleVariant`. Cross-fade on toggle.
   - Restart now resets `activeBranchId`, `stepIndex`, `answers`, and `mode`.
4. Remove the "intentionally hardcoded English JSX" comment block from `how-to-use-wizard-section.tsx` once the content moves out.

### Phase 1 — Branch 1: How to install Archcore

The simplest branch — no toggle, all content is already aligned with the [[messaging-alignment]] install copy. Doubles as the smoke test for the new wizard runtime.

1. Create `src/content/how-to-use/install.tsx` with a 5-step Branch (`supportsToggle: false`): choose-path → plugin-host-pick → plugin-verify → cli-install → cli-verify. Step 1 is a `choices` step that gates the next step (selecting Plugin advances to step 2; selecting CLI jumps to step 4).
2. Add intra-branch routing: `Step` accepts an optional `next: (answer) => stepId` resolver. Keep the default linear advance when not specified. The terminal step on each path uses `next: () => undefined` so it doesn't fall through to the other path's steps in array order.
3. Pull install command strings from the same source the `/plugin` Install tabs use (re-export the constants or paste the same literals — but only the literals; do not duplicate JSX). Add a TODO header in `install.tsx` pointing at `messaging-alignment.rule.md`.
4. Add EN strings and run `npm run i18n:extract`; translate RU.

### Phase 2 — Branches 2–5: toggle-driven content

One branch per task; each lands behind the same runtime, with no further wizard component changes.

1. **`quick-start.tsx`** — 4 steps, `supportsToggle: true`. Examples per [[how-to-use-interactive-walkthrough]] PRD §R3 (Branch 2). Plugin side uses `/archcore:init` and `/archcore:document use PostgreSQL as the primary database`; CLI side uses the equivalent natural-language asks invoking `create_document` and `add_relation` via MCP.
2. **`idea-no-context.tsx`** — 5 steps, `supportsToggle: true`. Plugin side walks `/archcore:plan auth redesign` on the default `sdd` track (idea → PRD → spec → plan); CLI side walks explicit `create_document(type=spec)` + `add_relation(implements)`.
3. **`capture-existing.tsx`** — 4 steps, `supportsToggle: true`. Plugin side uses `/archcore:document src/notifications/` and `/archcore:document webhook delivery pipeline`; CLI side shows the natural-language equivalent plus the manual-type-override note (`type=spec` vs `type=doc` vs `type=guide`).
4. **`use-context.tsx`** — 3 steps, `supportsToggle: true`. Plugin side shows automatic injection — no command — (output: `billing-format.spec.md`, `refund-policy.rule.md`, `use-postgres.adr.md`) and `/archcore:review`; CLI side uses `search_documents` + `list_documents` and walks the audit logic by hand.

Each task ends with: extract strings, translate RU, run `npm run build`, smoke-test the branch end-to-end in the dev server.

### Phase 3 — Prerender body + final polish

1. Update `scripts/prerender-routes.mts` `ROUTES` entry for `how-to-use` so `body.paragraphs` describes the 5 branches in three short paragraphs (intro, plugin-vs-cli framing, what each branch delivers). Keep the existing `title`, `description`, and `ogImage`.
2. Verify the OG image still represents the page (current variant title is "How to use Archcore. / Interactive walkthrough.") — no regeneration unless we change the H1.
3. Run `npm run i18n:extract` once more to catch any drift, then `npm run build` and visually inspect `dist/how-to-use/index.html` meta and the rendered route in `npm run preview`.
4. Mobile sweep: branches 2–5 with the toggle on iPhone-12 and small Android viewport — toggle, example panel, footer buttons.

## Acceptance Criteria

- The placeholder `STEPS` array, `ExamplePanel`, and the "intentionally hardcoded English JSX" comment in `how-to-use-wizard-section.tsx` are gone.
- `src/content/how-to-use/` contains exactly 7 files: `types.ts`, `index.ts`, `install.tsx`, `quick-start.tsx`, `idea-no-context.tsx`, `capture-existing.tsx`, `use-context.tsx`. Branch modules are `.tsx` (not `.ts`) because they contain JSX. No transitional file remains after Phase 1 lands.
- The page renders the branch picker on first load; selecting a branch enters that branch's flow; back arrow on step 1 returns to the picker; Restart resets everything.
- Toggle (`Plugin` / `CLI`) appears on branches 2–5 only, defaults to `Plugin`, persists within a branch, resets on branch change or Restart.
- Every user-facing string is extracted into `src/locales/en/messages.po` and translated into `src/locales/ru/messages.po`. `npm run build` succeeds with no Lingui warnings.
- `dist/how-to-use/index.html` reflects the new body content from `prerender-routes.mts`.
- CLI example panels include a `Why CLI here:` blurb on every step where a toggle exists — no exceptions. None of them use the words "fallback" or "alternative".
- Plugin example panels use the [[messaging-alignment]] vocabulary ("decisions, rules, plans, and guides", "context layer", "runtime").

## Dependencies

- The Archcore plugin's 4-command surface as of v0.7.0 (`/archcore:init`, `/archcore:plan`, `/archcore:document`, `/archcore:review`), plus command-free automatic context injection — see [[plugin-page-action-framing]]. If a command name changes, the relevant branch content module must be updated in the same PR. This drifted once: the v0.6→v0.7 command removal shipped while all five branches still named the deleted commands.
- The CLI's MCP tool surface (10 tools) and MCP prompts (5 prompts: `product_track`, `architecture_track`, `standard_track`, `sources_track`, `iso_track`) — used directly in branches 2, 3.
- [[messaging-alignment]] tone, install commands, and per-page CTA vocabulary.
- [[i18n-workflow]] for the extract/translate cycle and `npm run i18n:extract` invocation.
- [[landing-tech-stack]] for the React 19 + Lingui + Tailwind + Radix + react-router stack assumptions; no new dependencies introduced by this plan.
- Existing scripts: `scripts/generate-og-image.mts` and `scripts/prerender-routes.mts` — modified, not extended with new infrastructure.
