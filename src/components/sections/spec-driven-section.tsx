import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Slot 6. Carries the spec-driven-development category term in its eyebrow and
 * its H2. The chain is the shipped `sdd` track from the plugin's plan skill,
 * so the example is the product, not an illustration of one.
 *
 * Reframed from "what spec-driven development is" to where the spec lives
 * after the feature ships, and given the differentiation the page never
 * carried, under landing/home-loop-before-categories.adr.md. The definition
 * belongs to /spec-driven-development/, which owns that query
 * (product/seo-information-architecture); the home page argues the part the
 * pillar cannot, which is what the product does with the spec afterwards.
 *
 * The differentiation sentence is the competitive framing line from
 * product/surface-descriptors, not a new claim. It states what Archcore does
 * rather than what another tool fails to do, so a competitor's release cannot
 * falsify it. "Workflow" is banned in positioning copy
 * (product/messaging-and-voice); do not reintroduce it here.
 */
export function SpecDrivenSection() {
  const { _ } = useLingui();

  const chain: { token: string; caption: string }[] = [
    { token: "idea", caption: _(msg`What we might build`) },
    { token: "prd", caption: _(msg`What it must do`) },
    { token: "spec", caption: _(msg`The contract it must hold`) },
    { token: "plan", caption: _(msg`How it gets built`) },
  ];

  return (
    <SectionContainer
      id="spec-driven-development"
      className="bg-muted/30 border-y border-border"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Spec-Driven Development</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Specs that stay connected to implementation</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            Define what to build, then keep the definition where the work
            happens. The spec that scoped the feature is the one review reads
            your branch against, and the one the next plan starts from.
          </Trans>
        </p>
      </div>

      <ol className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {chain.map((step, i) => (
          <li
            key={step.token}
            className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground/70">
                {i + 1}
              </span>
              <code className="font-mono text-sm font-semibold text-foreground">
                {step.token}
              </code>
            </div>
            <p className="text-sm text-muted-foreground leading-snug">
              {step.caption}
            </p>
          </li>
        ))}
      </ol>

      <p className="max-w-2xl mx-auto mt-8 text-center text-sm leading-relaxed text-muted-foreground">
        <Trans>
          Methodology tools define a development process. Archcore keeps the
          resulting project knowledge alive, connected, versioned, and available
          to agents throughout implementation. A spec is one part of that
          context, not the whole of it: it ships next to the architecture, prior
          decisions, constraints, and team rules the agent also needs.{" "}
          <a
            href={INTERNAL_LINKS.specDrivenDevelopment}
            className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
          >
            Spec-driven development for AI coding agents
          </a>
          .
        </Trans>
      </p>
    </SectionContainer>
  );
}
