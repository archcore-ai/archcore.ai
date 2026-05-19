---
title: "/how-to-use interactive walkthrough — product requirements"
status: accepted
---

## Vision

`/how-to-use` is the page a visitor lands on when they have heard about Archcore but cannot picture what daily use looks like. Today the route renders a hero and a 2-step placeholder wizard with hardcoded English content. This PRD turns it into a real **5-branch interactive walkthrough** with a per-step Plugin / CLI toggle on branches 2–5 — short enough to finish in under three minutes, concrete enough that the visitor knows what to type after install.

Implements the [[how-to-use-interactive-walkthrough]] idea.

## Problem Statement

A first-time visitor today has three signals on `archcore.ai`:

1. The home page tells them *what* Archcore is (structured context, decisions/rules/plans/guides).
2. The `/plugin` and `/cli` pages tell them *how to install* each entry point.
3. Nothing on the marketing site tells them what their *daily loop* will look like once installed — and specifically how the plugin's slash-command experience differs from the CLI's MCP-driven experience.

The current `/how-to-use` wizard has a comment in source (`how-to-use-wizard-section.tsx:26-31`) acknowledging the content is a placeholder. Two steps with two choices each is not enough to model the real product surface (7 plugin commands, 10 MCP tools, 5 MCP prompts, four document tracks).

Result: visitors bounce to the docs site (`docs.archcore.ai`) or to GitHub to figure out what to actually do, and the [[messaging-alignment]] rule's "one product, two entry points" framing stays abstract.

## Goals and Success Metrics

**Primary goals:**

- A visitor unfamiliar with Archcore can finish any one branch in **under 3 minutes** and come out able to name (a) which entry point to install, (b) one command they will run first, (c) what document type that command produces.
- The plugin/CLI toggle on branches 2–5 makes the [[messaging-alignment]] dual-entry-point framing tangible: same outcome, two surfaces, plugin recommended but CLI legitimate.
- The walkthrough does not become a third source of truth — install commands and copy stay anchored in [[messaging-alignment]] and the docs site, not duplicated in the wizard.

**Success signals (qualitative, since the landing site has no analytics gate):**

- A new contributor can read the branch content modules and explain Archcore back without opening the docs.
- The walkthrough survives a docs change (new command, new flag) with edits limited to one branch module — not scattered across components.
- Russian and English copy stay in lockstep through one `npm run i18n:extract` pass per branch.

**Non-goals:**

- No deep-link routes per branch in v1 (URL fragments are acceptable polish later).
- No interactive code execution; every example is read-only copy.
- No replacement for the docs site — the walkthrough sends users to docs for depth.
- No analytics instrumentation in this PRD scope.

## Requirements

### R1 — Entry screen: branch picker

The first screen replaces today's "Which AI coding agent do you use most?" placeholder with a vertically-stacked list of five branches, each a card with a one-line label and a one-sentence blurb:

1. **How to install Archcore** — "Pick the right entry point and walk through install + verification."
2. **Quick start in your project** — "Your first useful command after install, on a fresh repo."
3. **I have an idea, no context yet** — "Turn a plain-English idea into PRD → spec → plan."
4. **Document existing code** — "Capture what already lives in code so the agent stops re-explaining."
5. **Solve tasks with existing context** — "Load the right rules and ADRs before editing, and audit after."

Selecting a branch routes into that branch's steps; the back arrow on step 1 of any branch returns to the picker. The picker is not a "step" in the indicator — branch step counts start at 1.

### R2 — Plugin / CLI toggle (branches 2–5 only)

Every step on branches 2–5 carries a two-position toggle (`Plugin` / `CLI`) in the step header. Toggling re-renders the example panel for that step but does not advance the step or reset answers. The toggle's current value persists across all steps within a branch and resets when the user returns to the picker or restarts.

**Plugin is the default.** This is required to match the recommended-path framing in [[messaging-alignment]]. The CLI side must not be framed as "fallback" — each CLI example panel includes a one-line `Why CLI here:` blurb stating the legitimate reason ("finer control", "works with any MCP agent", "scriptable in CI").

Branch 1 ("How to install Archcore") **does not have a toggle**. The Plugin-vs-CLI choice is the branch itself; rendering a toggle inside it would be redundant and confusing.

### R3 — Branch content

Each step within a branch declares: an `id`, a `question` (the H2 the user reads), an optional `description` (one sentence under the question), and either `choices` (for branching like "which host?") or `variants: { plugin, cli }` (for the toggle). Variants are objects with `command`, `caption`, `outputLines` (optional, for showing expected output), and `note` (one-line blurb).

Concrete step plans per branch:

**Branch 1 — How to install Archcore (no toggle):**

1. *Which path?* — Two choices: Plugin (recommended) / CLI. Each renders the [[messaging-alignment]]-aligned one-paragraph blurb on "experience layer vs core" plus an Install card.
2. *Plugin path:* host picker — Claude Code / Cursor / Codex CLI. Each tab shows the host-specific install command (the same commands rendered by the `/plugin` Install widget; copy lives in [[messaging-alignment]]). A note reminds the user the CLI installs as a transitive prerequisite.
3. *Plugin path:* verification — restart the host, run `/archcore:help`, expect the 7-command list. Link to plugin troubleshooting.
4. *CLI path:* install via curl / PowerShell + `archcore init`. Show what `init` does (creates `.archcore/`, registers MCP, installs hooks).
5. *CLI path:* verification — open the agent, ask "what Archcore documents exist?", expect a "none yet" answer. Link to CLI troubleshooting.

