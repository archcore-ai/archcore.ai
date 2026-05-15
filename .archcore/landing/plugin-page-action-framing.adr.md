---
title: "Frame /plugin page around 7 slash commands instead of abstract pillars"
status: accepted
---

## Context

The earlier `/plugin` page led with abstract architecture pillars — typed documents, relation graph, MCP/hooks, git-native storage. These framed the product at the infrastructure layer, not the user-action layer. A first-time visitor could not quickly answer "what do I actually run, and when?" The page provided no command surface, no concrete workflow entry points, and no sense of daily cadence.

The plugin recently consolidated to exactly 7 slash commands (`/archcore:init`, `/archcore:context`, `/archcore:capture`, `/archcore:plan`, `/archcore:decide`, `/archcore:audit`, `/archcore:help`) with no subcommands or aliases. This is the complete, stable public surface as of the v0.4.0 docs update.

## Decision

Restructure the `/plugin` page so that the "what you get" section IS the command catalog, not an architecture diagram. The Pillars section now contains:

- 3 spotlight cards highlighting the most common workflows (`/archcore:context` for daily grounding, `/archcore:decide` for capturing decisions, `/archcore:audit` for reviewing alignment).
- A 7-row catalog listing every command with a one-line outcome and a "when to use" cue.

The section order for the page is fixed as: **Hero** (install widget with 3 host tabs) → **Pillars** (7 commands) → **Showcase** (screenshot) → **Problem** → **FAQ**.

The Hero's Install widget is a Radix Tabs component with tabs for "Claude Code", "Cursor 2.5+", and "Codex CLI 0.117+", each showing host-specific install commands. This widget is the canonical install UI for the plugin entry point.

## Alternatives

**Keep the abstract pillar cards and add a command reference below them.** Rejected: layering commands on top of pillars does not fix the "I don't know what to run" problem — it adds length without replacing the confusing framing.

**Move the command catalog to a separate docs page and link from `/plugin`.** Rejected: the install-to-first-command journey requires the user to stay in context; bouncing to a docs site before they've installed breaks the funnel.

## Consequences

- Abstract architecture pillars are removed from `/plugin`. Any future design work on this page must preserve the command-catalog structure as the primary content.
- The homepage `HowWeSolveSection` retains its own action-card pattern (Compass / FileText / Gavel / Stethoscope) but stays agent-agnostic — no slash commands appear on the home page.
- `messaging-alignment.rule.md` remains the canonical source for copy decisions (hero text, CTA vocabulary, tab labels). This ADR records the structural rationale only.
- If the plugin's command surface changes (commands added, renamed, or removed), the Pillars section of `/plugin` must be updated in the same PR as the docs change. The section order is considered stable and should not change without a new ADR.
