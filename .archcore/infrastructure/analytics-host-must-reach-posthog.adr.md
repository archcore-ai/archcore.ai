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
2. **`ph.archcore.ai` is kept as a second managed proxy**, pointing at the same project. It exists only for CLI binaries that hardcode it and cannot be re-pointed. It is legacy from the day it was created: nothing new ships against it, and it is retired once released builds carrying `edge.archcore.ai` have propagated.
3. `archcore.ai` carries an explicit `CAA 0 issue "ssl.com"` record **alongside** Vercel's three default CAA records, not instead of them. See Consequences.
4. Every PostHog host a deploy ships is proved reachable in CI by `@scripts/check-analytics-host.sh`, which runs two probes: `GET /array/<key>/config` must return PostHog's config JSON, and `POST /i/v0/e/` with an empty body must return 400 (`missing event name`) — only PostHog's own ingestion handler answers that, and nothing is recorded.
5. The script runs in three places. `@.github/workflows/deploy.yml` gates the build here twice — once on the host the bundle will carry, once on the host the freshly synced installers carry. `archcore-ai/docs` vendors the script and gates its own build the same way it already vendors `src/lib/analytics/`. `@.github/workflows/install-stats.yml` re-runs it nightly, because a proxy whose backing deployment disappears fails long after the last deploy.

## Alternatives

- **Keep `ph.archcore.ai` as the only host.** Rejected. It restores installed CLI binaries fastest, but adopts a name the vendor itself flags, on the one host the whole exercise exists to keep unblocked. Decision 2 buys the same recovery without the name.
- **Move to `edge.archcore.ai` and drop `ph.archcore.ai` entirely.** Rejected: `internal/telemetry/telemetry.go` hardcodes the endpoint with no environment override, so every already-installed CLI would stay dark until it self-updated.
- **Self-hosted proxy (Cloudflare Workers, Netlify, a rewrite elsewhere).** Rejected: it reintroduces a moving part with its own uptime and bandwidth bill, and the one that already existed is what broke. It is the only way to randomise the request paths, which is the reason to revisit this if `edge` is ever blocked.
- **Drop the proxy and ship `us.i.posthog.com` permanently.** Rejected: it concedes the 10–30% of events blockers drop.
- **Alerting on a PostHog volume drop instead of a CI probe.** Rejected as the primary guard: it detects the outage days late and cannot distinguish it from a quiet week. It remains a reasonable addition.

## Consequences

- **The CAA record is load-bearing and easy to get wrong.** PostHog's managed proxy issues through **`ssl.com`**, and its certificate authority reads the CAA records of the parent domain `archcore.ai` — not those of the CNAME target, which is what a plain reading of RFC 8659 suggests and what cost two and a half hours of misdiagnosis here. Both proxies sat in `pending_validation` until the record was added, and went `Live` within minutes of it. Vercel supplies three CAA records as defaults (`pki.goog`, `sectigo.com`, `letsencrypt.org`); the explicit `ssl.com` record was verified to publish **alongside** them rather than replacing them. That check matters: `archcore.ai`'s own GitHub Pages certificate renews through Let's Encrypt, so a CAA change that dropped the defaults would break the site months later, silently — the same failure shape this ADR exists to prevent.
- Two proxies mean two hosts to keep alive and two rows to check. That is the price of not stranding installed binaries, and it ends when `ph.archcore.ai` is retired.
- **PostHog allows at most two managed proxies per organization.** `edge` and `ph` use both. No third surface can get its own proxy until `ph.archcore.ai` is retired, which turns that retirement from cleanup into a prerequisite.
- **A CLI release is not what gates the installers.** The landing deploy fetches `install.sh` and `install.ps1` from `raw.githubusercontent.com/archcore-ai/cli/refs/heads/main`, so a commit on that branch plus a landing deploy is enough for both the installers and the installer host gate. A release only moves `defaultEndpoint` inside the binary, which is why it can ride the next ordinary release instead of being cut for this.
- The managed proxy routes through Cloudflare. Vercel's unreliability in Russia is what drove the move to GitHub Pages; Cloudflare is more reachable there but not guaranteed, so Russian traffic is the segment to watch after the cutover. If it degrades, the fallback is `us.i.posthog.com` made permanent.
- The managed proxy is not HIPAA-compliant. Irrelevant here; recorded so the constraint is not rediscovered.

## Cutover — done

1. Both proxies created in PostHog and `Live`.
2. Vercel DNS: `edge CNAME <target>`, `ph CNAME <target>`. The wildcard ALIAS needed no change — an explicit record wins over it.
3. `archcore.ai CAA 0 issue "ssl.com"` added; `dig CAA archcore.ai` confirms all four records publish.
4. Both hosts verified with `scripts/check-analytics-host.sh`: config 200, ingest 400. A real browser on the `archcore.ai` origin posted an event through `edge` and got `200 {"status":"Ok"}`.
5. `vars.POSTHOG_HOST` set to `https://edge.archcore.ai` in this repo and in `archcore-ai/docs`; both redeployed and the live bundles confirmed.
6. `archcore-ai/cli` `main` carries `edge.archcore.ai` in `install.sh`, `install.ps1` and `internal/telemetry/telemetry.go`.
7. The installer host check in `@.github/workflows/deploy.yml` gates the deploy — `MODE: warn` removed.

## Remaining

- A CLI release, whenever the next one is cut, puts `edge.archcore.ai` inside the binary. Until then released binaries keep reporting to `ph.archcore.ai`.
- Once builds carrying `edge.archcore.ai` dominate: delete the `ph.archcore.ai` proxy and its CNAME, drop decision 2, and free the second proxy slot.
