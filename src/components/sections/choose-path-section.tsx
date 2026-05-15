import { Trans } from "@lingui/react/macro";
import { ArrowRight, Github, Puzzle, Terminal, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

interface PathCard {
  eyebrow: React.ReactNode;
  icon: LucideIcon;
  title: React.ReactNode;
  body: React.ReactNode;
  bullets: React.ReactNode[];
  primaryHref: string;
  primaryLabel: React.ReactNode;
  repoHref: string;
}

export function ChoosePathSection() {
  const cards: PathCard[] = [
    {
      eyebrow: <Trans>CLI</Trans>,
      icon: Terminal,
      title: <Trans>One binary, every AI agent.</Trans>,
      body: (
        <Trans>
          <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
            archcore init
          </code>{" "}
          sets up{" "}
          <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
            .archcore/
          </code>
          , writes MCP config, installs session hooks. macOS, Linux, Windows —
          no external services.
        </Trans>
      ),
      bullets: [
        <Trans>Local MCP in your repo</Trans>,
        <Trans>Auto-loaded at session start</Trans>,
        <Trans>Versioned with your code</Trans>,
      ],
      primaryHref: INTERNAL_LINKS.cli,
      primaryLabel: <Trans>Explore CLI</Trans>,
      repoHref: LINKS.cliRepo,
    },
    {
      eyebrow: <Trans>Plugin</Trans>,
      icon: Puzzle,
      title: <Trans>7 slash commands in your editor.</Trans>,
      body: (
        <Trans>
          Run{" "}
          <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
            /archcore:context
          </code>
          ,{" "}
          <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
            /archcore:capture
          </code>
          ,{" "}
          <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
            /archcore:decide
          </code>{" "}
          — in Claude Code, Cursor, or Codex CLI. Describe what you want in
          plain English; Archcore routes it.
        </Trans>
      ),
      bullets: [
        <Trans>Claude Code · Cursor · Codex CLI</Trans>,
        <Trans>Plain-English routing</Trans>,
        <Trans>
          Shares the same{" "}
          <code className="font-mono text-[0.85em] rounded bg-muted px-1 py-0.5">
            .archcore/
          </code>
        </Trans>,
      ],
      primaryHref: INTERNAL_LINKS.plugin,
      primaryLabel: <Trans>Explore Plugin</Trans>,
      repoHref: LINKS.pluginRepo,
    },
  ];

  return (
    <SectionContainer id="choose-path">
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Two ways in</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Use it as a CLI, plug it into your editor, or both.</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            Same{" "}
            <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
              .archcore/
            </code>{" "}
            context, two ways to drive it.
          </Trans>
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <article
              key={idx}
              className="rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {card.eyebrow}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                {card.title}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {card.body}
              </p>

              <ul className="space-y-2">
                {card.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0"
                    />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={card.primaryHref}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
                >
                  {card.primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={card.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <Trans>View on GitHub</Trans>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </SectionContainer>
  );
}
