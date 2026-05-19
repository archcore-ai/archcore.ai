---
title: "Interactive walkthrough for /how-to-use with plugin/cli toggle"
status: accepted
---

## Idea

Replace the placeholder wizard on `/how-to-use` with a real 5-branch interactive walkthrough that shows Archcore "in motion" before install. The user picks one of five intent paths on the first screen, then steps through a short flow (3–6 steps) that ends in a concrete install or command to try.

Five branches on the entry screen:

1. **How to install Archcore** — install-path picker (Plugin vs CLI), then host-specific steps and a verification screen.
2. **Quick start in your project** — first useful action after install: `/archcore:init` for plugin users; an MCP-triggered "create my first ADR" prompt for CLI users.
3. **I have an idea, no context yet** — `/archcore:plan` cascades (product/feature) on the plugin side; MCP `product_track` prompt or natural-language "draft a PRD for X" on the CLI side. Shows idea → PRD → spec → plan progression.
4. **Document existing code** — `/archcore:capture` on the plugin side; explicit `create_document(type=spec|guide|rule|doc)` flow on the CLI side, picking the right type by hand.
5. **Solve tasks with existing context** — `/archcore:context` before editing + `/archcore:audit` after, both on the plugin side; the same outcomes via MCP `search_documents` + `list_documents` for the CLI side.

Branches 2–5 carry a per-step **Plugin / CLI toggle** in the step header. Toggling swaps the example panel (command, expected output, "why this is smarter"/"why this is finer" blurb) but keeps the step's question and progress unchanged. The toggle choice persists across the branch so the user reads one consistent path, but can flip to compare at any step. Branch 1 has no toggle — picking Plugin vs CLI is the branch itself.

Each branch uses topic-tailored examples to avoid generic-feeling content:

- Branch 2: `/archcore:decide use PostgreSQL as the primary database` (matches the canonical docs example).
- Branch 3: `/archcore:plan auth redesign`.
- Branch 4: `/archcore:capture src/notifications/` and `/archcore:capture webhook delivery pipeline`.
- Branch 5: `/archcore:context src/billing/` showing it pulls a billing spec, refund rule, and Postgres ADR; then `/archcore:audit --drift` afterwards.

## Value

- **First-time visitors get a working mental model before install.** The current `/how-to-use` placeholder shows two install options but nothing about what daily use looks like. A real walkthrough is the missing link between "what is Archcore" (`/`) and "how do I install it" (`/plugin`, `/cli`).
- **The plugin/CLI toggle teaches the positioning rule by example.** The [[messaging-alignment]] rule frames plugin and CLI as one product with two entry points — runtime vs core. Side-by-side toggleable examples make that abstract framing concrete: same outcome, two surfaces, plugin is smarter / CLI is finer.
- **Reduces "what should I run?" support load.** Today the answer lives in the docs site; a visitor has to click out to find it. The walkthrough collapses that path into one page.
- **SEO and meta coverage.** The route already has prerendered HTML, an OG image, and meta in [[messaging-alignment]]; richer body content compounds the SEO value already paid for.
- **Doubles as a referenceable URL inside the docs and from external posts** ("see the interactive walkthrough on archcore.ai/how-to-use") without needing a video.

## Possible Implementation

- **Content moves out of `how-to-use-wizard-section.tsx`** into typed TypeScript modules under `src/content/how-to-use/`: one module per branch (`install.ts`, `quick-start.ts`, `idea-no-context.ts`, `capture-existing.ts`, `use-context.ts`) plus an `index.ts` branch registry. Each module exports a `Branch` value: `{ id, title, intro, steps: Step[] }`. `Step` carries `id`, `question`, optional `description`, and either `choices: Choice[]` (branching/selection) or `variants: { plugin, cli }` (toggle-driven).
- **The wizard component becomes a branch router.** First screen lists the 5 branches; selecting one renders that branch's steps. Back/Next/Restart and the step indicator are unchanged. A persistent `mode: "plugin" | "cli"` state controls the toggle on steps 2–5 branches; branch 1 ignores it.
- **`ExamplePanel` evolves to `PluginExample` / `CliExample`** (or a shared `ExamplePanel` with a `surface` prop) so the toggle can swap content without re-mounting the step. Keep the cream code-surface styling from the current placeholder.
- **i18n via Lingui** for every step `question`, `description`, button labels, example captions, and footnotes — following the existing macro-based pattern from [[i18n-workflow]].
- **The branch registry feeds the URL.** Deep-linking (`/how-to-use#install`, `/how-to-use#use-context`) is optional polish but cheap to add.

## Risks and Constraints

- **Content sprawl.** Five branches × ~4 steps × two variants (for 2–5) = roughly 36 distinct example panels, each with i18n strings. Risk of unmaintained drift against the docs site. Mitigation: keep examples short, link to docs site for depth, and put a comment header in each content module pointing at the canonical docs page.
- **Copy duplication vs `/plugin` and `/cli`.** The walkthrough must not become a third source of truth for install commands. Mitigation: branch 1 reuses the exact install commands from the [[messaging-alignment]] rule's per-page heroes section; later branches show command shapes only, not full install flows.
- **Mobile UX.** Per-step toggle + example panel + step indicator can get tall on small screens. Mitigation: stack the toggle above the example, keep example panels short (≤4 lines of command + ≤2 lines of caption).
- **Translation burden.** Russian translations must follow the same volume of strings — landing has both `en` and `ru` locales today. Mitigation: extract strings as soon as a branch is content-complete to avoid one big batched translation at the end.
- **Toggle "honesty" risk.** For some steps the CLI version is genuinely worse (more typing, no auto-type-picking). Don't hide that — name it. The blurb under each example calls out the trade-off in one line.
- **Tone alignment with [[messaging-alignment]].** CLI must never be framed as "fallback" or "alternative-only". Each CLI example needs a blurb that reads as legitimate ("finer control", "any agent via MCP"), not consolation.
