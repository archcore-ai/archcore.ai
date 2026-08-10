---
title: "Landing site messaging alignment with positioning"
status: accepted
---

## Rule

All user-facing copy on the landing site MUST align with the canonical strings held in the shared context. This document governs **how** those strings are applied here — which copy layers must change together, which invariants fail silently, and which page owns which fact. It covers **all pages** — `/`, `/plugin`, `/cli`, `/how-to-use`, `/teams/getting-started`, `/privacy` — and all meta surfaces (OG cards, Twitter cards, `index.html` static shell, prerendered route HTML, the OG image generator).

**The strings themselves live in the global context and are not restated here:**

- `product/canonical-narrative` — the fixed strings, the message hierarchy, the terminology style, and the avoid-list.
- `product/surface-descriptors` — the resolved homepage slots (`<title>`, meta description, OG title and description, eyebrow, H1, hero subhead, supporting promise, CTAs) and the homepage section sequence.
- `product/two-discovery-categories` — the decision behind them.

Where a slot is listed in `product/surface-descriptors`, copy it. Do not compose a variant for this site.

**Site-local strings not covered globally:**

- **`/plugin` `<title>`:** "Archcore Plugin — Spec-Driven Development for Coding Agents". Four host names do not fit a ≤60-char title, so the hosts live in the description instead.
- **`/cli` `<title>`:** "Archcore CLI — Git-Native Context for AI Coding Agents".
- **Works-with strip (under the home install block):** "Works with Claude Code · Cursor · Codex CLI · Copilot · Gemini CLI · any MCP agent"
- **Short tagline (footer):** "Git-native context for AI coding agents."

**"Repo memory" is retired as of 2026-08-10.** It was the home and `/plugin` category term under `landing/home-title-category-keyword.adr.md`, now superseded by `product/two-discovery-categories`. The term survives only in `/learn/repo-memory/` and the two memory-cluster blog posts, where it names the topic the reader searched for and is never asserted as what Archcore is.

## Product surface (plugin v0.7.0)

Updated 2026-08-07 for the v0.7.0 release. These counts and names are load-bearing — every surface that states them must match.

- **The plugin has FOUR slash commands**, not seven: `/archcore:init`, `/archcore:plan`, `/archcore:document`, `/archcore:review`. The v0.6-era `context`, `capture`, `decide`, `audit`, and `help` commands were removed. `capture` and `decide` folded into `document`; `audit` folded into `review` (`--drift`, `--deep`); `context` became automatic; `help` was dropped.
- **Everyday context needs no command.** Hooks inject the applicable rules and specs when the agent edits a file, and each session opens with a recap of what is decided and in progress. Copy MUST NOT tell users to run a command to load context.
- **`/archcore:plan` takes a positional track**, not a `--track` flag: `sdd` (default; idea → PRD → spec → plan), `sources` (MRD → BRD → URD), `iso` (BRS → StRS → SyRS → SRS), `research` (RnD). Source of truth: `plugins/archcore/skills/plan/SKILL.md` in the plugin repo. The `research` track was missing from this list until 2026-08-10 while the docs already carried it.
- **MCP prompts no longer exist.** The `product_track` / `architecture_track` / `standard_track` / `sources_track` / `iso_track` prompt cascades were removed from the CLI in v0.7.0. The MCP surface is tool-only: 10 document tools.
- **Document-type count:** the product exposes **19** typed document types (vision incl. RnD) — every count mention on any surface says 19, matching docs.

## Writing style

The full writing profile lives in `AGENTS.md` at the repository root. It sets ISO 24495-1-inspired plain language for every reader-facing surface, an ASD-STE100-inspired controlled style for agent-facing files only, and a humanizer pass in the shipping language. This rule still outranks it: positioning beats style.

Two conventions this rule pins directly, because they touch the canonical phrases:

