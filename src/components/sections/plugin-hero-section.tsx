import { productCopy } from "@/data/product-copy";
import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

type PluginHost = "claude" | "cursor" | "codex" | "copilot";

const PLUGIN_HOSTS: readonly PluginHost[] = [
  "claude",
  "cursor",
  "codex",
  "copilot",
];

export function PluginHeroSection() {
  const { _ } = useLingui();
  const [host, setHost] = useState<PluginHost>("claude");

  const handleHostChange = (value: string) => {
    if ((PLUGIN_HOSTS as readonly string[]).includes(value)) {
      setHost(value as PluginHost);
    }
  };

  return (
    <>
      <h1>
        <Trans>Archcore Plugin for AI agents</Trans>
      </h1>

      <p>{_(productCopy.pluginExpanded)}</p>

      <section id="install">
        <h2>
          <Trans>Install plugin</Trans>
        </h2>
        <p className="guide-prerequisite">
          <Trans>The plugin requires the Archcore CLI on your PATH.</Trans>{" "}
          <a href="/cli/#install" className="underline underline-offset-4">
            <Trans>Install the CLI first</Trans> →
          </a>
        </p>
        <Tabs value={host} onValueChange={handleHostChange}>
          <TabsList className="grid h-auto w-full grid-cols-2 sm:flex">
            <TabsTrigger value="claude" className="flex-1 py-2">
              <Trans>Claude Code</Trans>
            </TabsTrigger>
            <TabsTrigger value="cursor" className="flex-1 py-2">
              <Trans>Cursor 2.5+</Trans>
            </TabsTrigger>
            <TabsTrigger value="codex" className="flex-1 py-2">
              <Trans>Codex CLI 0.117+</Trans>
            </TabsTrigger>
            <TabsTrigger value="copilot" className="flex-1 py-2">
              <Trans>Copilot CLI</Trans>
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
              note={
                <Trans>
                  Then run archcore mcp install --agent cursor in your project
                  folder to connect the document tools.
                </Trans>
              }
            />
          </TabsContent>

          <TabsContent value="codex" className="mt-5">
            <HostPanel
              hint={<Trans>Install in Codex:</Trans>}
              commands={[
                "codex plugin marketplace add archcore-ai/plugin",
                "codex plugin add archcore@archcore-plugins",
              ]}
              repoLabel={_(msg`Star plugin on GitHub`)}
              note={
                <Trans>
                  Check the hooks feature in your Codex settings. MCP and skills
                  work independently of hooks.
                </Trans>
              }
            />
          </TabsContent>

          <TabsContent value="copilot" className="mt-5">
            <HostPanel
              hint={<Trans>Both steps are required:</Trans>}
              commands={[
                "copilot plugin install archcore-ai/plugin:plugins/archcore",
                'archcore init --agent copilot --project "$PWD"',
              ]}
              repoLabel={_(msg`Star plugin on GitHub`)}
              note={
                <Trans>
                  The second command connects MCP to this project. Restart
                  Copilot afterwards. This integration is for Copilot CLI.
                </Trans>
              }
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

interface HostPanelProps {
  hint: React.ReactNode;
  commands: string[];
  repoLabel: string;
  /** Host-specific caveat shown under the commands — Copilot needs both steps. */
  note?: React.ReactNode;
}

function HostPanel({ hint, commands, repoLabel, note }: HostPanelProps) {
  return (
    <div className="guide-host-panel">
      <p className="guide-install-hint">{hint}</p>

      <div className="guide-install">
        {commands.map((cmd) => (
          <InstallCommand
            key={cmd}
            variant="inline"
            command={cmd}
            surface="plugin_hero_host_panel"
            installTarget="plugin"
          />
        ))}
      </div>

      {note ? <p className="guide-install-note">{note}</p> : null}

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
