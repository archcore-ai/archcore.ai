import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Bot,
  FolderGit2,
  Plug,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";

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
        msg`Repo-native directory for decisions, rules, plans, guides, and specs.`
      ),
    },
    {
      icon: Bot,
      title: _(msg`Detects installed agents`),
      description: _(
        msg`Finds supported coding agents and picks the right integration path.`
      ),
    },
    {
      icon: Plug,
      title: _(msg`Writes MCP config`),
      description: _(
        msg`Lets agents browse, search, and update Archcore docs.`
      ),
    },
    {
      icon: Webhook,
      title: _(msg`Installs session hooks`),
      description: _(
        msg`Auto-loads relevant context when a session starts.`
      ),
    },
  ];

  return (
    <SectionContainer
      id="how-it-works"
      className="bg-muted/30 border-y border-border"
    >
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>What archcore init does</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>
            <code className="font-mono text-[0.85em] rounded bg-muted px-1.5 py-0.5">
              archcore init
            </code>{" "}
            — one command, four things wired up for you.
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
    </SectionContainer>
  );
}
