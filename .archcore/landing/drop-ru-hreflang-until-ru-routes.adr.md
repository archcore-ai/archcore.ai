---
title: "Drop ?lang=ru hreflang until real prerendered /ru/ routes exist"
status: accepted
---

## Context

hreflang annotations in `index.html`, the prerendered route heads (`scripts/prerender-routes.mts`), and `public/sitemap.xml` declare a Russian alternate at `?lang=ru` URLs. GitHub Pages ignores query parameters and serves the same English HTML; the Russian translation is applied client-side only. Crawlers therefore see an EN page declared as RU — a dishonest signal Google mostly ignores at best and treats as duplicate-content noise at worst. `landing-improvement-iteration-2.plan.md` (Phase 4, task 2) left this as an open decision: build real `/ru/` routes or drop the claims.

## Decision

Remove all `?lang=ru` hreflang claims (and the `x-default`/`en` pairs that exist only to support them) from `index.html`, the prerender script's per-route hreflang blocks, and `public/sitemap.xml`. The client-side `?lang=ru` language switch keeps working for users — we only stop advertising it to search engines. Reintroduce hreflang when real prerendered `/ru/` routes ship (that work is deferred, not cancelled; it becomes attractive once the content hub exists).

## Alternatives

- **Build prerendered /ru/ routes now:** honest but significant work (route duplication in the prerender pipeline, RU meta layers) for unproven RU search demand; the EN clusters are the growth priority. Deferred.
- **Keep as is:** ongoing dishonest signal, potential duplicate clustering. Rejected.

## Consequences

- Resolves the iteration-2 open decision (Phase 4 task 2); that plan's task list should point here.
- Implementation scope: `index.html` hreflang block, `rewriteHead`/hreflang logic in `scripts/prerender-routes.mts`, `xhtml:link` alternates in `public/sitemap.xml`.
- RU users lose nothing (client-side switch unchanged); RU search visibility was never real.
- When `/ru/` routes are built later, hreflang returns as separate-URL annotations per Google's multilingual guidance.