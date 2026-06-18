import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";

interface Step {
  token: string;
  caption: string;
}

/**
 * The light "mechanic" beat between the card-heavy Before/After and the
 * interactive wizard. Three verbs on a plain background, no card grid — the
 * deliberate whitespace break that keeps the page from reading as one long
 * field of bordered cards.
 */
export function HowItWorksSection() {
  const { _ } = useLingui();

  const steps: Step[] = [
    { token: "archcore init", caption: _(msg`Set up .archcore/ in your repo`) },
    { token: "write", caption: _(msg`Decisions, rules, and patterns as docs`) },
    {
      token: "agents read",
      caption: _(msg`Loaded over local MCP, before they edit`),
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
            <span className="font-mono">init</span>
            <span className="text-muted-foreground/50"> → </span>
            <span className="font-mono">write</span>
            <span className="text-muted-foreground/50"> → </span>
            <span className="font-mono">agents read</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto">
            <Trans>
              No new service to run. Your context lives in the repo and travels
              with it.
            </Trans>
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {steps.map((step, i) => (
            <li key={step.token} className="flex flex-col items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <code className="font-mono text-sm font-semibold text-foreground">
                {step.token}
              </code>
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
