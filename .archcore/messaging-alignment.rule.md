---
title: "Landing site messaging alignment with positioning"
status: accepted
---

## Rule

All user-facing copy on the landing site MUST align with the canonical messaging below. This document is the single source of truth for landing copy across **all pages** — `/`, `/plugin`, `/cli`, `/teams/getting-started`, `/privacy` — and across all meta surfaces (OG cards, Twitter cards, prerendered route HTML, the OG image generator).

**Primary phrase (Hero H1 / meta title):** "Turn your repository into structured, machine-readable context."

**Secondary phrase (supporting copy / subhead):** "Archcore gives AI agents the architecture, rules, and decisions they need to work correctly in your codebase." (canonical) or the shorter hero variant: "So AI agents can follow your architecture, rules, and decisions — instead of guessing."

**Short tagline (footer / OG subtitle):** "Archcore turns your repository into structured, machine-readable context — so AI agents understand your architecture, rules, and decisions."

## Product framing

Archcore is one product with two entry points:

- **Plugin** — recommended runtime for Claude Code and Cursor. Best day-to-day experience. Requires the CLI under the hood.
- **CLI** — core context layer (with MCP and hooks). Direct, scriptable, and the way to integrate with a wider set of agents.

All copy must treat Plugin as the default recommended path while keeping the CLI a prestigious, fully supported alternative. Never imply the two are separate products or that CLI is a fallback.

### Vocabulary preferences

Use: "structured context", "machine-readable context", "repo context", "project context", "context layer", "entry point", "recommended path", "core", "runtime", "experience layer".

Use for document surface: "decisions, rules, plans, and guides" (not "experience", not "memory").

Avoid as primary framing: "shared architectural memory", "system context platform", "context engineering platform".

### Copy hierarchy (home `/`)

- **Hero H1:** Primary phrase
- **Hero subhead:** Secondary phrase (canonical or short hero variant)
- **Meta title / OG title / Twitter title:** Primary phrase
- **Meta description / OG description / Twitter description:** Secondary phrase + short tagline
- **Footer tagline:** Short tagline
- **Section copy about documents:** Use "decisions, rules, plans, and guides" (not "experience")
- **Recommended path language:** "For most teams, start with the Plugin"
- **Alternative path language:** "Need the core directly? Use the CLI" (or equivalent phrasing inside the Install section's CLI tab)

### Per-page heroes (`/plugin`, `/cli`)

Dedicated pages have their own H1 and subhead, but each must reinforce the canonical framing above (one product, two entry points; "context layer" / "structured context" vocabulary).

- **`/plugin` H1:** "Give Claude Code & Cursor a brain for your codebase."
  **Subhead:** "The Archcore plugin loads your architecture, rules, and decisions into Claude Code and Cursor — so the agent stops guessing and starts following your team's truth."
- **`/cli` H1:** "Repo-native context for any AI agent."
  **Subhead:** "The Archcore CLI puts your architectural decisions, rules, and conventions in `.archcore/` — versioned with your code, exposed to 8 AI agents via MCP and session hooks."

Per-page OG cards (rendered by `scripts/generate-og-image.mts` `VARIANTS`) must mirror these page H1s and subheads. The route-meta config in `scripts/prerender-routes.mts` `ROUTES` must mirror the page's `usePageMeta` arguments.

### CTA vocabulary

All install CTAs on the **home page** scroll to the single tabbed `InstallSection` (no longer link out to GitHub). The Plugin tab is the default; the CLI tab is pre-selected when the user lands via the secondary anchor.

- **Primary CTA (home):** **"Use the Plugin"** (hero, final CTA) or **"Install Plugin"** (header, short contexts). Destination: `#install` — tabbed Install section, Plugin tab active by default.
- **Secondary CTA (home):** **"Start with CLI"**. Destination: `#install-cli` — same Install section, CLI tab pre-selected.
- **Dedicated page CTAs:** `/plugin` uses **"Install plugin"** (primary) and **"View on GitHub"** (secondary). `/cli` uses **"Install CLI"** (primary) and **"View on GitHub"** (secondary). Each anchors to the page's own `#install` section, not to the home page.
- The home page's final CTA section pairs the primary and secondary CTAs above a "more info" nav of external links (plugin repo, CLI repo, docs, GitHub org).
- Never pair these with different verbs — the page must read consistently.
- Do not send install CTAs to external destinations (plugin repo, docs site). Each surface renders the real copyable commands on-page.

## Rationale

Consistent positioning across all touchpoints strengthens brand recognition. The dual-entry-point framing matches the real product architecture (plugin as runtime layer on top of CLI) and guides users to the right path by default without hiding the alternative. Keeping install CTAs in-page keeps the user in the funnel and avoids a context switch to GitHub. Dedicated `/plugin` and `/cli` pages let each entry point own its narrative while still echoing the canonical framing.

## Examples

**Good (Hero):** "Turn your repository into structured, machine-readable context. So AI agents can follow your architecture, rules, and decisions — instead of guessing."

**Good (entry-point choice):** "Both paths use the same repository context. The difference is the experience layer."

**Good (install section):** "Pick your path. The plugin is the fastest way in — zero setup for Claude Code."

**Bad:** "Shared architectural memory for AI coding agents" — outdated primary phrase.

**Bad:** "CLI is the main product; plugin is a nice-to-have" — misrepresents the recommended path.

**Bad:** "Install Plugin" CTA linking to `https://github.com/archcore-ai/archcore-plugin` — forces a context switch; the page has the commands.

## Enforcement

Review all copy changes against this rule before merging. When changing a per-page hero (`/plugin`, `/cli`), update **all four** layers in the same PR:

1. The page component's `<Trans>` (hero/subhead) and `usePageMeta` (title/description) calls.
2. `scripts/prerender-routes.mts` `ROUTES[].title` and `description` for the matching route.
3. `scripts/generate-og-image.mts` `VARIANTS[].headline` and `subtitle` for the matching variant.
4. Run `npm run i18n:extract` + translate, then `npm run build`, then visually inspect the regenerated `public/og-image-<page>.png` and the rewritten `dist/<route>/index.html` meta.
