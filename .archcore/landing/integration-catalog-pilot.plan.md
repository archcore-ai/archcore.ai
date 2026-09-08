---
title: "Integration Catalog: Superpowers Pilot Implementation"
status: draft
tags:
  - "integrations"
  - "product"
  - "web"
---


## Astro migration update (2026-09-09)

The catalog now builds in the single root Astro project. Source paths formerly under content-site/src/ are under src/. The 404 page, content-based sitemap dates, shared shell, copy/download checks, and responsive browser checks are implemented. Plugin publication and joint-run evidence remain external gaps: the page continues to identify the recipe as experimental and the source revision as unpublished.

The remaining sections record the original implementation history.

## Goal

Build the first integration catalog on archcore.ai: `/integrations/` and `/integrations/superpowers/`. The first page explains the Archcore + Superpowers recipe and provides connection instructions with an explicit experimental status.

This is the landing-local implementation plan. It refines the shared Integration Catalog: Recipe Access and Verification contract and the cross-repository pilot in the mounted archcore source, where it is phase P3. Plugin remains the authoring source for cooperation instructions.

## Declared Delta

- creates: integration-catalog, already declared by the global pilot.
- modifies: content collection registration, content build merge, navigation, sitemap output, and recipe acquisition events.
- retires: none.
- decision: the accepted main-site catalog location remains unchanged.
- route: local decomposition of the existing capability contract; no duplicate product specification.
- gap profile: machine for current build and navigation; undecided for snapshot fields; empirical for upstream recipe compatibility.
- maturity: stone for the static site boundary; pencil for recipe presentation and snapshot format.
- risks: external-contract for published URLs, downloadable instructions, and compatibility claims.

## Current State

Inspected on 2026-09-08. Landing had no integration collection, route, or recipe snapshot. Its working tree was clean before this plan.

@content-site/src/content.config.ts registered blog, learn, alternatives, and pillars. @scripts/merge-content.mts copies explicit hub directories into the Vite output. It uses build time for sitemap modification dates. @src/lib/analytics/events.ts had no integration content section.

The plugin repository contains the experimental recipe under integrations/superpowers, with cooperation instructions and a connection README. Those files are local and uncommitted. No joint Superpowers run or host-specific recipe installation has been verified. Repository presence is not a published recipe release.

## Snapshot Shape

Settled on 2026-09-08 during implementation. The snapshot is an Astro content collection entry, not a standalone data file, because the record splits three ways by owner and the collection is what keeps the split visible:

- The entry body is landing's presentation copy.
- @content-site/src/recipes/ holds the verbatim instruction file imported from plugin. Nothing in landing edits it.
- The entry frontmatter binds them: recipe identity, source repository and path, upstream revision, instruction digest, participating tools, host guidance, evidence records, limits, and maintainer.

The collection also supplies the Zod schema, the raw-markdown twin, the sitemap entry, and the merge into `dist/` that a standalone file would each need re-implementing. A machine-readable index for a later assembler can be generated from the collection without introducing a second authored source.

Publication status is derived from the evidence array rather than authored, so no edit can assert a verification that has no record behind it.

## Tasks

### 1. Define the first recipe snapshot — done

Targets: @content-site/src/content.config.ts, @content-site/src/content/integrations/superpowers.md, @content-site/src/recipes/superpowers/cooperation.md, and @content-site/src/lib/recipe-source.ts.

1. Read the current recipe files in the plugin repository.
2. Select the fields needed by the first page and downloadable instructions.
3. Import an explicit snapshot with source identity, instruction digest, update date, dependencies, setup guidance, and evidence state.
4. Keep cooperation instructions unchanged in the imported snapshot.
5. Separate editable presentation copy from imported instructions.
6. Reject missing recipe resources and evidence associated with a different instruction digest.

The digest is a sha256 of the imported file, checked in `getStaticPaths` against the value recorded in the entry. Verified by fault injection: appending one line to the imported file fails the build with both digests named. `evidenceForDigest` drops records belonging to another revision; it has nothing to filter yet, because no evidence exists.

`source.revision` is null. The recipe source is uncommitted in plugin, so the page pins the text by digest and says the source is unpublished rather than linking a moving target.

### 2. Build the catalog index and recipe page — done

