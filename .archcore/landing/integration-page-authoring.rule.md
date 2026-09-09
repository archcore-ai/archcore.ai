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
4. Catalog maintainers MUST use full-width rows without empty placeholder cells.
5. Integration maintainers MUST retain the hidden logo and status data.
6. Integration maintainers MUST keep catalog/detail identity logos and status badges visually hidden through data-hide-integration-branding.
7. Recipe authors MUST use RecipeLayout for integration detail pages.
8. Recipe maintainers MUST show the catalog backlink before the title.
9. Recipe maintainers MUST place the summary below the H1.
10. On desktop, recipe maintainers MUST align the Install button with the top of the title block.
11. Recipe maintainers MUST make How it works the initial tab.
12. With benefits content present, recipe maintainers MUST label its tab Benefits & limits.
13. Recipe maintainers MUST preserve existing tab fragments, including #pilot-results.
14. Recipe maintainers MUST display explanation content in one reading column.
15. Recipe maintainers MUST present installation through RecipeSetup rather than a third tab.

### How the explanation is written

16. Recipe authors MUST name the joint outcome before the supporting mechanism.
17. Recipe authors MUST state each tool's contribution in the tools role field.
18. Recipe authors MUST describe agent actions in execution order through workflow.steps.
19. Recipe authors MUST identify where designs, execution plans, and durable decisions are stored.
20. Recipe authors MUST distinguish requested agent behavior from verified behavior.
21. Recipe authors MUST state benefits as concrete avoided work, preserved context, or controlled decisions.
22. Recipe authors MUST state the material limitation beside the claim it qualifies.
23. Recipe authors MUST use direct present-tense explanations instead of a chronological pilot report.
24. Recipe authors MUST avoid interpreting unexecuted scenarios as successful verification.
25. Recipe authors MUST follow @AGENTS.md for plain language, source attribution, and SEO.

### Installation panel

26. RecipeSetup maintainers MUST preserve the sequence: install both tools, add instructions, check in a new session.
27. RecipeSetup maintainers MUST link Archcore installation to /how-to-use/.
28. RecipeSetup maintainers MUST display the complete imported Markdown inside the instruction panel.
29. RecipeSetup maintainers MUST label the panel CLAUDE.md / AGENTS.md / GEMINI.md.
30. RecipeSetup maintainers MUST keep the panel header darker than its Markdown content.
31. RecipeSetup maintainers MUST provide a compact outline Copy instructions button with a copy icon.
32. RecipeSetup maintainers MUST preserve the collapsed 14rem Markdown maximum height from @src/styles/content.css.
33. RecipeSetup maintainers MUST allow expanding and collapsing the Markdown panel.
34. In either panel state, RecipeSetup maintainers MUST copy the entire instruction text.
35. When clipboard access fails, RecipeSetup maintainers MUST expose selectable instructions and manual-copy feedback.
36. RecipeSetup maintainers MUST preserve inline installation instructions when JavaScript is disabled.
37. RecipeSetup maintainers MUST support keyboard opening, Escape closing, and focus return for the installation dialog.
38. RecipeSetup maintainers MUST center the modal within the viewport.
39. RecipeSetup maintainers MUST omit the removed Paste into CLAUDE.md and Download .md toolbar.

### Source ownership

40. Recipe authors MUST keep presentation copy in @src/content/integrations/.
41. Recipe maintainers MUST import upstream instruction files verbatim into @src/recipes/.
42. Recipe maintainers MUST record the source repository, file path, and immutable revision when published.
43. With an unpublished source revision, recipe maintainers MUST retain revision: null.
44. Recipe maintainers MUST recompute digest from the imported bytes.
45. Recipe maintainers MUST preserve digest validation in @src/lib/recipe-source.ts.
46. Recipe authors MUST associate verification evidence with the exact instruction digest.
47. Recipe maintainers MUST preserve raw Markdown and instruction-download routes despite hidden download controls.
48. Recipe maintainers MUST retain source and verification details outside the primary explanation.
49. Recipe maintainers MUST retain the compact closing CTA from RecipeLayout.

## Rationale

The owner requested a short explanation with installation immediately accessible, compact copyable instructions, and hidden branding/status. Separating presentation from upstream Markdown prevents a copy edit from changing agent instructions.

## Examples

### Good

For Superpowers, the explanation states that the agent reads existing decisions before design, keeps Superpowers plans in their own files, and records approved durable decisions in Archcore. The limitation identifies the unverified design-to-ADR step.

The source pointer for this snapshot is @src/content/integrations/superpowers.md. The imported instruction bytes live at @src/recipes/superpowers/cooperation.md.

### Bad

A page presents a pilot timeline as its main explanation, marks every host verified after one run, or edits the imported instructions to shorten their prose.

## Enforcement

Manual review checks the reading sequence, tool roles, ownership, claims, hidden branding, and retained source access.

@src/pages/integrations/[slug].astro validates instruction bytes and filters evidence against the current digest. @tests/integration-tabs.spec.ts and @tests/site.spec.ts cover existing integration behavior. Verify modal position, focus, expansion, full-text copying, mobile layout, dark mode, and the no-JavaScript fallback against dist/ after UI changes.

The field name pilot and the #pilot-results fragment remain implementation identifiers. Their presence is not permission to reintroduce pilot-oriented presentation copy.
