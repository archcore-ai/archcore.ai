import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";

interface Step {
  verb: string;
  caption: string;
}

/**
 * Section 7 of the canonical homepage sequence: Capture → Connect → Apply →
 * Evolve (product/surface-descriptors). Four verbs on a muted band, no card
 * grid — the whitespace break that keeps the page from reading as one long
 * field of bordered cards.
 *
 * This replaced the earlier init → write → agents read framing, which
 * described the install rather than the loop.
 */
export function HowItWorksSection() {
  const { _ } = useLingui();

  const steps: Step[] = [
    {
      verb: _(msg`Capture`),
      caption: _(msg`Specs, decisions, rules, plans, and project knowledge.`),
    },
    {
      verb: _(msg`Connect`),
      caption: _(msg`Related artifacts link into one project context.`),
    },
    {
      verb: _(msg`Apply`),
      caption: _(msg`The relevant context loads while agents work.`),
    },
    {
      verb: _(msg`Evolve`),
      caption: _(msg`Context moves with the codebase, through Git.`),
    },
  ];

  return (
    <SectionContainer
      id="how-it-works"
      className="bg-muted/30 border-y border-border"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>How it works</Trans>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            {steps.map((step, i) => (
              <span key={step.verb}>
                {i > 0 && <span className="text-muted-foreground/50"> → </span>}
                <span>{step.verb}</span>
              </span>
            ))}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto">
            <Trans>
              No new service to run. Your context lives in the repo and travels
              with it.
            </Trans>
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {steps.map((step, i) => (
            <li key={step.verb} className="flex flex-col items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {step.verb}
              </span>
              <p className="text-sm text-muted-foreground leading-snug max-w-[14rem]">
                {step.caption}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
