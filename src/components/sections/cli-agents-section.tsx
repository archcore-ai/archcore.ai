import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

interface Agent {
  name: string;
  wiring: string;
  /** True when the plugin also runs inside this host. */
  pluginHost?: boolean;
  /** Host-specific caveat — a hook that is written but gated, or partial. */
  note?: string;
}

/**
 * The eight agents the CLI supports. Mirrors the hook/MCP matrix in the CLI's
 * agent-hooks-integration.guide.md and the "Which AI agents does the CLI
 * support?" answer in cli-faq-section.tsx — keep all three in step. Hooks are
 * wired for five agents as of CLI v0.7.0; OpenCode is never wired because its
 * hooks are JavaScript plugins that cannot be written declaratively.
 */
export function CLIAgentsSection() {
  const { _ } = useLingui();

  const agents: Agent[] = [
    {
      name: "Claude Code",
      wiring: _(msg`MCP + session hooks`),
      pluginHost: true,
    },
    { name: "Cursor", wiring: _(msg`MCP + session hooks`), pluginHost: true },
    {
      name: "Codex CLI",
      wiring: _(msg`MCP + session hooks`),
      pluginHost: true,
      note: _(msg`Hooks need Codex's experimental flag; not on Windows`),
    },
    {
      name: "GitHub Copilot",
      wiring: _(msg`MCP + session hooks`),
      pluginHost: true,
      note: _(msg`No pre-write context injection`),
    },
    { name: "Gemini CLI", wiring: _(msg`MCP + session hooks`) },
    { name: "OpenCode", wiring: _(msg`MCP`) },
    { name: "Roo Code", wiring: _(msg`MCP`) },
    { name: "Cline", wiring: _(msg`MCP (manual setup)`) },
  ];

  return (
    <SectionContainer id="agents">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>Supported agents</Trans>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Eight agents, one .archcore/ directory.</Trans>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Trans>
              Two commands wire each one up:{" "}
              <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
                archcore mcp install
              </code>{" "}
              registers the local MCP server,{" "}
              <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
                archcore hooks install
              </code>{" "}
              adds session hooks where the host supports them.
            </Trans>
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {agents.map((agent) => (
            <li
              key={agent.name}
              className="rounded-xl border border-border bg-card p-4 space-y-1.5"
            >
              <h3 className="text-sm font-semibold leading-tight">
                {agent.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-snug">
                {agent.wiring}
              </p>
              {agent.pluginHost && (
                <p className="text-xs text-muted-foreground/80 leading-snug">
                  <Trans>Plugin host too</Trans>
                </p>
              )}
              {agent.note && (
                <p className="text-xs text-muted-foreground/60 leading-snug">
                  {agent.note}
                </p>
              )}
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-muted-foreground/80 max-w-2xl mx-auto">
          <Trans>
            Anything else that speaks MCP works the same way. The CLI is a
            local MCP server, not an integration per vendor.
          </Trans>
        </p>

        <nav
          aria-label={_(msg`Agent integration resources`)}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <a
            href={LINKS.docsAgentIntegrations}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Per-agent setup</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
          <Link
            to={INTERNAL_LINKS.plugin}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Trans>Claude Code, Cursor, Codex? See the plugin</Trans>
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </nav>
      </div>
    </SectionContainer>
  );
}
