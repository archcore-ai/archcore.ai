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
      babel: { plugins: ["macros"] },
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
  ],
  vite: { plugins: [tailwindcss()] },
});
