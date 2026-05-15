import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { BookOpen, Github, Server, Workflow, Zap, type LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { LINKS } from "@/lib/links";

interface TreeEntry {
  path: string;
  hint: string;
}

interface Outcome {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function CLIRepoLayoutSection() {
  const { _ } = useLingui();

  const tree: TreeEntry[] = [
    { path: "├─ decisions/", hint: _(msg`ADRs, RFCs`) },
    { path: "├─ rules/", hint: _(msg`your conventions`) },
    { path: "├─ plans/", hint: _(msg`PRDs, roadmaps`) },
    { path: "├─ guides/", hint: _(msg`how-tos`) },
    { path: "├─ specs/", hint: _(msg`typed contracts`) },
    { path: "└─ mcp.json", hint: _(msg`agent config`) },
  ];

  const outcomes: Outcome[] = [
    {
      icon: Server,
      title: _(msg`Local MCP in your repo`),
      body: _(msg`No external service, no account, no telemetry.`),
    },
    {
      icon: Workflow,
      title: _(msg`One config, every agent`),
      body: _(
        msg`Claude Code, Cursor, Codex CLI — same source of truth.`
      ),
    },
    {
      icon: Zap,
      title: _(msg`Context auto-injected at session start`),
      body: _(
        msg`Session hooks load the rules and ADRs for what you're touching.`
      ),
    },
  ];

  return (
    <SectionContainer id="what-you-get">
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>What you get after init</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>One command turns your repo into structured context.</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>Local MCP, agent-ready, versioned with your code.</Trans>
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-border bg-card p-6 font-mono text-sm">
          <p className="text-foreground/90 mb-3">.archcore/</p>
          <ul className="space-y-1.5">
            {tree.map((entry) => (
              <li
                key={entry.path}
                className="flex items-baseline gap-3 leading-snug"
              >
                <span className="text-foreground/90 whitespace-pre">
                  {entry.path}
                </span>
                <span className="text-muted-foreground text-xs">
                  {entry.hint}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="space-y-4">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <li
                key={outcome.title}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
              >
                <div className="rounded-lg bg-muted p-2 shrink-0">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold leading-tight">
                    {outcome.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {outcome.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-16 max-w-2xl mx-auto text-center space-y-5">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
          <Trans>Try it in your repo.</Trans>
        </h3>
        <div className="rounded-xl border border-border bg-card px-5 py-4 font-mono text-sm text-left">
          <span className="text-muted-foreground select-none">$ </span>
          <span className="text-foreground">
            npm i -g @archcore/cli && archcore init
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={LINKS.cliRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
          >
            <Github className="h-4 w-4" />
            <Trans>Star on GitHub</Trans>
          </a>
          <a
            href="https://docs.archcore.ai/cli/install/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Read the CLI docs</Trans>
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
