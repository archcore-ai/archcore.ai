---
title: "Migrate landing site hosting from Vercel to GitHub Pages"
status: accepted
---

## Context

The landing site (`archcore.ai`) is a fully static Vite + React SPA with no server-side needs. Current pages are listed in `.archcore/landing-tech-stack.doc.md`.

## Decision

Follow the ecosystem decision to host static web properties on GitHub Pages — the rationale (Vercel blocked/unreliable in Russia, no SSR requirement) and shared consequences live in the `archcore` global source `web/static-hosting-github-pages` and are not restated here.

Landing SPA-specific implementation:

- Deployed via GitHub Actions on every push to `main` (`@.github/workflows/deploy.yml`).
- SPA routing via `404.html` — a Vite post-build plugin copies `index.html` → `404.html`, which GitHub Pages serves for unknown paths.
- `/install.sh` is served as a real POSIX script from `public/install.sh`, so `curl -fsSL archcore.ai/install.sh | sh` works (it shells out to the canonical CLI installer at `raw.githubusercontent.com/archcore-ai/cli/.../install.sh`).
- Custom domain `archcore.ai` via `public/CNAME`; `vercel.json` and the deploy script removed.
- Per-route social previews need an extra build step (a Vite `closeBundle` plugin emitting `dist/<route>/index.html` with rewritten OG tags), since Pages serves only static files — `scripts/prerender-routes.mts`, see `.archcore/landing/og-image-generation.guide.md`.
