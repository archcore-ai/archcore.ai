import type { ReactNode } from "react";
import { Trans } from "@lingui/react/macro";
import { RailSection } from "@/components/sections/rail-section";

/**
 * What the reader gets, and the mechanism that makes each one true.
 *
 * The mechanism is not decoration. "Code that fits this repo" on its own is a
 * slogan, and a developer discounts it; the sentence under it names the
 * document, the file path, and the moment, which is checkable. The owner read
 * two earlier revisions of this page and said the impact was not clear, and
 * both of those revisions stated benefits without the mechanism beside them.
 *
 * Each claim maps to a job in product/jobs-to-be-done: build by this repo's
 * rules, continue without re-explaining, and catch the decision that broke.
 * The review verdict token is the one the review skill emits
 * (plugin skills/review/SKILL.md); re-read that file on any release that
 * touches review.
 */
export function OutcomesSection() {
  const outcomes: { claim: ReactNode; how: ReactNode }[] = [
    {
      claim: <Trans>Code that fits this repo on the first try</Trans>,
      how: (
        <Trans>
          The decision that already chose Redis, and the rule for error shapes
          in <code className="font-mono text-[0.9em]">src/api/</code>, reach the
          agent before it edits the file.
        </Trans>
      ),
    },
    {
      claim: <Trans>Nothing to re-explain in a new session</Trans>,
      how: (
        <Trans>
          Each session opens with what is decided and what is in progress.
          Switch to another agent and it reads the same folder.
        </Trans>
      ),
    },
    {
      claim: <Trans>A broken decision caught before merge</Trans>,
      how: (
        <Trans>
          Review reads your branch against the spec and the decision record, and
          returns{" "}
          <code className="font-mono text-[0.9em] text-[var(--color-status-danger)]">
            code-wrong
          </code>{" "}
          on the file that ignored them.
        </Trans>
      ),
    },
  ];

  return (
    <RailSection id="problem" heading={<Trans>What you get</Trans>}>
      <ul className="grid">
        {outcomes.map((outcome, index) => (
          <li
            key={index}
            className="grid items-baseline gap-x-7 gap-y-1 border-t border-border py-4 last:border-b sm:grid-cols-[minmax(0,24ch)_minmax(0,1fr)]"
          >
            <p className="text-base font-semibold leading-snug">{outcome.claim}</p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {outcome.how}
            </p>
          </li>
        ))}
      </ul>
    </RailSection>
  );
}
