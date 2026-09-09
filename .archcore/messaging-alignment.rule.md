---
title: "Landing site messaging alignment with positioning"
status: accepted
---






## Rule

All user-facing copy on the landing site MUST align with the canonical strings held in the shared context. This document governs **how** those strings are applied here — which copy layers must change together, which invariants fail silently, and which page owns which fact. It covers **all pages** — `/`, `/plugin`, `/cli`, `/how-to-use`, `/privacy` — and all meta surfaces (OG cards, Twitter cards, Astro-generated HTML, shared layouts, the OG image generator).

**The strings themselves live in the global context and are not restated here:**

- `product/canonical-narrative` — the fixed strings, the message hierarchy, the terminology style, and the avoid-list.
- `product/surface-descriptors` — the resolved homepage slots (`<title>`, meta description, OG title and description, eyebrow, H1, hero subhead, supporting promise, CTAs) and the homepage section sequence.
- `product/two-discovery-categories` — the decision behind them.

Where a slot is listed in `product/surface-descriptors`, copy it. Do not compose a variant for this site.

**Site-local strings not covered globally:**

- **`/plugin` `<title>`:** "Archcore Plugin — Spec-Driven Development for Coding Agents". Four host names do not fit a ≤60-char title, so the hosts live in the description instead.
- **`/cli` `<title>`:** "Archcore CLI — Git-Native Context for AI Coding Agents".
- **`/how-to-use` `<title>`:** "How to use Archcore".
- **Works-with strip (under the home install block):** "Works with Claude Code · Cursor · Codex CLI · Copilot · Gemini CLI · any MCP agent"
- **Short tagline (footer):** "Git-native context for AI coding agents."

The entry-point shorthand slot under the works-with strip is **empty as of 2026-08-27**. It held "Plugin = slash commands · CLI = one binary." until the hero tabs went, then "One install. On Claude Code, Cursor, Codex CLI, and Copilot the plugin comes with it." for one iteration. Both named the two parts on the one surface that had stopped distinguishing them, so the line was cut rather than reworded. The works-with strip and "Open source · Local-first" are the only lines under the install block now. Do not refill the slot with a sentence that names the plugin and the CLI as two things.

**"Repo memory" is retired as of 2026-08-10.** It was the home and `/plugin` category term under `landing/home-title-category-keyword.adr.md`, now superseded by `product/two-discovery-categories`. The term survives only in `/learn/repo-memory/` and the two memory-cluster blog posts, where it names the topic the reader searched for and is never asserted as what Archcore is.

## Product surface (plugin v0.7.0)

Updated 2026-08-07 for the v0.7.0 release. These counts and names are load-bearing — every surface that states them must match.

- **The plugin has FOUR slash commands**, not seven: `/archcore:init`, `/archcore:plan`, `/archcore:document`, `/archcore:review`. The v0.6-era `context`, `capture`, `decide`, `audit`, and `help` commands were removed. `capture` and `decide` folded into `document`; `audit` folded into `review` (`--drift`, `--deep`); `context` became automatic; `help` was dropped.
- **The four are a loop, not a menu.** `init` makes the repo legible, `plan` scopes the work, `document` records what was settled, `review` reads the branch against both. Copy that presents them as four independent features loses the argument that makes the product cohere, and copy that presents them out of order breaks it outright.
- **Plain English is the primary interface, and the slash command is a shortcut.** The plugin's skills route on natural-language triggers ("Record the decision to use PostgreSQL", "Document the auth module", "Plan the auth redesign", "Review my branch"), and the same instruments are reachable over MCP from any agent. Copy MAY show a slash command as a shortcut; it MUST NOT present the command as the only way in.
- **Everyday context needs no command.** Hooks inject the applicable rules and specs when the agent edits a file, and each session opens with a recap of what is decided and in progress. Copy MUST NOT tell users to run a command to load context.
- **`/archcore:plan` computes its route** rather than running one fixed cascade. A small fix takes the null route and produces no documents; one capability gets a spec and a plan; a large initiative gets an umbrella PRD with one spec per capability. Expert paths named positionally: `sdd` (default), `sources`, `iso`, `research`. Source of truth: `plugins/archcore/skills/plan/SKILL.md`. Copy that calls `plan` a fixed idea → PRD → spec → plan cascade is describing v0.7.
- **MCP prompts no longer exist.** The `product_track` / `architecture_track` / `standard_track` / `sources_track` / `iso_track` prompt cascades were removed from the CLI in v0.7.0. The MCP surface is tool-only: 10 document tools.
- **Document-type count:** the product exposes **19** typed document types (vision incl. RnD) — every count mention on any surface says 19, matching docs.
- **`/archcore:review` ends in a verdict per finding:** `spec-wrong` (the document is stale), `code-wrong` (the code violates a decision), `ok`. Source of truth: `plugins/archcore/skills/review/SKILL.md`. The home loop section and the `index.html` loop paragraph both name the three tokens as of 2026-08-31, so a rename in that skill falsifies two surfaces at once.

