import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

interface Host {
  name: string;
  /** Mirrors the Status column of docs/plugin/supported-hosts.mdx. */
  status: string;
  install: string;
  ready: boolean;
}

/**
 * The single place on the landing site that states plugin host support
 * (messaging-alignment.rule.md). Rows mirror the host matrix in
 * docs/plugin/supported-hosts.mdx — change both together, or the site and the
 * docs start telling visitors different things.
 */
export function PluginHostsSection() {
  const { _ } = useLingui();

  const hosts: Host[] = [
    {
      name: "Claude Code",
      status: _(msg`Production`),
      install: _(msg`Plugin marketplace`),
      ready: true,
    },
    {
      name: "Cursor 2.5+",
      status: _(msg`Implemented`),
      install: _(msg`Marketplace or local directory`),
      ready: true,
    },
    {
      name: "Codex CLI 0.117+",
      status: _(msg`Implemented`),
      install: _(msg`codex plugin marketplace add`),
      ready: true,
    },
    {
      name: "GitHub Copilot CLI",
      status: _(msg`Implemented`),
      install: _(msg`copilot plugin install + archcore init`),
      ready: true,
    },
  ];

  return (
    <SectionContainer id="hosts">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>Where the plugin runs</Trans>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Four hosts today. Any MCP agent through the CLI.</Trans>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Trans>
              The plugin needs a host with a plugin runtime. Every other
              MCP-aware agent reads the same .archcore/ directory through the
              CLI: same source of truth, different entry point.
            </Trans>
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/40 grid grid-cols-[minmax(0,1fr)_minmax(0,6rem)] sm:grid-cols-[minmax(0,1fr)_minmax(0,7rem)_minmax(0,14rem)] gap-3 sm:gap-5">
            <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
              <Trans>Host</Trans>
            </p>
            <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
              <Trans>Status</Trans>
            </p>
            <p className="hidden sm:block text-xs uppercase tracking-wider font-medium text-muted-foreground">
              <Trans>How you install</Trans>
            </p>
          </div>
          <ul className="divide-y divide-border">
            {hosts.map((host) => (
              <li
                key={host.name}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,6rem)] sm:grid-cols-[minmax(0,1fr)_minmax(0,7rem)_minmax(0,14rem)] items-start gap-3 sm:gap-5 px-5 py-4"
              >
                <span
                  className={
                    host.ready
                      ? "text-sm font-semibold leading-snug"
                      : "text-sm font-semibold leading-snug text-muted-foreground"
                  }
                >
                  {host.name}
                </span>
                <span className="text-xs text-muted-foreground leading-snug">
                  {host.status}
                </span>
                <span className="text-sm text-foreground/90 leading-snug col-span-2 sm:col-span-1">
                  {host.install}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <p className="text-center text-sm text-muted-foreground/80">
            <Trans>
              On GitHub Copilot CLI the plugin cannot carry its own MCP server,
              so wiring the project once with{" "}
              <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
                archcore init --agent copilot
              </code>{" "}
              is required, not optional. Without it the document tools are
              missing.
            </Trans>
          </p>
          <p className="text-center text-sm text-muted-foreground/80">
            <Trans>
              Running Gemini CLI, OpenCode, Roo Code, or Cline? The CLI wires all
              eight supported agents over MCP and session hooks.
            </Trans>
          </p>
        </div>

        <nav
          aria-label={_(msg`Host support resources`)}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <Link
            to={INTERNAL_LINKS.cli}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Trans>See the CLI path</Trans>
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
          <a
            href={LINKS.docsSupportedHosts}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Full host matrix</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </nav>
      </div>
    </SectionContainer>
  );
}
