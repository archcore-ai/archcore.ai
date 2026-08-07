---
title: "Frame /plugin page around the slash-command catalog instead of abstract pillars"
status: accepted
---

## Context

The earlier `/plugin` page led with abstract architecture pillars — typed documents, relation graph, MCP/hooks, git-native storage. These framed the product at the infrastructure layer, not the user-action layer. A first-time visitor could not quickly answer "what do I actually run, and when?" The page provided no command surface, no concrete workflow entry points, and no sense of daily cadence.

At the time of this decision the plugin had consolidated to exactly 7 slash commands (`/archcore:init`, `/archcore:context`, `/archcore:capture`, `/archcore:plan`, `/archcore:decide`, `/archcore:audit`, `/archcore:help`) with no subcommands or aliases — the complete public surface as of the v0.4.0 docs update.

**Superseded by the surface itself (updated 2026-08-07, plugin v0.7.0).** The command set is now **four**: `/archcore:init`, `/archcore:plan`, `/archcore:document`, `/archcore:review`. `capture` and `decide` folded into `document`; `audit` folded into `review` (`--drift`, `--deep`); `context` was deleted because injection became automatic; `help` was dropped. The framing decision below still holds — only the count and the names moved.

## Decision

Restructure the `/plugin` page so that the "what you get" section IS the command catalog, not an architecture diagram. The Pillars section contains:

- 3 spotlight cards highlighting the most common workflows. As of v0.7.0 these are: command-free automatic context injection (the strongest of the three — it is what the user gets without doing anything), `/archcore:document` for capturing decisions and existing code, and `/archcore:review` for catching drift before merge.
- A catalog listing every command with a one-line outcome and a "when to use" cue — 4 rows as of v0.7.0.

The section order for the page is fixed as: **Hero** (install widget with host tabs) → **Pillars** (command catalog) → **Showcase** (screenshot) → **Problem** → **FAQ**.

The Hero's Install widget is a Radix Tabs component with one tab per plugin host — as of v0.7.0: "Claude Code", "Cursor 2.5+", "Codex CLI 0.117+", "Copilot CLI" — each showing host-specific install commands. Copilot's tab renders two commands because both are required. This widget is the canonical install UI for the plugin entry point.

## Alternatives

**Keep the abstract pillar cards and add a command reference below them.** Rejected: layering commands on top of pillars does not fix the "I don't know what to run" problem — it adds length without replacing the confusing framing.

**Move the command catalog to a separate docs page and link from `/plugin`.** Rejected: the install-to-first-command journey requires the user to stay in context; bouncing to a docs site before they've installed breaks the funnel.

## Consequences

- Abstract architecture pillars are removed from `/plugin`. Any future design work on this page must preserve the command-catalog structure as the primary content.
- The homepage `HowWeSolveSection` retains its own action-card pattern (Compass / FileText / Gavel / Stethoscope) but stays agent-agnostic — no slash commands appear on the home page.
- `messaging-alignment.rule.md` remains the canonical source for copy decisions (hero text, CTA vocabulary, tab labels, and the current command/host matrix). This ADR records the structural rationale only.
- If the plugin's command surface changes (commands added, renamed, or removed), the Pillars section of `/plugin` must be updated in the same PR as the docs change. The section order is considered stable and should not change without a new ADR.
- **This coupling failed once.** The v0.6 → v0.7 consolidation shipped while `/plugin`, all five `/how-to-use` branches, both FAQ components, the prerender bodies, and `index.html` still named the five deleted commands. Nothing in the build catches a command that no longer exists, so the sweep is manual — `messaging-alignment.rule.md` §Enforcement now lists every layer to check.
- **Pinning a count in a page heading is a liability.** "The plugin is 7 slash commands" had to change in three places when the count moved. The heading now leads with the property that survives a refactor ("the everyday context needs none of them") rather than the arithmetic.
