import path from "path";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import { defineConfig, type Plugin } from "vite";
import { prerenderRoutesPlugin } from "./scripts/prerender-routes.mts";

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

export default defineConfig({
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
});
