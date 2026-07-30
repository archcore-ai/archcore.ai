---
title: "Landing site messaging alignment with positioning"
status: accepted
---

## Rule

All user-facing copy on the landing site MUST align with the canonical messaging below. This document is the single source of truth for landing copy across **all pages** — `/`, `/plugin`, `/cli`, `/how-to-use`, `/teams/getting-started`, `/privacy` — and across all meta surfaces (OG cards, Twitter cards, `index.html` static shell, prerendered route HTML, the OG image generator).

**Primary phrase (Hero H1):** "Stop re-explaining your repo to every AI agent."

**Meta title (home `<title>`, ≤60 chars):** "Archcore — repo memory for AI coding agents" — the title tag is category-led for SERPs and brand disambiguation and intentionally does NOT mirror the H1 (decision: `landing/home-title-category-keyword.adr.md`).

**Secondary phrase (hero subhead):** "Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into your agent over MCP before it edits."

**Meta description (home, ≤160 chars):** "Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into Claude Code, Cursor, and any MCP agent before they edit."

**Works-with strip (under the home install block):** "Works with Claude Code · Cursor · Codex CLI · Copilot · Gemini CLI · any MCP agent"

**Short tagline (footer):** "Git-native context for AI coding agents."

## Entry-point framing

Decided 2026-07-06 (supersedes the earlier "Plugin is the recommended path" framing):

- **Both entry points are equals.** No "(recommended)" labels anywhere on the site — including the static prerendered route bodies in `scripts/prerender-routes.mts`, which are crawler-visible copy and drifted on this exact point once (fixed 2026-07-30).
- **Gentle plugin emphasis is allowed:** plugin copy may call itself "the most polished experience for Claude Code, Cursor, and Codex CLI". Never frame the CLI as a fallback.
- **The home hero install block defaults to the CLI tab** (the one-line curl is the universal entry). The Plugin tab is pre-selected when the user lands via `#install-plugin`; `#install-cli` selects the CLI tab.
- **Frame the choice by the user's agent, not by recommendation:** Plugin — for Claude Code / Cursor 2.5+ / Codex CLI 0.117+; CLI — any MCP-aware agent (GitHub Copilot, Gemini CLI, OpenCode, Roo Code, Cline), scriptable in CI.

## Copy hierarchy (home `/`)

- **Hero H1:** Primary phrase
- **Hero subhead:** Secondary phrase
- **Meta title (`<title>`):** "Archcore — repo memory for AI coding agents"
- **OG title / Twitter title / og:image:alt:** "Archcore — Stop re-explaining your repo to every AI agent"
- **Meta description / OG description / Twitter description / SoftwareApplication JSON-LD description:** Meta description phrase
- **Works-with strip:** directly under the install tabs, above the "CLI = one binary · Plugin = slash commands." line
- **OG image subtitle (`og-image.png`):** Secondary phrase verbatim
- **Section copy about documents:** Use "decisions, rules, plans, and guides" (not "experience")
- **Document-type count:** the product exposes **19** typed document types (vision incl. RnD) — every count mention on any surface says 19, matching docs
- **Visible FAQ (`faq-section.tsx`) and the FAQPage JSON-LD in `index.html` MUST mirror each other** — same questions, same answers, same order.

## Structured data per route

Added 2026-07-30 after the home FAQPage block was found shipping on every prerendered route (including `/privacy/`, which claimed the product FAQ as its own structured data).

- **A route's FAQPage JSON-LD is per-route or absent — never inherited.** `scripts/prerender-routes.mts` clones `dist/index.html`, so every entry in `ROUTES` either supplies its own `faq[]` (which replaces the home block) or supplies none (which strips it). A page with no visible FAQ MUST NOT carry FAQPage markup.
- **`ROUTES[].faq` MUST mirror the page's visible FAQ section** — same questions, same answers, same order — exactly as the home FAQ mirrors `faq-section.tsx`. Today: `/plugin` mirrors `plugin-faq-section.tsx`, `/cli` mirrors `cli-faq-section.tsx`. Change the component and the `faq[]` array in the same PR.
- `Organization` and `SoftwareApplication` are site/app-level and correctly stay on every route.
- Content-hub listings (`/blog/`, `/learn/`) carry `CollectionPage` + `ItemList` via `content-site/src/layouts/ListingLayout.astro`; articles carry `Article` (+ `FAQPage` when the frontmatter has `faq`) via `ArticleLayout.astro`.

## Per-page heroes (`/plugin`, `/cli`)

Unchanged this iteration:

- **`/plugin` H1:** "Give Claude Code, Cursor & Codex CLI a brain for your codebase."
- **`/cli` H1:** "Repo-native context for any AI agent."

Per-page OG cards (`scripts/generate-og-image.mts` `VARIANTS`) must mirror these page H1s and subheads. The route-meta config in `scripts/prerender-routes.mts` `ROUTES` must mirror the page's `usePageMeta` arguments, and each route's static `body.paragraphs` must state the same claims as the page's visible sections — that body is what non-JS crawlers read.

