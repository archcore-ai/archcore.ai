---
title: "Landing site messaging alignment with positioning"
status: accepted
---

## Rule

All user-facing copy on the landing site MUST align with the canonical messaging below. This document is the single source of truth for landing copy.

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

### Copy hierarchy

- **Hero H1:** Primary phrase
- **Hero subhead:** Secondary phrase (canonical or short hero variant)
- **Meta title / OG title / Twitter title:** Primary phrase
- **Meta description / OG description / Twitter description:** Secondary phrase + short tagline
- **Footer tagline:** Short tagline
- **Section copy about documents:** Use "decisions, rules, plans, and guides" (not "experience")
- **Recommended path language:** "For most teams, start with the Plugin"
- **Alternative path language:** "Need the core directly? Use the CLI" (or equivalent phrasing inside the Install section's CLI tab)

### CTA vocabulary

All install CTAs on the landing site scroll to the single tabbed `InstallSection` (no longer link out to GitHub). The Plugin tab is the default; the CLI tab is pre-selected when the user lands via the secondary anchor.

- **Primary CTA** across all surfaces: **"Use the Plugin"** (hero, final CTA) or **"Install Plugin"** (header, short contexts). Destination: `#install` — tabbed Install section, Plugin tab active by default.
- **Secondary CTA** across all surfaces: **"Start with CLI"**. Destination: `#install-cli` — same Install section, CLI tab pre-selected.
- The final CTA section pairs the primary and secondary CTAs above a "more info" nav of external links (plugin repo, CLI repo, docs, GitHub org).
- Never pair these with different verbs — the page must read consistently.
- Do not send install CTAs to external destinations (plugin repo, docs site). The Install section renders the real copyable commands on the page.

## Rationale

Consistent positioning across all touchpoints strengthens brand recognition. The dual-entry-point framing matches the real product architecture (plugin as runtime layer on top of CLI) and guides users to the right path by default without hiding the alternative. Keeping install CTAs in-page keeps the user in the funnel and avoids a context switch to GitHub.

## Examples

**Good (Hero):** "Turn your repository into structured, machine-readable context. So AI agents can follow your architecture, rules, and decisions — instead of guessing."

**Good (entry-point choice):** "Both paths use the same repository context. The difference is the experience layer."

**Good (install section):** "Pick your path. The plugin is the fastest way in — zero setup for Claude Code."

**Bad:** "Shared architectural memory for AI coding agents" — outdated primary phrase.

**Bad:** "CLI is the main product; plugin is a nice-to-have" — misrepresents the recommended path.

**Bad:** "Install Plugin" CTA linking to `https://github.com/archcore-ai/archcore-plugin` — forces a context switch; the page has the commands.

## Enforcement

Review all copy changes against this rule before merging.
