# Deploying archcore.ai

GitHub Pages serves the static files built by the root Astro project. The deployment workflow publishes `dist/` to the existing `archcore.ai` custom domain. No application server or Astro adapter runs in production.

## Publish a release

[deploy.yml](../.github/workflows/deploy.yml) runs after a push to `main`, a manual workflow dispatch, or the CLI repository's `installer-updated` event. It installs dependencies with `npm ci`, runs `npm run build`, and checks the built site in Chromium before archiving or uploading it.

Before building, the workflow fetches the current `install.sh` and `install.ps1` from the CLI repository, injects the public PostHog project key, and checks both the site's and the installers' analytics hosts. Keep these steps when changing the build command: the site also distributes the CLI installers.

Configure these repository variables:

| Variable       | Purpose                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `POSTHOG_KEY`  | Public project key, exposed to Astro as `PUBLIC_POSTHOG_KEY` and injected into the installers. Required for production builds.                |
| `POSTHOG_HOST` | Site ingestion endpoint, exposed as `PUBLIC_POSTHOG_HOST`. If unset, the shared analytics module and CI check use `https://us.i.posthog.com`. |

The workflow uses Node 22. The site uses Astro 7.3.2, which requires Node 22.12.0 or later. Keep the root lockfile committed and use `npm ci` to install it.

The GitHub Pages source must remain **GitHub Actions**, with custom domain `archcore.ai` in the repository's Pages settings. Astro uses `site: "https://archcore.ai"` without a repository-name `base`. With a custom Actions workflow, GitHub ignores `public/CNAME`; the domain setting is authoritative. See [GitHub's domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Check a pull request

[check.yml](../.github/workflows/check.yml) installs the root dependencies and runs the production build. It sets `ALLOW_MISSING_ANALYTICS_KEY=1`, supplies no PostHog key, and uses the committed installer copies. It does not run the analytics-host probes or publish a site. This permits checks on fork pull requests without production variables or Pages write permissions.

Both PR checks and normal deployments run `npx playwright install --with-deps chromium` followed by `npm run test:browser`. Playwright serves `dist/` locally and checks the sitemap routes, desktop and mobile layouts, light and dark themes, language switching, installation controls, the integration page, and 404 behavior. Browser tests block external requests, including analytics.

To run the same checks locally, build first, install Chromium with the command above, then run `npm run test:browser`. These checks exercise the generated site. After publication, also verify representative URLs on `https://archcore.ai`: local tests cannot prove GitHub Pages routing or domain configuration.

## Restore a previous release

Each normal deployment stores a `site-release` artifact for 30 days. It contains the original `dist/` in `site.tar.gz`, a SHA-256 checksum, and a manifest with the repository, commit SHA, run ID, and run attempt. The Pages transport artifact also has 30-day retention.

Use [rollback.yml](../.github/workflows/rollback.yml) to restore a successful release without rebuilding or fetching newer installers:

1. In Actions, find a successful **Deploy to GitHub Pages** run from `main` with an unexpired `site-release` artifact. Copy its numeric run ID and full 40-character lowercase commit SHA.
2. Open **Restore GitHub Pages release**, select **Run workflow**, and keep the branch set to `main`.
3. Enter the source run ID in `run_id` and its commit SHA in `expected_sha`, then run the workflow.
4. After it succeeds, check the home page, an article, installation links, a direct nested route, and an unknown URL on `https://archcore.ai`. Check analytics with the intended test procedure if the incident affected it.
5. Revert or fix the faulty source change before the next normal release. Restoring an artifact does not change Git history.

The restore workflow checks that the source is a completed, successful `deploy.yml` run from `main` at the supplied SHA. It rejects expired or missing archives, a mismatched manifest or run attempt, a failed checksum, unsafe archive entries, and missing required site files. Both workflows share the `pages` concurrency group, so publishing steps cannot overlap. A queued or later normal deployment can still replace a restored release.

Restoring the archive also restores its original installer scripts and analytics configuration. Choose a source release whose configuration still works. The workflow deliberately avoids rebuilds and analytics-host probes so a current external service outage cannot block restoring known site files.

### Limits

The artifact must come from a deployment made after release archival was added. Older runs without `site-release`, expired artifacts, and artifacts manually deleted from Actions cannot be restored with this workflow. Rerunning a deployment replaces that run's archive with the new run attempt; use a separate successful run to retain a distinct rollback target.

Rebuilding an old commit is a fallback, but it does not reproduce the original output exactly. Installer scripts are fetched from the CLI repository's current `main`, star counts are fetched at build time, and repository variables can change. Before a large migration, preserve and verify a release artifact while the previous site is still available. The first deployment of this workflow cannot retroactively archive an expired production release.

Pages publication takes time, so a restore is not an instant traffic switch. The current workflows provide no percentage-based canary or preview hosting. Use a separate preview environment or local static server to review a candidate; prevent a public preview from being indexed. GitHub's [deploy-pages action](https://github.com/actions/deploy-pages) documents its preview feature as unavailable to the public.