**Branch 2 — Quick start in your project (toggle):**

1. *What's the fastest first action?* — Plugin variant: `/archcore:init` and the bootstrap (stack rule, run-the-app guide, hotspot capture candidates). CLI variant: ask the agent "create an ADR about using PostgreSQL as our primary database", showing the MCP `create_document` call.
2. *Record a real decision.* — Plugin: `/archcore:decide use PostgreSQL as the primary database`, mention the optional `adr → rule → guide` cascade. CLI: same outcome via natural language ("create an ADR for choosing PostgreSQL, then propose a rule and a migration guide based on it").
3. *Check what was created.* — Plugin: visualize the `.archcore/` listing and the `add_relation` chain. CLI: same via `archcore status` + asking the agent to list relations.
4. *Wrap-up.* — Single CTA to install (anchored to `/plugin` or `/cli` depending on the toggle's last value).

**Branch 3 — I have an idea, no context (toggle):**

1. *Capture the idea.* — Plugin: `/archcore:plan auth redesign` with `--track product` (default). CLI: MCP `product_track` prompt or natural language "draft a PRD for an auth redesign idea".
2. *Move from idea to PRD.* — Plugin: same `/archcore:plan` cascade pausing at PRD step; show the gate. CLI: ask the agent "draft a PRD that implements the auth-redesign idea", call out the manual `add_relation(implements)` step.
3. *Formalize with a spec.* — Plugin: `/archcore:plan --track feature` swap, or `/archcore:decide` continuation cascade. CLI: ask for a spec via `create_document(type=spec)` and link with `add_relation`.
4. *Land on a plan.* — Plugin: final step of the cascade. CLI: `create_document(type=plan)` + `add_relation(implements)`.
5. *Wrap-up.* — CTA to docs/plan reference.

**Branch 4 — Document existing code (toggle):**

1. *Pick a module to capture.* — Plugin: `/archcore:capture src/notifications/`, agent picks `spec` and asks for approval. CLI: ask "create a spec for the notifications module" — agent infers `type=spec`, drafts via MCP; show the user that on the CLI side they can override the type explicitly (`type=doc`, `type=guide`).
2. *Capture a cross-cutting pipeline.* — Plugin: `/archcore:capture webhook delivery pipeline`. CLI: same via natural language; show how to ask for `type=spec` explicitly to skip the agent's heuristic.
3. *Write the rule.* — Plugin: `/archcore:decide` continuation offering `adr → rule → guide`. CLI: ask the agent to "turn this spec into a rule + how-to guide" and call `add_relation(implements)` and `add_relation(related)`.
4. *Wrap-up.* — Link to `/concepts/document-types/`.

**Branch 5 — Solve tasks with existing context (toggle):**

1. *Load context before editing.* — Plugin: `/archcore:context src/billing/`, output panel shows `billing-format.spec.md`, `refund-policy.rule.md`, `use-postgres.adr.md`. CLI: ask "what rules and decisions apply to `src/billing/`?", agent uses `search_documents` + `list_documents`.
2. *Audit after your change.* — Plugin: `/archcore:audit --drift`. CLI: ask "audit `.archcore/` for stale docs and drift" — agent walks `list_documents` + relations and reports.
3. *Wrap-up.* — Link to `/plugin/skills/#archcorecontext` and `#archcoreaudit`.

### R4 — Content shape and code organization

Content lives in `src/content/how-to-use/` as TypeScript modules — one per branch — and an `index.ts` registry. Each module exports a `Branch` value with `id`, `title` (via `msg`), `intro` (via `msg`), and `steps: Step[]`. The wizard component imports the registry and routes by `branch.id`.

The current `STEPS` array in `how-to-use-wizard-section.tsx` is deleted as part of this work; the file now contains only the wizard runtime, not content.

### R5 — Internationalization

Every user-facing string (branch label, step question, description, button label, example caption, note, blurb) is wrapped in `Trans` / `msg` per [[i18n-workflow]]. Strings extracted into `messages.po` (en + ru) before merging. The hardcoded English comment block in `how-to-use-wizard-section.tsx:26-31` is removed when content moves to TypeScript modules.

### R6 — Meta and OG

`scripts/prerender-routes.mts` and `scripts/generate-og-image.mts` entries for `/how-to-use` already exist. Update the `body.paragraphs` in `prerender-routes.mts` to reflect the 5-branch structure (one sentence per branch is enough). Keep the existing OG variant; no regenerate needed unless the H1 changes.

### R7 — Visual and motion

Match the cream code-surface example panel from the current placeholder. Toggle is a 2-button segmented control above the example panel — left-active for Plugin (default), right-active for CLI. Toggling animates the example panel content cross-fade (200ms) without re-mounting the surrounding step shell. Step indicator dots remain.

### R8 — Tone constraints (anchored to [[messaging-alignment]])

- Plugin examples lead with the slash command and a single-line outcome statement.
- CLI examples lead with the natural-language ask or `archcore` shell command and a single-line outcome statement. Where the CLI requires extra steps the plugin handles automatically (manual `add_relation`, manual type selection), call them out as **finer control**, not as friction.
- Never use "fallback" or "alternative" framing for the CLI.
- Use the [[messaging-alignment]] vocabulary: "decisions, rules, plans, and guides"; "context layer"; "runtime" vs "core".
