import path from "path";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { prerenderRoutesPlugin } from "./scripts/prerender-routes.mts";

/**
 * Fails a production build that has no PostHog key rather than shipping a
 * bundle where posthog.init() is called with undefined.
 *
 * This is not hypothetical: the deployed site ran that way, because .env is
 * gitignored and the deploy workflow never passed the variable through, so
 * every visit loaded the analytics bundle and reported nothing. A build-time
 * failure is the only thing that surfaces the mistake — a runtime warning goes
 * to a console nobody is watching in production.
 *
 * Set ALLOW_MISSING_ANALYTICS_KEY=1 for a deliberate build without analytics.
 */
function requireAnalyticsKeyPlugin(mode: string): Plugin {
  return {
    name: "require-analytics-key",
    apply: "build",
    config() {
      if (process.env.ALLOW_MISSING_ANALYTICS_KEY === "1") return;
      const env = loadEnv(mode, process.cwd(), "");
      if (env.VITE_PUBLIC_POSTHOG_KEY) return;
      throw new Error(
        [
          "VITE_PUBLIC_POSTHOG_KEY is not set — refusing to build a site whose",
          "analytics silently do nothing.",
          "",
          "  Local build:  add it to .env (see .env.example)",
          "  CI:           set the POSTHOG_KEY repository variable; the deploy",
          "                workflow maps it to VITE_PUBLIC_POSTHOG_KEY and",
          "                PUBLIC_POSTHOG_KEY",
          "",
          "To build without analytics on purpose, set ALLOW_MISSING_ANALYTICS_KEY=1.",
        ].join("\n")
      );
    },
  };
}

function copy404Plugin(): Plugin {
  return {
    name: "copy-404",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      fs.copyFileSync(
        path.join(outDir, "index.html"),
        path.join(outDir, "404.html"),
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    tailwindcss(),
    copy404Plugin(),
    prerenderRoutesPlugin(),
    requireAnalyticsKeyPlugin(mode),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
