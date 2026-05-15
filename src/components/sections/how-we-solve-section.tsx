import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Compass,
  FileText,
  Gavel,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";

interface Action {
  icon: LucideIcon;
  title: string;
  outcome: string;
}

export function HowWeSolveSection() {
  const { _ } = useLingui();

  const actions: Action[] = [
    {
      icon: Compass,
      title: _(msg`Load context before editing`),
      outcome: _(
        msg`Pull the rules, ADRs, and patterns for the file you're about to touch. No more pasting conventions into chat.`
      ),
    },
    {
      icon: FileText,
      title: _(msg`Document what's in code`),
      outcome: _(
        msg`Turn modules, APIs, and integrations into versioned docs that live next to the code.`
      ),
    },
    {
      icon: Gavel,
      title: _(msg`Record decisions, not chat history`),
      outcome: _(
        msg`Capture an ADR and make it a team rule that auto-applies to future edits.`
      ),
    },
    {
      icon: Stethoscope,
      title: _(msg`Audit doc health`),
      outcome: _(
        msg`Spot stale, missing, or drifting docs before they become bugs.`
      ),
    },
  ];

  return (
    <SectionContainer
      id="how-we-solve"
      className="bg-muted/30 border-y border-border"
    >
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>What you do with Archcore</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Four outcomes you get back the moment you install.</Trans>
        </h2>
      </div>

      <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <li
              key={action.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="rounded-lg bg-muted p-2 w-fit">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-tight">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {action.outcome}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionContainer>
  );
}
