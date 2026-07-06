---
title: "Landing site messaging alignment with positioning"
status: accepted
---

## Rule

All user-facing copy on the landing site MUST align with the canonical messaging below. This document is the single source of truth for landing copy across **all pages** — `/`, `/plugin`, `/cli`, `/how-to-use`, `/teams/getting-started`, `/privacy` — and across all meta surfaces (OG cards, Twitter cards, `index.html` static shell, prerendered route HTML, the OG image generator).

**Primary phrase (Hero H1 / meta title):** "Stop re-explaining your repo to every AI agent."

**Secondary phrase (hero subhead):** "Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into your agent over MCP before it edits."

**Meta description (home, ≤160 chars):** "Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into Claude Code, Cursor, and any MCP agent before they edit."

**Works-with strip (under the home install block):** "Works with Claude Code · Cursor · Codex CLI · Copilot · Gemini CLI · any MCP agent"

**Short tagline (footer):** "Git-native context for AI coding agents."

## Entry-point framing

Decided 2026-07-06 (supersedes the earlier "Plugin is the recommended path" framing):

- **Both entry points are equals.** No "(recommended)" labels anywhere on the site.
- **Gentle plugin emphasis is allowed:** plugin copy may call itself "the most polished experience for Claude Code, Cursor, and Codex CLI". Never frame the CLI as a fallback.
- **The home hero install block defaults to the CLI tab** (the one-line curl is the universal entry). The Plugin tab is pre-selected when the user lands via `#install-plugin`; `#install-cli` selects the CLI tab.
- **Frame the choice by the user's agent, not by recommendation:** Plugin — for Claude Code / Cursor 2.5+ / Codex CLI 0.117+; CLI — any MCP-aware agent (GitHub Copilot, Gemini CLI, OpenCode, Roo Code, Cline), scriptable in CI.

## Copy hierarchy (home `/`)

- **Hero H1:** Primary phrase
- **Hero subhead:** Secondary phrase
- **Meta title / OG title / Twitter title:** "Archcore — Stop re-explaining your repo to every AI agent"
- **Meta description / OG description / Twitter description / SoftwareApplication JSON-LD description:** Meta description phrase
- **Works-with strip:** directly under the install tabs, above the "CLI = one binary · Plugin = slash commands." line
- **OG image subtitle (`og-image.png`):** Secondary phrase verbatim
- **Section copy about documents:** Use "decisions, rules, plans, and guides" (not "experience")
- **Visible FAQ (`faq-section.tsx`) and the FAQPage JSON-LD in `index.html` MUST mirror each other** — same questions, same answers, same order.

## Per-page heroes (`/plugin`, `/cli`)

Unchanged this iteration:

- **`/plugin` H1:** "Give Claude Code, Cursor & Codex CLI a brain for your codebase."
- **`/cli` H1:** "Repo-native context for any AI agent."

Per-page OG cards (`scripts/generate-og-image.mts` `VARIANTS`) must mirror these page H1s and subheads. The route-meta config in `scripts/prerender-routes.mts` `ROUTES` must mirror the page's `usePageMeta` arguments.

## CTA vocabulary

- **Home install anchors:** all install CTAs scroll to the hero install tabs — `#install` (CLI tab default) or `#install-plugin` (Plugin tab pre-selected). Never link install CTAs to external destinations; the page renders the real copyable commands.
- **Header CTA:** "How to use" → `/how-to-use` (interactive walkthrough).
- **Star CTA block (bottom of home):** primary action "Star on GitHub"; secondary link "Ready to try? Install now" → `#install`.
- **Dedicated page CTAs:** `/plugin` uses "Install plugin" (primary) and "View on GitHub" (secondary); `/cli` uses "Install CLI" (primary) and "View on GitHub" (secondary). Each anchors to the page's own `#install` section.
- Never pair these with different verbs — each page must read consistently.

The `/plugin` page's Install section is a 3-tab Radix Tabs widget: "Claude Code", "Cursor 2.5+", "Codex CLI 0.117+". Copy for this widget stays host-specific and must not generalize across tabs.

## Rationale

Consistent positioning across all touchpoints strengthens brand recognition. The equal-paths framing matches how users actually choose (by which agent they run, not by our preference) while the gentle plugin emphasis still guides users of the three plugin hosts to the richer experience. Keeping install CTAs in-page keeps the user in the funnel. The pain-first H1 outperformed the earlier category-first phrase ("Turn your repository into structured, machine-readable context") in clarity; the category statement now lives in the subhead where it answers "what is this" immediately after the hook.

## Examples

**Good (Hero):** "Stop re-explaining your repo to every AI agent. Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into your agent over MCP before it edits."

**Good (entry-point choice):** "Both paths use the same `.archcore/` directory. The difference is the experience layer."

**Good (plugin emphasis):** "The most polished experience for Claude Code, Cursor, and Codex CLI."

**Bad:** "Turn your repository into structured, machine-readable context." — superseded primary phrase.

**Bad:** "Plugin (recommended)" — recommendation labels are retired; frame by the user's agent instead.

**Bad:** "CLI is the main product; plugin is a nice-to-have" — the paths are equals.

**Bad:** "Install Plugin" CTA linking to `https://github.com/archcore-ai/archcore-plugin` — forces a context switch; the page has the commands.

## Enforcement

Review all copy changes against this rule before merging. Copy lives in more layers than the component — update **all** that apply in the same PR:

1. **Home hero/subhead/FAQ:** component `<Trans>`/`msg` strings + `index.html` (title, description, OG, Twitter, SoftwareApplication and FAQPage JSON-LD, static fallback body) + `scripts/generate-og-image.mts` home variant.
2. **`/plugin`, `/cli`, `/how-to-use` heroes/meta:** page component `<Trans>` + `usePageMeta` + `scripts/prerender-routes.mts` `ROUTES[]` + `scripts/generate-og-image.mts` `VARIANTS[]`.
3. Run `npm run i18n:extract`, translate new RU strings (formal «вы» throughout — never «ты»), then `npm run build`.
4. Visually inspect the regenerated `public/og-image*.png` and the rewritten `dist/<route>/index.html` meta.