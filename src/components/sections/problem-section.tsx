import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";

/**
 * Section 2 of the canonical homepage sequence (product/surface-descriptors).
 * Names the five failures that make project understanding evaporate. Plain
 * list on the page background, so the card-heavy Before/After that follows
 * lands as a contrast rather than as more of the same.
 */
export function ProblemSection() {
  const { _ } = useLingui();

  const failures: string[] = [
    _(msg`Decisions disappear into chat history.`),
    _(msg`Instruction files grow into walls of text.`),
    _(msg`Every agent sees a different version of the project.`),
    _(msg`Specs become stale handoff artifacts.`),
    _(msg`Architecture and conventions get re-explained, every session.`),
  ];

  return (
    <SectionContainer id="problem">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>The problem</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>
            Your code is in Git. Your project understanding should be too.
          </Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            The agent reads your code. It cannot read the reasoning behind it.
          </Trans>
        </p>
      </div>

      <ul className="max-w-2xl mx-auto space-y-3">
        {failures.map((failure) => (
          <li
            key={failure}
            className="flex items-start gap-3 text-base leading-relaxed"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40"
            />
            <span className="text-foreground/80">{failure}</span>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
