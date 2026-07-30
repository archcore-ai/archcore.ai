// @ts-check
import { defineConfig } from "astro/config";

// Content hub for archcore.ai — /blog/, /learn/, /alternatives/.
// Built separately from the Vite SPA and merged into the same GitHub
// Pages artifact by scripts/merge-content.mts in the repo root.
// See .archcore/landing/content-hub-astro-subbuild.adr.md.
export default defineConfig({
  site: "https://archcore.ai",
  trailingSlash: "always",
});
