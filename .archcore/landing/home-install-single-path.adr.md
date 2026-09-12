---
title: "Home page presents one install path and no Plugin/CLI comparison"
status: accepted
tags:
  - "install"
---

## Context

The home page asked the reader to compare the plugin against the CLI and pick one, in three places:

1. The hero install block, a Plugin / CLI tab pair. The Plugin tab shipped `/plugin marketplace add archcore-ai/plugin` and `/plugin install archcore@archcore-plugins`, and nothing else.
2. `src/components/sections/cross-agent-section.tsx`, a two-card grid ("Plugin" against "CLI") under the line "Pick by the agent you run, not by a recommendation."
3. The header nav in `sticky-header.tsx`, whose first two items were "Plugin" and "CLI".

Two facts break that framing.

**The Plugin tab was the incomplete path.** The plugin invokes `archcore` from `PATH` and never fetches it. The plugin repository forbids a plugin-side CLI fetcher outright (`stack-and-tooling.rule.md` item 13; `plugin-as-mcp-enforcement-boundary.idea.md`: "no shared files, no version coupling, no auto-install logic"). A reader who copied those two commands onto a machine with no CLI got a plugin with no MCP server behind it.

**`archcore init` already installs both.** Its agent picker marks each selectable host "also installs the Archcore plugin", and the picker description reads: "A checked host is also the consent to install the Archcore plugin on it. Nothing is installed for a host you leave unchecked." (`cli/cmd/init.go`, `plugin-delivery.spec`). CLI v0.8.0 also added `archcore plugin install`, `update`, and `status`, and `archcore update` carries the plugin along.

The site also carried the inverse claim, which was never true: the home FAQ and the `index.html` FAQPage block said "The plugin runs on the CLI under the hood, so installing the plugin gets you both", and the `/how-to-use` install branch said "The CLI is auto-installed on first use if it's not already on PATH".

## Decision

Present Archcore on the home page as one product installed from one place.

1. The hero install block shows one path: the platform install script, then `archcore init`. It carries no Plugin / CLI tabs.
2. The only remaining tab pair in the block selects the platform (macOS / Linux against Windows), which is a fact about the reader's machine, not a product choice.
3. The per-host plugin install stays available as one small link under the block, pointing at `https://docs.archcore.ai/plugin/install/#install-per-host`.
4. The cross-agent section states the claim over one flat agent list. It does not compare the plugin with the CLI, and it does not ask the reader to pick. The component was `cross-agent-section.tsx` and is `agents-section.tsx` since 2026-09-12.
5. The capability difference stays in one sentence of prose: slash commands, skills, and guardrails run inside the four plugin hosts, and every other agent reaches the same context over MCP and session hooks.
6. The header nav carries "Docs" only. "Plugin" and "CLI" are removed from both the desktop nav and the mobile menu in `sticky-header.tsx`.
7. `/plugin` and `/cli` stay as pages. They stay in the footer nav (`site-nav.tsx`), the `index.html` static nav, and the `renderBody()` nav in `scripts/prerender-routes.mts`, which is where crawlers and readers now reach them. They own the entry-point split; the home page no longer restates it.
8. No surface claims that installing the plugin installs the CLI.

## Alternatives

- **Keep the tabs, add the curl line to the Plugin tab.** Fixes the accuracy bug and leaves the choice, which is the part that costs the reader attention. The choice is also no longer real: both tabs would open with the same first command.
- **Drop the plugin from the home page entirely.** Loses the four slash commands, which are the strongest thing the product does on its four best hosts.
- **Keep the two-card comparison and only fix the hero.** Leaves the page contradicting itself inside one scroll: one install above, two things to choose between below.
- **Keep Plugin and CLI in the header.** The header is the most repeated surface on the site, so it restates the split on every page, including the ones written to retire it.

## Consequences

- `#install-cli` and `#install-plugin` no longer exist. `#install` is the only home install anchor, and `ANCHORS.installCli` is removed from `src/lib/links.ts`. Nothing in this repository, the docs repository, or the content sub-build referenced the two removed hashes.
- The `home_hero_plugin_panel` and `home_hero_cli_panel` analytics surfaces are replaced by one `home_hero_install` surface. Plugin-tab copy events stop, and home hero copy volume collapses onto one surface. Recorded in `landing/analytics-event-taxonomy.doc.md`.
- `/plugin` and `/cli` lose their header links, so their internal-link weight drops to the footer, the static navs, and the per-host content pages. Watch their organic entries; the pages themselves are unchanged and still ranked on their own titles.
- `messaging-alignment.rule.md` loses three pinned items: the plugin-first tab order, the two install hashes, and the "Plugin = slash commands · CLI = one binary." shorthand. The shorthand slot now holds "One install. On Claude Code, Cursor, Codex CLI, and Copilot the plugin comes with it."
- The home page states the plugin-host set in prose rather than as a card, so a host status change now touches `agents-section.tsx` alongside `plugin-hosts-section.tsx` and `cli-agents-section.tsx`.
- `product/one-product-two-entry-points` is unaffected: the two entry points still exist and are still peers, and no copy ranks one over the other. What changed is that the install step and the header stopped being where the reader meets them.
- `/plugin` still shows its four host tabs without a CLI prerequisite step, so a reader who lands there from search still has to reach the page FAQ to learn that the CLI comes first. Left as is on 2026-08-27 by explicit decision; revisit if the page converts badly.
- The `/how-to-use` install branch still opens on a "Plugin or CLI?" choice, and branches 2 to 5 still carry the per-step Plugin / CLI toggle fixed by `landing/how-to-use-interactive-walkthrough.prd.md` §R2. The walkthrough is a guided tool rather than a positioning surface, so the split is left standing there; the false auto-install note inside it was corrected.
