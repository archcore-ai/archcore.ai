import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  ArrowUpRight,
  BookOpen,
  Github,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { LINKS } from "@/lib/links";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PluginPillarsSection() {
  const { _ } = useLingui();

  const pillars: Pillar[] = [
    {
      icon: Workflow,
      title: _(msg`Intent-based slash commands`),
      description: _(
        msg`/archcore:context, /archcore:capture, /archcore:decide — full document workflows live inside your agent.`
      ),
    },
    {
      icon: ShieldCheck,
      title: _(msg`Knows your architecture`),
      description: _(
        msg`Reads ADRs, rules, and guides from .archcore/ before suggesting changes — refactors land in the right place.`
      ),
    },
    {
      icon: Zap,
      title: _(msg`One install, three hosts`),
      description: _(
        msg`Install the Archcore CLI once via curl or PowerShell — the plugin uses it from PATH in Claude Code, Cursor, and Codex CLI.`
      ),
    },
    {
      icon: Terminal,
      title: _(msg`Cursor 2.5+ supported`),
      description: _(
        msg`Add the plugin from Cursor Plugins or via cursor.directory. CLI fallback for raw MCP control.`
      ),
    },
    {
      icon: Terminal,
      title: _(msg`Codex CLI 0.117+ supported`),
      description: _(
        msg`Add the plugin via \`codex plugin marketplace add archcore-ai/plugin\`. Hooks gated by Codex feature flag (\`codex features enable plugin_hooks\`).`
      ),
    },
  ];

  return (
    <SectionContainer
      id="how-it-works"
      className="bg-muted/30 border-y border-border"
    >
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          <Trans>
            Three install commands. Architecture-aware{" "}
            <code className="font-mono text-[0.85em] rounded bg-muted px-1.5 py-0.5">
              /archcore
            </code>{" "}
            slash commands inside your agent.
          </Trans>
        </h2>
      </div>

      <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <li
              key={pillar.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="rounded-lg bg-muted p-2 w-fit">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-tight">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </li>
          );
        })}
      </ul>

      <nav
        aria-label={_(msg`More info`)}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Trans>More info</Trans>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href="https://docs.archcore.ai/plugin/install/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Plugin docs</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={LINKS.pluginRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Github className="h-4 w-4" />
            <Trans>Plugin repo</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </nav>
    </SectionContainer>
  );
}
