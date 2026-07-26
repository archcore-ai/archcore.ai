/**
 * Bakes GitHub star counts into the bundle at build time.
 *
 * Why build-time: the counts used to be fetched from the browser, which cost
 * two api.github.com requests per visitor. That API allows 60 unauthenticated
 * requests per hour *per IP*, so visitors sharing an egress address — mobile
 * CGNAT, corporate networks — exhausted it within ~30 visitors and fell back
 * to a frozen placeholder. Under ad traffic that means understated social
 * proof exactly when it matters most. Fetching once per deploy costs two
 * requests total and renders the real number for everyone, on first paint.
 *
 * Never fails the build: on any error the previously generated file is kept,
 * and if none exists a conservative floor is written instead.
 */
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPOS = ["cli", "plugin"] as const;

/** Floors used only when no previously generated file exists. */
const FALLBACK: Record<(typeof REPOS)[number], number> = { cli: 48, plugin: 47 };

const OUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/generated/github-stars.json"
);

interface StarData {
  cli: number;
  plugin: number;
  /** ISO timestamp of the successful fetch, or of the fallback write. */
  fetchedAt: string;
}

async function fetchStars(repo: string): Promise<number | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "archcore-landing-build",
  };
  // CI supplies GITHUB_TOKEN, lifting the runner's shared-IP budget from 60 to
  // 1000 requests/hour so a busy Actions IP cannot rate-limit the deploy.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/archcore-ai/${repo}`, {
      headers,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.warn(`[stars] ${repo}: HTTP ${res.status} — keeping previous value`);
      return null;
    }
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch (err) {
    console.warn(`[stars] ${repo}: ${(err as Error).message} — keeping previous value`);
    return null;
  }
}

async function readPrevious(): Promise<StarData | null> {
  try {
    return JSON.parse(await readFile(OUT_PATH, "utf8")) as StarData;
  } catch {
    return null;
  }
}

const previous = await readPrevious();
const [cli, plugin] = await Promise.all(REPOS.map(fetchStars));

const result: StarData = {
  cli: cli ?? previous?.cli ?? FALLBACK.cli,
  plugin: plugin ?? previous?.plugin ?? FALLBACK.plugin,
  fetchedAt: new Date().toISOString(),
};

await mkdir(dirname(OUT_PATH), { recursive: true });
await writeFile(OUT_PATH, `${JSON.stringify(result, null, 2)}\n`, "utf8");

const live = cli !== null && plugin !== null;
console.log(
  `[stars] cli=${result.cli} plugin=${result.plugin} ` +
    `(${live ? "live" : "stale — fetch failed, reused previous values"})`
);
