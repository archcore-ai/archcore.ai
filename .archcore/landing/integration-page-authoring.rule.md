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
14. With example content present, recipe maintainers MUST label its tab Examples and place it between How it works and Benefits & limits.
15. With benefits content present, recipe maintainers MUST label its tab Benefits & limits.
16. Recipe maintainers MUST preserve existing tab fragments, including #examples and #pilot-results.
17. Recipe maintainers MUST display explanation content in one reading column.
18. Recipe maintainers MUST present installation through RecipeSetup rather than a tab of its own.

### Naming an integration

19. Recipe authors MUST name an integration "Partner + Archcore". The partner tool comes first.
20. Recipe authors MUST use this order in the catalog card title, the H1, and the meta title.
21. Recipe authors MUST use this order in the meta description and the explanation heading.
22. These fields come from heading, title, and description in @src/content/integrations/.
23. Recipe maintainers MUST NOT apply this order to the imported files in @src/recipes/.
24. A heading edit in @src/recipes/ invalidates the digest and the evidence linked to it.
25. WHEN copy names a section of an external file, recipe authors MUST keep that file's own wording.
26. WHEN a published page changes its title or description, recipe maintainers MUST update @scripts/fixtures/seo-baseline.json.

### How the explanation is written

27. Recipe authors MUST name the joint outcome before the supporting mechanism.
28. Recipe authors MUST state each tool's contribution in the tools role field.
29. Recipe authors MUST describe agent actions in execution order through workflow.steps.
30. Recipe authors MUST identify where designs, execution plans, and durable decisions are stored.
31. Recipe authors MUST distinguish requested agent behavior from verified behavior.
32. Recipe authors MUST state benefits as concrete avoided work, preserved context, or controlled decisions.
33. Recipe authors MUST state the material limitation beside the claim it qualifies.
34. Recipe authors MUST use direct present-tense explanations instead of a chronological pilot report.
35. Recipe authors MUST avoid interpreting unexecuted scenarios as successful verification.
36. Recipe authors MUST write the example as one request and the steps that follow it, in execution order, through to the next session.
37. Recipe authors MUST take the request and the steps from the measured scenario in the maintainers' integration-bench repository (the coupon workflow and its scripted owner messages), not from an invented situation.
38. Each example step MUST be attributed to one of the entry's tools or to the agent. @src/content.config.ts rejects any other name.
39. Example steps MUST describe requested behavior. They MUST NOT read as a transcript, a timing, or an observed result.
40. A number or a file path in an example step MUST come from a published evidence note or from the instruction text. WHEN no published note covers the recipe, the step carries no number.
41. The example note MUST state this recipe's verification status in the same terms as pilot.limitation.
42. Recipe authors MUST pass example copy through the humanizer skill (English) and the humanizer-ru skill (Russian) before publishing.
43. Recipe authors MUST follow @AGENTS.md for plain language, source attribution, and SEO.

### Installation panel

44. RecipeSetup maintainers MUST preserve the sequence: install both tools, add instructions, check in a new session.
45. RecipeSetup maintainers MUST link Archcore installation to /how-to-use/.
46. RecipeSetup maintainers MUST display the complete imported Markdown inside the instruction panel.
47. RecipeSetup maintainers MUST label the panel CLAUDE.md / AGENTS.md / GEMINI.md.
48. RecipeSetup maintainers MUST keep the panel header darker than its Markdown content.
49. RecipeSetup maintainers MUST provide a compact outline Copy instructions button with a copy icon.
50. RecipeSetup maintainers MUST preserve the collapsed 14rem Markdown maximum height from @src/styles/content.css.
51. RecipeSetup maintainers MUST allow expanding and collapsing the Markdown panel.
52. In either panel state, RecipeSetup maintainers MUST copy the entire instruction text.
53. WHEN clipboard access fails, RecipeSetup maintainers MUST expose selectable instructions and manual-copy feedback.
54. WHEN JavaScript is disabled, RecipeSetup maintainers MUST preserve inline installation instructions.
55. RecipeSetup maintainers MUST support keyboard opening, Escape closing, and focus return for the installation dialog.
56. RecipeSetup maintainers MUST center the modal within the viewport.
57. RecipeSetup maintainers MUST omit the removed Paste into CLAUDE.md and Download .md toolbar.

### Source ownership

58. Recipe authors MUST keep presentation copy in @src/content/integrations/.
59. Recipe maintainers MUST import upstream instruction files verbatim into @src/recipes/.
60. WHEN a source revision is published, recipe maintainers MUST record the source repository, file path, and revision.
61. WHEN a source revision is unpublished, recipe maintainers MUST retain revision: null.
62. Recipe maintainers MUST recompute digest from the imported bytes.
63. Recipe maintainers MUST preserve digest validation in @src/lib/recipe-source.ts.
64. Recipe authors MUST associate verification evidence with the exact instruction digest.
65. Recipe maintainers MUST preserve raw Markdown and instruction-download routes despite hidden download controls.
66. Recipe maintainers MUST retain source and verification details outside the primary explanation.
67. Recipe maintainers MUST retain the compact closing CTA from RecipeLayout.

### Catalog framing

Set on 2026-09-12 at the owner's request: the catalog offers two ways in, not one list of partnerships.