- **No em dashes in prose.** The `humanizer` skill treats the em dash as a hard constraint, and this site had 252 of them in the English catalog. Replace with a period, comma, colon, or parentheses. Two exceptions: the brand separator in a `<title>` or OG title (`Archcore — Spec-Driven Development & Context Engineering`), which is a typographic convention rather than a prose tell, and code comments, which no reader sees.

This is why the hero subhead uses the **comma variant** of the canonical expanded definition. `product/canonical-narrative` clause 17 defers to this policy; the wording is identical either way.
- **Russian keeps its grammatical dash.** `humanizer-ru` bans «—» outright, but Russian requires it for an omitted copula («Настройка MCP — рутина», «Один конфиг — все агенты»). Strip the dash only where it is calqued from English: appositives, parenthetical asides, and consequence clauses that a comma or «и» carries better. Stripping a grammatical dash produces broken Russian, which is worse than the pattern it removes.

The pinned secondary phrase and meta description changed punctuation on 2026-08-07 (em dash to comma) under this policy. The wording is identical; the claim did not move. Any surface repeating them must use the comma form.

## Entry-point framing

Decided 2026-07-06 (supersedes the earlier "Plugin is the recommended path" framing):

- **Both entry points are equals.** No "(recommended)" labels anywhere on the site — including the static prerendered route bodies in `scripts/prerender-routes.mts`, which are crawler-visible copy and drifted on this exact point once (fixed 2026-07-30).
- **Gentle plugin emphasis is allowed:** plugin copy may call itself "the most polished experience for Claude Code, Cursor, Codex CLI, and GitHub Copilot CLI". Never frame the CLI as a fallback.
- **The home hero install block defaults to the CLI tab** (the one-line curl is the universal entry). The Plugin tab is pre-selected when the user lands via `#install-plugin`; `#install-cli` selects the CLI tab.
- **Frame the choice by the user's agent, not by recommendation:** Plugin — for Claude Code / Cursor 2.5+ / Codex CLI 0.117+ / GitHub Copilot CLI; CLI — any MCP-aware agent (Gemini CLI, OpenCode, Roo Code, Cline), scriptable in CI.

## Copy hierarchy (home `/`)

Every slot below takes its string from `product/surface-descriptors`, homepage table.

- **Hero eyebrow → H1 → subhead → supporting promise**, in that order
- **Meta title (`<title>`) / OG title / Twitter title / og:image:alt:** the same category-led string, so the SERP entry, the social card, and the image alt all agree
- **Meta description / OG description / Twitter description / SoftwareApplication JSON-LD description:** the homepage meta description; OG and Twitter may use the OG description variant
- **Works-with strip:** directly under the install tabs, above the "CLI = one binary · Plugin = slash commands." line
- **OG image subtitle (`og-image.png`):** the hero subhead verbatim

### Section order (`landing.tsx`)

The canonical sequence in `product/surface-descriptors`, with one addition. Component ids match the section anchors.

| # | Section | Component | Background |
|---|---------|-----------|------------|
| 1 | Category and product | `hero-section` | page |
| 2 | Problem | `problem-section` (`#problem`) | page |
| 3 | Proof | `before-after-section` | page, cards |
| 4 | Spec-driven development | `spec-driven-section` (`#spec-driven-development`) | band |
| 5 | Context engineering | `context-engineering-section` (`#context-engineering`) | page |
| 6 | Git-native | `git-native-section` (`#git-native`) | band |
| 7 | Cross-agent | `cross-agent-section` (`#cross-agent`) | page |
| 8 | How it works | `how-it-works-section` | band |

