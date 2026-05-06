import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ExternalLink, Github, Star } from "lucide-react";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

export function CLIHeroSection() {
  const { _ } = useLingui();

  return (
    <section
      id="top"
      className="hero-section relative pt-28 lg:pt-32 pb-14 md:pb-16 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto">
        <div className="space-y-8 text-center">
          <h1 className="type-hero text-balance">
            <Trans>
              Repo memory
              <br />
              for every AI coding agent.
            </Trans>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
            <Trans>
              Archcore CLI creates{" "}
              <code className="font-mono text-base bg-muted/60 px-1.5 py-0.5 rounded">
                .archcore/
              </code>
              , wires MCP and hooks, and lets your agents read and write
              decisions, rules, plans, and guides from Git.
            </Trans>
          </p>

          <div
            className="max-w-2xl mx-auto text-left"
            id="install"
          >
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <p className="text-sm text-muted-foreground">
                <Trans>
                  One binary. Local MCP in your repo. macOS, Linux, Windows — no
                  external services.
                </Trans>
              </p>
              <div className="space-y-2">
                <InstallCommand variant="inline" />
                <InstallCommand variant="inline" command="archcore init" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href={LINKS.cliRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
                  aria-label={_(msg`Star CLI on GitHub`)}
                >
                  <Github className="h-3 w-3" />
                  archcore-ai/cli
                </a>
                <span className="text-muted-foreground/40">·</span>
                <a
                  href="https://docs.archcore.ai/cli/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <Trans>CLI docs</Trans>
                </a>
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground/70">
            <Trans>
              MCP · Local · Works on macOS, Linux, Windows
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
              <Trans>Star the CLI on GitHub</Trans>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
