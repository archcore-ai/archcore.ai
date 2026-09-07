---
title: "Every shipped PostHog host is proved reachable in CI, and ph.archcore.ai is rebuilt as a PostHog managed reverse proxy"
status: accepted
tags:
  - "infrastructure"
---

## Context

`ph.archcore.ai` was a first-party reverse proxy for PostHog ingestion, so that content blockers — which filter `*.posthog.com` by name — could not silently drop events. It was implemented as a Vercel rewrite.

The migration to GitHub Pages (`@.archcore/infrastructure/migrate-hosting-to-github-pages.adr.md`) deleted `vercel.json` and the Vercel project, but left `vars.POSTHOG_HOST` pointing at `https://ph.archcore.ai`. The name kept resolving, because archcore.ai's DNS (on Vercel nameservers) carries a default wildcard record `* ALIAS cname.vercel-dns-017.com` — so every request reached Vercel's edge and got `404 DEPLOYMENT_NOT_FOUND`.

Measured against production on 2026-09-07: `GET https://ph.archcore.ai/array/<key>/config` returned 404 `DEPLOYMENT_NOT_FOUND`, while the live bundle at `archcore.ai/assets/index-BX1sVESh.js` initialised with `host:"https://ph.archcore.ai"`. Three of the four surfaces reported nothing at all:

| Surface | Host source | State before this ADR |
| --- | --- | --- |
| SPA | `vars.POSTHOG_HOST` via `@src/main.tsx` | dropped |
| Content hub | `vars.POSTHOG_HOST` via `@content-site/src/components/Analytics.astro` | dropped |
| `install.sh` / `install.ps1` | baked into the CLI repo | dropped |
| `install-stats.yml` | `us.i.posthog.com` directly | working |

Nothing failed anywhere. A build with a dead analytics host is indistinguishable from a healthy one, and an empty dashboard is indistinguishable from a site nobody visits.

The failure mode had already been seen once and fixed only locally: `@.github/workflows/install-stats.yml` carries a comment describing this exact `DEPLOYMENT_NOT_FOUND`, and pinned that one job to the direct ingest host without touching the browser bundle or the installers.

## Decision

1. `vars.POSTHOG_HOST` is set to `https://us.i.posthog.com` until the proxy answers. Collection resumes immediately, at the cost of content blockers.
2. `ph.archcore.ai` is rebuilt as a **PostHog managed reverse proxy**, not as a self-hosted one. It is free on PostHog Cloud, needs only a CNAME, and therefore works on GitHub Pages, where the Vercel/Netlify/Workers recipes have nowhere to run. The DNS change is an explicit CNAME for `ph`, which overrides the wildcard; no record is deleted.
3. The subdomain stays `ph.archcore.ai` rather than moving to a more neutral name. Installed CLI copies have the host baked in and cannot be re-pointed, so reusing the name is what restores them.
4. Every PostHog host a deploy ships is proved reachable in CI by `@scripts/check-analytics-host.sh`, which runs two probes: `GET /array/<key>/config` must return PostHog's config JSON, and `POST /i/v0/e/` with an empty body must return 400 (`missing event name`) — only PostHog's own ingestion handler answers that, and nothing is recorded.
5. The script runs in two places. `@.github/workflows/deploy.yml` gates the build, so a bundle pointing at a dead host cannot ship. `@.github/workflows/install-stats.yml` re-runs it nightly, because a proxy whose backing deployment disappears fails long after the last deploy.

## Alternatives

- **Self-hosted proxy (Cloudflare Workers, Netlify, a rewrite on some other host).** Rejected: it reintroduces a moving part with its own uptime and bandwidth bill, and the one that already existed is what broke.
- **Drop the proxy and ship `us.i.posthog.com` permanently.** Rejected: it concedes the 10–30% of events blockers drop, and leaves every already-installed CLI copy reporting into a hole forever.
- **A new, more neutral subdomain (`e.`, `m.`).** Rejected for now: marginally better against blocklists, but it strands installed CLI copies permanently.
- **Alerting on a PostHog volume drop instead of a CI probe.** Rejected as the primary guard: it detects the outage days late and cannot distinguish it from a quiet week. It remains a reasonable addition.

## Consequences

- Until the CNAME is live, events reach PostHog directly and blockers drop an estimated 10–30% of them. This is visible as a step in event volume on both sides of the switch, and both switches should be annotated in PostHog.
- The managed proxy routes through Cloudflare. Vercel's unreliability in Russia is what drove the move to GitHub Pages; Cloudflare is more reachable there but not guaranteed, so Russian traffic is the segment to watch after the cutover. If it degrades, the fallback is decision 1 made permanent.
- The installer host check in `deploy.yml` runs with `MODE=warn`, because `ph.archcore.ai` is down as this is written and a hard gate would hold the whole site hostage to a DNS change. **It must be flipped to the default fail mode once the proxy answers** — that is the last step of the cutover, not an optional follow-up.
- The managed proxy is not HIPAA-compliant. Irrelevant here; recorded so the constraint is not rediscovered.

## Cutover checklist

1. PostHog → Organization → Managed reverse proxy → Add managed proxy → `ph.archcore.ai`; copy the target domain it issues.
2. Vercel DNS for `archcore.ai`: add `ph CNAME <target>`. The existing wildcard ALIAS needs no change — an explicit record wins over it. The CAA records already allow `letsencrypt.org` and `pki.goog`, which is what the proxy's certificate needs.
3. Wait for the proxy to report `Valid` (2–30 minutes).
4. Verify: `POSTHOG_KEY=phc_… POSTHOG_HOST=https://ph.archcore.ai scripts/check-analytics-host.sh`.
5. `gh variable set POSTHOG_HOST --body https://ph.archcore.ai`, then redeploy.
6. Remove `MODE: warn` from the installer host check in `@.github/workflows/deploy.yml`.
