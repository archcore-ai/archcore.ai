---
title: "Add build-time OG image generation with Satori"
status: accepted
---

## What

The reusable pattern for adding build-time OG image generation (Satori + resvg) to a static site is the ecosystem task-type `web/build-time-og-images` in the `archcore` global source.

The landing-site operational steps are in `og-image-generation.guide`: the shared renderer in `src/lib/og-image.ts`, the `VARIANTS` array for marketing cards, the `src/pages/og/[...slug].png.ts` route for article cards, and the per-route tags written from `src/data/marketing-meta.json`.

This file is kept as a local pointer; see those two documents.
