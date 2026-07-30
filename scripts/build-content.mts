import path from "path";
import fs from "fs";
import { spawnSync } from "child_process";

/**
 * Runs the content-site Astro build with the analytics key bridged across.
 *
 * The content hub is a separate Astro project, so its own project root is
 * content-site/ and it never reads the .env file at the repo root. Left alone,
 * a local `npm run build` would produce a SPA that reports analytics and blog
 * pages that do not — the exact silent split this whole setup exists to avoid.
 *
 * Two things happen here:
 *   - the repo-root .env is parsed and VITE_PUBLIC_POSTHOG_* is mapped to the
 *     PUBLIC_POSTHOG_* names Astro exposes to the client
 *   - anything already in the environment wins, so CI (which sets both names
 *     from one repository variable) is unaffected
 *
 * See .archcore/landing/content-hub-astro-subbuild.adr.md.
 */

const ROOT = process.cwd();

/** Minimal KEY=value parser — enough for the two variables we bridge. */
function readDotEnv(file: string): Record<string, string> {
  if (!fs.existsSync(file)) return {};
  const out: Record<string, string> = {};
  for (const rawLine of fs.readFileSync(file, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key) out[key] = value;
  }
  return out;
}

const dotEnv = readDotEnv(path.join(ROOT, ".env"));

const env = { ...process.env };
const bridge = [
  ["PUBLIC_POSTHOG_KEY", "VITE_PUBLIC_POSTHOG_KEY"],
  ["PUBLIC_POSTHOG_HOST", "VITE_PUBLIC_POSTHOG_HOST"],
] as const;

for (const [astroName, viteName] of bridge) {
  if (env[astroName]) continue;
  const value = dotEnv[astroName] ?? env[viteName] ?? dotEnv[viteName];
  if (value) env[astroName] = value;
}

if (!env.PUBLIC_POSTHOG_KEY && process.env.ALLOW_MISSING_ANALYTICS_KEY !== "1") {
  console.error(
    "[build-content] No PostHog key available for the content hub.\n" +
      "  Set VITE_PUBLIC_POSTHOG_KEY in .env, or POSTHOG_KEY as a CI variable.\n" +
      "  To build without analytics on purpose, set ALLOW_MISSING_ANALYTICS_KEY=1."
  );
  process.exit(1);
}

const result = spawnSync("npm", ["--prefix", "content-site", "run", "build"], {
  stdio: "inherit",
  env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
