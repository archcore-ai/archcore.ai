import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ExternalLink, Github } from "lucide-react";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

/**
 * The install block is one path, not a choice.
 *
 * It carried a Plugin / CLI tab pair until 2026-08-27. Two tabs asked the
 * reader to decide between two things before they knew what either was, and
 * the Plugin tab was the incomplete one: the plugin invokes `archcore` from
 * PATH and never fetches it (the plugin repo forbids a plugin-side CLI
 * fetcher outright), so its commands do not work on a machine without the
 * CLI. Meanwhile `archcore init` installs the plugin for every host checked
 * in its picker. One path is both simpler and the accurate one.
 *
 * The per-host plugin install still exists for readers who prefer their
 * host's own marketplace; it lives in the docs, under the block.
 */
export function HeroSection() {
  const { _ } = useLingui();

  return (
    <section
      id="top"
      className="hero-section relative pt-28 lg:pt-32 pb-8 md:pb-10 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto">
        <div className="space-y-8 text-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              <Trans>Git-native context layer</Trans>
            </p>

            <h1 className="type-hero text-balance">
              <Trans>
                Spec-Driven Development &amp; Context Engineering
                <br />
                for AI Coding Agents
              </Trans>
            </h1>
          </div>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
            <Trans>
              Archcore keeps specs, architecture, decisions, rules, and plans in
              Git, and makes the right project context available to AI coding
              agents as they work.
            </Trans>
          </p>

          <p className="type-body font-medium max-w-[var(--container-narrow)] mx-auto">
            <Trans>Stop re-explaining your repo to every AI coding agent.</Trans>
          </p>

          <div className="max-w-2xl mx-auto text-left" id="install">
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="space-y-2">
                <InstallCommand variant="inline" surface="home_hero_install" />
                <InstallCommand
                  variant="inline"
                  command="archcore init"
                  surface="home_hero_install"
                  installTarget="cli"
                />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <Trans>
                  <code className="font-mono text-[0.9em]">archcore init</code>{" "}
                  scaffolds{" "}
                  <code className="font-mono text-[0.9em]">.archcore/</code> and
                  wires MCP and hooks for the coding agents you already run.
                </Trans>
              </p>

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
                  href={LINKS.pluginRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
                  aria-label={_(msg`Star plugin on GitHub`)}
                >
                  <Github className="h-3 w-3" />
                  archcore-ai/plugin
                </a>
                <span className="text-muted-foreground/40">·</span>
                <a
                  href="https://docs.archcore.ai/cli/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <Trans>Install docs</Trans>
                </a>
              </p>
            </div>

            <div className="mt-4 space-y-1.5 text-center text-sm text-muted-foreground/70">
              <p>
                <Trans>
                  Works with Claude Code · Cursor · Codex CLI · Copilot ·
                  Gemini CLI · any MCP agent
                </Trans>
              </p>
              <p>
                <Trans>Open source · Local-first · No telemetry</Trans>
              </p>
            </div>

            <p className="mt-3 text-center text-sm text-muted-foreground/70">
              <a
                href="https://docs.archcore.ai/plugin/install/#install-per-host"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                <Trans>
                  Prefer to install from inside your agent? See the per-host
                  plugin install
                </Trans>
              </a>
            </p>
          </div>

          <div className="max-w-3xl mx-auto pt-6">
            {/* Exported from scripts/demo-export (see .archcore/animated-product-demo.task-type.md);
                webm/mp4 re-encoded from the same animation — 20x lighter than the GIF. */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/demo-poster.jpg"
              width={800}
              height={500}
              aria-label="Agent session: the agent searches .archcore/ context over MCP, follows the ADR and rules, then captures the new decision back"
              className="w-full rounded-[16px]"
            >
              <source src="/demo.webm" type="video/webm" />
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