## Install delivery

Added 2026-08-27 with `landing/home-install-single-path.adr.md`. These facts govern every install surface on the site.

- **The plugin never installs the CLI.** It invokes `archcore` from `PATH`. The plugin repository forbids a plugin-side CLI fetcher (`stack-and-tooling.rule.md` item 13). No surface may say or imply that installing the plugin delivers the CLI.
- **`archcore init` installs the plugin.** Its agent picker marks each selectable host "also installs the Archcore plugin", and a checked host is the consent to install it there. Nothing is installed for an unchecked host. Under `--yes` without `--agent`, and in CI, `init` prints the per-host commands and runs none.
- **CLI v0.8.0 added `archcore plugin install`, `update`, and `status`**, and `archcore update` refreshes the plugin on every host that already carries it.
- **The home page and `/how-to-use` both show one install path**, `curl` (or `irm`) then `archcore init`, and no Plugin / CLI tabs. The per-host plugin install lives behind one link to `https://docs.archcore.ai/plugin/install/#install-per-host`.
- **`#install` is the anchor on every page that renders an install block**, because the shared star CTA links there from all of them.

## Writing style

The full writing profile lives in `AGENTS.md` at the repository root. It sets ISO 24495-1-inspired plain language for every reader-facing surface, an ASD-STE100-inspired controlled style for agent-facing files only, and a humanizer pass in the shipping language. This rule still outranks it: positioning beats style.

Two conventions this rule pins directly, because they touch the canonical phrases:

- **No em dashes in prose.** The `humanizer` skill treats the em dash as a hard constraint, and this site had 252 of them in the English catalog. Replace with a period, comma, colon, or parentheses. Two exceptions: the brand separator in a `<title>` or OG title (`Archcore — Spec-Driven Development & Context Engineering`), which is a typographic convention rather than a prose tell, and code comments, which no reader sees.

This is why the hero subhead uses the **comma variant** of the canonical expanded definition. `product/canonical-narrative` clause 17 defers to this policy; the wording is identical either way.
- **Russian keeps its grammatical dash.** `humanizer-ru` bans «—» outright, but Russian requires it for an omitted copula («Настройка MCP — рутина», «Один конфиг — все агенты»). Strip the dash only where it is calqued from English: appositives, parenthetical asides, and consequence clauses that a comma or «и» carries better. Stripping a grammatical dash produces broken Russian, which is worse than the pattern it removes.
- **Russian keeps the formal «вы» everywhere, including inside quoted prompts.** The loop stages quote sentences the reader says to an agent; those are still site copy, so they read «Зафиксируйте решение…», never «Зафиксируй».

The pinned secondary phrase and meta description changed punctuation on 2026-08-07 (em dash to comma) under this policy. The wording is identical; the claim did not move. Any surface repeating them must use the comma form.

**The `humanizer` bans reach the short strings too.** The 2026-08-31 rebuild drafted "No command, no paste, no reminder." (rule of three plus a tailing-negation fragment), "a verdict per finding, not a summary" (tailing negation), and "The work between them has none." (staccato reversal). All three were rewritten before translation. Russian dropped «а не просто X» in the same pass, which is a hard ban in `humanizer-ru`. Run the pass on new strings before extracting, not after: a rewritten English string orphans its Russian translation.

## Entry-point framing

Decided 2026-07-06 (supersedes the earlier "Plugin is the recommended path" framing):

- **Both entry points are equals.** No "(recommended)" labels anywhere on the site — including the static prerendered route bodies in `scripts/prerender-routes.mts`, which are crawler-visible copy and drifted on this exact point once (fixed 2026-07-30).
- **Gentle plugin emphasis is allowed:** plugin copy may call itself "the most polished experience for Claude Code, Cursor, Codex CLI, and GitHub Copilot CLI". Never frame the CLI as a fallback.
- **The home page shows one install path and no Plugin / CLI comparison.** Changed 2026-08-27 under `landing/home-install-single-path.adr.md`. The hero install block carries platform tabs only (macOS / Linux against Windows), `#install` is its single anchor, `cross-agent-section.tsx` states the cross-agent claim over one flat agent list instead of two cards, and the shared header provides How to use, Blog, Learn, Integrations, Docs, and Install. The prior decisions this replaces: the CLI-first hero (2026-07-06), the plugin-first tab order (2026-08-11), and the `#install-cli` / `#install-plugin` hashes.
- **The install block stays in the hero.** Reaffirmed 2026-08-31 during the section reorder, when moving it below the loop was considered and rejected by the owner. `landing/home-install-single-path.adr.md` is unchanged.
- **`/how-to-use` presents no surface choice either.** Changed 2026-08-27 under `landing/how-to-use-cases.adr.md`. Each stage of the loop leads with a slash command and the sentence that does the same thing in any agent. There is no Plugin / CLI toggle, and the page never asks which one the reader has.
- **The equal-paths framing is unchanged by both.** What changed is where the reader meets the two entry points: `/plugin` and `/cli`, not the install step, not the header, not the walkthrough.
- **Frame the choice by the user's agent, not by recommendation**, on the surfaces that still present one — `/plugin` and `/cli`: Plugin — for Claude Code / Cursor 2.5+ / Codex CLI 0.117+ / GitHub Copilot CLI; CLI — any MCP-aware agent (Gemini CLI, OpenCode, Roo Code, Cline), scriptable in CI.
- **`/plugin` and `/cli` stay as pages, and left the header nav on 2026-08-27.** Both MUST stay in @src/components/SiteFooter.astro through @src/data/navigation.ts.

