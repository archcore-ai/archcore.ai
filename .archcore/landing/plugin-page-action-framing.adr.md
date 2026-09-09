---
title: "Frame /plugin page around the slash-command catalog instead of abstract pillars"
status: accepted
---

## Context

The earlier `/plugin` page led with abstract architecture pillars — typed documents, relation graph, MCP/hooks, git-native storage. These framed the product at the infrastructure layer, not the user-action layer. A first-time visitor could not quickly answer "what do I actually run, and when?" The page provided no command surface, no concrete workflow entry points, and no sense of daily cadence.

At the time of this decision the plugin had consolidated to exactly 7 slash commands (`/archcore:init`, `/archcore:context`, `/archcore:capture`, `/archcore:plan`, `/archcore:decide`, `/archcore:audit`, `/archcore:help`) with no subcommands or aliases — the complete public surface as of the v0.4.0 docs update.

**Superseded by the surface itself (updated 2026-08-07, plugin v0.7.0).** The command set is now **four**: `/archcore:init`, `/archcore:plan`, `/archcore:document`, `/archcore:review`. `capture` and `decide` folded into `document`; `audit` folded into `review` (`--drift`, `--deep`); `context` was deleted because injection became automatic; `help` was dropped. The framing decision below still holds — only the count and the names moved.

## Decision

The `/plugin` page leads with installation and the four-command loop. The owner requested a lighter page and removal of the outdated demo on 2026-09-09. The owner's follow-up requires the structure of `/how-to-use/` and the Blog/Learn CTA. This revision retains the command sequence within that article structure.

1. The page uses the same article layout as `/how-to-use/`: left-aligned title and introduction, installation with host tabs, command list, host requirements, migration, FAQ, and the shared Blog/Learn closing CTA.
2. The command list shows `init → plan → document → review` with one concrete outcome per command.
3. The command introduction states that readers can request the same actions in plain language.
4. Automatic context copy distinguishes delivery on supported hosts from access over MCP.
5. The page omits the retired demonstration images or abstract problem cards.
6. The install widget states the CLI prerequisite before its four host tabs.
7. Each host tab includes all steps required by that host's current installation instructions.
8. A localized outline sits in the right rail on desktop and links to the article sections.
9. @src/components/guide-page-layout.tsx supplies the structure for `/how-to-use/`, `/cli/`, and `/plugin/`.
10. @src/components/closing-cta.tsx supplies the Blog/Learn CTA for both product guides. The walkthrough retains its GitHub closing action.

@src/components/pages/plugin.tsx owns the sequence. @src/components/sections/plugin-pillars-section.tsx owns the command list. @src/components/sections/plugin-hero-section.tsx owns installation.

The owner's next clarification on 2026-09-09 defines Archcore as one product. The component page title is "Archcore Plugin for AI agents". Its introduction explains skills that use the CLI and the same project documents. The CLI guide is titled "Archcore CLI". Neither component carries an independent product slogan; the single-product rule in `messaging-alignment.rule.md` governs both pages.

## Alternatives

**Keep the abstract pillar cards and add a command reference below them.** Rejected: layering commands on top of pillars does not fix the "I don't know what to run" problem — it adds length without replacing the confusing framing.

**Move the command catalog to a separate docs page and link from `/plugin`.** Rejected: the install-to-first-command journey requires the user to stay in context; bouncing to a docs site before they've installed breaks the funnel.

## Consequences

- Abstract architecture pillars are removed from `/plugin`. Any future design work on this page must preserve the command-catalog structure as the primary content.
- The homepage uses the shared four-stage loop under `landing/how-to-use-cases.adr.md`. Its presentation is independent of the compact plugin command list.
- `messaging-alignment.rule.md` remains the canonical source for copy decisions (hero text, CTA vocabulary, tab labels, and the current command/host matrix). This ADR records the structural rationale only.
- If the plugin's command surface changes (commands added, renamed, or removed), the Pillars section of `/plugin` must be updated in the same PR as the docs change. `messaging-alignment.rule.md` governs future structural revisions.
- **This coupling failed once.** The v0.6 → v0.7 consolidation shipped while `/plugin`, all five `/how-to-use` branches, both FAQ components, the prerender bodies, and `index.html` still named the five deleted commands. Nothing in the build catches a command that no longer exists, so the sweep is manual — `messaging-alignment.rule.md` §Enforcement now lists every layer to check.
- **Pinning a count in a page heading is a liability.** "The plugin is 7 slash commands" had to change in three places when the count moved. The section heading is "What the plugin adds". Counts belong in the command list.