Targets: @content-site/src/pages/integrations/index.astro, @content-site/src/pages/integrations/[slug].astro, @content-site/src/layouts/RecipeLayout.astro, @content-site/src/layouts/ListingLayout.astro, and @content-site/src/styles/content.css.

1. Add the integration collection to @content-site/src/content.config.ts.
2. Add the static `/integrations/` index with one substantive recipe entry.
3. Add the static `/integrations/superpowers/` detail page.
4. Explain the problem solved, each tool's contribution, both entry points, and artifact ownership.
5. Display the recipe revision, verification scope, known limitations, and update guidance.
6. Provide an experimental label while joint execution evidence is absent.
7. Reuse the site's typography, theme, header, and footer.

@content-site/src/layouts/ListingLayout.astro gained an optional `meta` line beside its optional `pubDate`, so the catalog shows tools and status where the article hubs show a date. RecipeLayout emits WebPage and BreadcrumbList, deliberately not schema.org Recipe.

Empty entries for FPF, OpenSpec, Context7, Graphify, and grill-me remain outside the first page set.

### 3. Add connection guidance and instruction access — done

Targets: @content-site/src/components/RecipeSetup.astro and @content-site/src/pages/integrations/[slug]/[file].ts.

1. Present instructions for an existing tool setup and for missing prerequisites.
2. Add agent-specific guidance where setup differs.
3. Keep a visible generic connection path for unlisted harnesses.
4. Distinguish available guidance from checked installation environments.
5. Add copy and download actions using the displayed snapshot.
6. Preserve selectable instructions if clipboard access fails.
7. Replace repository-relative dependency links in the exported package with valid distributable links.
8. Verify keyboard access and selected-path visibility on narrow screens.

Named guidance covers Claude Code, Codex CLI, Codex App, Cursor, and GitHub Copilot; each is marked written but unexercised. Every host panel is in the initial HTML and visible without JavaScript; the script upgrades the list into a tablist with arrow-key movement. The generic path is prose, not a panel, so it cannot be hidden behind a tab.

The displayed text, the copy action, and the download at `/integrations/superpowers/cooperation.md` all resolve through one function, and the built artifact was checked byte-for-byte against the plugin source.

Item 8 is only half done: the markup carries the tablist roles, ids, and key handling, but no browser check has been run — see Remaining.

### 4. Integrate build output, navigation, and SEO — partly done

Targets: @scripts/merge-content.mts, @scripts/prerender-routes.mts, @content-site/src/components/SiteHeader.astro, @src/components/sections/site-nav.tsx, @src/lib/links.ts, and @index.html.

1. Include the integration directory and instruction assets in the merged build.
2. Add catalog links to the content navigation, site footer, and corresponding crawler-visible navigation.
3. Use full-page navigation when crossing from React routes into Astro content.
4. Add canonical URLs, page-specific titles, descriptions, and social metadata.
5. Use structured data matching the visible catalog and recipe content.
6. Derive integration sitemap dates from substantive content changes.
7. Verify that repeated merge execution produces no duplicate sitemap entries.
8. Preserve existing routes and the separate role of root agent pages.

Item 6 is not done and is deliberately deferred. Both @scripts/merge-content.mts and @scripts/prerender-routes.mts use the build date for every route. Changing that for the catalog alone would put two conventions in one sitemap; it belongs to a change that covers every content route.

Item 7 needed no work — the `fresh` filter in @scripts/merge-content.mts already skips routes present in the sitemap. Confirmed by running the merge twice against one build.

Titles are 57 and 58 characters, descriptions 159 and 160, one H1 per page. `Integrations` was added to the Lingui catalogs and compiled. No Russian hreflang was added.

### 5. Add recipe acquisition events — done

Targets: @src/lib/analytics/events.ts and @src/lib/analytics/core.ts.

1. Extend content classification to include integrations.
2. Record recipe identity, revision, and selected installation path for connection actions.
3. Reuse existing event handling where its meaning matches the action.
4. Avoid duplicate semantic and generic events for one interaction.
5. Keep recipe access functional when analytics is unavailable.

Three events were added: `recipe_instructions_copied` (with `via` separating the button from a manual selection), `recipe_instructions_downloaded`, and `recipe_host_selected`. All three carry the recipe and instruction digest.

