---
title: "Landing site tech stack"
status: accepted
---

## Overview

Archcore.ai is one static Astro site deployed to GitHub Pages. @astro.config.mjs owns routing and generation; @package.json and @package-lock.json define one dependency installation.

## Stack

| Layer | Implementation |
| --- | --- |
| Static generator | Astro 7.3.2 |
| Interactive marketing pages | React 19 with @astrojs/react |
| Styling | Tailwind CSS 4 and shared Archcore tokens |
| Localization | Lingui 5, English and Russian catalogs |
| Content | Astro collections with the remark Markdown processor |
| Analytics | Shared PostHog core |
| OG images | Satori and resvg |
| Hosting | GitHub Pages, static dist/ artifact |

Exact installed versions live in @package-lock.json.

## Pages

Astro routes live in @src/pages/. Marketing routes are /, /plugin/, /cli/, /how-to-use/, /teams/getting-started/, and /privacy/. Blog and learn collections provide listings and articles. The pillars collection provides root-level reference pages. The integrations collection provides a catalog, recipes, raw Markdown, and digest-checked instruction downloads.

The alternatives collection remains empty. The public /install/ redirect preserves query parameters and hash fragments. @src/pages/404.astro produces a noindex error page without a home canonical.

## Shared presentation

@src/layouts/SiteLayout.astro provides fonts, theme resolution, analytics, header, footer, and the skip link. @src/index.css owns design tokens; @src/styles/content.css styles content pages and shared chrome. @src/data/navigation.ts reads navigation translations from the Lingui catalogs.

@src/components/pages/ contains marketing React bodies. Each localized page has one server-rendered, hydrated provider tree. Astro owns navigation through ordinary anchors; there is no React Router.

## Content and metadata

@src/content.config.ts defines the collections. Article and pillar layouts generate metadata, structured data, visible dates, and links to raw Markdown twins. Published slugs and publication dates survive the migration.

@src/data/marketing-meta.json supplies static marketing metadata. @src/hooks/use-page-meta.ts updates localized page metadata after a language change. @src/components/faq-list.tsx generates FAQPage JSON-LD and native disclosures from the same array.

@src/pages/sitemap.xml.ts includes real HTML routes and uses content modification dates where available. It omits lastmod for routes without a reliable content date.

## Build and verification

The npm build compiles Lingui catalogs, generates OG images, fetches star counts, runs Astro type checking and ESLint, generates dist/, and verifies its output.

@scripts/verify-build.mts checks route metadata against @scripts/fixtures/seo-baseline.json, article text and schemas, local links and anchors, FAQ parity, installer bytes, and recipe downloads. @tests/site.spec.ts checks the built site in Chromium across screen sizes and themes, plus locale persistence, installation, native navigation, and redirects.

## Deployment

@.github/workflows/deploy.yml checks analytics endpoints, synchronizes installers, installs dependencies once, builds, runs browser checks, archives the release, and deploys dist/. @.github/workflows/check.yml runs build and browser verification for pull requests without production analytics. @.github/workflows/rollback.yml republishes a checked retained artifact without rebuilding. @docs/deployment.md contains the operating instructions.

## Localization

@src/locales/ contains English and Russian PO catalogs. The build renders English HTML, then localized React pages select the visitor's locale from a URL parameter, storage, or browser language. Existing query parameters and hash fragments are preserved. Articles remain English; there are no separate /ru/ routes.
