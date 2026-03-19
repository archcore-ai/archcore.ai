---
title: "Migrate landing site hosting from Vercel to GitHub Pages"
status: accepted
---

## Context

The landing site (archcore.ai) is a fully static Vite + React SPA with two routes (`/` and `/teams/getting-started`). It was hosted on Vercel.

Vercel is blocked or unreliable for a portion of users in Russia, which means potential users cannot access the project landing page or installation instructions. Since the site requires no server-side features (SSR, edge functions, middleware), there is no technical reason to stay on a platform with access restrictions.

## Decision

Move hosting from Vercel to GitHub Pages.

Key implementation details:
- GitHub Actions workflow deploys `dist/` on every push to `main` (@.github/workflows/deploy.yml)
- SPA routing handled via `404.html` — a Vite post-build plugin copies `index.html` → `404.html`, which GitHub Pages serves for unknown paths
- `/install.sh` browser redirect implemented as `public/install.sh/index.html` with a `<meta http-equiv="refresh">` to the raw GitHub URL (`curl` users use the direct GitHub URL)
- Custom domain `archcore.ai` configured via `public/CNAME`
- Vercel config (`vercel.json`) and deploy script removed

## Alternatives Considered

- **Stay on Vercel** — simplest option, but does not solve the access problem for Russian users.
- **Cloudflare Pages** — good alternative with wide availability, but adds another third-party dependency. GitHub Pages is sufficient for a static site and keeps everything within the GitHub ecosystem.
- **Netlify** — similar to Cloudflare Pages; no meaningful advantage over GitHub Pages for this use case.

## Consequences

**Positive:**
- The site is accessible from Russia and other regions where Vercel may be restricted
- Hosting is free and fully integrated with the existing GitHub repository
- Simpler infrastructure — no separate Vercel project to manage

**Negative:**
- No server-side redirects — `/install.sh` redirect only works in browsers, not with `curl`/`wget` (users must use the direct GitHub raw URL)
- No preview deployments for pull requests (can be added later with a separate workflow if needed)
- GitHub Pages has a soft bandwidth limit (100 GB/month) — unlikely to be an issue for a landing page
