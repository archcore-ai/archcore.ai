import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";

/**
 * Section 2 of the homepage sequence. Names the failures that make project
 * understanding evaporate.
 *
 * Three, not the five in product/surface-descriptors, under
 * landing/home-loop-before-categories.adr.md. The three kept are the ones the
 * rest of the page then answers: the loop answers the first, spec-driven the
 * second, cross-agent the third. Of the two cut, "architecture and conventions
 * get re-explained, every session" restated the hero's supporting promise one
 * screen below it, and "instruction files grow into walls of text" is argued
 * where it converts, in the FAQ and the instruction-file comparisons in the content hub. The static
 * crawler body keeps the CLAUDE.md and AGENTS.md sentence.
 *
 * A left rail rather than bullets: the list sits under a centred heading, and
 * free-floating bullet dots read as a ragged fragment dropped into the middle
 * of the page. The rail gives the block an edge to hang from without turning
 * it into a card, which would blunt the card-heavy Before/After that follows.
 */
export function ProblemSection() {
  const { _ } = useLingui();

  const failures: string[] = [
    _(msg`Decisions disappear into chat history.`),
    _(msg`Specs become stale handoff artifacts.`),
    _(msg`Every agent sees a different version of the project.`),
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

      <ul className="max-w-xl mx-auto border-l-2 border-border">
        {failures.map((failure) => (
          <li
            key={failure}
            className="pl-5 py-2.5 text-base md:text-lg leading-relaxed text-foreground/80"
          >
            {failure}
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
