import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Puzzle,
  Terminal,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstallCommand } from "@/components/cta/install-command";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

type InstallTab = "plugin" | "cli";

const HASH_CLI = "#install-cli";
const HASH_PLUGIN = "#install";

function readTabFromHash(): InstallTab {
  if (typeof window === "undefined") return "plugin";
  return window.location.hash === HASH_CLI ? "cli" : "plugin";
}

export function InstallSection() {
  const { _ } = useLingui();
  const [tab, setTab] = useState<InstallTab>(() => readTabFromHash());

  useEffect(() => {
    const sync = () => {
      setTab(readTabFromHash());
    };
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const handleTabChange = (value: string) => {
    const next = value === "cli" ? "cli" : "plugin";
    setTab(next);
    const targetHash = next === "cli" ? HASH_CLI : HASH_PLUGIN;
    if (window.location.hash !== targetHash) {
      history.replaceState(null, "", targetHash);
    }
  };

  return (
    <SectionContainer id="install">
      <SectionHeader
        title={_(msg`Choose your path`)}
        description={_(
          msg`Start with the plugin if you use Claude Code or Cursor. Use the CLI when you want the repo-native MCP layer directly.`
        )}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <Link
          to={INTERNAL_LINKS.plugin}
          className="group rounded-xl border-2 border-primary/30 bg-primary/[0.04] p-5 flex flex-col gap-3 transition-colors hover:bg-primary/[0.07]"
        >
          <Puzzle className="h-5 w-5 text-primary" />
          <div className="space-y-1">
            <h3 className="font-semibold">
              <Trans>Plugin</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>Fastest path for Claude Code and Cursor users.</Trans>
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">
            <Trans>Install plugin</Trans>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
        <Link
          to={INTERNAL_LINKS.cli}
          className="group rounded-xl border border-border bg-card p-5 flex flex-col gap-3 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
        >
          <Terminal className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="font-semibold">
              <Trans>CLI</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                Direct MCP, hooks, automation, and multi-agent setup.
              </Trans>
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">
            <Trans>Install CLI</Trans>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
        <a
          href={LINKS.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-border bg-card p-5 flex flex-col gap-3 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
        >
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="font-semibold">
              <Trans>Docs</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                Concepts, document types, relations, and setup details.
              </Trans>
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">
            <Trans>Read docs</Trans>
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto" id="install-cli">
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="mx-auto flex h-auto w-full max-w-md">
            <TabsTrigger value="plugin" className="flex-1 gap-2 py-2">
              <Puzzle className="h-3.5 w-3.5" />
              <Trans>Plugin</Trans>
              <Badge
                variant="default"
                className="hidden sm:inline-flex text-[10px]"
              >
                <Trans>Recommended</Trans>
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="cli" className="flex-1 gap-2 py-2">
              <Terminal className="h-3.5 w-3.5" />
              <Trans>CLI</Trans>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plugin" className="mt-6">
            <PluginTab />
          </TabsContent>

          <TabsContent value="cli" className="mt-6">
            <CLITab />
          </TabsContent>
        </Tabs>
      </div>
    </SectionContainer>
  );
}

function PluginTab() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div>
        <h3 className="font-semibold text-base mb-1">
          <Trans>Inside Claude Code</Trans>
        </h3>
        <p className="text-sm text-muted-foreground">
          <Trans>
            Run these two commands. The launcher resolves the CLI on first use.
          </Trans>
        </p>
      </div>

      <div className="space-y-2">
        <InstallCommand
          variant="inline"
          command="/plugin marketplace add archcore-ai/plugin"
        />
        <InstallCommand
          variant="inline"
          command="/plugin install archcore@archcore-plugins"
        />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
        <Trans>
          Cursor 2.5+: paste{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">
            https://github.com/archcore-ai/plugin
          </code>{" "}
          into Plugins → Add. Copilot and Codex CLI are on the roadmap.
        </Trans>
        {" · "}
        <a
          href={LINKS.pluginRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
        >
          <Trans>Plugin on GitHub</Trans>
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}

function CLITab() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div>
        <h3 className="font-semibold text-base mb-1">
          <Trans>One binary. Two commands.</Trans>
        </h3>
        <p className="text-sm text-muted-foreground">
          <Trans>
            Standalone for macOS, Linux, and Windows. No external services.
          </Trans>
        </p>
      </div>

      <div className="space-y-2">
        <InstallCommand variant="inline" />
        <InstallCommand variant="inline" command="archcore init" />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
        <Trans>
          Then connect to your agent with{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">
            archcore hooks install
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">
            archcore mcp install
          </code>
          .
        </Trans>
        {" · "}
        <a
          href="https://docs.archcore.ai/cli/install/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
        >
          <Trans>Full install guide</Trans>
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}
