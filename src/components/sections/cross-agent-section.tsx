import { Trans } from "@lingui/react/macro";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Section 7 of the canonical homepage sequence.
 *
 * This was a two-card Plugin vs CLI comparison until 2026-08-27. The cards
 * asked the reader to compare two things and pick one, which is not a choice
 * the reader has to make any more: `archcore init` installs the CLI and the
 * plugin together on the hosts that take a plugin. The homepage now presents
 * one product and one agent list; the entry-point split lives on /plugin and
 * /cli, which the nav and the footer link.
 *
 * This is a summary, not a matrix. The single source for CLI agent support is
 * `cli-agents-section.tsx` on /cli, and for plugin hosts it is
 * `plugin-hosts-section.tsx` on /plugin (see .archcore/messaging-alignment.rule.md).
 * Names listed here must appear there; wiring details must not be restated.
 */
export function CrossAgentSection() {
  const agents = [
    "Claude Code",
    "Cursor",
    "Codex CLI",
    "GitHub Copilot",
    "Gemini CLI",
    "OpenCode",
    "Roo Code",
    "Cline",
  ];

  const hostPages = [
    { label: "Claude Code", href: INTERNAL_LINKS.claudeCode },
    { label: "Cursor", href: INTERNAL_LINKS.cursor },
    { label: "Codex CLI", href: INTERNAL_LINKS.codex },
    { label: "GitHub Copilot", href: INTERNAL_LINKS.githubCopilot },
    { label: "Gemini CLI", href: INTERNAL_LINKS.geminiCli },
  ];

  return (
    <SectionContainer id="cross-agent">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Cross-agent</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>One project context. Every coding agent.</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            <code className="font-mono text-[0.9em]">archcore init</code> wires
            whichever agents you already run. Each one reads and writes the same{" "}
            <code className="font-mono text-[0.9em]">.archcore/</code> directory
            in your repo.
          </Trans>
        </p>
      </div>

      <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card p-6 space-y-5">
        <ul className="flex flex-wrap justify-center gap-2">
          {agents.map((agent) => (
            <li
              key={agent}
              className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground/80"
            >
              {agent}
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          <Trans>
            Slash commands, skills, and guardrails run inside Claude Code,
            Cursor, Codex CLI, and GitHub Copilot. Every other agent reaches the
            same context over MCP and session hooks.
          </Trans>
        </p>
      </div>

      {/*
        Per-host reference pages, one canonical owner per "{agent} context"
        query (product/seo-information-architecture). Static Astro routes from
        the content-site sub-build, so plain anchors with a full page load.
      */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          <Trans>Setting up a specific agent?</Trans>{" "}
          {hostPages.map((page, i) => (
            <span key={page.href}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <a
                href={page.href}
                className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
              >
                {page.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </SectionContainer>
  );
}
