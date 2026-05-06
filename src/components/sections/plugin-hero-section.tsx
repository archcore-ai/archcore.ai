import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ExternalLink, Github, Star } from "lucide-react";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

export function PluginHeroSection() {
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
              Make Claude Code and Cursor
              <br />
              follow your repo rules.
            </Trans>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
            <Trans>
              Archcore loads the right ADRs, specs, rules, and patterns before
              your agent edits code. Capture new decisions, standards, and
              plans without leaving the chat.
            </Trans>
          </p>

          <div className="max-w-2xl mx-auto text-left" id="install">
            <div className="rounded-xl border border-border bg-card p-5 space-y-5">
              <PluginAgent
                label={<Trans>Claude Code</Trans>}
                hint={<Trans>Run inside Claude Code:</Trans>}
                commands={[
                  "/plugin marketplace add archcore-ai/plugin",
                  "/plugin install archcore@archcore-plugins",
                ]}
              />

              <div className="border-t border-border" />

              <PluginAgent
                label={<Trans>Cursor 2.5+</Trans>}
                hint={<Trans>Open Plugins → Add and paste URL:</Trans>}
                commands={["https://github.com/archcore-ai/plugin"]}
              />

              <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1">
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
                  href="https://docs.archcore.ai/plugin/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <Trans>Plugin docs</Trans>
                </a>
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground/70">
            <Trans>
              Built on Archcore CLI · Skills · Subagents · Hooks
            </Trans>
            {" · "}
            <a
              href={LINKS.pluginRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Star
                className="inline-block h-3.5 w-3.5 -mt-0.5 mr-1"
                fill="currentColor"
              />
              <Trans>Star the plugin on GitHub</Trans>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

interface PluginAgentProps {
  label: React.ReactNode;
  hint: React.ReactNode;
  commands: string[];
}

function PluginAgent({ label, hint, commands }: PluginAgentProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline gap-3">
        <h3 className="text-sm font-semibold">{label}</h3>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="space-y-2">
        {commands.map((cmd) => (
          <InstallCommand key={cmd} variant="inline" command={cmd} />
        ))}
      </div>
    </div>
  );
}