**Host support has one source on the landing site.** The host matrix in `plugin-hosts-section.tsx` (`/plugin`) is the single place that states which hosts the plugin runs in, and the agent grid in `cli-agents-section.tsx` (`/cli`) is the single place that states which agents the CLI supports. Both mirror the docs — `docs/plugin/supported-hosts.mdx` and `docs/cli/agent-integrations.mdx` respectively. FAQ answers, hero copy, and prerender bodies may summarize them but must not contradict them, and a status change updates the landing block, the docs page, and the repo tagline together. As of 2026-07-30 the plugin README claims GitHub Copilot CLI support while site and docs say planned; the landing block follows the docs until that is resolved (tracked in `landing/seo-growth.plan.md`, C3).

## CTA vocabulary

- **Home install anchors:** all install CTAs scroll to the hero install tabs — `#install` (CLI tab default) or `#install-plugin` (Plugin tab pre-selected). Never link install CTAs to external destinations; the page renders the real copyable commands.
- **Header CTA:** "How to use" → `/how-to-use` (interactive walkthrough).
- **Star CTA block (bottom of home):** primary action "Star on GitHub"; secondary link "Ready to try? Install now" → `#install`.
- **Dedicated page CTAs:** `/plugin` uses "Install plugin" (primary) and "View on GitHub" (secondary); `/cli` uses "Install CLI" (primary) and "View on GitHub" (secondary). Each anchors to the page's own `#install` section.
- Never pair these with different verbs — each page must read consistently.

The `/plugin` page's Install section is a 3-tab Radix Tabs widget: "Claude Code", "Cursor 2.5+", "Codex CLI 0.117+". Copy for this widget stays host-specific and must not generalize across tabs.

## Content hub links

`/blog/` and `/learn/` are static Astro pages from the `content-site/` sub-build, not SPA routes. Link them with a full page load (`reload: true` in `site-nav.tsx`, plain `<a>` elsewhere) — never through React Router. Both must also appear in the crawler-visible navs: the `index.html` static fallback and `renderBody()` in `scripts/prerender-routes.mts`.

`/learn/` holds definitional reference pieces, `/blog/` holds dated guides and vendor changes. Keep that split in the intro copy of each index so the two hubs do not read as duplicates.

## Rationale

Consistent positioning across all touchpoints strengthens brand recognition. The equal-paths framing matches how users actually choose (by which agent they run, not by our preference) while the gentle plugin emphasis still guides users of the three plugin hosts to the richer experience. Keeping install CTAs in-page keeps the user in the funnel. The pain-first H1 outperformed the earlier category-first phrase ("Turn your repository into structured, machine-readable context") in clarity; the category statement now lives in the subhead where it answers "what is this" immediately after the hook.

The meta title is the one deliberate exception to single-phrase purity: SERPs need the category term and disambiguation from unrelated Archcore-named companies (archcore.com steel), while social cards and the page itself keep the pain hook. See `landing/home-title-category-keyword.adr.md`.

Host support and structured data get their own invariants because both failed silently: a stale host claim or an inherited FAQ block produces no build error, ships to production, and is only visible in the rendered HTML or a rich-results test.

## Examples

**Good (Hero):** "Stop re-explaining your repo to every AI agent. Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into your agent over MCP before it edits."

**Good (entry-point choice):** "Both paths use the same `.archcore/` directory. The difference is the experience layer."

**Good (plugin emphasis):** "The most polished experience for Claude Code, Cursor, and Codex CLI."

**Bad:** "Turn your repository into structured, machine-readable context." — superseded primary phrase.

**Bad:** `<title>Archcore — Stop re-explaining your repo to every AI agent</title>` — superseded title; the `<title>` is category-led, the pain phrase stays on H1/OG/Twitter.

**Bad:** "Plugin (recommended)" — recommendation labels are retired; frame by the user's agent instead.

**Bad:** "The Plugin is the recommended runtime for Claude Code, Cursor, and Codex CLI" — same violation, in the prerendered `/how-to-use` body; shipped for months because nobody reads the static bodies.

**Bad:** "CLI is the main product; plugin is a nice-to-have" — the paths are equals.

**Bad:** `/archcore:standard` in the prerendered `/plugin` body — a command that does not exist in the seven; the static bodies count as copy and must be reviewed like copy.

**Bad:** `/privacy/` serving the home page's FAQPage JSON-LD — structured data must describe the page it is on.

**Bad:** "Install Plugin" CTA linking to `https://github.com/archcore-ai/archcore-plugin` — forces a context switch; the page has the commands.

## Enforcement

Review all copy changes against this rule before merging. Copy lives in more layers than the component — update **all** that apply in the same PR:

1. **Home hero/subhead/FAQ:** component `<Trans>`/`msg` strings + `index.html` (title, description, OG, Twitter, SoftwareApplication and FAQPage JSON-LD, static fallback body) + `scripts/generate-og-image.mts` home variant.
2. **`/plugin`, `/cli`, `/how-to-use` heroes/meta:** page component `<Trans>` + `usePageMeta` + `scripts/prerender-routes.mts` `ROUTES[]` (title, description, **`body.paragraphs`**, and **`faq[]`**) + `scripts/generate-og-image.mts` `VARIANTS[]`.
3. **Host/agent support:** `plugin-hosts-section.tsx` or `cli-agents-section.tsx` + the matching docs page + the repo tagline — never one without the others.
4. Run `npm run i18n:extract`, translate new RU strings (formal «вы» throughout — never «ты»), then `npm run build`.
5. Visually inspect the regenerated `public/og-image*.png` and the rewritten `dist/<route>/index.html` meta. Check the built HTML, not just the dev server: prerender bodies, per-route JSON-LD, and the content-hub pages only exist in `dist/`.
