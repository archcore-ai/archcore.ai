// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");
// Keep existing local .env files working while CI uses Astro's public prefix.
for (const suffix of ["KEY", "HOST"]) {
  const name = `PUBLIC_POSTHOG_${suffix}`;
  process.env[name] ||=
    env[name] || process.env[`VITE_${name}`] || env[`VITE_${name}`] || "";
}

/**
 * Astro discovers an island's scripts only after its inline hydration script
 * runs, so the browser walks HTML -> inline script -> component chunk ->
 * renderer chunk -> react-dom one round trip at a time. This hook reads the
 * built HTML, follows the static imports of every island chunk, and adds a
 * `modulepreload` link for each one so the whole set is requested together.
 *
 * It only adds link tags. A chunk it cannot resolve is left out, and a stale
 * preload costs a console warning, never a broken page.
 */
function preloadIslandChunks() {
  return {
    name: "preload-island-chunks",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const { readdir, readFile, writeFile } =
          await import("node:fs/promises");
        const { fileURLToPath } = await import("node:url");
        const { join, posix } = await import("node:path");

        const root = fileURLToPath(dir);
        const importsOf = new Map();

        /** Every .html file under the build output, as paths relative to it. */
        const htmlFiles = async (sub = "") => {
          const out = [];
          for (const entry of await readdir(join(root, sub), {
            withFileTypes: true,
          })) {
            const rel = sub ? posix.join(sub, entry.name) : entry.name;
            if (entry.isDirectory()) out.push(...(await htmlFiles(rel)));
            else if (entry.name.endsWith(".html")) out.push(rel);
          }
          return out;
        };

        /** Static imports a built chunk pulls in, as absolute site paths. */
        const chunkImports = async (chunk) => {
          if (importsOf.has(chunk)) return importsOf.get(chunk);
          let found = [];
          try {
            const code = await readFile(join(root, chunk), "utf8");
            const base = chunk.slice(0, chunk.lastIndexOf("/"));
            found = [
              ...code.matchAll(/(?:from|import)\s*["'](\.\/[^"']+\.js)["']/g),
            ].map((m) => `${base}/${m[1].slice(2)}`);
          } catch {
            found = [];
          }
          importsOf.set(chunk, found);
          return found;
        };

        /** The chunk plus everything it statically imports, depth first. */
        const closure = async (entry, seen = new Set()) => {
          if (seen.has(entry)) return seen;
          seen.add(entry);
          for (const next of await chunkImports(entry))
            await closure(next, seen);
          return seen;
        };

        let touched = 0;
        for (const file of await htmlFiles()) {
          const path = join(root, file);
          const html = await readFile(path, "utf8");

          const entries = new Set(
            [...html.matchAll(/(?:component|renderer)-url="([^"]+\.js)"/g)].map(
              (m) => m[1]
            )
          );
          const at = html.indexOf("</head>");
          if (entries.size === 0 || at === -1) continue;

          const chunks = new Set();
          for (const entry of entries)
            for (const chunk of await closure(entry)) chunks.add(chunk);

          const links = [...chunks]
            .filter((chunk) => !html.includes(`modulepreload" href="${chunk}"`))
            .map((chunk) => `<link rel="modulepreload" href="${chunk}">`)
            .join("");
          if (!links) continue;

          await writeFile(path, html.slice(0, at) + links + html.slice(at));
          touched += 1;
        }

        logger.info(`added island preloads to ${touched} page(s)`);
      },
    },
  };
}

export default defineConfig({
  site: "https://archcore.ai",
  output: "static",
  compressHTML: true,
  markdown: { processor: unified() },
  trailingSlash: "always",
  integrations: [
    react({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      babel: {
        plugins: [
          // Lingui strips the English source text out of production bundles and
          // makes every page load the full compiled catalog instead. Keeping
          // the text inline lets each page chunk carry only the strings it
          // actually renders, so the home page stops shipping the copy of every
          // other page. `src/i18n.ts` relies on this: there is no English
          // catalog at runtime, only these inline fallbacks.
          ["macros", { lingui: { stripMessageField: false } }],
        ],
      },
    }),
    {
      name: "require-analytics-key",
      hooks: {
        "astro:build:start": () => {
          if (
            !process.env.PUBLIC_POSTHOG_KEY &&
            process.env.ALLOW_MISSING_ANALYTICS_KEY !== "1"
          ) {
            throw new Error(
              "PUBLIC_POSTHOG_KEY is missing. Set it in .env, or use ALLOW_MISSING_ANALYTICS_KEY=1 for an intentional build without analytics."
            );
          }
        },
      },
    },
    preloadIslandChunks(),
  ],
  vite: { plugins: [tailwindcss()] },
});
