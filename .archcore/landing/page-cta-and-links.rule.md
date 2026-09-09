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
9. Page maintainers MUST preserve existing analytics identifiers when changing only CTA presentation.
10. Page maintainers MUST record an intentional analytics change when replacing an action.

### Destination matrix

11. For general off-page installation, authors MUST link Install Archcore to /how-to-use/.
12. On pages with their own installation commands, authors MUST link local installation CTAs to #install.
13. In the shared header, maintainers MUST link Install to /how-to-use/.
14. On integration pages, maintainers MUST make the heading Install button open the recipe setup dialog.
15. In integration setup, authors MUST keep Install Archcore distinct from connecting the two tools.
16. On /how-to-use/, maintainers MUST link See how it works to #cycle.
17. On integration pages, maintainers MUST retain the closing Archcore CTA destinations listed below.
18. Page authors MUST NOT use #install-cli or #install-plugin.

| Surface/action | Destination | Presentation | Tab behavior |
| --- | --- | --- | --- |
| Shared header: Install | /how-to-use/ | Existing nav-cta | Same tab |
| Home body: install/back to install | #install | Existing hero/link treatment | Same tab |
| Home closing block: Star on GitHub | Plugin repository | Existing StarCtaSection | New tab |
| /how-to-use/ closing: Install Archcore | #install | recipe-cta primary | Same tab |
| /how-to-use/ closing: See how it works | #cycle | recipe-cta text link | Same tab |
| Blog/Learn article and pillar: Install Archcore | /how-to-use/ | Existing article .cta | Same tab |
| Generic installation CTA on a page without commands | /how-to-use/ | Page-family CTA | Same tab |
| Integration heading: Install | Current recipe dialog; #install deep link | Primary button | No navigation |
| Integration setup: Archcore install link | /how-to-use/ | Text link | New tab |
| Integration closing: Install Archcore | /how-to-use/ | recipe-cta primary | New tab |
| Integration closing: See how it works | /how-to-use/ | recipe-cta text link | New tab |
| /plugin/: Install plugin | #install | Existing page CTA | Same tab |
| /cli/: Install CLI | #install | Existing page CTA | Same tab |

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
27. Page maintainers MUST retain existing download endpoints when removing a download button.

External means an origin outside archcore.ai. docs.archcore.ai and GitHub are external destinations. An absolute archcore.ai URL is still internal. Preview and development hosts represent the same site for internal path resolution.

### Shared copy and scope

28. General article CTA maintainers MUST use productCopy.expanded from @src/data/product-copy.ts.
29. Integration and how-to-use CTA maintainers MUST preserve the closing copy pinned in the messaging rule.
30. Listing maintainers MUST retain their existing closing text without adding a second installation block by default.
31. Page authors MUST preserve destination-specific exceptions instead of applying a global replacement to every Install label.

## Rationale

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

- @src/layouts/ArticleLayout.astro and @src/layouts/PillarLayout.astro still link to /#install.
- @astro.config.mjs does not enforce external-link attributes for authored Markdown.
- Existing CTA clauses in the messaging rule and older navigation sections in @DESIGN.md require reconciliation before claiming one fully adopted site-wide standard.

This draft records the requested standard. It does not claim those implementation gaps are fixed. Existing @tests/site.spec.ts and @tests/integration-tabs.spec.ts do not constitute complete enforcement of this new matrix.
