---
title: "Blog and Learn: listing, article structure, and writing rules"
status: accepted
tags:
  - "web"
---

## Rule

Scope: @src/content/blog/, @src/content/learn/, @src/pages/blog/, @src/pages/learn/, @src/layouts/ListingLayout.astro, @src/layouts/ArticleLayout.astro, @src/styles/content.css.

### Collection purpose

1. Blog authors MUST use @src/content/blog/ for dated guides, migrations, comparisons, and vendor changes.
2. Learn authors MUST use @src/content/learn/ for definitions, conceptual explanations, and evergreen reference.
3. Blog and Learn maintainers MUST share ListingLayout and ArticleLayout.
4. Authors MUST preserve published filenames, slugs, and URLs.

### Blog and Learn lists

5. Listing authors MUST place one H1 and a concise collection description above the entries.
6. Listing maintainers MUST exclude entries whose frontmatter sets draft to true.
7. Listing maintainers MUST order entries by pubDate, newest first.
8. Each listing entry MUST display its linked title, description, and publication date.
9. Listing maintainers MUST use PageIntro and the full shared page grid.
10. At widths below 768px, listing maintainers MUST display one column.
11. At widths from 768px, listing maintainers MUST display two equal columns.
12. With an odd entry count, listing maintainers MUST let the last entry span both desktop columns.
13. Listing authors MUST retain the Blog/Learn cross-link in the closing text.

### Blog and Learn articles

14. Article authors MUST provide title, description, and pubDate in frontmatter.
15. Article authors MUST leave the page H1 to ArticleLayout.
16. Article authors MUST open the body with the answer, definition, or concrete outcome promised by the title.
17. Article authors MUST organize the body with H2 sections and subordinate H3 headings.
18. For question queries, article authors MUST phrase the corresponding H2 as the reader's question.
19. Article authors MUST provide a concrete example supporting the article's main explanation.
20. For comparisons, article authors MUST retain the table or list that answers the comparison.
21. Article authors MUST link factual external claims to supporting sources.
22. Article authors MUST preserve pubDate when revising a published article.
23. For substantive revisions, article authors MUST add updatedDate and a visible revision note.
24. Article authors MUST supply FAQ entries through frontmatter.
25. With FAQ frontmatter present, ArticleLayout maintainers MUST generate visible answers and FAQPage JSON-LD from that array.
26. Article authors MUST leave the standard closing installation CTA to ArticleLayout.
27. Article authors MUST preserve internal and primary-source links when shortening text.

### Reading layout and metadata

28. Article maintainers MUST use the shared article grid and reading styles in @src/styles/content.css.
29. With more than two body H2s, ArticleLayout maintainers MUST generate the outline from rendered headings.
30. At widths below 1000px, ArticleLayout maintainers MUST hide the right-hand article outline.
31. Article maintainers MUST provide copy controls for command and configuration blocks.
32. Article maintainers MUST retain Article JSON-LD, canonical metadata, and the raw Markdown alternate.
33. Authors MUST keep the final rendered title within 60 characters, including the ArticleLayout brand suffix.
34. Authors MUST keep meta descriptions within 160 characters.
35. Article authors MUST apply the writing and SEO requirements in @AGENTS.md.
36. Page maintainers MUST reuse shared styles instead of defining independent page gutters or heading scales.

## Rationale

Blog and Learn already share their schema, listing renderer, article renderer, and typography. Their distinction is editorial purpose. The owner's 2026-09-09 request preserves that shared presentation.

## Examples

### Good

A Blog article explains a dated agent migration with commands and sources. A Learn article answers what project context means with a repository example. Both store metadata in frontmatter and begin body headings at H2.

### Bad

A Learn article receives a separate page layout, repeats the frontmatter title as a Markdown H1, and manually duplicates its FAQ below the body.

## Enforcement

Manual review checks purpose, prose, examples, layout reuse, dates, links, and the rendered title length. The schema in @src/content.config.ts allows 70/170 characters; it does not enforce the stricter 60/160 writing limits.

@src/pages/blog/index.astro and @src/pages/learn/index.astro implement publication filtering and sorting. @src/layouts/ListingLayout.astro owns CollectionPage/ItemList JSON-LD.

@src/pages/blog/[slug].astro and @src/pages/learn/[slug].astro pass one content entry to ArticleLayout. @scripts/verify-build.mts checks the existing SEO/content baseline; it does not prove every new editorial requirement. Use npm run build and npm run test:browser against dist/ after implementation or copy changes.
