---
title: "Keep api.github.com out of visitor and installer paths"
status: accepted
tags:
  - "infrastructure"
  - "install"
---

## Context

Two landing-side paths called `https://api.github.com` on behalf of end users:

1. `useGitHubStars` fetched star counts for `cli` and `plugin` from the browser — **two requests per visitor**, cached in `sessionStorage` for an hour, falling back to hardcoded floors (48/47).
2. `public/install.sh` was a one-line shim that piped `raw.githubusercontent.com/archcore-ai/cli/.../install.sh` into bash, and `public/install.ps1` was a full but **stale** copy of the installer that still called `api.github.com/repos/.../releases/latest`.

The REST API allows 60 unauthenticated requests per hour **per originating IP**. That is invisible to a solo visitor and fatal to anyone sharing an egress address — mobile CGNAT, corporate NAT, coworking Wi-Fi. With paid traffic pointed at the site, roughly 30 visitors from one shared IP exhaust the budget and every later visitor sees the frozen placeholder. At the time of the change the real counts were 57 and 50 against hardcoded 48/47, so the fallback was already understating social proof by 12 stars.

The stale `install.ps1` also proved the "single source of truth" arrangement had silently failed: `.sh` was a redirect while `.ps1` was a divergent copy, and nobody noticed.

## Decision

Remove `api.github.com` from every path a visitor or installer can trigger.

**Star counts — fetched at build time.** `scripts/fetch-github-stars.mts` runs in `prebuild` (alongside `og:generate`), writes `src/generated/github-stars.json`, and `useGitHubStars` reads that constant. Two API requests per deploy replace two per visitor. CI passes `GITHUB_TOKEN`, lifting the runner's shared-IP budget from 60 to 1000/hour. The script never fails the build: on any error it keeps the previously generated values, and the generated file is committed so local builds work offline.

**Installers — served whole from archcore.ai.** `public/install.sh` and `public/install.ps1` are the real scripts, not shims. The deploy workflow re-syncs both from the CLI repo before building and fails loudly if the download is empty or is not a script. A `notify-landing.yml` workflow in the CLI repo fires `repository_dispatch: installer-updated` when either installer changes on `main`, so a fix does not wait for the next landing deploy.

Version resolution inside the installers themselves is covered by the CLI-side decision to read the `github.com/.../releases/latest` redirect instead of the REST API.

## Alternatives

- **Keep the runtime star fetch, add a proxy on archcore.ai.** Needs server logic on a site that is deliberately static; build-time fetch achieves the same with a file.
- **Keep `install.sh` as a redirect to raw.githubusercontent.com.** That host carries no `x-ratelimit-*` budget, so it was never the rate-limit problem — but it is the least documented host in the chain, GitHub tightened its unauthenticated limits in May 2025, and it is one more domain to be DPI-blocked for the Russian audience this site is hosted on Pages for.
- **Mirror release binaries to an own CDN.** The only way to remove GitHub from the install path entirely. Not done: the documented, easily exhausted limit is gone, and artifact hosting on GitHub Releases carries no published cap.

## Consequences

- Star counts refresh per deploy rather than per hour. Slightly staler, always correct, never rate-limited.
- `useGitHubStars` no longer has a `loading` state; it returns a constant, so the strip paints the true number on first render instead of correcting itself after hydration.
- `public/install.*` are generated artifacts. Editing them by hand is pointless — the deploy overwrites them from the CLI repo. The source of truth stays `archcore-ai/cli`.
- `notify-landing.yml` needs a `LANDING_DISPATCH_TOKEN` secret with `contents: write` on this repo. Without it the workflow warns instead of failing, and installers simply refresh on the next landing deploy.
- Binary downloads still originate from GitHub Releases; this decision does not change that.
