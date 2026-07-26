import stars from "@/generated/github-stars.json";

/**
 * GitHub star counts for the CLI and Plugin repos, summed for a single
 * "social proof" number on the landing page.
 *
 * Baked in at build time by scripts/fetch-github-stars.mts, refreshed on every
 * deploy. This used to be a runtime fetch, which cost two api.github.com
 * requests per visitor against a budget of 60 requests/hour *per IP* — so
 * visitors sharing an egress address (mobile CGNAT, corporate NAT) exhausted
 * it within ~30 arrivals and saw a frozen placeholder instead of the real
 * count. Reading a constant also means the strip paints the true number on
 * first render instead of swapping in a corrected one after the fetch lands.
 */
export interface GitHubStars {
  cli: number;
  plugin: number;
  total: number;
}

const VALUES: GitHubStars = {
  cli: stars.cli,
  plugin: stars.plugin,
  total: stars.cli + stars.plugin,
};

export function useGitHubStars(): GitHubStars {
  return VALUES;
}

/** Format a star count compactly: 48 → "48", 1240 → "1.2k". */
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k`;
}
