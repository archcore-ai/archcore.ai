import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Slot 5. Carries the context-engineering category term in its eyebrow, its
 * H2, and its body.
 *
 * It used to open with five properties in a definition list, which answered
 * "what is context engineering" on a page that had already answered "what is
 * this" three times. It now opens with the moment the property list was
 * describing: the agent opens a file and the documents that constrain that
 * file arrive before the edit, with no command. The five properties survive as
 * one line, and the pillar page carries them in full.
 * See landing/home-loop-before-categories.adr.md.
 *
 * The claim is the shipped `PreToolUse` behaviour, which "injects the
 * documents that constrain the file being edited"
 * (cli/.archcore/integrations/agent-hooks-integration.doc.md). The file and
 * the documents continue the loop's running example one section above, so the
 * reader sees the command-free half of the same feature.
 */
export function ContextEngineeringSection() {
  const { _ } = useLingui();

  const applied: { kind: string; title: string; why: string }[] = [
    {
      kind: "spec",
      title: _(msg`Public API rate limiting`),
      why: _(msg`The contract this file has to hold.`),
    },
    {
      kind: "adr",
      title: _(msg`Token bucket in Redis`),
      why: _(msg`The decision that already picked the store.`),
    },
    {
      kind: "rule",
      title: _(msg`Error shapes in src/api/`),
      why: _(msg`The convention the response has to follow.`),
    },
  ];

  return (
    <SectionContainer id="context-engineering">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Context Engineering</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Engineer the context your coding agents work from</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            The four commands above are the part you type. The rest happens on
            its own: when the agent opens a file, Archcore gives it the
            documents that constrain that file, before the edit.
          </Trans>
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[var(--color-code-bg)]">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium mb-1">
            <Trans>Agent opens</Trans>
          </p>
          <p className="font-mono text-sm text-foreground break-all">
            src/api/rate-limit.ts
          </p>
        </div>

        <ul className="divide-y divide-border">
          {applied.map((item) => (
            <li key={item.kind} className="px-5 py-3.5 flex items-start gap-3">
              {/* Fixed width so the three titles share one left edge. The
                  type names differ in length, and a shrink-to-fit chip left
                  the rows visibly ragged. */}
              <code className="mt-0.5 w-12 shrink-0 rounded bg-muted px-1.5 py-0.5 text-center font-mono text-xs text-muted-foreground">
                {item.kind}
              </code>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">
                  {item.title}
                </span>
                <span className="block text-sm text-muted-foreground leading-snug">
                  {item.why}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="px-5 py-3 border-t border-border text-sm text-muted-foreground leading-relaxed">
          <Trans>
            The agent gets them without being asked. Each session also opens
            with a recap of what is decided and what is in progress.
          </Trans>
        </p>
      </div>

      <p className="max-w-2xl mx-auto mt-8 text-center text-sm leading-relaxed text-muted-foreground">
        <Trans>
          That is what makes it engineered context rather than a longer prompt:
          explicit, structured, selective, versioned, and portable across coding
          agents.
        </Trans>
      </p>

      {/*
        Earns the harness-engineering term on the highest-authority page
        without touching the H1 or the two discovery categories. One sentence
        and the link, which is the shape product/seo-information-architecture
        names as correct: the term appears once, in this section's body,
        pointing at the page that owns it.
      */}
      <p className="max-w-2xl mx-auto mt-4 text-center text-sm leading-relaxed text-muted-foreground">
        <Trans>
          Designing what an agent is told before it acts, and what checks it
          afterwards, is called harness engineering.{" "}
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
