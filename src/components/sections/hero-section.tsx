import { Trans } from "@lingui/react/macro";
import { Link } from "react-router-dom";
import { ArrowRight, GitBranch, Puzzle, Star, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative pt-28 lg:pt-32 pb-14 md:pb-16 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto">
        <div className="space-y-8 text-center">
          <h1 className="type-hero text-balance">
            <Trans>
              Stop re-explaining your repo
              <br />
              to every AI agent.
            </Trans>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
            <Trans>
              Archcore keeps your decisions, rules, guides, and plans in Git —
              so Claude Code, Cursor, Copilot, Gemini, and other coding agents
              follow your architecture instead of guessing.
            </Trans>
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto">
            <Button size="lg" className="gap-2" asChild>
              <Link to={INTERNAL_LINKS.plugin}>
                <Puzzle className="h-4 w-4" />
                <Trans>Install for Claude / Cursor</Trans>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to={INTERNAL_LINKS.cli}>
                <Terminal className="h-4 w-4" />
                <Trans>Use CLI / MCP</Trans>
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground/70">
            <Trans>
              Open source · Git-native · MCP · Works with multiple AI coding
              agents
            </Trans>
            {" · "}
            <a
              href={LINKS.cliRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Star
                className="inline-block h-3.5 w-3.5 -mt-0.5 mr-1"
                fill="currentColor"
              />
              <Trans>Star on GitHub</Trans>
            </a>
          </p>

          <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card text-left overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">
                  archcore quick start
                </span>
              </div>
              <GitBranch className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </div>
            <div className="grid md:grid-cols-[1fr_0.9fr]">
              <div className="space-y-2 border-b md:border-b-0 md:border-r border-border p-4 font-mono text-xs sm:text-sm">
                <p>
                  <span className="text-muted-foreground">$</span> claude plugin
                  marketplace add archcore-ai/plugin
                </p>
                <p>
                  <span className="text-muted-foreground">$</span> claude plugin
                  install archcore@archcore-plugins
                </p>
                <p className="pt-2 text-muted-foreground">
                  <Trans>
                    You: We use PostgreSQL for primary storage. Record this
                    decision.
                  </Trans>
                </p>
              </div>
              <div className="space-y-2 p-4 font-mono text-xs sm:text-sm">
                <p className="text-muted-foreground">
                  <Trans>Agent:</Trans>
                </p>
                <p>
                  <Trans>Created</Trans>{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    .archcore/infrastructure/use-postgres.adr.md
                  </code>
                </p>
                <p className="text-muted-foreground">
                  <Trans>
                    Future sessions can load it before editing code.
                  </Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
