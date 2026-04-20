import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";
import { History, CalendarRange, ShieldAlert, GitFork } from "lucide-react";

export function WhyNotInstructionsSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer
      id="why-not-instructions"
      className="bg-muted/30 border-y border-border"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-4">
          {_(
            msg`Why not just CLAUDE.md, AGENTS.md, or repository instructions?`
          )}
        </h2>

        <p className="text-lg md:text-xl text-foreground font-medium text-center leading-relaxed mb-4">
          <Trans>
            Instruction files are flat memory. Archcore is structured system
            context.
          </Trans>
        </p>

        <p className="text-base text-muted-foreground leading-relaxed text-center mb-10">
          <Trans>
            Instruction files work for agent-specific prompts and short-lived
            rules. They are not a great fit for:
          </Trans>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
          <div className="flex items-start gap-3 rounded-lg bg-background border border-border p-4">
            <History className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground text-sm leading-relaxed">
              <Trans>
                Architecture decisions that need rationale, status, and history
              </Trans>
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-background border border-border p-4">
            <CalendarRange className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground text-sm leading-relaxed">
              <Trans>Plans that evolve over sprints</Trans>
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-background border border-border p-4">
            <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground text-sm leading-relaxed">
              <Trans>Incidents and experience reports</Trans>
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-background border border-border p-4">
            <GitFork className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground text-sm leading-relaxed">
              <Trans>
                Cross-cutting context shared across repos and agents
              </Trans>
            </span>
          </div>
        </div>

        <p className="text-base md:text-lg text-foreground font-medium text-center border-t border-border pt-8">
          <Trans>
            Archcore complements agent-native memory with a durable repo
            context layer.
          </Trans>
        </p>
      </div>
    </SectionContainer>
  );
}
