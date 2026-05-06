import path from "path";
import fs from "fs";
import type { Plugin } from "vite";

const SITE_URL = "https://archcore.ai";

interface RouteMeta {
  /** Path segment under dist/, e.g. "plugin" → dist/plugin/index.html */
  path: string;
  title: string;
  description: string;
  /** Canonical URL. Defaults to SITE_URL + "/" + path + "/". */
  canonical?: string;
  /** Path-relative or absolute URL. Defaults to /og-image.png. */
  ogImage?: string;
  /** Static body content for crawlers (replaces homepage shell). */
  body: RouteBody;
}

interface RouteBody {
  h1: string;
  paragraphs: string[];
}

const ROUTES: RouteMeta[] = [
  {
    path: "plugin",
    title: "Archcore Plugin — repo context for Claude Code & Cursor",
    description:
      "Archcore loads the right ADRs, specs, rules, and patterns before Claude Code and Cursor edit code. Capture decisions and standards without leaving chat.",
    ogImage: "/og-image-plugin.png",
    body: {
      h1: "Archcore Plugin — repo context for Claude Code & Cursor",
      paragraphs: [
        "The plugin gives Claude Code and Cursor access to the architectural context already in your repository — decisions, specs, team rules, patterns, and plans — so the agent edits code with the same constraints your team works under, not its best guess from a flat instruction file.",
        "Two install commands wire up architecture-aware /archcore slash commands inside your agent. Run /archcore:context before a refactor to load the rules, decisions, and specs that apply to a directory. Use /archcore:decide to record a finalized decision (creating an ADR), /archcore:standard to codify a team convention as an ADR + rule + guide chain, or /archcore:plan to break a feature into a requirements cascade and an implementation plan.",
        "Capture decisions, standards, and plans without leaving chat. The plugin uses the underlying CLI for execution, so you also get MCP tools (list, get, create, update) for browsing and editing .archcore/ documents, and session hooks that inject the relevant context automatically at the start of a conversation.",
        "Plugin hosts: Claude Code (production) and Cursor 2.5+ (production). Copilot and Codex CLI are on the roadmap. The CLI itself, exposed under the hood, supports eight agents through MCP. Open source, fully local — no servers, no accounts, no telemetry. Everything is stored in .archcore/ inside your repo and versioned with your code.",
        "Common workflows: load context for a directory before touching it, record an ADR for a finalized decision, propose an RFC when the team needs to weigh in, or extend a feature plan after scope changes. The slash commands are tuned for these patterns, and the document graph means relevant rules and specs surface automatically when an agent reads a file under their scope. Reviewers can audit decisions and standards in code review like any other diff, since the documents live in Git.",
      ],
    },
  },
  {
    path: "cli",
    title: "Archcore CLI — repo memory for every AI coding agent",
    description:
      "Archcore CLI creates .archcore/, wires MCP and hooks, and lets agents read and write decisions, rules, plans, and guides from Git.",
    ogImage: "/og-image-cli.png",
    body: {
      h1: "Archcore CLI — repo memory for every AI coding agent",
      paragraphs: [
        "The CLI is a single cross-platform binary that creates a .archcore/ directory in your repo, wires up MCP and session hooks, and exposes 18 typed document categories. Vision: PRD, Idea, Plan, MRD, BRD, URD, BRS, StRS, SyRS, SRS. Knowledge: ADR, RFC, Rule, Guide, Doc, Spec. Experience: Task Type, CPAT.",
        "Each document is markdown with YAML frontmatter, versioned alongside your code. Documents have explicit types and named relations (informs, blocks, refines, supersedes), so the agent can navigate the dependency graph instead of grepping a flat instruction file. Status fields and timestamps are stored in frontmatter, so reviewers can scan a directory and see what is accepted, draft, deprecated, or superseded.",
        "Works with 8 AI coding agents today through MCP and session hooks: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, and Cline. The MCP server runs locally as a child process and exposes tools to list, get, create, and update documents during a real session. Hooks pre-load relevant context based on the files in scope, so the agent starts each turn with the right rules and specs already in view.",
        "Install with curl -fsSL https://archcore.ai/install.sh | bash on macOS or Linux, or irm https://archcore.ai/install.ps1 | iex on Windows. Cross-platform binary on amd64 and arm64. Run archcore doctor to verify setup, archcore update to self-update, archcore hooks install and archcore mcp install to wire up the integrations. No Node, no Python, no external services required.",
        "Typical first steps after install: run archcore init to scaffold the directory, archcore bootstrap to seed scale-appropriate stack rules and a run guide, and archcore review to surface coverage gaps once you have a few documents in place. Day-to-day commands cover capturing decisions, codifying standards, planning features, and detecting stale documentation as the codebase evolves.",
      ],
    },
  },
  {
    path: "privacy",
    title: "Privacy Policy — Archcore plugin, CLI & website",
    description:
      "Privacy policy for the Archcore plugin, the Archcore CLI, and the archcore.ai marketing website. Local-first, no telemetry, no accounts, no data sale.",
    body: {
      h1: "Privacy Policy",
      paragraphs: [
        "Last updated April 22, 2026. This policy explains what data the project processes across three surfaces: the plugin (for Claude Code, Cursor, and other AI coding agents), the CLI, and the marketing website at archcore.ai. The project is designed to be local-first: your code and documentation never leave your machine unless you explicitly send it somewhere.",
        "Plugin and CLI: Fully local. Both run on your machine. All documents live in the .archcore/ directory inside your Git repository. No telemetry, no usage analytics, no crash reports, no identifiers, no data is collected from the plugin or CLI. No accounts, no API keys, and no required backend service. The MCP server runs locally as a child process. When you use the tool inside an AI coding agent, that host may include excerpts of your documents in prompts to its model provider — those transfers are governed by the host's own privacy policy, not by us.",
        "Website: We use PostHog for aggregate analytics (pages viewed, referrer, country, approximate device type). Analytics respect Do Not Track and can be blocked with any standard content blocker. No analytics run in development builds. We do not sell data to third parties. We do not use your data to train AI models. Cookies are limited to first-party analytics and a language preference; no third-party advertising or tracking cookies.",
        "What we do not do: read or upload your source code, read or upload the contents of your .archcore/ directory, sell data to third parties, or use your data to train AI models. Install scripts download release binaries from GitHub Releases; standard web request metadata may be logged by GitHub and the CDN during download but is not retained by us.",
        "Your rights: You can request access to, correction of, or deletion of any personal data we hold (currently only possible if you have subscribed to the email list) by contacting us at archcore-ai@proton.me. We may update this policy as the product evolves. Material changes will be reflected in the last-updated date at the top of this page.",
      ],
    },
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderBody(meta: Required<RouteMeta>): string {
  const h1 = escapeHtml(meta.body.h1);
  const paragraphs = meta.body.paragraphs
    .map((p) => `        <p>${escapeHtml(p)}</p>`)
    .join("\n");

  return `      <main id="main-content">
        <h1>${h1}</h1>
${paragraphs}
        <nav aria-label="Site">
          <a href="/">Home</a>
          <a href="/plugin/">Plugin</a>
          <a href="/cli/">CLI</a>
          <a href="https://docs.archcore.ai/">Docs</a>
          <a href="https://github.com/archcore-ai">GitHub</a>
          <a href="/privacy/">Privacy</a>
        </nav>
      </main>`;
}

function rewriteHead(html: string, meta: Required<RouteMeta>): string {
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const c = escapeHtml(meta.canonical);
  const img = escapeHtml(meta.ogImage);
  const ru = `${meta.canonical}${meta.canonical.includes("?") ? "&" : "?"}lang=ru`;

  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${t}</title>`);

  out = out.replace(
    /(<meta\s+name="description"\s+content=)"[^"]*"/i,
    `$1"${d}"`,
  );

  out = out.replace(
    /(<link\s+rel="canonical"\s+href=)"[^"]*"/i,
    `$1"${c}"`,
  );

  // Per-route hreflang block (replaces the homepage hreflang block)
  out = out.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*" \/>\s*<link rel="alternate" hreflang="ru" href="[^"]*" \/>\s*<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="en" href="${c}" />
    <link rel="alternate" hreflang="ru" href="${escapeHtml(ru)}" />
    <link rel="alternate" hreflang="x-default" href="${c}" />`,
  );

  out = out.replace(
    /(<meta\s+property="og:title"\s+content=)"[^"]*"/i,
    `$1"${t}"`,
  );
  out = out.replace(
    /(<meta\s+property="og:description"\s+content=)"[^"]*"/i,
    `$1"${d}"`,
  );
  out = out.replace(
    /(<meta\s+property="og:url"\s+content=)"[^"]*"/i,
    `$1"${c}"`,
  );
  out = out.replace(
    /(<meta\s+property="og:image"\s+content=)"[^"]*"/i,
    `$1"${img}"`,
  );
  out = out.replace(
    /(<meta\s+property="og:image:alt"\s+content=)"[^"]*"/i,
    `$1"${t}"`,
  );

  out = out.replace(
    /(<meta\s+name="twitter:title"\s+content=)"[^"]*"/i,
    `$1"${t}"`,
  );
  out = out.replace(
    /(<meta\s+name="twitter:description"\s+content=)"[^"]*"/i,
    `$1"${d}"`,
  );
  out = out.replace(
    /(<meta\s+name="twitter:image"\s+content=)"[^"]*"/i,
    `$1"${img}"`,
  );

  return out;
}

