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
          <Trans>
            The install script adds the CLI and the plugin when your host CLI is
            on PATH. Cursor needs plugin setup in its Plugins panel.
          </Trans>
        </p>
        <InstallCommand
          variant="inline"
          surface="plugin_hero_install"
        />
        <p className="guide-prerequisite">
          <Trans>If you installed your host later, use its setup step below.</Trans>
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
              hint={<Trans>Install for Claude Code:</Trans>}
              commands={["archcore plugin install --agent claude-code"]}
              repoLabel={_(msg`Star plugin on GitHub`)}
            />
          </TabsContent>

          <TabsContent value="cursor" className="mt-5">
            <HostPanel
              hint={<Trans>Open Plugins → Add and paste URL:</Trans>}
              commands={["https://github.com/archcore-ai/archcore"]}
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
              hint={<Trans>Install for Codex CLI:</Trans>}
              commands={["archcore plugin install --agent codex-cli"]}
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
              hint={<Trans>Install the plugin, then connect your project:</Trans>}
              commands={[
                "archcore plugin install --agent copilot",
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
          archcore-ai/archcore
        </a>
        <span className="text-muted-foreground/40">·</span>
        <a
          href="https://docs.archcore.ai/start/install/"
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
