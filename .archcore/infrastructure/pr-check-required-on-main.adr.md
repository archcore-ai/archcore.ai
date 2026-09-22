---
title: "PR builds carry a placeholder PostHog key, and the Check site build job is required on main"
status: accepted
tags:
  - "infrastructure"
---

## Context

`@.github/workflows/check.yml` runs on every pull request. It builds the site and runs the Playwright suite in Chromium. Its build step set `ALLOW_MISSING_ANALYTICS_KEY=1` and no `PUBLIC_POSTHOG_KEY`, so that PRs from forks, which get no repository variables, can build.

`loadClient()` in `@src/lib/analytics/core.ts` imports `posthog-js` only when a key is set. Two tests in `@tests/site.spec.ts` ("analytics queues passive views until interaction" and "until idle") intercept that SDK chunk (`_astro/module.*.js`) and expect exactly one request. Without a key the chunk never loads, and both tests fail with `Expected: 1, Received: 0`.

The workflow and the tests landed in one commit (`7fb903a`, 2026-09-10). Every later commit went to `main` by direct push, so the workflow did not run until PR #1 (`8507656`) opened on 2026-09-23. That run (35769026012) was red. The PR merged anyway: `main` had no branch protection and no rulesets.

`@.github/workflows/deploy.yml` sets `PUBLIC_POSTHOG_KEY` from `vars.POSTHOG_KEY`, so production was not affected.

## Decision

1. The PR build in `check.yml` sets `PUBLIC_POSTHOG_KEY` to a fixed placeholder, `phc_ci_placeholder_not_a_real_key`. The placeholder is a literal in the workflow, not a variable or a secret, so fork PRs get it too. It exists only to pass the `if (!cfg?.key)` guard. The tests stub the SDK request, so no event reaches PostHog. `ALLOW_MISSING_ANALYTICS_KEY=1` stays, so the build does not throw if the placeholder is removed later.
2. `main` has classic branch protection with one required status check: `build`, the job in `check.yml` (GitHub Actions app id 15368). `strict` is off: a PR does not need a rebase onto the latest `main` to merge. `enforce_admins` is off: an admin can still push to `main` directly, which is how this repository shipped until now.
3. Force pushes to `main` and deletion of `main` are blocked.

Verified 2026-09-23: a local build with the placeholder key produced the `module.*.js` chunk, and the full Playwright suite passed (60 tests) in CI mode.

## Alternatives

- **Skip the two analytics tests when no key is set.** Rejected. The PR check would not cover the SDK loading path, and that path is the reason the tests exist.
- **Pass the real key through `vars.POSTHOG_KEY` in `check.yml`.** Rejected. Fork PRs do not receive repository variables, so the check would fail for outside contributors. The tests do not need a real key.
- **A repository ruleset instead of classic branch protection.** Not chosen. Both work for one required check on one branch. Classic protection is simpler to read in the settings UI. Revisit if more rules accumulate.
- **`enforce_admins` on.** Not chosen now. It blocks direct pushes to `main` for the maintainer too. Turn it on when every change goes through a PR.

## Consequences

- A PR with a red `build` check cannot merge through the UI or the API. Fix the check. Do not remove the rule to get a merge through.
- The required check name is the job id `build`. If you rename the job in `check.yml`, the rule breaks silently: the check never reports, and every PR blocks. Update the branch protection in the same change.
- A CI build is a build with analytics on. A test that asserts behaviour with no key must set up that condition itself and must not rely on the CI env.
- The placeholder key is visible in the built PR artifacts. This is safe: it is not a PostHog key, and PR builds never deploy.
