import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  ArrowUpRight,
  BookOpen,
  FileType,
  Github,
  GitBranch,
  Network,
  Plug,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { LINKS } from "@/lib/links";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function HowWeSolveSection() {
  const { _ } = useLingui();

  const pillars: Pillar[] = [
    {
      icon: FileType,
      title: _(msg`Typed documents`),
      description: _(
        msg`ADRs, specs, rules, guides, and plans — every file has a type the agent can reason about.`
      ),
    },
    {
      icon: Network,
      title: _(msg`Relation graph`),
      description: _(
        msg`Documents link to each other. The agent loads the right context, not the whole repo.`
      ),
    },
    {
      icon: Plug,
      title: _(msg`MCP & session hooks`),
      description: _(
        msg`Any compliant agent queries .archcore/ on demand or auto-loads it before edits.`
      ),
    },
    {
      icon: GitBranch,
      title: _(msg`Git-native`),
      description: _(
        msg`Lives next to the code. Reviewed in PRs. Travels across branches and teammates.`
      ),
    },
  ];

  return (
    <SectionContainer
      id="how-we-solve"
      className="bg-muted/30 border-y border-border"
    >
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          <Trans>
            Decisions, rules, and guides — versioned in{" "}
            <code className="font-mono text-[0.85em] rounded bg-muted px-1.5 py-0.5">
              .archcore/
            </code>
            , exposed via MCP.
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
            href={LINKS.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Docs</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={LINKS.org}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Github className="h-4 w-4" />
            <Trans>Repo</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </nav>
    </SectionContainer>
  );
}
