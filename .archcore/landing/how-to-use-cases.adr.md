---
title: "/how-to-use is one init → plan → document → review loop, and the home How-it-works slot is that same loop"
status: accepted
tags:
  - "install"
---


## Context

`/how-to-use` was a five-branch wizard built to `landing/how-to-use-interactive-walkthrough.prd.md`. Three things broke it at once.

**Its central mechanic was the framing the site had just retired.** The PRD's §R2 required a per-step Plugin / CLI toggle on branches 2 to 5, with the plugin as the default and a "Why CLI here" blurb on the other side. Branch 1 was the Plugin-vs-CLI choice itself. `landing/home-install-single-path.adr.md` removed that choice from the home page, the cross-agent section, and the header, on the grounds that `archcore init` installs both and the reader has nothing to pick between. The walkthrough kept asking anyway.

**Its content described v0.7.** The PRD's branch plans call `/archcore:plan` a fixed cascade with a spec gate and a plan gate. In v0.8 the command computes a route: a small fix produces no documents, one capability gets a spec and a plan, a large initiative gets an umbrella PRD with one spec per capability. The walkthrough also carried a false claim ("The CLI is auto-installed on first use if it's not already on PATH") that the plugin repository forbids by design.

**A wizard hid the answer.** Five branches behind a picker meant a reader saw one path and never learned the other four existed, on the page whose whole job is showing what the product is for.

An intermediate version replaced the wizard with a first-run block and a catalog of six independent jobs. That fixed the toggle and the staleness, but it read as a feature menu: six things the product can do, in no relation to each other, with the install steps competing for the fold. The four commands are a loop, not a list, and nothing on the page said so.

**The home page had the same content twice.** Section 8 of the canonical sequence, "How it works", presented Capture → Connect → Apply → Evolve: four abstract verbs for the same four moves the loop shows concretely, one screen apart. Two passes at one mechanism read as two mechanisms.

The product's own surfaces supply the unifying frame. The plugin README: "Describe what you want in plain English. Archcore computes the route. The slash commands below are shortcuts to the same instruments." The CLI README opens its quick start the same way, with a sentence said to the agent. Plain English is the interface on every agent; the slash command is a shortcut on four hosts.

## Decision

One loop, shown on one piece of work, in one place per page.

1. `/how-to-use` is **the claim, the install pair, and four stages**. Nothing else. No picker, no branches, no tabs, no toggle.
2. The four stages are **`/archcore:init` → `/archcore:plan` → `/archcore:document` → `/archcore:review`**, in that order, numbered.
3. **Every stage shows the skill and the prompt together.** The slash command in mono at the top of the card; the sentence the reader says under it on the code surface. Showing one without the other misrepresents the product: the sentence works in any MCP-aware agent, the command is the shortcut on the four plugin hosts.
4. **All four stages run on one running example** (rate limiting for a public API), so step 4 visibly reads the documents steps 2 and 3 wrote. Keep the example consistent when editing; a stage that switches subject turns the loop back into a list.
5. **Every prompt is lifted verbatim from the trigger phrases in the plugin's own skills** (`plugins/archcore/skills/*/SKILL.md`, "When to use"), so a reader who copies one gets the stage the card describes. Content changes are checked against that file, never against another landing page.
6. **The command-free part is stated after the loop, not as a fifth stage.** Hooks bring the applicable spec and ADR to the agent between the four steps; a card for it would break the loop it sits inside.
7. **The stage list is always vertical, on both pages.** A four-column grid on the home page wrapped each prompt to four or five lines and destroyed the one thing the section exists to show, which is that the stages run in order.
8. **The home page's How-it-works slot is this loop.** `HowToUseCycleSection variant="home"` renders under the eyebrow "How it works" at `#how-it-works`, keeping the canonical slot and its anchor. `how-it-works-section.tsx` is deleted, and its two surviving claims (no new service to run; the context lives in the repo and travels with it through Git) moved into the loop's closing line.
9. **The header carries "How to use" as a plain nav link beside "Docs".** The accent-coloured CTA button and its promoted mobile card are gone: onboarding and reference are two reads of the same depth, and the button was the last element competing with the install block for the eye.

