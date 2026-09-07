---
title: "Every shipped PostHog host is proved reachable in CI, and ingestion moves to edge.archcore.ai"
status: accepted
tags:
  - "infrastructure"
---

## Context

`ph.archcore.ai` was a first-party reverse proxy for PostHog ingestion, so that content blockers — which filter `*.posthog.com` by name — could not silently drop events. It was implemented as a Vercel rewrite.

The migration to GitHub Pages (`@.archcore/infrastructure/migrate-hosting-to-github-pages.adr.md`) deleted `vercel.json` and the Vercel project, but left `vars.POSTHOG_HOST` pointing at `https://ph.archcore.ai`. The name kept resolving, because archcore.ai's DNS (on Vercel nameservers) carries a default wildcard record `* ALIAS cname.vercel-dns-017.com` — so every request reached Vercel's edge and got `404 DEPLOYMENT_NOT_FOUND`.

Measured against production on 2026-09-07: `GET https://ph.archcore.ai/array/<key>/config` returned 404 `DEPLOYMENT_NOT_FOUND`, while the live bundle at `archcore.ai/assets/index-BX1sVESh.js` initialised with `host:"https://ph.archcore.ai"`. Four of the five surfaces reported nothing at all:

| Surface | Host source | State before this ADR |
| --- | --- | --- |
| SPA | `vars.POSTHOG_HOST` via `@src/main.tsx` | dropped |
| Content hub | `vars.POSTHOG_HOST` via `@content-site/src/components/Analytics.astro` | dropped |
| `install.sh` / `install.ps1` | baked in by `archcore-ai/cli` | dropped |
| CLI binary | `defaultEndpoint` in `archcore-ai/cli` `internal/telemetry/telemetry.go` | dropped |
| `install-stats.yml` | `us.i.posthog.com` directly | working |

Nothing failed anywhere. A build with a dead analytics host is indistinguishable from a healthy one, and an empty dashboard is indistinguishable from a site nobody visits.

The failure mode had already been seen once and fixed only locally: `@.github/workflows/install-stats.yml` carries a comment describing this exact `DEPLOYMENT_NOT_FOUND`, and pinned that one job to the direct ingest host without touching the browser bundle, the installers, or the CLI.

Rebuilding the proxy raised a second question. PostHog's own guidance names `ph` — alongside `analytics`, `tracking`, `telemetry` and `posthog` — as a subdomain prefix that filter lists target, and its managed-proxy form warns on it. No filter list carries a generic `ph.*` rule, so the name is not blocked today; what it changes is how quickly the proxy is recognised and reported once anyone looks. The proxy's paths (`/i/v0/e/`, `/array/<key>/config`, `/flags/`, `/s/`) are a PostHog signature that a managed proxy cannot randomise, so a neutral name buys time rather than immunity — but time is the whole point.

## Decision

1. `vars.POSTHOG_HOST` is set to `https://us.i.posthog.com` until a proxy answers. Collection resumes immediately, at the cost of content blockers.
2. Ingestion moves to **`edge.archcore.ai`**, a **PostHog managed reverse proxy** — not a self-hosted one. It is free on PostHog Cloud, needs only a CNAME, and therefore works on GitHub Pages, where the Vercel/Netlify/Workers recipes have nowhere to run. The DNS change is an explicit CNAME, which wins over the wildcard; no record is deleted.
3. **`ph.archcore.ai` is kept as a second managed proxy**, pointing at the same project. It exists only for CLI binaries that hardcode it and cannot be re-pointed. It is legacy from the day it is created: nothing new is shipped against it, and it is retired once released builds carrying `edge.archcore.ai` have propagated.
4. Every PostHog host a deploy ships is proved reachable in CI by `@scripts/check-analytics-host.sh`, which runs two probes: `GET /array/<key>/config` must return PostHog's config JSON, and `POST /i/v0/e/` with an empty body must return 400 (`missing event name`) — only PostHog's own ingestion handler answers that, and nothing is recorded.
5. The script runs in two places. `@.github/workflows/deploy.yml` gates the build, so a bundle pointing at a dead host cannot ship. `@.github/workflows/install-stats.yml` re-runs it nightly, because a proxy whose backing deployment disappears fails long after the last deploy.

## Alternatives

- **Keep `ph.archcore.ai` as the only host.** Rejected. It restores installed CLI binaries fastest, but adopts a name the vendor itself flags, on the one host the whole exercise exists to keep unblocked. Decision 3 buys the same recovery without the name.
- **Move to `edge.archcore.ai` and drop `ph.archcore.ai` entirely.** Rejected: `internal/telemetry/telemetry.go` hardcodes the endpoint with no environment override, so every already-installed CLI would stay dark until it self-updated.
- **Self-hosted proxy (Cloudflare Workers, Netlify, a rewrite elsewhere).** Rejected: it reintroduces a moving part with its own uptime and bandwidth bill, and the one that already existed is what broke. It is the only way to randomise the request paths, which is the reason to revisit this if `edge` is ever blocked.
- **Drop the proxy and ship `us.i.posthog.com` permanently.** Rejected: it concedes the 10–30% of events blockers drop.
- **Alerting on a PostHog volume drop instead of a CI probe.** Rejected as the primary guard: it detects the outage days late and cannot distinguish it from a quiet week. It remains a reasonable addition.

## Consequences

- Until the CNAMEs are live, events reach PostHog directly and blockers drop an estimated 10–30% of them. This is visible as a step in event volume on both sides of the switch, and both switches should be annotated in PostHog.
- Two proxies mean two hosts to keep alive and two rows in the CI check. That is the price of not stranding installed binaries, and it ends when `ph.archcore.ai` is retired.
- The managed proxy routes through Cloudflare. Vercel's unreliability in Russia is what drove the move to GitHub Pages; Cloudflare is more reachable there but not guaranteed, so Russian traffic is the segment to watch after the cutover. If it degrades, the fallback is decision 1 made permanent.
- The installer host check in `deploy.yml` runs with `MODE=warn`, because the host it reads is owned by `archcore-ai/cli` and cannot be fixed from this repository. **It must be flipped to the default fail mode once the CLI repo ships `edge.archcore.ai`** — that is the last step of the cutover, not an optional follow-up.
- The managed proxy is not HIPAA-compliant. Irrelevant here; recorded so the constraint is not rediscovered.

## Cutover checklist

1. PostHog → Organization → Managed reverse proxy → Add managed proxy → `edge.archcore.ai`, then a second for `ph.archcore.ai`. Copy the target domain each one issues.
2. Vercel DNS for `archcore.ai`: add `edge CNAME <target>` and `ph CNAME <target>`. The existing wildcard ALIAS needs no change — an explicit record wins over it. The CAA records already allow `letsencrypt.org` and `pki.goog`, which is what the certificates need.
3. Wait for both proxies to report `Valid` (2–30 minutes).
4. Verify: `POSTHOG_KEY=phc_… POSTHOG_HOST=https://edge.archcore.ai scripts/check-analytics-host.sh`, and the same for `ph.archcore.ai`.
5. `gh variable set POSTHOG_HOST --body https://edge.archcore.ai`, then redeploy.
6. In `archcore-ai/cli`: point `install.sh`, `install.ps1` and `internal/telemetry/telemetry.go` at `edge.archcore.ai`, and release. The landing deploy re-syncs the two installers on its next run.
7. Remove `MODE: warn` from the installer host check in `@.github/workflows/deploy.yml`.
8. Later, once released builds carrying `edge.archcore.ai` dominate: delete the `ph.archcore.ai` proxy and its CNAME, and drop it from this ADR.
