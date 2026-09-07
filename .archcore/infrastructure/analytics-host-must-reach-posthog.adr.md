---
title: "Every shipped PostHog host is proved reachable in CI, and ingestion moves to edge.archcore.ai"
status: accepted
tags:
  - "infrastructure"
---

## Context

`ph.archcore.ai` was a first-party reverse proxy for PostHog ingestion, so that content blockers — which filter `*.posthog.com` by name — could not silently drop events. It was implemented as a Vercel rewrite.

The migration to GitHub Pages (`@.archcore/infrastructure/migrate-hosting-to-github-pages.adr.md`) deleted `vercel.json` and the Vercel project, but left `vars.POSTHOG_HOST` pointing at `https://ph.archcore.ai`. The name kept resolving, because archcore.ai's DNS (on Vercel nameservers) carries a default wildcard record `* ALIAS cname.vercel-dns-017.com` — so every request reached Vercel's edge and got `404 DEPLOYMENT_NOT_FOUND`.

Measured against production on 2026-09-07: `GET https://ph.archcore.ai/array/<key>/config` returned 404 `DEPLOYMENT_NOT_FOUND`, while the live bundle at `archcore.ai/assets/index-BX1sVESh.js` initialised with `host:"https://ph.archcore.ai"`. Five of the six surfaces reported nothing at all:

| Surface | Host source | State before this ADR |
| --- | --- | --- |
| SPA | `vars.POSTHOG_HOST` via `@src/main.tsx` | dropped |
| Content hub | `vars.POSTHOG_HOST` via `@content-site/src/components/Analytics.astro` | dropped |
| docs.archcore.ai | its own `vars.POSTHOG_HOST` in `archcore-ai/docs` | dropped |
| `install.sh` / `install.ps1` | baked in by `archcore-ai/cli` | dropped |
| CLI binary | `defaultEndpoint` in `archcore-ai/cli` `internal/telemetry/telemetry.go` | dropped |
| `install-stats.yml` | `us.i.posthog.com` directly | working |

Nothing failed anywhere. A build with a dead analytics host is indistinguishable from a healthy one, and an empty dashboard is indistinguishable from a site nobody visits.

The docs surface is the sharpest illustration. It sat in a separate repository with its own copy of the variable, so fixing the landing repo did not touch it; it was found only because the whole set of surfaces was enumerated afterwards.

The failure mode had also been seen once and fixed only locally: `@.github/workflows/install-stats.yml` carries a comment describing this exact `DEPLOYMENT_NOT_FOUND`, and pinned that one job to the direct ingest host without touching any of the others.

Rebuilding the proxy raised a second question. PostHog's own guidance names `ph` — alongside `analytics`, `tracking`, `telemetry` and `posthog` — as a subdomain prefix that filter lists target, and its managed-proxy form warns on it. No filter list carries a generic `ph.*` rule, so the name was not blocked; what it changes is how quickly the proxy is recognised and reported once anyone looks. The proxy's paths (`/i/v0/e/`, `/array/<key>/config`, `/flags/`, `/s/`) are a PostHog signature that a managed proxy cannot randomise, so a neutral name buys time rather than immunity — but time is the whole point.

## Decision

1. Ingestion runs through **`edge.archcore.ai`**, a **PostHog managed reverse proxy** — not a self-hosted one. It is free on PostHog Cloud, needs only a CNAME, and therefore works on GitHub Pages, where the Vercel/Netlify/Workers recipes have nowhere to run. The DNS change is an explicit CNAME, which wins over the wildcard; no record is deleted.
2. **`ph.archcore.ai` is kept as a second managed proxy**, pointing at the same project. It exists only for CLI binaries that hardcode it and cannot be re-pointed. It is legacy from the day it is created: nothing new is shipped against it, and it is retired once released builds carrying `edge.archcore.ai` have propagated.
3. `archcore.ai` carries an explicit `CAA 0 issue "ssl.com"` record **alongside** Vercel's three default CAA records, not instead of them. See Consequences.
4. Every PostHog host a deploy ships is proved reachable in CI by `@scripts/check-analytics-host.sh`, which runs two probes: `GET /array/<key>/config` must return PostHog's config JSON, and `POST /i/v0/e/` with an empty body must return 400 (`missing event name`) — only PostHog's own ingestion handler answers that, and nothing is recorded.
5. The script runs in three places. `@.github/workflows/deploy.yml` gates the build here, so a bundle pointing at a dead host cannot ship. `archcore-ai/docs` vendors the script and gates its own build the same way — the same way it already vendors `src/lib/analytics/`. `@.github/workflows/install-stats.yml` re-runs it nightly, because a proxy whose backing deployment disappears fails long after the last deploy.

