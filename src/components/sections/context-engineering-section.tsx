import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Section 4 of the canonical homepage sequence. Carries the context-engineering
 * category term in its H2. The five properties are the ones that distinguish
 * engineered context from a longer prompt, which is the whole argument.
 */
export function ContextEngineeringSection() {
  const { _ } = useLingui();

  const properties: { label: string; description: string }[] = [
    {
      label: _(msg`Explicit`),
      description: _(msg`Decisions and constraints are written down, not inferred from code.`),
    },
    {
      label: _(msg`Structured`),
      description: _(msg`Typed documents with relations, not one growing file.`),
    },
    {
      label: _(msg`Selective`),
      description: _(msg`The agent loads what applies to the file in front of it.`),
    },
    {
      label: _(msg`Versioned`),
      description: _(msg`Context changes ship in the same pull request as the code.`),
    },
    {
      label: _(msg`Portable`),
      description: _(msg`One setup serves every MCP-aware coding agent.`),
    },
  ];

  return (
    <SectionContainer id="context-engineering">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Context Engineering</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Engineer the context your coding agents work from</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            Context is more than a prompt or a bigger context window. Archcore
            makes project knowledge explicit, structured, selective, versioned,
            and available across coding agents.
          </Trans>
        </p>
      </div>

      <dl className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
        {properties.map((property) => (
          <div
            key={property.label}
            className="py-4 grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6"
          >
            <dt className="text-sm font-semibold text-foreground">
              {property.label}
            </dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">
              {property.description}
            </dd>
          </div>
        ))}
      </dl>

      {/*
        Earns the harness-engineering term on the highest-authority page
        without touching the H1 or the two discovery categories. The claim is
        the one the canonical source supports: a harness for a coding agent is
        a specific form of context engineering, and the project-specific half
        of it is what Archcore holds. See the /learn/ explainer for the full
        guides-and-sensors taxonomy.
      */}
      <p className="max-w-2xl mx-auto mt-10 text-center text-sm leading-relaxed text-muted-foreground">
        <Trans>
          Designing what an agent is told before it acts, and what checks it
          afterwards, is called harness engineering. Your agent ships the loop,
          the tools, and the sandbox. Archcore holds the half no vendor can ship
          for you: what your project decided, requires, and forbids.{" "}
          <a
            href={INTERNAL_LINKS.harnessEngineering}
            className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
          >
            Harness engineering, explained
          </a>
          .
        </Trans>
      </p>

      <p className="max-w-2xl mx-auto mt-4 text-center text-sm leading-relaxed text-muted-foreground">
        <Trans>
          <a
            href={INTERNAL_LINKS.contextEngineering}
            className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
          >
            Context engineering for AI coding agents
          </a>{" "}
          covers the five properties in full, with worked examples.
        </Trans>
      </p>
    </SectionContainer>
  );
}
