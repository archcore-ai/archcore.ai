import path from "path";
import fs from "fs";
import type { Plugin } from "vite";

const SITE_URL = "https://archcore.ai";

interface RouteMeta {
  /** Path segment under dist/, e.g. "plugin" → dist/plugin/index.html */
  path: string;
  title: string;
  description: string;
  /** Absolute URL (defaults to SITE_URL + "/" + path). */
  canonical?: string;
  /** Path-relative or absolute URL. Defaults to /og-image.png. */
  ogImage?: string;
}

const ROUTES: RouteMeta[] = [
  {
    path: "plugin",
    title:
      "Archcore Plugin — Claude Code & Cursor plugin for repo-aware AI",
    description:
      "Install the Archcore plugin in Claude Code or Cursor. Intent-based slash commands load your architecture, rules, and decisions into the agent — so it stops guessing.",
    ogImage: "/og-image-plugin.png",
  },
  {
    path: "cli",
    title:
      "Archcore CLI — repo-native context layer for AI coding agents",
    description:
      "The Archcore CLI puts your architectural decisions, rules, and conventions in .archcore/ — versioned with your code, exposed to 8 AI agents via MCP and session hooks.",
    ogImage: "/og-image-cli.png",
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rewriteMeta(html: string, meta: Required<RouteMeta>): string {
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const c = escapeHtml(meta.canonical);
  const img = escapeHtml(meta.ogImage);

  let out = html;

  out = out.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${t}</title>`
  );

  out = out.replace(
    /(<meta\s+name="description"\s+content=)"[^"]*"/i,
    `$1"${d}"`
  );

  out = out.replace(
    /(<link\s+rel="canonical"\s+href=)"[^"]*"/i,
    `$1"${c}"`
  );

  out = out.replace(
    /(<meta\s+property="og:title"\s+content=)"[^"]*"/i,
    `$1"${t}"`
  );
  out = out.replace(
    /(<meta\s+property="og:description"\s+content=)"[^"]*"/i,
    `$1"${d}"`
  );
  out = out.replace(
    /(<meta\s+property="og:url"\s+content=)"[^"]*"/i,
    `$1"${c}"`
  );
  out = out.replace(
    /(<meta\s+property="og:image"\s+content=)"[^"]*"/i,
    `$1"${img}"`
  );
  out = out.replace(
    /(<meta\s+property="og:image:alt"\s+content=)"[^"]*"/i,
    `$1"${t}"`
  );

  out = out.replace(
    /(<meta\s+name="twitter:title"\s+content=)"[^"]*"/i,
    `$1"${t}"`
  );
  out = out.replace(
    /(<meta\s+name="twitter:description"\s+content=)"[^"]*"/i,
    `$1"${d}"`
  );
  out = out.replace(
    /(<meta\s+name="twitter:image"\s+content=)"[^"]*"/i,
    `$1"${img}"`
  );

  return out;
}

function resolveAbsolute(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

/**
 * Vite plugin that, after the build, generates static HTML files for each
 * configured route — e.g. dist/plugin/index.html and dist/cli/index.html —
 * by cloning dist/index.html and rewriting <title>, <meta description>,
 * canonical, OG, and Twitter Card tags.
 *
 * Why: archcore.ai is a SPA on GitHub Pages. The runtime usePageMeta hook
 * updates tags on client navigation (covers Google JS-rendering and
 * bookmarks), but social scrapers (Twitter, Facebook, LinkedIn, Slack) do
 * NOT execute JS and read static HTML. These per-route HTML files give them
 * correct previews when /plugin or /cli is shared.
 *
 * Run order: this plugin must run AFTER the index.html → 404.html copy plugin
 * so we don't accidentally overwrite the SPA fallback. Both are wired in
 * vite.config.ts via closeBundle.
 */
export function prerenderRoutesPlugin(): Plugin {
  return {
    name: "archcore-prerender-routes",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) {
        this.warn(
          `[prerender-routes] dist/index.html not found — skipping`
        );
        return;
      }
      const baseHtml = fs.readFileSync(indexPath, "utf8");

      for (const route of ROUTES) {
        const meta: Required<RouteMeta> = {
          path: route.path,
          title: route.title,
          description: route.description,
          canonical:
            route.canonical ?? resolveAbsolute(`/${route.path}`),
          ogImage: resolveAbsolute(route.ogImage ?? "/og-image.png"),
        };
        const targetDir = path.join(outDir, route.path);
        fs.mkdirSync(targetDir, { recursive: true });
        const html = rewriteMeta(baseHtml, meta);
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
      }
    },
  };
}