## Copy hierarchy (home `/`)

Every slot below takes its string from `product/surface-descriptors`, homepage table.

- **Hero eyebrow → H1 → subhead → supporting promise**, in that order
- **Meta title (`<title>`) / OG title / Twitter title / og:image:alt:** the same category-led string, so the SERP entry, the social card, and the image alt all agree
- **Meta description / OG description / Twitter description / SoftwareApplication JSON-LD description:** the homepage meta description; OG and Twitter may use the OG description variant
- **Works-with strip:** directly under the install block
- **OG image subtitle (`og-image.png`):** the hero subhead verbatim

### Section order (`landing.tsx`)

Fixed by `landing/home-loop-before-categories.adr.md` (2026-08-31). Component ids match the section anchors.

| # | Section | Component | Background |
|---|---------|-----------|------------|
| 1 | Category and product | `hero-section` | page |
| 2 | Problem | `problem-section` (`#problem`) | page |
| 3 | Proof | `before-after-section` (`#before-after`) | page, cards |
| 4 | How it works | `how-to-use-cycle-section` (`#how-it-works`) | band |
| 5 | Context engineering | `context-engineering-section` (`#context-engineering`) | page |
| 6 | Spec-driven development | `spec-driven-section` (`#spec-driven-development`) | band |
| 7 | Git-native | `git-native-section` (`#git-native`) | page |
| 8 | Cross-agent | `cross-agent-section` (`#cross-agent`) | band |

**This order overrides `product/surface-descriptors` at the sequence level, not at one slot.** The global descriptor runs hero, problem, spec-driven, context engineering, git-native, cross-agent, how-it-works. The landing deviates three times, and each deviation is recorded: Before/After is an addition (2026-08-10), the how-it-works slot became the loop itself rather than four abstract verbs (`landing/how-to-use-cases.adr.md`, 2026-08-27), and the loop moved ahead of the two category sections (`landing/home-loop-before-categories.adr.md`, 2026-08-31). Read those before "restoring" the global order.

**The loop sits at 4 because the page had no concrete use of the product above the sixth screen.** A visitor read the page and reported that he could not say what it would do for him. Problem and Before/After state and show the failure, the loop shows the four commands and the artifacts they leave, and the two category sections then argue why it works. Moving the loop back down re-creates the defect this order was written to fix.