68. The catalog intro MUST state both paths: use Archcore with the tools the reader already runs, or make it part of their own agent setup.
69. The catalog MUST close with the own-setup path, linking to /how-to-use/, followed by the experimental-status note.
70. The own-setup path MUST describe document access over MCP from any agent. It MUST NOT promise automatic hook delivery outside the supported hosts, per @.archcore/messaging-alignment.rule.md.
71. Catalog copy MUST NOT frame a recipe as an endorsement or a partnership. A recipe is instructions for a pair of tools.

### Russian layer

72. Russian card and page copy for a recipe MUST live in the optional `ru` block of its entry; Russian prose bodies MUST live in @src/content/integrations/ru/ as the integrationsRu collection.
73. Page chrome strings MUST go through Lingui via @src/data/recipe-labels.ts rather than literal Russian in the markup.
74. The imported instruction text under @src/recipes/ MUST stay untranslated. It is what the agent reads.
75. The head, the markdown twin, and the JSON-LD MUST stay English while there are no /ru/ routes, per @.archcore/landing/drop-ru-hreflang-until-ru-routes.adr.md.
76. Positional Russian fields (workflow.steps, pilot.findings, limits, example.steps) MUST match the English ones one for one; @src/content.config.ts fails the build otherwise.
77. Authors MUST follow @.archcore/i18n-workflow.guide.md for the swap mechanisms and the extract → translate → compile flow.

## Rationale

The owner requested a short explanation with installation immediately accessible, compact copyable instructions, and hidden branding/status. Separating presentation from upstream Markdown prevents a copy edit from changing agent instructions.

The catalog held one card per row while it listed a single integration. With three entries, a single column left most of the page width unused, so the owner asked for two columns.

The owner also asked for partner-first names. A reader who looks for OpenSpec or Spec Kit sees their tool at the start of the card title, the H1, and the search result.

The framing rules follow from what the catalog can honestly promise. Four recipes cannot cover the tools a reader actually runs, and a reader whose tool is absent previously left with nothing. Archcore's documents are reachable over MCP from any agent, so the second path is real and needs saying on the page. The former intro ("Bring your project context to the tools you already use") named only the first path.

The Examples tab was added on 2026-09-13 at the owner's request. The page showed a block of instructions and five prose steps, and neither made it clear how a paragraph in AGENTS.md changes what two tools do. A worked request does. A first draft set the agent "without the instructions" beside the agent "with them" in two columns; the owner rejected it as unfamiliar and asked for one path instead: the successful run of a single request, shown step by step. The request and the steps come from the coupon scenario that integration-bench runs against every pair (a float request that contradicts an accepted integer-money decision, then design, plan, implementation and a fresh session), so the example promises nothing the measured protocol did not ask for. Because no page attaches a passing record to its current instruction revision, the example is explicitly requested behavior with the recipe's own verification caveat beneath it, never a recorded session.

The Russian layer keeps the English page as the indexed document. The page ships both languages and swaps them client-side, so no route, canonical, or digest changes.

## Examples

### Good

For Superpowers, the explanation states that the agent reads existing decisions before design, keeps Superpowers plans in their own files, and records approved durable decisions in Archcore. The limitation identifies the unverified design-to-ADR step. The page is titled "Superpowers + Archcore".

For OpenSpec, the Examples tab quotes the coupon request with its float clause, then five steps: Archcore finds the accepted integer-money decision and the agent stops; OpenSpec writes the proposal, design, specs and tasks once the owner keeps integer cents; Archcore records the settled decisions as draft ADRs after approval; OpenSpec runs the tasks, tests, sync and archive; a new session answers from the saved files, including the 13-cent discount and 612-cent total the published pilot note records. The note says an earlier revision completed the scenario twice and this one has not run.

The source pointer for this snapshot is @src/content/integrations/superpowers.md. The imported instruction bytes live at @src/recipes/superpowers/cooperation.md, and its own heading stays "### Archcore + Superpowers".

### Bad

A page presents a pilot timeline as its main explanation, marks every host verified after one run, edits the imported instructions to shorten their prose, or renames the heading inside @src/recipes/ to match the page title.

An example built around an invented request, written as terminal output with timestamps, quoting a figure no published note records, or attributing a step to a tool the page does not list.

A Russian translation edited straight into the markup, a Russian `<title>`, or a translated copy of an imported instruction file.

## Enforcement

Manual review checks the reading sequence, tool roles, ownership, claims, hidden branding, and retained source access.

@src/pages/integrations/[slug].astro validates instruction bytes and filters evidence against the current digest. @src/content.config.ts rejects an example step attributed to an unlisted tool and a Russian example whose step count differs from the English. @scripts/verify-build.mts compares published titles and descriptions against @scripts/fixtures/seo-baseline.json. @tests/integration-tabs.spec.ts covers the three tabs, keyboard order, the #examples deep link, the example panel's attribution tags and note, and the Example section of the Markdown twin. @tests/site.spec.ts covers the two translation tests ("integration catalog switches its heading and cards to Russian", "an integration page translates its prose, workflow and install steps"). Verify modal position, focus, expansion, full-text copying, the two-column and stacked catalog layouts, dark mode, and the no-JavaScript fallback against dist/ after UI changes.

The field name pilot and the #pilot-results fragment remain implementation identifiers. Their presence is not permission to reintroduce pilot-oriented presentation copy.