## Alternatives

- **Keep `ph.archcore.ai` as the only host.** Rejected. It restores installed CLI binaries fastest, but adopts a name the vendor itself flags, on the one host the whole exercise exists to keep unblocked. Decision 2 buys the same recovery without the name.
- **Move to `edge.archcore.ai` and drop `ph.archcore.ai` entirely.** Rejected: `internal/telemetry/telemetry.go` hardcodes the endpoint with no environment override, so every already-installed CLI would stay dark until it self-updated.
- **Self-hosted proxy (Cloudflare Workers, Netlify, a rewrite elsewhere).** Rejected: it reintroduces a moving part with its own uptime and bandwidth bill, and the one that already existed is what broke. It is the only way to randomise the request paths, which is the reason to revisit this if `edge` is ever blocked.
- **Drop the proxy and ship `us.i.posthog.com` permanently.** Rejected: it concedes the 10–30% of events blockers drop.
- **Alerting on a PostHog volume drop instead of a CI probe.** Rejected as the primary guard: it detects the outage days late and cannot distinguish it from a quiet week. It remains a reasonable addition.

## Consequences

- **The CAA record is load-bearing and easy to get wrong.** PostHog's managed proxy issues through **`ssl.com`**, and its certificate authority reads the CAA records of the parent domain `archcore.ai` — not those of the CNAME target, which is what a plain reading of RFC 8659 suggests and what cost two hours of misdiagnosis here. Vercel supplies three CAA records as defaults (`pki.goog`, `sectigo.com`, `letsencrypt.org`); the explicit `ssl.com` record was verified to publish **alongside** them rather than replacing them. That check matters: `archcore.ai`'s own GitHub Pages certificate renews through Let's Encrypt, so a CAA change that dropped the defaults would break the site months later, silently — the same failure shape this ADR exists to prevent.
- Two proxies mean two hosts to keep alive and two rows in the CI check. That is the price of not stranding installed binaries, and it ends when `ph.archcore.ai` is retired.
- **PostHog allows at most two managed proxies per organization.** `edge` and `ph` use both. No third surface can get its own proxy until `ph.archcore.ai` is retired, which turns that retirement from cleanup into a prerequisite.
- The managed proxy routes through Cloudflare. Vercel's unreliability in Russia is what drove the move to GitHub Pages; Cloudflare is more reachable there but not guaranteed, so Russian traffic is the segment to watch after the cutover. If it degrades, the fallback is `us.i.posthog.com` made permanent.
- The installer host check in `deploy.yml` runs with `MODE=warn`, because the host it reads is owned by `archcore-ai/cli` and cannot be fixed from this repository. **It must be flipped to the default fail mode once the CLI repo ships `edge.archcore.ai`** — that is the last step of the cutover, not an optional follow-up.
- The managed proxy is not HIPAA-compliant. Irrelevant here; recorded so the constraint is not rediscovered.

## Cutover checklist

1. ~~PostHog → Organization → Managed reverse proxy → add `edge.archcore.ai` and `ph.archcore.ai`.~~ Done.
2. ~~Vercel DNS: `edge CNAME <target>`, `ph CNAME <target>`. The wildcard ALIAS needs no change — an explicit record wins over it.~~ Done.
3. ~~Add `archcore.ai CAA 0 issue "ssl.com"`, then confirm with `dig CAA archcore.ai` that all four records are published.~~ Done — without it both proxies sit in `pending_validation` indefinitely.
4. ~~Verify each host: `POSTHOG_KEY=phc_… POSTHOG_HOST=https://edge.archcore.ai scripts/check-analytics-host.sh`.~~ Done for `edge`; `ph` still issuing.
5. ~~`gh variable set POSTHOG_HOST --body https://edge.archcore.ai` in this repo and in `archcore-ai/docs`, then redeploy both.~~ Done.
6. In `archcore-ai/cli`: merge the `analytics/edge-ingest-host` branch, which points `install.sh`, `install.ps1` and `internal/telemetry/telemetry.go` at `edge.archcore.ai`, and release. The landing deploy re-syncs the two installers on its next run.
7. Remove `MODE: warn` from the installer host check in `@.github/workflows/deploy.yml`.
8. Later, once released builds carrying `edge.archcore.ai` dominate: delete the `ph.archcore.ai` proxy and its CNAME, and drop it from this ADR. This also frees the second of the two proxy slots.
