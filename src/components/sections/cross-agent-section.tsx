import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Section 6 of the canonical homepage sequence.
 *
 * This is a summary, not a matrix. The single source for CLI agent support is
 * `cli-agents-section.tsx` on /cli, and for plugin hosts it is
 * `plugin-hosts-section.tsx` on /plugin (see .archcore/messaging-alignment.rule.md).
 * Names listed here must appear there; wiring details must not be restated.
 */
export function CrossAgentSection() {
  const { _ } = useLingui();

  const pluginHosts = ["Claude Code", "Cursor", "Codex CLI", "GitHub Copilot"];
  const cliOnly = ["Gemini CLI", "OpenCode", "Roo Code", "Cline"];

  const hostPages = [
    { label: "Claude Code", href: INTERNAL_LINKS.claudeCode },
    { label: "Cursor", href: INTERNAL_LINKS.cursor },
    { label: "Codex CLI", href: INTERNAL_LINKS.codex },
    { label: "GitHub Copilot", href: INTERNAL_LINKS.githubCopilot },
    { label: "Gemini CLI", href: INTERNAL_LINKS.geminiCli },
  ];

  const paths: {
    title: string;
    body: string;
    agents: string[];
    href: string;
    cta: string;
  }[] = [
    {
      title: _(msg`Plugin`),
      body: _(msg`Slash commands, skills, and guardrails inside the host.`),
      agents: pluginHosts,
      href: INTERNAL_LINKS.plugin,
      cta: _(msg`See the plugin`),
    },
    {
      title: _(msg`CLI`),
      body: _(msg`One binary and a local MCP server for every other agent, and for CI.`),
      agents: [...pluginHosts, ...cliOnly],
      href: INTERNAL_LINKS.cli,
      cta: _(msg`See the CLI`),
    },
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
            Both entry points read and write the same{" "}
            <code className="font-mono text-[0.9em]">.archcore/</code> directory.
            Pick by the agent you run, not by a recommendation.
          </Trans>
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {paths.map((path) => (
          <article
            key={path.title}
            className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4"
          >
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold leading-tight">
                {path.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {path.body}
              </p>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {path.agents.map((agent) => (
                <li
                  key={agent}
                  className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-foreground/80"
                >
                  {agent}
                </li>
              ))}
            </ul>

            <Link
              to={path.href}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-[var(--color-action)] transition-colors"
            >
              {path.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
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