function rewriteBody(html: string, meta: Required<RouteMeta>): string {
  // Replace the static SEO fallback <main id="main-content">...</main>
  // that lives inside <div id="root">. Anchored to a <div id="root"> +
  // newline + 6-space indentation so we never accidentally match the same
  // string inside a CSS comment, JSON-LD block, or anything else in <head>.
  const bodyHtml = renderBody(meta);
  return html.replace(
    /(<div id="root">\s*\n)\s*<main id="main-content">[\s\S]*?<\/main>/,
    `$1${bodyHtml}`,
  );
}

function resolveAbsolute(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

/**
 * Vite plugin that, after the build, generates static HTML files for each
 * configured route — e.g. dist/plugin/index.html, dist/cli/index.html, and
 * dist/privacy/index.html — by cloning dist/index.html and rewriting <head>
 * meta and the static <main> body content.
 *
 * Why: archcore.ai is a SPA on GitHub Pages. The runtime usePageMeta hook
 * updates tags on client navigation, but social scrapers (Twitter, Facebook,
 * LinkedIn, Slack) and many SEO crawlers do NOT execute JS. These per-route
 * HTML files give them correct previews and crawlable content (h1, intro,
 * internal links) when /plugin/, /cli/, or /privacy/ is shared or indexed.
 *
 * Run order: this plugin must run AFTER the index.html → 404.html copy plugin
 * so we don't accidentally overwrite the SPA fallback.
 */
export function prerenderRoutesPlugin(): Plugin {
  return {
    name: "archcore-prerender-routes",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) {
        this.warn(`[prerender-routes] dist/index.html not found — skipping`);
        return;
      }
      const baseHtml = fs.readFileSync(indexPath, "utf8");

      for (const route of ROUTES) {
        const canonical = route.canonical ?? `${SITE_URL}/${route.path}/`;
        const meta: Required<RouteMeta> = {
          path: route.path,
          title: route.title,
          description: route.description,
          canonical,
          ogImage: resolveAbsolute(route.ogImage ?? "/og-image.png"),
          body: route.body,
        };
        const targetDir = path.join(outDir, route.path);
        fs.mkdirSync(targetDir, { recursive: true });
        let html = rewriteHead(baseHtml, meta);
        html = rewriteBody(html, meta);
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
      }
    },
  };
}
