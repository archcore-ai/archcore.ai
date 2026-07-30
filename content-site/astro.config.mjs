// @ts-check
import { defineConfig } from "astro/config";

// Content hub for archcore.ai — /blog/, /learn/, /alternatives/.
// Built separately from the Vite SPA and merged into the same GitHub
// Pages artifact by scripts/merge-content.mts in the repo root.
// See .archcore/landing/content-hub-astro-subbuild.adr.md.
export default defineConfig({
  site: "https://archcore.ai",
  trailingSlash: "always",
  vite: {
    server: {
      fs: {
        // src/components/Analytics.astro imports the shared analytics core
        // from the parent project (../../../src/lib/analytics) so the content
        // hub and the SPA cannot drift apart on event names. The bundler
        // resolves that during `astro build`; `astro dev` additionally needs
        // the parent directory to be servable.
        allow: [".."],
      },
    },
  },
});