## Presentation update — 2026-09-09

The owner requested the article presentation used by the blog. @src/components/pages/how-to-use.tsx now uses the shared article grid, an outline, numbered sections, copyable installation commands, and a compact closing CTA. @src/content/how-to-use/cycle.tsx still supplies the same four stages to the guide and the home loop. The home presentation is unchanged. The old how-to-use-start-section.tsx opener is removed. @scripts/generate-og-image.mts now describes the current loop rather than the retired branching wizard.

## Alternatives

- **Keep the wizard, swap the content.** Preserves the `wizard_*` funnel and the interaction. Rejected: the state machine earns nothing once no step branches on a surface choice, and it hides five of six screens on the page meant to show what the product does.
- **The six-job catalog.** Shipped briefly. Rejected: it showed surface area without showing that the parts feed each other, and six cards plus a three-step first run is not the minimal page the material supports.
- **Four stages with no running example** (a generic prompt per stage). Rejected: without one subject carried through, "review" cannot point at the spec "plan" wrote, and the loop claim goes unproven.
- **Keep Capture → Connect → Apply → Evolve and the loop as separate sections.** Rejected: the abstract version's only advantage was brevity, and it bought that by describing the mechanism in verbs that name no command and produce no file.
- **Drop the page and point at `docs.archcore.ai`.** Rejected: the docs answer "how do I do X" for someone who already bought in. This page answers "what would I even use this for".

## Consequences

- `src/content/how-to-use/` is `cycle.tsx`, `types.ts`, and `index.ts`. The five branch modules and the six-job `cases.tsx` are gone. `how-to-use-wizard-section.tsx`, `how-to-use-cases-section.tsx`, and `how-it-works-section.tsx` are replaced by `how-to-use-start-section.tsx` and `how-to-use-cycle-section.tsx`.
- **The homepage sequence deviates from `product/surface-descriptors` at section 8.** The slot, its position, its anchor, and its claims are unchanged; what fills it is the concrete loop rather than the four abstract verbs. This is a deliberate local override, not drift. Anyone reconciling the landing against the global descriptor should read this ADR before "restoring" the old section.
- **`wizard_branch_started`, `wizard_step_viewed`, `wizard_mode_switched`, `wizard_completed`, and `wizard_restarted` stop firing** and are removed from `AnalyticsEventMap`. Any saved PostHog funnel over them ends at this date. The page reports `install_command_copied` on `how_to_use_install`, and the home section reports `cta_clicked` with `cta: "home_loop_how_to_use"`.
- **`header_how_to_use` and `mobile_menu_how_to_use` stop firing.** The header link is a plain nav item now, so it reports `nav_link_clicked` like any other.
- `landing/how-to-use-interactive-walkthrough.prd.md`, its plan, and its idea are superseded and marked rejected, per the convention in `landing/home-title-category-keyword.adr.md`.
- The prerendered `/how-to-use` body in `scripts/prerender-routes.mts` carries one paragraph per stage, each naming the command and quoting the prompt, and the `index.html` static body carries the same loop under an "How it works: the loop" H2. Both are what non-JS crawlers read, and neither has a build check.
- **The loop states product behavior in more detail than any other landing surface**, which makes it the first thing a release falsifies. On any change to the four skills, re-read the "When to use" sections against `cycle.tsx`.
- The install block on `/how-to-use` owns `#install`, because the shared star CTA links there from every page that renders it.
- The route meta changed twice in one day (`title`, `description`), so the SERP entry for `/how-to-use` changes. The OG variant in `scripts/generate-og-image.mts` still carries the walkthrough wording and is left for a later pass.
- The English copy went through the `humanizer` pass and the Russian through `humanizer-ru`, per `AGENTS.md`. The Russian keeps the formal «вы», including inside the quoted prompts addressed to an agent.
