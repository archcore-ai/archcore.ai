import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";

export function ProblemSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer
      id="problem"
      className="bg-muted/30 border-b border-border"
    >
      <SectionHeader
        title={_(msg`AI coding agents keep starting from scratch`)}
      />
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          <Trans>
            Your architecture decisions, coding conventions, implementation
            plans, and incident learnings are scattered across docs, chats,
            wikis, and tool-specific memory files.
          </Trans>
        </p>
        <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
          <Trans>
            So every new AI session starts with missing context, repeated
            explaining, and inconsistent output. Archcore gives your repo a
            shared, versioned context layer agents can actually use.
          </Trans>
        </p>
      </div>
    </SectionContainer>
  );
}
