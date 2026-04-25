import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";
import {
  ExternalLink,
  FolderGit2,
  Plug,
  Puzzle,
  ScrollText,
  Terminal,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

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
        title={_(msg`Install Archcore`)}
        description={_(
          msg`Pick your path. The plugin is the fastest way in — zero setup for Claude Code.`
        )}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        <div id="install-cli" className="scroll-mt-20">
          <div className="mb-4 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              <Trans>Choose your path</Trans>
            </p>
          </div>

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
      </div>
    </SectionContainer>
  );
}

function StepNumber({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
      {children}
    </div>
  );
}

function PluginTab() {
  const { _ } = useLingui();

  return (
    <div className="space-y-4">
      <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
        <StepNumber>1</StepNumber>
        <div className="flex-1 space-y-5">
          <div>
            <h3 className="font-semibold text-base leading-tight mb-1">
              <Trans>Install the plugin in your agent host</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                No prerequisites for Claude Code. The plugin bundles a launcher
                that auto-resolves the Archcore CLI on first use and registers
                MCP automatically.
              </Trans>
            </p>
          </div>

          <ClaudeCodeCard />

          <p className="text-xs text-muted-foreground pt-2 border-t border-border leading-relaxed">
            <Trans>
              Cursor 2.5+: in a new Agent chat, run <code className="rounded bg-muted px-1 py-0.5 font-mono">/add-plugin archcore@https://github.com/archcore-ai/archcore-plugin</code> (type the full command — it's not in autocomplete), or install from
            </Trans>
            {" "}
            <a
              href={LINKS.cursorDirectory}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Cursor Directory
              <ExternalLink className="h-3 w-3" />
            </a>
            <Trans>. Copilot and Codex CLI are on the plugin roadmap.</Trans>
            {" "}
            <a
              href={LINKS.pluginRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
            >
              {_(msg`View plugin on GitHub`)}
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
        <StepNumber>2</StepNumber>
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-base leading-tight mb-1">
              <Trans>Run your first intent command</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                Open your project and type a slash command. The first Archcore
                tool call downloads the CLI (~5s, one-time, cached between
                sessions) and initializes .archcore/ through MCP if needed.
              </Trans>
            </p>
          </div>
          <InstallCommand
            variant="inline"
            command="/archcore:decide use PostgreSQL as our primary database"
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <Trans>
              Already have archcore on PATH? The launcher defers to your
              existing install — no duplicate cache.
            </Trans>
          </p>
        </div>
      </div>
    </div>
  );
}

function ClaudeCodeCard() {
  return (
    <article className="rounded-xl border-2 border-primary/30 bg-primary/[0.04] p-5 space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h4 className="font-semibold text-sm">Claude Code</h4>
        <Badge variant="default" className="text-[10px]">
          <Trans>Production</Trans>
        </Badge>
      </header>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <Trans>From inside Claude Code</Trans>
        </p>
        <InstallCommand
          variant="inline"
          command="/plugin marketplace add archcore-ai/archcore-plugin"
        />
        <InstallCommand
          variant="inline"
          command="/plugin install archcore@archcore-plugins"
        />
      </div>

      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground transition-colors">
          <Trans>Or from your terminal</Trans>
        </summary>
        <div className="mt-2 space-y-2">
          <InstallCommand
            variant="inline"
            command="claude plugin marketplace add archcore-ai/archcore-plugin"
          />
          <InstallCommand
            variant="inline"
            command="claude plugin install archcore@archcore-plugins"
          />
        </div>
      </details>
    </article>
  );
}

interface Primitive {
  icon: LucideIcon;
  title: string;
  description: string;
}

function CLITab() {
  const { _ } = useLingui();

  const primitives: Primitive[] = [
    {
      icon: FolderGit2,
      title: ".archcore/",
      description: _(
        msg`Repo-native directory of structured, versioned documents.`
      ),
    },
    {
      icon: ScrollText,
      title: _(msg`Structured docs`),
      description: _(
        msg`Markdown + YAML types (ADR, PRD, rule, guide, doc, spec, and more).`
      ),
    },
    {
      icon: Plug,
      title: _(msg`MCP tools`),
      description: _(
        msg`list, get, create, update, relate — exposed to any MCP-capable agent.`
      ),
    },
    {
      icon: Webhook,
      title: _(msg`Session hooks`),
      description: _(
        msg`Inject repo context at session start for supported agents.`
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
        <StepNumber>1</StepNumber>
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-base leading-tight mb-1">
              <Trans>Install the CLI</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                Standalone binary for macOS, Linux, and Windows. No external
                services.
              </Trans>
            </p>
          </div>
          <InstallCommand variant="inline" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <Trans>
              On Windows? Switch to the PowerShell tab above, or see the{" "}
              <a
                href="https://docs.archcore.ai/cli/install/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                full install guide
              </a>{" "}
              (PowerShell, WSL, go install, from source).
            </Trans>
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
        <StepNumber>2</StepNumber>
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-base leading-tight mb-1">
              <Trans>Initialize your repo</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                Creates .archcore/ with starter templates for ADRs, rules,
                guides, and specs.
              </Trans>
            </p>
          </div>
          <InstallCommand variant="inline" command="archcore init" />
        </div>
      </div>

      <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
        <StepNumber>3</StepNumber>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold text-base leading-tight mb-1">
              <Trans>Wire up MCP or hooks</Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans>
                Connect the context layer to your agent. Hooks inject context
                at session start. MCP exposes tools to browse and edit docs.
              </Trans>
            </p>
          </div>
          <div className="space-y-2">
            <InstallCommand variant="inline" command="archcore hooks install" />
            <InstallCommand variant="inline" command="archcore mcp install" />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-3">
          <Trans>What you get</Trans>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {primitives.map((primitive) => {
            const Icon = primitive.icon;
            return (
              <div
                key={primitive.title}
                className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <p className="font-mono text-sm font-semibold">
                  {primitive.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {primitive.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