`ContentSection` also gained `pillar`, which @content-site/src/layouts/PillarLayout.astro had been emitting while the union listed only the three article hubs. The cast in @content-site/src/components/Analytics.astro was widening a value the type said could not exist.

Duplicate suppression is explicit: `attachCodeCopyTracking` in @src/lib/analytics/core.ts now skips both the button and the selection path inside `[data-analytics-recipe]`, matching the existing `[data-analytics-install]` escape hatch.

### 6. Validate the production artifact and prepare handoff — partly done

Targets: @package.json, @scripts/build-content.mts, and generated dist output.

1. Verify snapshot validation with missing resources and mismatched evidence inputs.
2. Extract and compile translations when shared navigation strings change.
3. Run `npm run build` with the repository's documented environment configuration.
4. Inspect both routes in the merged production artifact.
5. Verify initial HTML, canonical metadata, structured data, sitemap entries, and instruction downloads.
6. Compare displayed, copied, and downloaded instructions against the selected source snapshot.
7. Check host selection, generic guidance, keyboard operation, mobile layout, and clipboard failure behavior in the browser.
8. Check direct navigation, unknown recipe paths, and operation with analytics blocked.
9. Record the built revision, remaining verification gaps, and deployment handoff.

`npm run check` and `npm run build` pass. Both routes, the twin, and the instruction file exist in `dist/`, with correct canonicals, WebPage, BreadcrumbList, and CollectionPage/ItemList data, and two sitemap entries that do not duplicate on a repeated merge.

Item 7 was not run: the local Chrome profile was held by another instance. The markup and bundled script were inspected instead, which is not the same evidence.

Item 8 is partly answered and the answer is a defect — see Remaining.

## Remaining

1. **Unknown recipe paths render nothing.** @vite.config.ts copies `index.html` to `404.html`, and @src/App.tsx has no catch-all route, so `/integrations/anything/` returns status 404 with a blank SPA shell. The linked catalog contract requires a not-found outcome. This is site-wide rather than catalog-specific, and it needs a decision before the catalog is published.
2. **Browser checks.** Host selection, keyboard operation, narrow screens, clipboard failure, and behavior with analytics blocked.
3. **Sitemap dates from content changes**, across every content route rather than the catalog alone.
4. **The recipe source is unpublished.** Until `integrations/` is committed and released in plugin, `source.revision` stays null and the page cannot link one versioned source, which the catalog contract and the shared SEO document both call for.
5. **Host guidance for Cursor and GitHub Copilot** was written from those products' documented instruction-file conventions, not from the recipe source, which does not yet name them. Confirm against plugin.
6. **No evidence exists.** Every behavioral statement on the page is intended behavior. The evidence table and the derived status stay empty until a joint run is recorded.

## Acceptance Criteria

- Both planned routes exist in the merged production artifact with substantive initial HTML.
- Page copy and instruction exports identify the same recipe snapshot.
- Visitors can find prerequisite setup, named-agent guidance, and the generic connection path.
- Experimental status and unavailable evidence remain visible without implying tested compatibility.
- New links, metadata, sitemap entries, and interaction checks pass against built output.
- The handoff records source identity and unresolved gaps without claiming installation or joint execution success.

The first five hold for the built artifact, except the interaction checks in item five. The sixth is what the Remaining section records.

## Dependencies

Sequence: snapshot definition → pages and connection access → build integration and analytics → production verification. Navigation and layout work can proceed while host instructions are researched.

Landing development started without waiting for plugin-side live trials. The consequence is recorded rather than hidden: the page's behavioral statements come from the recipe README, which describes intended outcomes, and the page says so. Plugin supplies authoritative cooperation instructions and later execution evidence. Global retains shared product and release contracts. Docs provides operational depth beyond the recipe page.

The first delivery excludes a dependency installer, recipe assembler, new harness, account system, payments, community publishing, and arbitrary integration generation. New recipes follow after the first page and delivery path work.

## Clarifications

The user corrected the requested destination from plugin to landing. This plan records website work, rather than moving plugin execution tasks under a different directory. Existing recipe files remain in plugin.

On 2026-09-08 the user asked to start the catalog implementation and to bring the plugin details later. The snapshot shape was settled during that work and is recorded above. Host instruction files, the upstream revision, and evidence records are the details still expected from plugin.