**Before/After is the addition, and it is deliberate.** `product/jobs-to-be-done` keeps Job 1 (build by this repo's rules) as the primary product scenario, so the page needs its concrete demonstration before it argues categories. It sits between the problem and the two category sections: problem stated, problem shown, then the two categories the reader searched for.

Backgrounds alternate page / band from section 4 on, so the page does not read as one field of bordered cards. A new section picks the background that continues the alternation.

**Sections 4 and 5 carry the category terms in their H2s.** Those two headings are SEO-load-bearing. Do not soften them into a benefit phrase.
- **Section copy about documents:** Use "decisions, rules, plans, and guides" (not "experience")
- **Visible FAQ (`faq-section.tsx`) and the FAQPage JSON-LD in `index.html` MUST mirror each other** — same questions, same answers, same order.

## Structured data per route

Added 2026-07-30 after the home FAQPage block was found shipping on every prerendered route (including `/privacy/`, which claimed the product FAQ as its own structured data).

- **A route's FAQPage JSON-LD is per-route or absent — never inherited.** `scripts/prerender-routes.mts` clones `dist/index.html`, so every entry in `ROUTES` either supplies its own `faq[]` (which replaces the home block) or supplies none (which strips it). A page with no visible FAQ MUST NOT carry FAQPage markup.
- **`ROUTES[].faq` MUST mirror the page's visible FAQ section** — same questions, same answers, same order — exactly as the home FAQ mirrors `faq-section.tsx`. Today: `/plugin` mirrors `plugin-faq-section.tsx`, `/cli` mirrors `cli-faq-section.tsx`. Change the component and the `faq[]` array in the same PR.
- `Organization` and `SoftwareApplication` are site/app-level and correctly stay on every route.
- Content-hub listings (`/blog/`, `/learn/`) carry `CollectionPage` + `ItemList` via `content-site/src/layouts/ListingLayout.astro`; articles carry `Article` (+ `FAQPage` when the frontmatter has `faq`) via `ArticleLayout.astro`.

## Per-page heroes (`/plugin`, `/cli`)

- **`/plugin` H1:** "Make your AI coding agent work like it already knows your repo." Same opener as the plugin README, so the page and the repository read as one surface.
- **`/cli` H1:** "Git-native project context for every AI coding agent."
- **`/plugin` `<title>` is category-led**, not host-enumerated: "Archcore Plugin — Spec-Driven Development for Coding Agents". Four host names no longer fit a ≤60-char title, so the hosts live in the description instead. This mirrors the home title's rationale.
- **`/cli` `<title>`:** "Archcore CLI — Git-Native Context for AI Coding Agents", matching the CLI README H1.

Per-page OG cards (`scripts/generate-og-image.mts` `VARIANTS`) must mirror these page H1s and subheads. The route-meta config in `scripts/prerender-routes.mts` `ROUTES` must mirror the page's `usePageMeta` arguments, and each route's static `body.paragraphs` must state the same claims as the page's visible sections — that body is what non-JS crawlers read.

**Host support has one source on the landing site.** The host matrix in `plugin-hosts-section.tsx` (`/plugin`) is the single place that states which hosts the plugin runs in, and the agent grid in `cli-agents-section.tsx` (`/cli`) is the single place that states which agents the CLI supports. FAQ answers, hero copy, and prerender bodies may summarize them but must not contradict them, and a status change updates the landing block, the docs page, and the repo tagline together.

**Current matrix (v0.7.0, from the CLI's `agent-hooks-integration.guide.md` and shipped code):**

- **Plugin hosts (4):** Claude Code (production), Cursor 2.5+, Codex CLI 0.117+, GitHub Copilot CLI (all implemented).
- **CLI over MCP (8):** Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline (manual setup).
- **CLI session hooks (5):** Claude Code, Cursor, Gemini CLI, Codex CLI, GitHub Copilot. OpenCode is never wired — its hooks are JavaScript plugins that cannot be written declaratively. Codex hooks need its experimental flag (`codex --enable hooks`) and do not run on Windows. Copilot has no pre-write context injection.
- **GitHub Copilot CLI resolved 2026-08-07.** The earlier "landing follows the docs, which say planned" carve-out is retired: plugin v0.7.0 ships Copilot support with tests. **Copilot needs two install steps** — `copilot plugin install archcore-ai/plugin:plugins/archcore` AND `archcore init --agent copilot --project "$PWD"`. The second is required, not optional: the plugin deliberately ships no MCP server to Copilot, so a project that skips it has no document tools. Any surface showing the Copilot install path must show both steps.
- **`docs.archcore.ai` caught up on 2026-08-10.** The earlier warning here (host matrix said Copilot was planned, removed commands still documented) no longer holds: docs state Copilot as implemented with both install steps and the `github/copilot-cli#4234` rationale, carry only the four commands, list all four `/archcore:plan` tracks, and say 19 document types. The standing rule is unchanged: **where docs and shipped code disagree, the landing follows the code** — and this time the drift ran the other way, with this rule missing the `research` track the docs already had.

## CTA vocabulary

- **Home install anchors:** all install CTAs scroll to the hero install tabs — `#install` (CLI tab default) or `#install-plugin` (Plugin tab pre-selected). Never link install CTAs to external destinations; the page renders the real copyable commands.
- **Header CTA:** "How to use" → `/how-to-use` (interactive walkthrough).
- **Star CTA block (bottom of home):** primary action "Star on GitHub"; secondary link "Ready to try? Install now" → `#install`.
- **Dedicated page CTAs:** `/plugin` uses "Install plugin" (primary) and "View on GitHub" (secondary); `/cli` uses "Install CLI" (primary) and "View on GitHub" (secondary). Each anchors to the page's own `#install` section.
- Never pair these with different verbs — each page must read consistently.

The `/plugin` page's Install section is a **4-tab** Radix Tabs widget: "Claude Code", "Cursor 2.5+", "Codex CLI 0.117+", "Copilot CLI". Copy for this widget stays host-specific and must not generalize across tabs.

## Content hub links

`/blog/` and `/learn/` are static Astro pages from the `content-site/` sub-build, not SPA routes. Link them with a full page load (`reload: true` in `site-nav.tsx`, plain `<a>` elsewhere) — never through React Router. Both must also appear in the crawler-visible navs: the `index.html` static fallback and `renderBody()` in `scripts/prerender-routes.mts`.

`/learn/` holds definitional reference pieces, `/blog/` holds dated guides and vendor changes. Keep that split in the intro copy of each index so the two hubs do not read as duplicates.

**Published articles state product facts too.** A release that changes the command set or the MCP surface can falsify an article — `blog/mcp-server-project-context.md` described the removed MCP prompts for a full release cycle. Sweep `content-site/src/content/` on every release that changes the product surface.

## Rationale

Consistent positioning across all touchpoints strengthens brand recognition. The equal-paths framing matches how users actually choose (by which agent they run, not by our preference) while the gentle plugin emphasis still guides users of the four plugin hosts to the richer experience. Keeping install CTAs in-page keeps the user in the funnel.

The home H1 went category-led on 2026-08-10 under `product/two-discovery-categories`, which reverses the 2026-07-06 pain-first decision for the H1 slot specifically. The pain phrase did not disappear: it moved down one line as the supporting promise, where it still does the hook's job while the H1 states what Archcore is and what it competes for. The eyebrow ("Git-native context layer") keeps the product definition visible above the category line, so the reader gets the narrow answer before the broad one.

The `<title>` no longer diverges from the H1. Both are category-led, so SERP entry, social card, OG image, and page all state the same claim. That removes the exception `landing/home-title-category-keyword.adr.md` was written to sanction, and the ADR is superseded.

Host support and structured data get their own invariants because both failed silently: a stale host claim or an inherited FAQ block produces no build error, ships to production, and is only visible in the rendered HTML or a rich-results test. The command set now gets the same treatment: `/archcore:context` survived on the landing for a full release after it was deleted, because nothing in the build knows which commands exist.

## Examples

**Good (Hero):** eyebrow "Git-native context layer", H1 "Spec-Driven Development & Context Engineering for AI Coding Agents", subhead "Archcore keeps specs, architecture, decisions, rules, and plans in Git, and makes the right project context available to AI coding agents as they work.", then "Stop re-explaining your repo to every AI coding agent."

**Good (entry-point choice):** "Both paths use the same `.archcore/` directory. The difference is the experience layer."

**Good (plugin emphasis):** "The most polished experience for Claude Code, Cursor, Codex CLI, and GitHub Copilot CLI."

**Good (context framing):** "Four slash commands — and the everyday context needs none of them."

**Bad:** "Turn your repository into structured, machine-readable context." — superseded primary phrase.

**Bad:** `<title>Archcore — repo memory for AI coding agents</title>` — superseded title; memory is retired as positioning on every surface, `<title>` included.

**Bad:** "Give Claude Code, Cursor, Codex & Copilot a brain for your codebase." — the superseded `/plugin` H1; "a brain for your codebase" is memory framing in a costume.

**Bad:** "Plugin (recommended)" — recommendation labels are retired; frame by the user's agent instead.

**Bad:** "The Plugin is the recommended runtime for Claude Code, Cursor, and Codex CLI" — same violation, in the prerendered `/how-to-use` body; shipped for months because nobody reads the static bodies.

**Bad:** "CLI is the main product; plugin is a nice-to-have" — the paths are equals.

**Bad:** `/archcore:standard` in the prerendered `/plugin` body — a command that does not exist in the four; the static bodies count as copy and must be reviewed like copy.

**Bad:** "Run `/archcore:context` before editing" — the command was deleted in v0.7.0 and context injection is automatic. Same for `capture`, `decide`, `audit`, `help`.

**Bad:** "GitHub Copilot is on the roadmap" — shipped in v0.7.0.

**Bad:** "Archcore turns your repository into structured, machine-readable context" restored by the `/teams/getting-started` cleanup effect — the superseded primary phrase shipped there, in a code path that only runs when the visitor navigates away, until 2026-08-07. Meta written imperatively in a `useEffect` is copy, and it drifts where nobody looks.

**Bad:** Showing only `copilot plugin install …` for Copilot — without `archcore init --agent copilot` the user gets a plugin with no document tools.

**Bad:** `/privacy/` serving the home page's FAQPage JSON-LD — structured data must describe the page it is on.

**Bad:** "Install Plugin" CTA linking to `https://github.com/archcore-ai/archcore-plugin` — forces a context switch; the page has the commands.

## Enforcement

Review all copy changes against this rule before merging. Copy lives in more layers than the component — update **all** that apply in the same PR:

1. **Home hero/subhead/FAQ:** component `<Trans>`/`msg` strings + `index.html` (title, description, OG, Twitter, SoftwareApplication and FAQPage JSON-LD, static fallback body) + `scripts/generate-og-image.mts` home variant.
2. **`/plugin`, `/cli`, `/how-to-use` heroes/meta:** page component `<Trans>` + `usePageMeta` + `scripts/prerender-routes.mts` `ROUTES[]` (title, description, **`body.paragraphs`**, and **`faq[]`**) + `scripts/generate-og-image.mts` `VARIANTS[]`.
3. **Host/agent support:** `plugin-hosts-section.tsx` or `cli-agents-section.tsx` + the matching docs page + the repo tagline — never one without the others.
4. **Command-set changes:** sweep `src/content/how-to-use/*` (all five branches), `plugin-pillars-section.tsx`, both FAQ components, `scripts/prerender-routes.mts` bodies, `index.html`, and `content-site/src/content/`. A deleted command hides in the wizard branches longest.
5. **Screenshots are copy too.** `public/images/cursor-plugin-{light,dark}.png` shows the plugin's skill list in the Cursor marketplace; it goes stale on every command-set change and must be re-captured. Nothing in the build catches this.
6. Run `npm run i18n:extract`, translate new RU strings (formal «вы» throughout — never «ты»), then `npm run build`.
7. Visually inspect the regenerated `public/og-image*.png` and the rewritten `dist/<route>/index.html` meta. Check the built HTML, not just the dev server: prerender bodies, per-route JSON-LD, and the content-hub pages only exist in `dist/`.
