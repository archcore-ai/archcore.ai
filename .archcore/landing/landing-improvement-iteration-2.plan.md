---
title: "Landing improvement iteration 2 — review fixes (copy, mobile, artifact section, SEO)"
status: draft
---

## Goal

Implement the findings of the 2026-07-06 landing review (desktop + mobile + SEO audit, squirrelscan score 81/B) in one iteration of four independently shippable phases. The review's core diagnosis: the page sells the pain and the outcome but never states what Archcore *is*, never shows the `.archcore/` artifact, and its body content is invisible to non-JS crawlers. Fixed inputs decided by the owner:

- **Framing (D1):** both entry points are presented as equals, with a *gentle* emphasis on the Plugin as the richer experience; the CLI remains the default tab in the home hero and the primary path in navigation. The wizard's install branch drops the "(recommended)" label and frames the choice by the user's agent instead.
- **Hero subhead (variant A):** "Archcore keeps your decisions, rules, and architecture as structured docs in your repo — loaded into your agent over MCP before it edits."
- **Kept untouched:** the hero install block and the demo (content unchanged; only its container changes from GIF to video in Phase 4).

## Tasks

### Phase 1 — Copy quick wins (S)

1. Replace the hero subhead with variant A across all four copy layers per the messaging rule's enforcement section: page component `<Trans>`, `usePageMeta` description, `scripts/prerender-routes.mts` home route, `scripts/generate-og-image.mts` subtitle.
2. Add a "Works with" strip under the install block: "Works with Claude Code · Cursor · Codex CLI · Copilot · Gemini CLI · any MCP agent" (plain text, no logos).
3. Expand the FAQ from 2 to 6 questions: context-window cost, code privacy/local-first, import of existing CLAUDE.md / .cursor/rules, supported agents. Verify each draft answer against actual product behavior before publishing.
4. Add a secondary "Install now ↑" anchor (to `#install`) inside the star CTA section; the star remains the block's primary action.
5. Fix RU formality mix: `ru/messages.po:1116` and `:1260` use «ты» while the rest of the locale uses «вы» — normalize to «вы».
6. Apply D1 framing: in the wizard install branch (`src/content/how-to-use/install.tsx`) remove "(recommended)", reframe the Plugin option as "for Claude Code / Cursor / Codex" and the CLI option as "any MCP-aware agent, scriptable in CI", keeping a light plugin-forward nudge in the blurb copy.
7. Rewrite `.archcore/messaging-alignment.rule.md` so it matches the shipped site again: new canonical H1 ("Stop re-explaining your repo to every AI agent."), subhead variant A, dual-path framing with CLI as home-hero default, current CTA vocabulary. The rule must return to being the single source of truth.
8. Run the i18n workflow (extract → translate RU → build) for all copy changes.

### Phase 2 — Mobile fixes and hygiene (S)

1. Header at ≤480px: stop the ★ badge overlapping the "archcore" wordmark (measured −5px at 390px). Hide either the star count (keep the icon) or the wordmark (keep the mark); hiding the count also removes the low-count anti-signal.
2. Raise touch targets to ≥44px on touch viewports: copy buttons (now 28×28), wizard footer buttons (32px), header controls (32px), footer links (~20px). Grow the hit area, not necessarily the visual size.
3. Remove the hard `<br>` from the hero H1 (at least on mobile) so `text-balance` can wrap it evenly.
4. Add trailing slashes to `INTERNAL_LINKS` in `src/lib/links.ts` (and any other hrefs) so internal navigation stops hitting GitHub Pages 301s (`/plugin` → `/plugin/`).
5. Shorten `/plugin` meta: title to ≤60 chars (now 66), description to ≤160 (now 175) — again across all four copy layers.
6. Generate sitemap `lastmod` from the build date instead of the frozen 2026-05-06.
7. Delete unused `public/chat-mcp.gif` (1.5 MB shipped on every deploy).

### Phase 3 — Artifact section (M)

1. Build a new home-page section showing what the user actually gets: a mini `.archcore/` file tree, the document types (ADR, rule, guide, spec), and relations between them. Adapt `cli-repo-layout-section.tsx` from `/cli` rather than building from scratch.
2. Placement: between Before/After and the wizard; decide during implementation whether it stands alone or absorbs the "How it works" strip (avoid two adjacent low-density sections).
3. Localize (extract + RU) and keep the section consistent with the updated messaging rule vocabulary ("decisions, rules, plans, and guides").

### Phase 4 — SEO foundation and media (M)

1. Extend prerendering to full route bodies: today the served HTML contains only title/meta/H1, so Bing and LLM crawlers (ChatGPT, Perplexity, Claude) see an empty page. Extend `scripts/prerender-routes.mts` to emit full static HTML per route (headless render at build time or vite-ssg equivalent); GitHub Pages serves it fine.
2. Resolve the RU hreflang conflict (open decision): hreflang points to `/?lang=ru`, which serves English HTML with a canonical to `/`. Either build real prerendered `/ru/` routes or drop the hreflang claims until they exist. Decide together with task 1.
3. Convert the demo from GIF (2.1 MB) to a looped `<video>` (mp4/webm, same content, 3–5× lighter) via the existing `scripts/demo-export` pipeline, and produce a mobile-legible variant (larger type or taller crop, served via media query) — at 342px wide the current demo text is at the edge of readability.
4. Code-split the 514 KB `index-*.js`: lazy-load the wizard and below-fold sections, defer PostHog until first interaction.
5. Add FAQPage JSON-LD once the FAQ has 6 questions (after Phase 1).
6. Add copy buttons to wizard example surfaces — the intro promises "copy-pasteable commands" but `ExampleSurface` renders a bare `pre`.

## Acceptance Criteria

- All copy changes are synchronized across the four layers (component, `usePageMeta`, prerender routes, OG variants); `npm run i18n:extract` + RU translation done; `npm run build` passes; regenerated OG images and dist meta visually inspected.
- RU locale contains no «ты»-forms; spot-check hero and Before/After strings.
- At 390px (and 360px) emulation: no header overlap, no horizontal scroll, interactive controls ≥40px on touch.
- `curl https://archcore.ai/` returns HTML containing Before/After and FAQ text (body prerendered), not just title/meta/H1.
- Internal links resolve with a single 200 — no 301 hops.
- `/plugin` title ≤60 chars, description ≤160 chars.
- Demo ships as video with a poster frame; hero media weight drops versus the 2.1 MB GIF; mobile variant legible on a real device.
- squirrelscan re-audit (surface, same 4 pages) scores ≥90 overall.
- `.archcore/messaging-alignment.rule.md` matches the shipped copy exactly — no drift between rule and site.

## Dependencies

- Phase 1 task 7 (rule rewrite) depends on D1 framing (resolved: equals with gentle plugin emphasis, CLI hero default).
- Phase 4 task 5 (FAQPage JSON-LD) depends on Phase 1 task 3 (six FAQ entries).
- Phase 4 task 2 (RU hreflang) should be decided alongside Phase 4 task 1 (full prerender) — building `/ru/` routes only makes sense once body prerendering exists.
- Phase 4 task 3 reuses the `scripts/demo-export` pipeline documented in the animated-product-demo task-type.
- Phases 1 and 2 are independent of each other and of 3–4; recommended shipping order is 1 → 2 → 3 → 4 (copy first so the artifact section and structured data build on final vocabulary).
- All copy work follows the i18n workflow guide; meta changes follow the messaging rule's four-layer enforcement.