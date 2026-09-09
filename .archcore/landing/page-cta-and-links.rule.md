---
title: "Page CTA destinations, visual hierarchy, and link targets"
status: accepted
tags:
  - "web"
---

## Rule

Scope: @src/components/, @src/layouts/, @src/content/, @src/data/navigation.ts, @src/styles/content.css. These rules cover user-activated links and buttons, not canonical, stylesheet, schema, or alternate-resource URLs.

### Actions and hierarchy

1. Page authors MUST choose CTA destinations from the destination matrix below.
2. Within one CTA block, page authors MUST provide at most one visually primary action.
3. Page authors MUST render navigation actions as anchors.
4. Page authors MUST render copying, dialog opening, and disclosure actions as buttons.
5. Page authors MUST label actions with their concrete result.
6. Page maintainers MUST reuse existing CTA classes or components for the page family.
7. Page authors MUST keep supporting repository links visually subordinate to the primary action.
8. Page maintainers MUST preserve visible keyboard focus for CTA controls.
9. When changing only CTA presentation, page maintainers MUST preserve existing analytics identifiers.
10. When replacing an action, page maintainers MUST record the intentional analytics change.

### Destination matrix

11. For general off-page installation, authors MUST link Install Archcore to /how-to-use/.
12. On pages with their own installation commands, authors MUST link local installation CTAs to #install.
13. In the shared header, maintainers MUST link Install to /how-to-use/.
14. On integration pages, maintainers MUST make the heading Install button open the recipe setup dialog.
15. In integration setup, authors MUST keep Install Archcore distinct from connecting the two tools.
16. On /how-to-use/, maintainers MUST make the closing CTA a GitHub action.
17. On integration pages, maintainers MUST retain the closing Archcore CTA destinations listed below.
18. Page authors MUST NOT use #install-cli or #install-plugin.

| Surface/action | Destination | Presentation | Tab behavior |
| --- | --- | --- | --- |
| Shared header: Install | /how-to-use/ | Existing nav-cta | Same tab |
| Home body: install/back to install | #install | Existing hero/link treatment | Same tab |
| Home closing block: Star on GitHub | Plugin repository | Existing StarCtaSection | New tab |
| /how-to-use/ closing: View on GitHub | https://github.com/archcore-ai | recipe-cta primary; single action | New tab |
| Blog/Learn articles and listings: Install Archcore | /how-to-use/ | ClosingCta primary | Same tab |
| Blog/Learn articles and listings: See how it works | /how-to-use/ | ClosingCta text link | Same tab |
| Pillar: Install Archcore | /how-to-use/ | Existing article .cta | Same tab |
| Generic installation CTA on a page without commands | /how-to-use/ | Page-family CTA | Same tab |
| Integration heading: Install | Current recipe dialog; #install deep link | Primary button | No navigation |
| Integration setup: Archcore install link | /how-to-use/ | Text link | New tab |
| Integration closing: Install Archcore | /how-to-use/ | recipe-cta primary | New tab |
| Integration closing: See how it works | /how-to-use/ | recipe-cta text link | New tab |
| /plugin/ and /cli/ closing: Install Archcore | /how-to-use/ | Shared ClosingCta primary | Same tab |
| /plugin/ and /cli/ closing: See how it works | /how-to-use/ | Shared ClosingCta text link | Same tab |

The integration heading installs the connection; its closing CTA introduces Archcore. Both integration closing links currently share a destination. Their labels do not represent separate walkthrough and installer routes.

### Link targets

19. For external HTTP(S) destinations, page authors MUST use target="_blank" and rel="noopener noreferrer".
20. For same-origin navigation, page authors MUST omit target="_blank".
21. Exception: within integration pages, authors MUST open Archcore/Superpowers product and setup links in a new tab.
22. For same-page fragments, page authors MUST retain same-tab navigation.
23. For internal navigation URLs, page authors MUST use site-relative paths.
24. For published directory routes, page authors MUST preserve the trailing slash.
25. For mailto:, tel:, and download actions, page authors MUST preserve the protocol or download behavior without forcing a new tab.
26. For new-tab links, page authors MUST expose the destination through visible text or an accessible label.
27. When removing a download button, page maintainers MUST retain existing download endpoints.

External means an origin outside archcore.ai. docs.archcore.ai and GitHub are external destinations. An absolute archcore.ai URL is still internal. Preview and development hosts represent the same site for internal path resolution.

### Shared copy and scope

28. Pillar CTA maintainers MUST use productCopy.expanded from @src/data/product-copy.ts.
29. Integration and how-to-use CTA maintainers MUST preserve the closing copy pinned in the messaging rule.
30. Blog/Learn listing maintainers MUST preserve existing closing text and internal links before the shared closing CTA.
31. Page authors MUST preserve destination-specific exceptions instead of applying a global replacement to every Install label.

### Mandatory Blog/Learn closing CTA

32. Every Blog/Learn article and listing MUST render exactly one @src/components/ClosingCta.astro.
33. @src/layouts/RecipeLayout.astro MUST render the same ClosingCta component used by Blog and Learn.
34. ArticleLayout maintainers MUST place ClosingCta after the article body and FAQ, outside the article element.
35. ListingLayout maintainers MUST place ClosingCta after the listing outro.
36. Blog/Learn maintainers MUST place ClosingCta last inside the main landmark.
37. ClosingCta maintainers MUST preserve the heading "Start with Archcore.".
38. ClosingCta maintainers MUST preserve the description "Keep your project decisions ready for the next task.".
39. ClosingCta maintainers MUST label the primary anchor "Install Archcore →".
40. ClosingCta maintainers MUST label the secondary anchor "See how it works".
41. ClosingCta maintainers MUST use .recipe-cta and .recipe-cta__actions from @src/styles/content.css.
42. Blog/Learn maintainers MUST keep the closing CTA on the full shared page grid.
43. Article authors MUST NOT duplicate the shared closing CTA in Markdown.
44. Blog/Learn maintainers MUST NOT add per-entry overrides that hide or replace ClosingCta.
45. ArticleLayout maintainers MUST preserve data-analytics-cta="article_install".
46. ListingLayout maintainers MUST use data-analytics-cta="listing_install".
47. RecipeLayout maintainers MUST preserve data-analytics-cta="recipe_install".

