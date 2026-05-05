import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  FileText,
  GitBranch,
  Plug,
  Repeat2,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function HowItWorksSection() {
  const { _ } = useLingui();

  const steps: Step[] = [
    {
      icon: Plug,
      title: _(msg`Load context before edits`),
      description: _(
        msg`Agents can read relevant ADRs, specs, rules, and patterns before they touch a file.`
      ),
    },
    {
      icon: FileText,
      title: _(msg`Capture decisions as files`),
      description: _(
        msg`New decisions become structured Markdown documents in .archcore/, not forgotten chat history.`
      ),
    },
    {
      icon: Repeat2,
      title: _(msg`Reuse context across sessions`),
      description: _(
        msg`The same repo memory works across teammates, tools, and future agent sessions.`
      ),
    },
    {
      icon: GitBranch,
      title: _(msg`Keep knowledge versioned`),
      description: _(
        msg`Architecture knowledge changes with code review, history, and branches because it lives in Git.`
      ),
    },
  ];

  return (
    <SectionContainer
      id="how-it-works"
      className="bg-muted/30 border-y border-border"
    >
      <div className="text-center space-y-3 mb-12">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>What changes after install</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <Trans>Agents follow repo memory instead of chat memory.</Trans>
        </h2>
      </div>

      <ol className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground/70">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="rounded-lg bg-muted p-2">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </SectionContainer>
  );
}
