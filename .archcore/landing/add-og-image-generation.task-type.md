---
title: "Add build-time OG image generation with Satori"
status: accepted
---

## What

The reusable pattern for adding build-time OG image generation (Satori + resvg) to a static site is the ecosystem task-type `web/build-time-og-images` in the `archcore` global source. The landing-site (Vite SPA) operational steps — the `VARIANTS` array, `scripts/prerender-routes.mts` per-route HTML, and the `usePageMeta` hook — are in `og-image-generation.guide`.

This file is kept as a local pointer; see those two documents.
