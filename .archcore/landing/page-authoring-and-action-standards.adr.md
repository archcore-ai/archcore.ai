---
title: "Standardize editorial pages, integration pages, CTAs, and link targets"
status: accepted
tags:
  - "web"
---

## Context

The owner requested page-level standards on 2026-09-09 after reviewing the Blog, Learn, integration, and installation interfaces. @src/layouts/ListingLayout.astro and @src/layouts/ArticleLayout.astro already serve both editorial collections. @src/layouts/RecipeLayout.astro separates explanation from installation.

CTA destinations differ today: @src/components/SiteHeader.astro uses /how-to-use/, while @src/layouts/ArticleLayout.astro and @src/layouts/PillarLayout.astro use /#install. Markdown links do not receive a global external-target transform in @astro.config.mjs.

## Decision

Adopt shared Blog/Learn authoring rules, integration authoring rules, and a page-specific CTA/link matrix grounded in the current Astro layouts.

## Alternatives Considered

- Independent Blog and Learn templates: rejected because both collections already use the same listing and article layouts.
- One mandatory CTA destination for every action: rejected because local command anchors and integration setup dialogs perform different actions.
- One document combining positioning, page composition, and authoring procedures: rejected because a layout change would require editing the positioning reference.

## Consequences

Positive:

- Three rule documents separate editorial composition, integration composition, and CTA/link behavior.
- One author guide supplies the publishing procedure.
- Existing metadata, shared layouts, and source instruction files remain the implementation references.
- [expected] Reviewers can locate a page's composition and navigation requirements without reconstructing the design conversation.

Tradeoffs:

- New documents start as draft; this capture does not claim that every existing page conforms.
- [assumption] Generic off-page installation links standardize on /how-to-use/. Local installation sections retain their anchors.
- [assumption] External HTTP(S) links open a new tab across the site; ordinary same-site navigation remains in the current tab.
- Integration product/setup links retain the owner's explicit new-tab exception, including internal links to Archcore.
- Article and pillar install CTAs currently differ from the proposed generic destination.
- Existing Markdown external links require implementation work before claiming site-wide target compliance.
- Older navigation clauses in the messaging rule and DESIGN.md remain separate drift findings; this capture does not silently rewrite them.

## Superseded when

- Blog and Learn require different article schemas or independently designed reading layouts.
- An integration needs a setup flow that cannot use the three-step RecipeSetup dialog.
- Installation moves away from /how-to-use/ and the page-specific command anchors.

## Clarifications

The owner requested list/article standards for Blog and Learn, integration composition and writing rules, CTA standardization, and link-target conventions. Earlier session instructions establish hidden integration branding/status, installation in a modal, compact copyable instructions, and new-tab Archcore/Superpowers links.