**Before/After is an addition, and it is deliberate.** `product/jobs-to-be-done` keeps Job 1 (build by this repo's rules) as the primary product scenario, so the page needs its concrete demonstration early. It sits between the problem and the loop: problem stated, problem shown, product used.

**Sections 5 and 6 carry the category terms in their eyebrows and H2s.** Those two headings are SEO-load-bearing. Do not soften them into a benefit phrase, and do not delete the sections on the grounds that the pillar pages cover the same ground. `product/seo-information-architecture` gives the head queries to `/spec-driven-development/` and `/context-engineering/` and gives the home page the combined brand-plus-category query, which needs both terms present here.

**Sections 5 and 6 argue mechanism, not definition.** Context engineering leads with the pre-edit injection: the agent opens `src/api/rate-limit.ts` and the spec, ADR, and rule that constrain it arrive with no command. Spec-driven development leads with where the spec lives after the feature ships and carries the competitive framing line from `product/surface-descriptors`. Neither section defines its own term at length; the definitions belong to the pillar pages, which each section links with a descriptive anchor.

**Harness engineering is named once on this page**, in the context-engineering section body, linking to `/learn/harness-engineering/`. That is the shape `product/seo-information-architecture` names as correct. It was a five-sentence paragraph until 2026-08-31. Do not expand it back.

**The problem section names three failures, not the five in `product/surface-descriptors`.** The three kept are the ones the rest of the page answers: decisions disappearing into chat history (the loop), specs becoming stale handoff artifacts (spec-driven), every agent seeing a different project (cross-agent). "Architecture and conventions get re-explained, every session" restated the hero's supporting promise one screen below it. "Instruction files grow into walls of text" is argued in the FAQ and on `/claude-md/` and `/agents-md/`; the CLAUDE.md and AGENTS.md sentence stays in the `index.html` static body so the terms keep a home on this page.

Backgrounds alternate page / band from section 4 on, so the page does not read as one field of bordered cards. A new section picks the background that continues the alternation. Moving a section moves its background: `git-native-section` and `cross-agent-section` swapped on 2026-08-31 for exactly this reason.

**Section 8 states the plugin-host set in prose, not in a card.** It reads: slash commands, skills, and guardrails run inside the four plugin hosts; every other agent reaches the same context over MCP, with hook delivery only where the host supports it. That sentence and the `index.html` static paragraph under the same H2 must change together, and both must agree with `plugin-hosts-section.tsx` and `cli-agents-section.tsx`.

**Astro renders every home section directly from @src/components/pages/landing.tsx.** The generated HTML and hydrated page use the same component tree.
- **Section copy about documents:** Use "decisions, rules, plans, and guides" (not "experience")
- **Visible FAQ and FAQPage JSON-LD MUST use the same question and answer array.** @src/components/faq-list.tsx owns both representations.

## Structured data per route

1. Pages without a visible FAQ MUST NOT emit FAQPage markup.
2. Marketing FAQ components MUST pass their visible question and answer arrays to @src/components/faq-list.tsx.
3. Article layouts MUST generate visible FAQs and JSON-LD from the same collection frontmatter.
4. Metadata changes MUST preserve canonical URLs unless an explicit URL migration is approved.

@src/layouts/MarketingLayout.astro reads marketing metadata from @src/data/marketing-meta.json. @src/layouts/ListingLayout.astro emits CollectionPage; article layouts emit Article; pillar and recipe layouts emit WebPage. Sitemap generation lives in @src/pages/sitemap.xml.ts.

## Per-page heroes (`/plugin`, `/cli`, `/how-to-use`)

- **`/plugin` H1:** "Make your AI coding agent work like it already knows your repo." Same opener as the plugin README, so the page and the repository read as one surface.
- **`/cli` H1:** "Git-native project context for every AI coding agent."
- **`/how-to-use` H1:** "How to use Archcore". The introduction MUST use `howToDescription` from @src/data/product-copy.ts. The page MUST NOT repeat the H1 as a metadata label.
- **`/plugin` `<title>` is category-led**, not host-enumerated: "Archcore Plugin — Spec-Driven Development for Coding Agents". Four host names no longer fit a ≤60-char title, so the hosts live in the description instead. This mirrors the home title's rationale.
- **`/cli` `<title>`:** "Archcore CLI — Git-Native Context for AI Coding Agents", matching the CLI README H1.

Per-page OG cards (`scripts/generate-og-image.mts` `VARIANTS`) must mirror these page H1s and subheads. The `/how-to-use` card may shorten the heading to name the loop. The route-meta config in `scripts/prerender-routes.mts` `ROUTES` must mirror the page's `usePageMeta` arguments, and each route's static `body.paragraphs` must state the same claims as the page's visible sections — that body is what non-JS crawlers read.

**The `/how-to-use` OG variant describes the init → plan → document → review loop.** The image MAY use the shortened heading in @scripts/generate-og-image.mts; its description MUST come from @src/data/product-copy.ts.

### The loop: content contract

Governed by `landing/how-to-use-cases.adr.md`. The loop appears twice: as the whole of `/how-to-use` (after the claim and the install pair) and as the home page's How-it-works slot, which is section 4 as of 2026-08-31. Both render `src/content/how-to-use/cycle.tsx`.

- **The four stages are `init` → `plan` → `document` → `review`, numbered, in that order.** They are a loop, so the order is not a preference.
- **Each stage shows the skill and the prompt together.** The slash command in mono at the top, the sentence under it on the code surface. One without the other misrepresents the product.
- **The list is vertical on every surface and every breakpoint.** A four-column grid wrapped each prompt to four or five lines and hid the sequence, which is the one thing the section exists to show.
- **Every prompt in `cycle.tsx` is lifted from the trigger phrases in the plugin's own skills** (`plugins/archcore/skills/*/SKILL.md`, "When to use"). A reader who copies one must get the stage the card describes. Check content changes against that file, never against another landing page.
- **All four stages run on one running example** (rate limiting for a public API), so step 4 visibly reads the documents steps 2 and 3 wrote. A stage that switches subject turns the loop back into a feature list. The home context-engineering section continues the same example with `src/api/rate-limit.ts`; keep the two aligned.
- **The command-free part is stated after the loop, not as a fifth stage.** Hooks bring the applicable spec and ADR to the agent between the four steps.
- **The home variant names the three review verdicts** (`spec-wrong`, `code-wrong`, `ok`) in its closing copy. The `/how-to-use` variant does not; it closes on the round-again claim instead.
- **This content states product behavior in more detail than any other landing surface**, so it is the first thing a release falsifies. On any change to the four skills, re-read their "When to use" sections against `cycle.tsx`. Since 2026-08-31 the section sits higher on the home page, so a stale claim here is more visible, not less.

**Host support has one source on the landing site.** The host matrix in `plugin-hosts-section.tsx` (`/plugin`) is the single place that states which hosts the plugin runs in, and the agent grid in `cli-agents-section.tsx` (`/cli`) is the single place that states which agents the CLI supports. FAQ answers, hero copy, the home cross-agent sentence, the loop intro, and prerender bodies may summarize them but must not contradict them, and a status change updates the landing block, the docs page, and the repo tagline together.

**Known gap on `/plugin`, accepted 2026-08-27.** The `/plugin` hero shows four host install tabs with no CLI prerequisite step (only Copilot names `archcore init`). A reader who lands there from search has to reach the page FAQ ("Do I need to install the CLI separately? Yes, one global install.") to learn that the CLI comes first. Left as is by explicit decision when the home block was simplified. Do not "fix" it silently; it is a scoped exception, not drift.

**Current matrix (v0.7.0, from the CLI's `agent-hooks-integration.guide.md` and shipped code):**

- **Plugin hosts (4):** Claude Code (production), Cursor 2.5+, Codex CLI 0.117+, GitHub Copilot CLI (all implemented).
- **CLI over MCP (8):** Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline (manual setup).
- **CLI session hooks (5):** Claude Code, Cursor, Gemini CLI, Codex CLI, GitHub Copilot. OpenCode is never wired — its hooks are JavaScript plugins that cannot be written declaratively. Codex hooks need its experimental flag (`codex --enable hooks`) and do not run on Windows. Copilot has no pre-write context injection.
- **The home context-engineering section states pre-edit injection without naming a host.** Copilot has no pre-write context injection, so any copy that promises the behaviour "on every agent" is wrong. Keep the claim about what Archcore does, and leave the per-host truth to the two matrix sections.
- **GitHub Copilot CLI resolved 2026-08-07.** The earlier "landing follows the docs, which say planned" carve-out is retired: plugin v0.7.0 ships Copilot support with tests. **Copilot needs two install steps** — `copilot plugin install archcore-ai/plugin:plugins/archcore` AND `archcore init --agent copilot --project "$PWD"`. The second is required, not optional: the plugin deliberately ships no MCP server to Copilot, so a project that skips it has no document tools. Any surface showing the Copilot install path must show both steps.
- **`docs.archcore.ai` caught up on 2026-08-10.** The earlier warning here (host matrix said Copilot was planned, removed commands still documented) no longer holds: docs state Copilot as implemented with both install steps and the `github/copilot-cli#4234` rationale, carry only the four commands, list all four `/archcore:plan` tracks, and say 19 document types. The standing rule is unchanged: **where docs and shipped code disagree, the landing follows the code** — and this time the drift ran the other way, with this rule missing the `research` track the docs already had.

## CTA vocabulary

- **Home install anchor:** `#install` is the only one. All home install CTAs scroll to the hero install block, which renders the real copyable commands. `#install-cli` and `#install-plugin` were removed on 2026-08-27 with the tabs they pre-selected; do not reintroduce a hash that selects a product. Never link install CTAs to external destinations.
- **Header:** two plain nav items, "How to use" (internal, `/how-to-use`) and "Docs" (external, `docs.archcore.ai`); a GitHub link showing the GitHub mark and the word "Star"; and the language switcher. **No accent-coloured button.** "How to use" was one until 2026-08-27; onboarding and reference are two reads of the same depth, and the button was the last element competing with the install block for the eye. The mobile menu carries the same two items in the same plain list, with no promoted card.
- **No surface renders a star count.** The header pill and the bottom CTA button showed one until 2026-08-27. `github_star_clicked.stars` still carries the build-time number for analytics, and nothing displays it. Do not put the count back on a button: it reads as a scoreboard on a project whose number is still small.
- **Star CTA block (bottom of home):** primary action "Star on GitHub"; secondary link "Ready to try? Install now" → `#install`; two repo links, unadorned.
- **`/how-to-use` closing CTA:** The block MUST use the `.recipe-cta` presentation from the integration page. Its heading MUST be "Start with Archcore.". Its description MUST be "Keep your project decisions ready for the next task.". The primary link MUST read "Install Archcore →" and target `#install`. The secondary link MUST read "See how it works" and target `#cycle`.
- **Dedicated page CTAs:** `/plugin` uses "Install plugin" (primary) and "View on GitHub" (secondary); `/cli` uses "Install CLI" (primary) and "View on GitHub" (secondary). Each anchors to the page's own `#install` section.
- Never pair these with different verbs — each page must read consistently.

The `/plugin` page's Install section is a **4-tab** Radix Tabs widget: "Claude Code", "Cursor 2.5+", "Codex CLI 0.117+", "Copilot CLI". Copy for this widget stays host-specific and must not generalize across tabs.

## Content hub links

`/blog/` and `/learn/` are static Astro pages from the `content-site/` sub-build, not SPA routes. Link them with a full page load (`reload: true` in `site-nav.tsx`, plain `<a>` elsewhere) — never through React Router. Both must also appear in the crawler-visible navs: the `index.html` static fallback and `renderBody()` in `scripts/prerender-routes.mts`.

`/learn/` holds definitional reference pieces, `/blog/` holds dated guides and vendor changes. Keep that split in the intro copy of each index so the two hubs do not read as duplicates.

**Published articles state product facts too.** A release that changes the command set or the MCP surface can falsify an article — `blog/mcp-server-project-context.md` described the removed MCP prompts for a full release cycle. Sweep `content-site/src/content/` on every release that changes the product surface.

**`/alternatives/` is empty and the home page now creates demand for it.** The spec-driven section carries a differentiation sentence as of 2026-08-31, and `landing/seo-content-backlog.doc.md` rates "spec kit alternative" and "openspec alternative" as high chance. The `/alternatives/` index stays deferred until it has one entry (`landing/seo-growth.plan.md` A8), but the gap is now load-bearing rather than optional.

## Rationale

Consistent positioning across all touchpoints strengthens brand recognition. The equal-paths framing matches how users actually choose (by which agent they run, not by our preference) while the gentle plugin emphasis still guides users of the four plugin hosts to the richer experience. Keeping install CTAs in-page keeps the user in the funnel.

The home install block collapsed to one path on 2026-08-27 because the choice it offered had stopped being real and had never been safe. `archcore init` installs the plugin on every host the user checks, so the CLI path already delivered both; the Plugin tab, meanwhile, listed two marketplace commands and no CLI, and the plugin repository forbids fetching the CLI itself, so that tab shipped a path that fails on a clean machine. Two tabs asked the reader to compare two things before they knew what either was, and one of the two answers was wrong. The cross-agent cards went with them for the same reason: the page contradicted itself inside one scroll, offering one install above and two products to choose between below. The header followed, because it restated the split on every page of the site, including the ones written to retire it. The entry points did not merge, and neither did the pages. What moved is where the reader meets them: `/plugin` and `/cli` now, not the install step and not the header.

`/how-to-use` went the same way on the same day, and for a reason the install block had already proved. Its central mechanic was a Plugin / CLI toggle on four of five branches, so the page that was supposed to show what a week with Archcore looks like spent that week asking a question the rest of the site had stopped asking. Rebuilding it around plain-English prompts was not a simplification of the product story; it is what the product already does. The plugin's skills route on natural language, the CLI's tools reach the same instruments from any agent, and the slash command is a keystroke saver on four hosts.

The page then went through two more revisions the same day. From six independent jobs to a single loop: six cards showed the surface area and hid the argument, because nothing said that `review` reads what `plan` and `document` wrote, so the product looked like four unrelated conveniences instead of one cycle. Then the home page's abstract How-it-works section folded into the loop, because Capture → Connect → Apply → Evolve described the same four moves one screen from the concrete ones, and two passes at one mechanism read as two mechanisms. The abstract version's only advantage was brevity, bought by naming no command and producing no file. Its two surviving claims, no new service and context travelling through Git, are now the loop's closing line.

The home page reordered on 2026-08-31 for a defect the previous three revisions did not reach. Each of them fixed a section; none fixed the sequence. The page proved the problem early, with Before/After at slot 3, and then spent two full sections defining spec-driven development and context engineering before it ever showed the reader what they would type. A visitor said he could not tell what the tool would do for him, and the page structure is a sufficient explanation: the first concrete use sat six screens down. The fix was not to cut the category sections, which are the only category anchors on the highest-authority page, but to put the loop in front of them and turn them from definitions into mechanism. `product/seo-information-architecture` makes that safe: the pillar pages own the head queries, the home page owns the combined brand-plus-category query, and the terms it needs are in the title, the H1, both eyebrows, both H2s, and the body either way.

The hero tab order went plugin-first on 2026-08-11 and is superseded by the above. Ordering was never ranking, and neither is the removal.

The home H1 went category-led on 2026-08-10 under `product/two-discovery-categories`, which reverses the 2026-07-06 pain-first decision for the H1 slot specifically. The pain phrase did not disappear: it moved down one line as the supporting promise, where it still does the hook's job while the H1 states what Archcore is and what it competes for. The eyebrow ("Git-native context layer") keeps the product definition visible above the category line, so the reader gets the narrow answer before the broad one.

The `<title>` no longer diverges from the H1. Both are category-led, so SERP entry, social card, OG image, and page all state the same claim. That removes the exception `landing/home-title-category-keyword.adr.md` was written to sanction, and the ADR is superseded.

Host support and structured data get their own invariants because both failed silently: a stale host claim or an inherited FAQ block produces no build error, ships to production, and is only visible in the rendered HTML or a rich-results test. The command set now gets the same treatment: `/archcore:context` survived on the landing for a full release after it was deleted, because nothing in the build knows which commands exist. Install mechanics belong on that list too: "installing the plugin gets you both" shipped in the home FAQ and in the `index.html` FAQPage block, and "The CLI is auto-installed on first use" shipped in the `/how-to-use` walkthrough, while `/plugin`'s own FAQ said the opposite on the same site. Section parity joins the list as of 2026-08-31: Before/After rendered only in the SPA for three weeks, and no check anywhere noticed that the crawler-visible page was one section short.

## Examples

**Good (Hero):** eyebrow "Git-native context layer", H1 "Spec-Driven Development & Context Engineering for AI Coding Agents", subhead "Archcore keeps specs, architecture, decisions, rules, and plans in Git, and makes the right project context available to AI coding agents as they work.", then "Stop re-explaining your repo to every AI coding agent."

**Good (home install block):** the platform install script, then `archcore init`, then the works-with strip.

**Good (a loop stage):** `/archcore:document` in mono, then "Record the decision to use a token bucket in Redis." on the code surface, then the ADR it produces.

**Good (entry-point choice, on `/plugin` and `/cli`):** "Both paths use the same `.archcore/` directory. The difference is the experience layer."

**Good (plugin emphasis):** "The most polished experience for Claude Code, Cursor, Codex CLI, and GitHub Copilot CLI."

**Good (context framing):** "Four slash commands — and the everyday context needs none of them."

**Good (differentiation, in the spec-driven section):** "Methodology tools define a development process. Archcore keeps the resulting project knowledge alive, connected, versioned, and available to agents throughout implementation." — the competitive framing line from `product/surface-descriptors`. It states what Archcore does rather than what a named competitor fails to do, so a competitor's release cannot falsify it.

**Good (mechanism over definition):** the context-engineering section opening on the agent opening `src/api/rate-limit.ts` and receiving the spec, the ADR, and the rule that constrain it, instead of opening on five properties of engineered context.

**Bad:** "Turn your repository into structured, machine-readable context." — superseded primary phrase.

**Bad:** `<title>Archcore — repo memory for AI coding agents</title>` — superseded title; memory is retired as positioning on every surface, `<title>` included.

**Bad:** "Give Claude Code, Cursor, Codex & Copilot a brain for your codebase." — the superseded `/plugin` H1; "a brain for your codebase" is memory framing in a costume.

**Bad:** "Plugin (recommended)" — recommendation labels are retired; frame by the user's agent instead.

**Bad:** "The Plugin is the recommended runtime for Claude Code, Cursor, and Codex CLI" — same violation, in the prerendered `/how-to-use` body; shipped for months because nobody reads the static bodies.

**Bad:** "CLI is the main product; plugin is a nice-to-have" — the paths are equals.

**Bad:** A Plugin / CLI tab pair, a Plugin card beside a CLI card, a per-step Plugin / CLI toggle, or "Plugin" and "CLI" as header nav items. The home page installs one thing, the loop teaches one thing, and the header states one product.

**Bad:** "Capture → Connect → Apply → Evolve" as a section of its own. It names the same four moves as the loop without naming a command or a file, and having both makes one mechanism look like two.

**Bad:** The loop stages in a multi-column grid. Four columns wrap every prompt to five lines and lose the sequence, which is the whole claim.

**Bad:** Presenting the four commands as a feature grid with no order — they are `init` → `plan` → `document` → `review`, and `review` reads what the two before it wrote.

**Bad:** "More than a spec workflow" as a section heading. "Workflow" is banned in positioning copy by `product/messaging-and-voice`, and the differentiation is one sentence inside the spec-driven section, not a ninth section.

**Bad:** Restoring the two category sections ahead of the loop to match `product/surface-descriptors`. The deviation is deliberate and recorded; reconcile by reading `landing/home-loop-before-categories.adr.md`, not by reverting.

**Bad:** A home section that renders only in the SPA. `index.html` carries the same H2s in the same order, and nothing in the build enforces it.

**Bad:** "Pick a path: install, quick start, capture existing code, or use a decision." — the retired walkthrough's own CTA copy, which outlived the walkthrough by one commit.

**Bad:** "The plugin runs on the CLI under the hood, so installing the plugin gets you both." — shipped in `faq-section.tsx` and the `index.html` FAQPage block. The plugin never installs the CLI.

**Bad:** "The CLI is auto-installed on first use if it's not already on PATH." — shipped in the `/how-to-use` Claude Code install step. The plugin repository forbids a plugin-side CLI fetcher.

**Bad:** Describing `/archcore:plan` as a fixed idea → PRD → spec → plan cascade — that is v0.7. The route is computed, and a small fix produces no documents at all.

**Bad:** `/archcore:standard` in the prerendered `/plugin` body — a command that does not exist in the four; the static bodies count as copy and must be reviewed like copy.

**Bad:** "Run `/archcore:context` before editing" — the command was deleted in v0.7.0 and context injection is automatic. Same for `capture`, `decide`, `audit`, `help`.

**Bad:** "GitHub Copilot is on the roadmap" — shipped in v0.7.0.

**Bad:** "Archcore turns your repository into structured, machine-readable context" restored by the `/teams/getting-started` cleanup effect — the superseded primary phrase shipped there, in a code path that only runs when the visitor navigates away, until 2026-08-07. Meta written imperatively in a `useEffect` is copy, and it drifts where nobody looks.

**Bad:** Showing only `copilot plugin install …` for Copilot — without `archcore init --agent copilot` the user gets a plugin with no document tools.

**Bad:** `/privacy/` serving the home page's FAQPage JSON-LD — structured data must describe the page it is on.

**Bad:** "Install Plugin" CTA linking to `https://github.com/archcore-ai/archcore-plugin` — forces a context switch; the page has the commands.

## Shared product descriptions

1. Repeated product definitions and expanded descriptions MUST use @src/data/product-copy.ts.
2. React components MUST translate the shared message descriptors through Lingui.
3. Astro layouts and Node scripts MUST read the English message from the same descriptors.
4. Authors MUST preserve the existing descriptor IDs when editing their messages.
5. General article CTAs MUST use the same expanded description as the home hero.
6. Integration descriptions MAY state Archcore's contribution to the named pair without replacing the product definition.
7. Host summaries MUST distinguish MCP access from automatic hook delivery.
8. Copy MUST NOT promise pre-write injection to every MCP-aware agent.
9. Copy MUST describe recording a decision as an explicit request to the agent.
10. Copy MUST NOT promise that Archcore automatically records every decision.
11. Shipping copy MUST NOT make an unqualified "No telemetry" claim.
12. Analytics descriptions MUST distinguish local project-document storage from installation, update, and website analytics.
13. Analytics details and opt-out instructions MUST remain consistent with @src/components/pages/privacy.tsx.
14. References to the how-to page MUST describe the init → plan → document → review loop.

The owner approved these corrections after the site-wide messaging audit on 2026-09-09. The trust strip now says "Open source · Local-first". This replaces its former telemetry claim. The article CTA no longer promises automatic pre-edit delivery to every host. The CLI hero, metadata, and OG image use one description. The plugin's generic description states project-context availability; host-specific sections describe automatic delivery.

## Enforcement

The Astro migration removed the hand-written crawler bodies and the second content build. Historical references to index.html and prerender-routes.mts above describe former failure cases; use the source map below for current changes.

1. Copy edits MUST preserve the pinned positioning and section order in this rule.
2. Marketing metadata edits MUST use the description selected by @src/data/marketing-meta.json from @src/data/product-copy.ts in both the Astro layout and localized page metadata.
3. Navigation edits MUST update @src/data/navigation.ts, which supplies the shared Astro header and footer.
4. FAQ edits MUST retain one source for visible answers and structured data.
5. Command and host claims MUST remain consistent across @src/components/sections/, @src/content/how-to-use/, and @src/content/.
6. OG copy edits MUST update the matching variant in @scripts/generate-og-image.mts.
7. English copy edits MUST receive the humanizer pass before extraction.
8. Russian translations MUST preserve the English claims and formal address.
9. Validation MUST include i18n extraction, translation, compilation, the full build, and browser checks against dist/.
10. Migration baseline updates MUST correspond to an intentional content or SEO change.

@scripts/verify-build.mts compares existing URL metadata and article content with @scripts/fixtures/seo-baseline.json. @tests/site.spec.ts checks rendered routes, localization, installation, and native navigation. Review @public/og-image*.png when its source copy changes.