### Shared navigation, footer, and how-to closing action

48. Header maintainers MUST order navigation as How to use, Integrations, Docs, Blog, Learn in @src/data/navigation.ts.
49. Header maintainers MUST preserve that order in desktop and mobile navigation.
50. Footer maintainers MUST NOT render the reference navigation in @src/components/SiteFooter.astro.
51. Footer maintainers MUST omit links to /context-engineering/, /spec-driven-development/, /project-context/, /git-native-context/, and /mcp/.
52. Site maintainers MUST preserve those five published reference routes.
53. Header and footer maintainers MUST render the logo and wordmark through @src/components/SiteBrand.astro.
54. Footer maintainers MUST use SiteBrand's compact variant.
55. SiteBrand maintainers MUST preserve light and dark logo variants.
56. How-to maintainers MUST render exactly one closing anchor labeled "View on GitHub →".
57. How-to maintainers MUST target the closing anchor at LINKS.org from @src/lib/links.ts.
58. How-to maintainers MUST open the closing GitHub link with target="_blank" and rel="noopener noreferrer".
59. How-to maintainers MUST NOT render installation or walkthrough anchors in the closing CTA.
60. How-to maintainers MUST retain the installation commands and article outline.
61. How-to maintainers MUST use data-analytics-cta="how_to_use_github" for the closing block.
62. How-to maintainers MUST translate the GitHub closing copy through Lingui.

### Product guide structure and closing CTA

63. Product page maintainers MUST reuse @src/components/guide-page-layout.tsx for `/cli/` and `/plugin/`.
64. Product page maintainers MUST render one LocalizedClosingCta after the article and FAQ.
65. ClosingCta.astro MUST delegate markup and default copy to @src/components/closing-cta.tsx.
66. Product guide CTAs MUST use the same copy, hierarchy, destinations, and tab behavior as Blog/Learn CTAs.
67. CLI maintainers MUST use data-analytics-cta="cli_install" for the closing block.
68. Plugin maintainers MUST use data-analytics-cta="plugin_install" for the closing block.
69. Guide maintainers MUST keep the shared closing CTA last inside the main landmark.
70. Product guide maintainers MUST preserve installation-command analytics identifiers.

## Rationale

The owner required the Superpowers closing CTA on every Blog and Learn page on 2026-09-09. One component prevents page-specific copy and presentation drift.

The owner also requested the new header order, removal of the footer reference row, shared header/footer branding, and a GitHub closing action on /how-to-use/.

The owner requested consistent CTA and link behavior. Installation, integration setup, copying, and reference navigation have different destinations; a page-specific matrix preserves those distinctions.

## Examples

### Good

```html
<a href="/how-to-use/">Install Archcore →</a>
<a href="https://docs.archcore.ai/" target="_blank" rel="noopener noreferrer">Docs ↗</a>
```

Integration-only internal-link exception:

```html
<a href="/how-to-use/" target="_blank" rel="noopener noreferrer">Install Archcore →</a>
```

### Bad

```html
<a href="https://github.com/archcore-ai/plugin">Install Archcore</a>
<button onclick="location.href='/how-to-use/'">See how it works</button>
<a href="#install" target="_blank">Install</a>
```

## Enforcement

Manual review checks the matrix, action hierarchy, targets, labels, source copy, and exceptions. Browser verification checks navigation, local anchors, modal behavior, keyboard focus, and analytics after UI changes.

Current implementation gaps, recorded 2026-09-09:

- @src/layouts/PillarLayout.astro still links to /#install.
- @astro.config.mjs does not enforce external-link attributes for authored Markdown.
- Existing CTA clauses in the messaging rule and older navigation sections in @DESIGN.md require reconciliation before claiming one fully adopted site-wide standard.

@scripts/verify-build.mts MUST reject a Blog/Learn page without the prescribed closing CTA, copy, action hierarchy, destinations, analytics marker, or same-tab behavior.

@scripts/verify-build.mts also checks header order, footer reference-link removal, shared branding, and the single GitHub action on /how-to-use/.

@tests/site.spec.ts verifies closing CTA layout and navigation against dist/. These checks do not claim complete enforcement of unrelated link rules.

The Blog/Learn CTA revision intentionally replaces /#install with /how-to-use/ and adds the secondary walkthrough link. Existing article_install and recipe_install markers remain. New listing_install markers identify closing actions on the two collection pages. The eight article entries in @scripts/fixtures/seo-baseline.json remove only the retired CTA paragraph; article content and metadata remain protected.

The how-to closing action now reports how_to_use_github instead of back_to_install because its destination changed to the GitHub organization. The article's installation controls keep their identifiers.

The owner requested `/cli/` and `/plugin/` to use the `/how-to-use/` article structure and the Blog/Learn CTA on 2026-09-09. The new cli_install and plugin_install markers identify these closing blocks. ClosingCta.astro remains the editorial entry point; its React renderer also provides localized product CTAs. @scripts/verify-build.mts enforces the shared CTA contract on both product routes.