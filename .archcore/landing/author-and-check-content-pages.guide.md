---
title: "Author and verify Blog, Learn, and integration pages"
status: accepted
tags:
  - "web"
---

Reader and actor: a site author preparing a Blog article, Learn article, or integration page for publication.

## Prerequisites

The repository dependencies are installed. The author has the intended topic, supporting sources, and access to the existing content/layout files. Integration updates also require the exact upstream instruction file.

## Steps

1. Choose Blog for dated practical material, Learn for reference explanations, or Integrations for a named tool pairing.
2. Locate the existing entry in the chosen @src/content/ collection.
3. For a new entry, choose an unpublished slug.
4. Fill the collection metadata defined in @src/content.config.ts.
5. Write the opening answer or joint outcome before supporting detail.
6. For Blog/Learn, organize the body into H2 sections with examples and source links.
7. For an integration, fill tool roles, execution steps, benefits, limitations, and source metadata.
8. For an instruction update, copy the upstream file verbatim into @src/recipes/.
9. For an instruction update, compute its SHA-256 digest.
10. For an instruction update, set the entry's digest to the computed value.
11. Select CTA destinations from the page-specific matrix.
12. Check link targets, fragments, and preserved published URLs.
13. Apply the plain-language and SEO requirements in @AGENTS.md.
14. Apply the English humanizer pass to reader-facing text.
15. Run npm run i18n:extract.
16. Translate new Russian catalog entries using formal address.
17. Run npm run i18n:compile.
18. Run npm run build.
19. Inspect the affected routes and downloadable files in dist/.
20. Run npm run test:browser against the built site.

Integration digest command for the current Superpowers snapshot:

```sh
shasum -a 256 src/recipes/superpowers/cooperation.md
```

The command prints the digest and filename. The digest field contains the hash only.

## Verification

For Blog/Learn, the built list includes the published entry in date order. The article has one H1, valid metadata, the expected body, a Markdown alternate, and the shared ClosingCta after the FAQ. Both collection listings render ClosingCta after their existing cross-links. FAQ text matches FAQPage JSON-LD.

For integrations, copied instructions match the imported file in both collapsed and expanded states. The dialog opens from Install and #install, closes with Escape, and returns focus. Without JavaScript, installation remains readable inline.

Check narrow and desktop widths, light and dark themes, generated sitemap URLs, and link destinations. A successful build verifies implemented checks; it does not prove every prose or link-target requirement.

For rendered article titles, count the brand suffix as part of the 60-character limit. The schema's 70/170 limits are looser than the writing policy.

## Common Issues

- Duplicate H1: remove the body H1; ArticleLayout renders the frontmatter title.
- Entry absent from the listing: inspect draft and the collection directory.
- Integration build rejects a digest: compare the imported bytes with the upstream file before recomputing the hash.
- FAQ content diverges: edit the frontmatter array, not a second handwritten FAQ.
- External Markdown link opens in the same tab: inspect generated HTML; the current Markdown processor adds no target attributes.
- Missing or divergent Blog/Learn closing CTA: restore @src/components/ClosingCta.astro in the shared layout; npm run verify:build checks every published route.
- New Russian text is missing: inspect extracted catalog entries before compilation.