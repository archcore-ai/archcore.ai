import { useEffect, useState } from "react";

/**
 * Live GitHub star counts for the CLI and Plugin repos, summed for a single
 * "social proof" number on the landing page.
 *
 * Why a hook (not build-time): the homepage is a client-rendered SPA shell, so
 * a runtime fetch keeps the number fresh without a network call during build.
 * Unauthenticated GitHub API allows 60 req/hr/IP — we cache the result in
 * sessionStorage for an hour and fall back to known-good floors so the strip
 * always renders a sensible number even offline or rate-limited.
 */

const CLI_FALLBACK = 48;
const PLUGIN_FALLBACK = 47;

const CACHE_KEY = "archcore:gh-stars:v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1h

export interface GitHubStars {
  cli: number;
  plugin: number;
  total: number;
  /** True until the first successful live fetch resolves. */
  loading: boolean;
}

const FALLBACK: Omit<GitHubStars, "loading"> = {
  cli: CLI_FALLBACK,
  plugin: PLUGIN_FALLBACK,
  total: CLI_FALLBACK + PLUGIN_FALLBACK,
};

interface CachedStars {
  cli: number;
  plugin: number;
  at: number;
}

function readCache(): CachedStars | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedStars;
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(cli: number, plugin: number): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    const payload: CachedStars = { cli, plugin, at: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage may be unavailable (private mode, quota) — ignore.
  }
}

async function fetchRepoStars(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/archcore-ai/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

export function useGitHubStars(): GitHubStars {
  const cached = readCache();
  const [stars, setStars] = useState<GitHubStars>(() =>
    cached
      ? {
          cli: cached.cli,
          plugin: cached.plugin,
          total: cached.cli + cached.plugin,
          loading: false,
        }
      : { ...FALLBACK, loading: true }
  );

  useEffect(() => {
    if (cached) return; // fresh enough — no network call
    let alive = true;

    void (async () => {
      const [cli, plugin] = await Promise.all([
        fetchRepoStars("cli"),
        fetchRepoStars("plugin"),
      ]);
      if (!alive) return;
      const cliStars = cli ?? CLI_FALLBACK;
      const pluginStars = plugin ?? PLUGIN_FALLBACK;
      if (cli !== null && plugin !== null) writeCache(cliStars, pluginStars);
      setStars({
        cli: cliStars,
        plugin: pluginStars,
        total: cliStars + pluginStars,
        loading: false,
      });
    })();

    return () => {
      alive = false;
    };
    // `cached` is read once on mount; re-running on its identity is unwanted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return stars;
}

/** Format a star count compactly: 48 → "48", 1240 → "1.2k". */
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k`;
}
