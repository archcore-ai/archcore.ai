---
title: "Integration catalog, explanation, and installation presentation"
status: accepted
tags:
  - "integrations"
  - "web"
---

## Rule

Scope: @src/content/integrations/, @src/recipes/, @src/pages/integrations/, @src/layouts/CatalogLayout.astro, @src/layouts/RecipeLayout.astro, @src/components/RecipeSetup.astro, @src/styles/content.css.

### Catalog and page structure

1. Catalog maintainers MUST render published integrations through CatalogLayout.
2. Catalog maintainers MUST order entries by heading.
3. Catalog entries MUST show the integration name, outcome summary, category, and detail-page link.
4. From 768 px, catalog maintainers MUST lay out the cards in two equal columns.
5. Below 768 px, catalog maintainers MUST stack the cards in one column.
6. Catalog maintainers MUST NOT add empty placeholder cells. An odd last card keeps one column.
7. Integration maintainers MUST retain the hidden logo and status data.
8. Integration maintainers MUST keep catalog/detail identity logos and status badges visually hidden through data-hide-integration-branding.
9. Recipe authors MUST use RecipeLayout for integration detail pages.
10. Recipe maintainers MUST show the catalog backlink before the title.
11. Recipe maintainers MUST place the summary below the H1.
12. On desktop, recipe maintainers MUST align the Install button with the top of the title block.
13. Recipe maintainers MUST make How it works the initial tab.
14. With benefits content present, recipe maintainers MUST label its tab Benefits & limits.
15. Recipe maintainers MUST preserve existing tab fragments, including #pilot-results.
16. Recipe maintainers MUST display explanation content in one reading column.
17. Recipe maintainers MUST present installation through RecipeSetup rather than a third tab.

### Naming an integration

18. Recipe authors MUST name an integration "Partner + Archcore". The partner tool comes first.
19. Recipe authors MUST use this order in the catalog card title, the H1, and the meta title.
20. Recipe authors MUST use this order in the meta description and the explanation heading.
21. These fields come from heading, title, and description in @src/content/integrations/.
22. Recipe maintainers MUST NOT apply this order to the imported files in @src/recipes/.
23. A heading edit in @src/recipes/ invalidates the digest and the evidence linked to it.
24. WHEN copy names a section of an external file, recipe authors MUST keep that file's own wording.
25. WHEN a published page changes its title or description, recipe maintainers MUST update @scripts/fixtures/seo-baseline.json.

### How the explanation is written

26. Recipe authors MUST name the joint outcome before the supporting mechanism.
27. Recipe authors MUST state each tool's contribution in the tools role field.
28. Recipe authors MUST describe agent actions in execution order through workflow.steps.
29. Recipe authors MUST identify where designs, execution plans, and durable decisions are stored.
30. Recipe authors MUST distinguish requested agent behavior from verified behavior.
31. Recipe authors MUST state benefits as concrete avoided work, preserved context, or controlled decisions.
32. Recipe authors MUST state the material limitation beside the claim it qualifies.
33. Recipe authors MUST use direct present-tense explanations instead of a chronological pilot report.
34. Recipe authors MUST avoid interpreting unexecuted scenarios as successful verification.
35. Recipe authors MUST follow @AGENTS.md for plain language, source attribution, and SEO.

### Installation panel

36. RecipeSetup maintainers MUST preserve the sequence: install both tools, add instructions, check in a new session.
37. RecipeSetup maintainers MUST link Archcore installation to /how-to-use/.
38. RecipeSetup maintainers MUST display the complete imported Markdown inside the instruction panel.
39. RecipeSetup maintainers MUST label the panel CLAUDE.md / AGENTS.md / GEMINI.md.
40. RecipeSetup maintainers MUST keep the panel header darker than its Markdown content.
41. RecipeSetup maintainers MUST provide a compact outline Copy instructions button with a copy icon.
42. RecipeSetup maintainers MUST preserve the collapsed 14rem Markdown maximum height from @src/styles/content.css.
43. RecipeSetup maintainers MUST allow expanding and collapsing the Markdown panel.
44. In either panel state, RecipeSetup maintainers MUST copy the entire instruction text.
45. WHEN clipboard access fails, RecipeSetup maintainers MUST expose selectable instructions and manual-copy feedback.
46. WHEN JavaScript is disabled, RecipeSetup maintainers MUST preserve inline installation instructions.
47. RecipeSetup maintainers MUST support keyboard opening, Escape closing, and focus return for the installation dialog.
48. RecipeSetup maintainers MUST center the modal within the viewport.
49. RecipeSetup maintainers MUST omit the removed Paste into CLAUDE.md and Download .md toolbar.

### Source ownership

50. Recipe authors MUST keep presentation copy in @src/content/integrations/.
51. Recipe maintainers MUST import upstream instruction files verbatim into @src/recipes/.
52. WHEN a source revision is published, recipe maintainers MUST record the source repository, file path, and revision.
53. WHEN a source revision is unpublished, recipe maintainers MUST retain revision: null.
54. Recipe maintainers MUST recompute digest from the imported bytes.
55. Recipe maintainers MUST preserve digest validation in @src/lib/recipe-source.ts.
56. Recipe authors MUST associate verification evidence with the exact instruction digest.
57. Recipe maintainers MUST preserve raw Markdown and instruction-download routes despite hidden download controls.
58. Recipe maintainers MUST retain source and verification details outside the primary explanation.
59. Recipe maintainers MUST retain the compact closing CTA from RecipeLayout.

## Rationale

The owner requested a short explanation with installation immediately accessible, compact copyable instructions, and hidden branding/status. Separating presentation from upstream Markdown prevents a copy edit from changing agent instructions.

The catalog held one card per row while it listed a single integration. With three entries, a single column left most of the page width unused, so the owner asked for two columns.

The owner also asked for partner-first names. A reader who looks for OpenSpec or Spec Kit sees their tool at the start of the card title, the H1, and the search result.

## Examples

### Good

For Superpowers, the explanation states that the agent reads existing decisions before design, keeps Superpowers plans in their own files, and records approved durable decisions in Archcore. The limitation identifies the unverified design-to-ADR step. The page is titled "Superpowers + Archcore".

The source pointer for this snapshot is @src/content/integrations/superpowers.md. The imported instruction bytes live at @src/recipes/superpowers/cooperation.md, and its own heading stays "### Archcore + Superpowers".

### Bad

A page presents a pilot timeline as its main explanation, marks every host verified after one run, edits the imported instructions to shorten their prose, or renames the heading inside @src/recipes/ to match the page title.

## Enforcement

Manual review checks the reading sequence, tool roles, ownership, claims, hidden branding, and retained source access.

@src/pages/integrations/[slug].astro validates instruction bytes and filters evidence against the current digest. @scripts/verify-build.mts compares published titles and descriptions against @scripts/fixtures/seo-baseline.json. @tests/integration-tabs.spec.ts and @tests/site.spec.ts cover existing integration behavior. Verify modal position, focus, expansion, full-text copying, the two-column and stacked catalog layouts, dark mode, and the no-JavaScript fallback against dist/ after UI changes.

The field name pilot and the #pilot-results fragment remain implementation identifiers. Their presence is not permission to reintroduce pilot-oriented presentation copy.
