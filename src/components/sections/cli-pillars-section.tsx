import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  FolderGit2,
  Github,
  Plug,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { LINKS } from "@/lib/links";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CLIPillarsSection() {
  const { _ } = useLingui();

  const pillars: Pillar[] = [
    {
      icon: FolderGit2,
      title: _(msg`Creates .archcore/`),
      description: _(
        msg`Adds a repo-native directory for decisions, rules, plans, guides, and specs.`
      ),
    },
    {
      icon: Bot,
      title: _(msg`Detects installed agents`),
      description: _(
        msg`Finds supported coding agents in the workspace and prepares the right integration path.`
      ),
    },
    {
      icon: Plug,
      title: _(msg`Writes MCP config`),
      description: _(
        msg`Exposes tools for agents to browse, search, create, update, and relate Archcore docs.`
      ),
    },
    {
      icon: Webhook,
      title: _(msg`Installs session hooks`),
      description: _(
        msg`Loads relevant repo context at session start for supported agents.`
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
            One command,{" "}
            <code className="font-mono text-[0.85em] rounded bg-muted px-1.5 py-0.5">
              archcore init
            </code>
            , wires up four things at once.
          </Trans>
        </h2>
      </div>

      <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            href="https://docs.archcore.ai/cli/install/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>CLI docs</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={LINKS.cliRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Github className="h-4 w-4" />
            <Trans>CLI repo</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </nav>
    </SectionContainer>
  );
}
