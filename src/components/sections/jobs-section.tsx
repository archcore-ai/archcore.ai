import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Boxes,
  ListChecks,
  History,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";

type JobTag = "plugin" | "cli" | "shared";

interface Job {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: JobTag;
}

export function JobsSection() {
  const { _ } = useLingui();

  const jobs: Job[] = [
    {
      icon: Boxes,
      title: _(msg`Add a new service`),
      description: _(
        msg`The agent places files where your architecture expects them, following real conventions from ADRs and rules.`
      ),
      tag: "shared",
    },
    {
      icon: ListChecks,
      title: _(msg`Follow team rules`),
      description: _(
        msg`Standards stop living only in memory and scattered docs. Agents read the rules and apply them consistently.`
      ),
      tag: "shared",
    },
    {
      icon: History,
      title: _(msg`Reuse prior decisions`),
      description: _(
        msg`ADRs and specs stop being rediscovered every session. Past reasoning is one MCP call away.`
      ),
      tag: "cli",
    },
    {
      icon: Workflow,
      title: _(msg`Run multi-step workflows`),
      description: _(
        msg`Plans, decisions, guides, and implementation stay connected across the whole session.`
      ),
      tag: "plugin",
    },
  ];

  return (
    <SectionContainer
      id="jobs"
      className="bg-muted/30 border-y border-border"
    >
      <SectionHeader
        title={_(msg`What gets better once your agent knows your system`)}
        description={_(
          msg`Architecture. Rules. Decisions. Workflows. Not just code context — system context.`
        )}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobs.map((job) => {
          const Icon = job.icon;
          return (
            <article
              key={job.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <JobTagBadge tag={job.tag} />
              </div>
              <h3 className="text-lg font-semibold leading-tight">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </article>
          );
        })}
      </div>
    </SectionContainer>
  );
}

function JobTagBadge({ tag }: { tag: JobTag }) {
  if (tag === "plugin") {
    return (
      <Badge variant="outline" className="border-primary/40 text-primary">
        <Trans>Best with Plugin</Trans>
      </Badge>
    );
  }
  if (tag === "cli") {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        <Trans>Available via CLI</Trans>
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      <Trans>Shared core capability</Trans>
    </Badge>
  );
}
