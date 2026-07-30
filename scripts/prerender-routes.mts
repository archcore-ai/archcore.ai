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
  /**
   * FAQPage entries for this route. The cloned shell carries the HOME page's
   * FAQPage block, so every route must either override it with its own
   * questions or (empty/omitted) have it stripped — otherwise /privacy/ and
   * friends claim the home FAQ as their own structured data.
   *
   * Must mirror the route's visible FAQ section question-for-question and in
   * the same order (messaging-alignment.rule.md).
   */
  faq?: FaqEntry[];
}

interface RouteBody {
  h1: string;
  paragraphs: string[];
}

interface FaqEntry {
  question: string;
  answer: string;
}

const ROUTES: RouteMeta[] = [
  {
    path: "plugin",
    title: "Archcore Plugin — repo memory in Claude Code, Cursor, Codex",
    description:
      "The Archcore plugin loads your architecture, rules, and decisions into Claude Code, Cursor, and Codex CLI, so the agent follows your team's truth.",
    ogImage: "/og-image-plugin.png",
    body: {
      h1: "Give Claude Code, Cursor & Codex CLI a brain for your codebase.",
      paragraphs: [
        "The plugin gives Claude Code, Cursor, and Codex CLI access to the architectural context already in your repository — decisions, specs, team rules, patterns, and plans — so the agent edits code with the same constraints your team works under, not its best guess from a flat instruction file.",
        "Three install commands wire up architecture-aware /archcore slash commands inside your agent — seven of them, no subcommands: /archcore:init, /archcore:context, /archcore:capture, /archcore:plan, /archcore:decide, /archcore:audit, /archcore:help. Run /archcore:context before a refactor to load the rules, decisions, and specs that apply to a directory. Use /archcore:decide to record a finalized decision as an ADR and turn it into a team rule, /archcore:capture to document what already lives in code, or /archcore:plan to break a feature into a requirements cascade and an implementation plan.",
        "Capture decisions, standards, and plans without leaving chat. The plugin uses the underlying CLI for execution, so you also get MCP tools (list, get, create, update) for browsing and editing .archcore/ documents, and session hooks that inject the relevant context automatically at the start of a conversation.",
        "Plugin hosts: Claude Code (production), Cursor 2.5+ (implemented), and Codex CLI 0.117+ (implemented). GitHub Copilot is planned — use the CLI path there for now. The plugin needs a host with a plugin runtime; every other MCP-aware agent reads the same .archcore/ directory through the CLI, which supports eight agents through MCP and session hooks. Open source, fully local — no servers, no accounts, no telemetry. Everything is stored in .archcore/ inside your repo and versioned with your code.",
        "Already have instruction files? You don't start over. /archcore:init imports the ones you already wrote — CLAUDE.md, AGENTS.md, .cursorrules, .cursor/rules/* — as typed documents: conventions become rules, the reasoning behind them becomes ADRs, and prose already sitting in docs/ becomes guides, specs, and plans. Path-scoped instruction files keep their scope but gain status, timestamps, and relations, so you can see what is still accepted and what a later decision superseded.",
        "Common workflows: load context for a directory before touching it, record an ADR for a finalized decision, propose an RFC when the team needs to weigh in, or extend a feature plan after scope changes. The slash commands are tuned for these patterns, and the document graph means relevant rules and specs surface automatically when an agent reads a file under their scope. Reviewers can audit decisions and standards in code review like any other diff, since the documents live in Git.",
      ],
    },
    // Mirrors src/components/sections/plugin-faq-section.tsx.
    faq: [
      {
        question: "Do I need to install the CLI separately?",
        answer:
          "Yes — one global install. Run curl -fsSL https://archcore.ai/install.sh | bash (or the PowerShell equivalent on Windows), then add the plugin. MCP launches archcore from your PATH.",
      },
      {
        question: "Which agents are supported?",
        answer:
          "Claude Code (production), Cursor 2.5+ (implemented), and Codex CLI 0.117+ (implemented). GitHub Copilot is on the roadmap. For other MCP-capable agents, use the CLI directly.",
      },
      {
        question: "Can I use my own CLI install?",
        answer:
          "Yes — the plugin always uses whichever archcore is on your PATH. Install it however you like (curl, PowerShell, build from source) — see https://docs.archcore.ai/cli/install/.",
      },
      {
        question: "Where do my docs live?",
        answer:
          "In .archcore/ inside your repository. Markdown with YAML frontmatter, versioned with your code. No external services, accounts, or databases.",
      },
    ],
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
        "The CLI is a single cross-platform binary that creates a .archcore/ directory in your repo, wires up MCP and session hooks, and exposes 19 typed document categories. Vision: PRD, Idea, Plan, RnD, MRD, BRD, URD, BRS, StRS, SyRS, SRS. Knowledge: ADR, RFC, Rule, Guide, Doc, Spec. Experience: Task Type, CPAT.",
        "Each document is markdown with YAML frontmatter, versioned alongside your code. Documents have explicit types and named relations (informs, blocks, refines, supersedes), so the agent can navigate the dependency graph instead of grepping a flat instruction file. Status fields and timestamps are stored in frontmatter, so reviewers can scan a directory and see what is accepted, draft, deprecated, or superseded.",
        "Works with 8 AI coding agents today through MCP and session hooks: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, and Cline. Two commands wire each one up — archcore mcp install registers the local MCP server, archcore hooks install adds session hooks where the host supports them. Claude Code, Cursor, and Codex CLI are also plugin hosts. Anything else that speaks MCP works the same way: the CLI is a local MCP server, not an integration per vendor. The MCP server runs locally as a child process and exposes tools to list, get, create, and update documents during a real session. Hooks pre-load relevant context based on the files in scope, so the agent starts each turn with the right rules and specs already in view.",
        "Already have instruction files? You don't start over. archcore init imports the ones you already wrote — CLAUDE.md, AGENTS.md, .cursorrules, .cursor/rules/* — as typed documents: conventions become rules, the reasoning behind them becomes ADRs, and prose already sitting in docs/ becomes guides, specs, and plans. Path-scoped instruction files keep their scope but gain status, timestamps, and relations, so an agent pulls the guide for the directory it is editing instead of grepping the whole folder.",
        "Install with curl -fsSL https://archcore.ai/install.sh | bash on macOS or Linux, or irm https://archcore.ai/install.ps1 | iex on Windows. Cross-platform binary on amd64 and arm64. Run archcore doctor to verify setup, archcore update to self-update, archcore hooks install and archcore mcp install to wire up the integrations. No Node, no Python, no external services required.",
        "Typical first steps after install: run archcore init to scaffold the directory, archcore bootstrap to seed scale-appropriate stack rules and a run guide, and archcore review to surface coverage gaps once you have a few documents in place. Day-to-day commands cover capturing decisions, codifying standards, planning features, and detecting stale documentation as the codebase evolves.",
      ],
    },
    // Mirrors src/components/sections/cli-faq-section.tsx.
    faq: [
      {
        question: "What does archcore init create?",
        answer:
          "A .archcore/ directory with templates and config for 19 document types in three layers — vision (PRD, idea, plan, RnD, MRD, BRD, URD, BRS, StRS, SyRS, SRS), knowledge (ADR, RFC, rule, guide, doc, spec), and experience (task-type, CPAT).",
      },
      {
        question: "Which AI agents does the CLI support?",
        answer:
          "Eight today via MCP and session hooks: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, and Cline. Run archcore mcp install or archcore hooks install to wire each one up.",
      },
      {
        question: "Do I need any external services?",
        answer:
          "No. Standalone binary. Everything in .archcore/ stays in your repo — no servers, databases, accounts, or external dependencies.",
      },
      {
        question: "Should I install the plugin instead?",
        answer:
          "If you use Claude Code or Cursor, yes — the plugin uses the CLI under the hood and gives you intent-based slash commands. Install the CLI on its own when you want the raw context layer or work with another MCP-capable agent.",
      },
    ],
  },
  {
    path: "how-to-use",
    title: "How to use Archcore — interactive walkthrough",
    description:
      "A short interactive walkthrough that shows when to use the plugin, when to use the CLI, and how to wire context into your AI coding agent — in 3-5 steps.",
    ogImage: "/og-image-how-to-use.png",
    body: {
      h1: "How to use Archcore.",
      paragraphs: [
        "A short interactive walkthrough with five branches you can pick from the entry screen. Each branch is 3-5 steps with copy-pasteable commands, expected output, and a one-line note on what just happened. Branches that have both a plugin and a CLI flavor carry a Plugin / CLI toggle you can flip on every step.",
        "Same product, two entry points — pick by the agent you run, not by a recommendation. The Plugin runs inside Claude Code, Cursor, and Codex CLI: seven /archcore slash commands with automatic context injection. The CLI is the core context layer for any MCP-aware agent — finer control, scriptable in CI, the way to integrate with Copilot, Gemini CLI, OpenCode, Cline, and the rest.",
        "What the five branches deliver. How to install Archcore — pick Plugin or CLI, walk through install and verification. Quick start in your project — your first useful command after install on a fresh repo. I have an idea, no context yet — turn a plain-English idea into PRD → spec → plan. Document existing code — capture what already lives in code as decisions, rules, plans, and guides. Solve tasks with existing context — load the right docs before editing, audit drift after.",
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
          <a href="/blog/">Blog</a>
          <a href="/learn/">Learn</a>
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

/**
 * The FAQPage JSON-LD block in index.html, including its marker comment and
 * trailing newline. Anchored on the comment so we never match the
 * Organization or SoftwareApplication blocks (those are site/app-level and
 * stay on every route).
 */
const FAQ_BLOCK_RE =
  /[ \t]*<!-- Structured Data: FAQPage -->\r?\n[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\r?\n/;

function renderFaqJsonLd(faq: FaqEntry[]): string {
  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
  // Escaping "<" keeps a stray "</script>" inside any answer from closing the
  // block early; JSON parsers decode < back to "<".
  const json = JSON.stringify(payload, null, 2).replace(/</g, "\\u003c");
  const indented = json
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
  return `    <!-- Structured Data: FAQPage -->\n    <script type="application/ld+json">\n${indented}\n    </script>\n`;
}

/**
 * Replaces the cloned home-page FAQPage block with this route's own questions,
 * or removes it entirely for routes that have no FAQ. Without this, every
 * prerendered route — including /privacy/ — serves the home FAQ as its own
 * structured data.
 */
function rewriteFaqJsonLd(html: string, meta: Required<RouteMeta>): string {
  if (!FAQ_BLOCK_RE.test(html)) {
    throw new Error(
      `[prerender-routes] FAQPage JSON-LD block not found in dist/index.html — ` +
        `the marker comment in index.html changed; update FAQ_BLOCK_RE.`,
    );
  }
  return html.replace(
    FAQ_BLOCK_RE,
    meta.faq.length > 0 ? renderFaqJsonLd(meta.faq) : "",
  );
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

/** Sitemap hints per route path ("" = homepage). */
const SITEMAP_HINTS: Record<string, { changefreq: string; priority: string }> =
  {
    "": { changefreq: "weekly", priority: "1.0" },
    plugin: { changefreq: "monthly", priority: "0.9" },
    cli: { changefreq: "monthly", priority: "0.9" },
    "how-to-use": { changefreq: "monthly", priority: "0.8" },
    privacy: { changefreq: "yearly", priority: "0.3" },
  };

function renderSitemap(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const paths = ["", ...ROUTES.map((r) => r.path)];
  const entries = paths
    .map((p) => {
      const hints = SITEMAP_HINTS[p] ?? {
        changefreq: "monthly",
        priority: "0.8",
      };
      return `  <url>
    <loc>${SITE_URL}/${p ? `${p}/` : ""}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${hints.changefreq}</changefreq>
    <priority>${hints.priority}</priority>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
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
 * It also writes dist/sitemap.xml from ROUTES (+ homepage) with the build
 * date as lastmod — there is no static public/sitemap.xml anymore, so a
 * route added to ROUTES is picked up by the sitemap automatically.
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
          faq: route.faq ?? [],
        };
        const targetDir = path.join(outDir, route.path);
        fs.mkdirSync(targetDir, { recursive: true });
        let html = rewriteHead(baseHtml, meta);
        html = rewriteFaqJsonLd(html, meta);
        html = rewriteBody(html, meta);
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
      }

      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        renderSitemap(),
        "utf8",
      );
    },
  };
}
