import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

type PluginHost = "claude" | "cursor" | "codex";

export function PluginHeroSection() {
  const { _ } = useLingui();
  const [host, setHost] = useState<PluginHost>("claude");

  const handleHostChange = (value: string) => {
    if (value === "claude" || value === "cursor" || value === "codex") {
      setHost(value);
    }
  };

  return (
    <section
      id="top"
      className="hero-section relative pt-28 lg:pt-32 pb-14 md:pb-16 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto">
        <div className="space-y-8 text-center">
          <h1 className="type-hero text-balance">
            <Trans>
              Give Claude Code, Cursor & Codex CLI
              <br />
              a brain for your codebase.
            </Trans>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
            <Trans>
              The Archcore plugin loads your architecture, rules, and decisions
              into Claude Code, Cursor, and Codex CLI — so the agent stops
              guessing and starts following your team's truth.
            </Trans>
          </p>

          <div className="max-w-2xl mx-auto text-left" id="install">
            <Tabs value={host} onValueChange={handleHostChange}>
              <TabsList className="mx-auto flex h-auto w-full max-w-xl">
                <TabsTrigger value="claude" className="flex-1 py-2">
                  <Trans>Claude Code</Trans>
                </TabsTrigger>
                <TabsTrigger value="cursor" className="flex-1 py-2">
                  <Trans>Cursor 2.5+</Trans>
                </TabsTrigger>
                <TabsTrigger value="codex" className="flex-1 py-2">
                  <Trans>Codex CLI 0.117+</Trans>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="claude" className="mt-5">
                <HostPanel
                  hint={<Trans>Run inside Claude Code:</Trans>}
                  commands={[
                    "/plugin marketplace add archcore-ai/plugin",
                    "/plugin install archcore@archcore-plugins",
                  ]}
                  repoLabel={_(msg`Star plugin on GitHub`)}
                />
              </TabsContent>

              <TabsContent value="cursor" className="mt-5">
                <HostPanel
                  hint={<Trans>Open Plugins → Add and paste URL:</Trans>}
                  commands={["https://github.com/archcore-ai/plugin"]}
                  repoLabel={_(msg`Star plugin on GitHub`)}
                />
              </TabsContent>

              <TabsContent value="codex" className="mt-5">
                <HostPanel
                  hint={<Trans>Install in Codex:</Trans>}
                  commands={["codex plugin marketplace add archcore-ai/plugin"]}
                  repoLabel={_(msg`Star plugin on GitHub`)}
                />
              </TabsContent>
            </Tabs>
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

interface HostPanelProps {
  hint: React.ReactNode;
  commands: string[];
  repoLabel: string;
}

function HostPanel({ hint, commands, repoLabel }: HostPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <p className="text-xs text-muted-foreground">{hint}</p>

      <div className="space-y-2">
        {commands.map((cmd) => (
          <InstallCommand key={cmd} variant="inline" command={cmd} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1">
        <a
          href={LINKS.pluginRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
          aria-label={repoLabel}
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
  );
}
