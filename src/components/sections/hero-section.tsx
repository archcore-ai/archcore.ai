import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Github, Puzzle, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstallCommand } from "@/components/cta/install-command";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

type InstallTab = "cli" | "plugin";

const HASH_CLI = "#install-cli";
const HASH_PLUGIN = "#install-plugin";

function readTabFromHash(): InstallTab {
  if (typeof window === "undefined") return "cli";
  if (window.location.hash === HASH_PLUGIN) return "plugin";
  return "cli";
}

function hashForTab(tab: InstallTab): string {
  return tab === "plugin" ? HASH_PLUGIN : HASH_CLI;
}

export function HeroSection() {
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
    const next: InstallTab = value === "plugin" ? "plugin" : "cli";
    setTab(next);
    const targetHash = hashForTab(next);
    if (typeof window !== "undefined" && window.location.hash !== targetHash) {
      history.replaceState(null, "", targetHash);
    }
  };

  return (
    <section
      id="top"
      className="hero-section relative pt-28 lg:pt-32 pb-8 md:pb-10 px-6 overflow-hidden"
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
              So your agents follow your architecture instead of guessing from a
              flat CLAUDE.md.
            </Trans>
          </p>

          <div className="max-w-2xl mx-auto text-left" id="install">
            <Tabs value={tab} onValueChange={handleTabChange}>
              <TabsList className="mx-auto flex h-auto w-full max-w-md">
                <TabsTrigger value="cli" className="flex-1 gap-2 py-2">
                  <Terminal className="h-3.5 w-3.5" />
                  <Trans>CLI</Trans>
                </TabsTrigger>
                <TabsTrigger value="plugin" className="flex-1 gap-2 py-2">
                  <Puzzle className="h-3.5 w-3.5" />
                  <Trans>Plugin</Trans>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cli" className="mt-5">
                <CLIPanel _={_} />
              </TabsContent>

              <TabsContent value="plugin" className="mt-5">
                <PluginPanel _={_} />
              </TabsContent>
            </Tabs>
            <div className="mt-4 space-y-1.5 text-center text-sm text-muted-foreground/70">
              <p>
                <Trans>CLI = one binary · Plugin = slash commands.</Trans>
              </p>
              <p>
                <Trans>Open source · Local-first · No telemetry</Trans>
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pt-6">
            {/* Exported from scripts/demo-export (see .archcore/animated-product-demo.task-type.md) */}
            <img
              src="/demo.gif"
              alt="Agent session: the agent searches .archcore/ context over MCP, follows the ADR and rules, then captures the new decision back"
              width={800}
              height={500}
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-[16px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CLIPanel({ _ }: { _: ReturnType<typeof useLingui>["_"] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <p className="text-sm text-muted-foreground">
        <Trans>One binary, local MCP in your repo — macOS, Linux, Windows.</Trans>
      </p>

      <div className="space-y-2">
        <InstallCommand variant="inline" />
        <InstallCommand variant="inline" command="archcore init" />
      </div>

      <PanelLinks
        repoHref={LINKS.cliRepo}
        repoText="archcore-ai/cli"
        repoLabel={_(msg`Star CLI on GitHub`)}
        docsHref="https://docs.archcore.ai/cli/install/"
        docsLabel={_(msg`CLI docs`)}
      />
    </div>
  );
}

function PluginPanel({ _ }: { _: ReturnType<typeof useLingui>["_"] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <PluginAgent
        label={<Trans>Claude Code</Trans>}
        hint={<Trans>Run inside Claude Code:</Trans>}
        commands={[
          "/plugin marketplace add archcore-ai/plugin",
          "/plugin install archcore@archcore-plugins",
        ]}
      />

      <Link
        to={INTERNAL_LINKS.plugin}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Trans>Using Cursor or Codex CLI? See all install paths</Trans>
        <ArrowRight className="h-3 w-3" />
      </Link>

      <PanelLinks
        repoHref={LINKS.pluginRepo}
        repoText="archcore-ai/plugin"
        repoLabel={_(msg`Star plugin on GitHub`)}
        docsHref="https://docs.archcore.ai/plugin/install/"
        docsLabel={_(msg`Plugin docs`)}
      />
    </div>
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

interface PanelLinksProps {
  repoHref: string;
  repoText: string;
  repoLabel: string;
  docsHref: string;
  docsLabel: string;
}

function PanelLinks({
  repoHref,
  repoText,
  repoLabel,
  docsHref,
  docsLabel,
}: PanelLinksProps) {
  return (
    <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1">
      <a
        href={repoHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
        aria-label={repoLabel}
      >
        <Github className="h-3 w-3" />
        {repoText}
      </a>
      <span className="text-muted-foreground/40">·</span>
      <a
        href={docsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
        aria-label={docsLabel}
      >
        <ExternalLink className="h-3 w-3" />
        {docsLabel}
      </a>
    </p>
  );
}
