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
 * Each claim maps to one command, in the order the README uses since
 * 2026-10-05: plan before you build, document as you go, review before merge.
 * The package sizes come from the route table in the plugin's
 * skills/_shared/delta-routing.md.
 * The review verdict token is the one the review skill emits
 * (plugin skills/review/SKILL.md); re-read that file on any release that
 * touches review.
 */
export function OutcomesSection() {
  const outcomes: { claim: ReactNode; how: ReactNode }[] = [
    {
      claim: <Trans>The agent builds from a spec you agreed on</Trans>,
      how: (
        <Trans>
          <code className="font-mono text-[0.9em]">/archcore:plan</code> asks
          only what the repo cannot answer, then writes the spec and the tasks.
          The package fits the change: a small fix gets no documents, a large
          initiative gets a PRD and one spec per capability.
        </Trans>
      ),
    },
    {
      claim: <Trans>Decisions stay and shape the next change</Trans>,
      how: (
        <Trans>
          <code className="font-mono text-[0.9em]">/archcore:document</code>{" "}
          turns one sentence into a linked decision record in{" "}
          <code className="font-mono text-[0.9em]">.archcore/</code>. The next
          session and the next agent read it from the same folder.
        </Trans>
      ),
    },
    {
      claim: <Trans>A broken decision caught before merge</Trans>,
      how: (
        <Trans>
          <code className="font-mono text-[0.9em]">/archcore:review</code> reads
          your branch against the spec and the decision record. It returns{" "}
          <code className="font-mono text-[0.9em] text-[var(--color-status-danger)]">
            code-wrong
          </code>{" "}
          on the file that ignored them, or{" "}
          <code className="font-mono text-[0.9em]">spec-wrong</code> when the
          document is the one out of date.
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
            <p className="text-base font-semibold leading-snug">
              {outcome.claim}
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {outcome.how}
            </p>
          </li>
        ))}
      </ul>
    </RailSection>
  );
}
