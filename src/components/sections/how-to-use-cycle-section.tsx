import { Trans } from "@lingui/react/macro";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { CYCLE_STAGES } from "@/content/how-to-use";
import type { CycleStage } from "@/content/how-to-use";
import { INTERNAL_LINKS } from "@/lib/links";
import { cn } from "@/lib/utils";

interface HowToUseCycleSectionProps {
  /**
   * "home" holds the canonical How-it-works slot (section 8): same four
   * stages, framed as the mechanism rather than as a walkthrough, with a link
   * to the full page instead of the closing notes.
   */
  variant?: "page" | "home";
}

/**
 * One loop through the product: init, plan, document, review.
 *
 * On the home page this replaced a separate "Capture → Connect → Apply →
 * Evolve" section, which described the same four moves in abstract verbs one
 * screen away from the concrete ones. Two passes at the same mechanism read as
 * two mechanisms. The claims that only lived in the abstract version (no new
 * service, context travels with the repo) moved here.
 *
 * Always vertical. A four-column grid squeezed each prompt into four or five
 * wrapped lines and lost the fact that the stages run in order.
 *
 * See .archcore/landing/how-to-use-cases.adr.md.
 */
export function HowToUseCycleSection({
  variant = "page",
}: HowToUseCycleSectionProps = {}) {
  const isHome = variant === "home";

  return (
    <SectionContainer
      id={isHome ? "how-it-works" : "cycle"}
      className={isHome ? "bg-muted/30 border-y border-border" : undefined}
    >
      <div className="max-w-2xl mx-auto text-center space-y-4 mb-10 md:mb-12">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {isHome ? (
            <Trans>How it works</Trans>
          ) : (
            <Trans>Four skills, one feature</Trans>
          )}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          {isHome ? (
            <Trans>Four skills, one feature</Trans>
          ) : (
            <Trans>Use Archcore’s four skills in order</Trans>
          )}
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          {isHome ? (
            <Trans>
              A skill is a workflow your agent follows for a specific job. These
              four connect project setup, planning, decisions, and code review.
              Each step uses the context saved before it.
            </Trans>
          ) : (
            <Trans>
              Ask your agent using the example prompt, or run the slash command
              shown below. The commands work in Claude Code, Cursor, Codex CLI,
              and Copilot. Other agents access Archcore through MCP.
            </Trans>
          )}
        </p>
      </div>

      <ol className="max-w-2xl mx-auto space-y-3">
        {CYCLE_STAGES.map((stage, i) => (
          <Stage key={stage.id} stage={stage} index={i} />
        ))}
      </ol>

      <div
        className={cn(
          "max-w-2xl mx-auto mt-8 space-y-3",
          "text-sm text-muted-foreground leading-relaxed",
          isHome && "text-center"
        )}
      >
        {isHome ? (
          <>
            {/*
              The verdict tokens are the ones the review skill emits, grouped
              exactly this way (plugin skills/review/SKILL.md). They are the
              most concrete outcome the product has, and the home page named
              none of them before landing/home-loop-before-categories.adr.md.
              Re-read that file on any release that touches review.
            */}
            <p>
              <Trans>
                Step four ends in a verdict on each finding:{" "}
                <code className="font-mono text-[0.9em]">spec-wrong</code> when
                the document is stale,{" "}
                <code className="font-mono text-[0.9em]">code-wrong</code> when
                the branch broke a decision, and{" "}
                <code className="font-mono text-[0.9em]">ok</code> when the two
                agree.
              </Trans>
            </p>
            <p>
              <Trans>
                No new service to run. Your context lives in the repo, moves
                with it through Git, and reaches every agent you open.
              </Trans>
            </p>
            <p>
              <a
                href={INTERNAL_LINKS.howToUse}
                data-analytics-cta="home_loop_how_to_use"
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-[var(--color-action)] transition-colors"
              >
                <Trans>See the skills in action</Trans>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </p>
          </>
        ) : (
          <>
            <p>
              <Trans>
                While you code, supported hooks bring relevant specs and
                decisions to your agent. At the start of a session, they provide
                a recap of decisions and work in progress. Other agents can read
                the same documents through MCP.
              </Trans>
            </p>
            <p>
              <Trans>
                The next feature starts with the context you have already saved.
                Your specs and decisions stay in Git alongside the code.
              </Trans>
            </p>
          </>
        )}
      </div>
    </SectionContainer>
  );
}

function Stage({ stage, index }: { stage: CycleStage; index: number }) {
  return (
    <li className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted-foreground"
        >
          {index + 1}
        </span>

        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <code className="font-mono text-sm font-semibold text-foreground">
              {stage.skill}
            </code>
            <span className="text-sm text-muted-foreground">{stage.title}</span>
          </div>

          <p className="rounded-lg border border-border bg-[var(--color-code-bg)] px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
            <span aria-hidden="true" className="text-muted-foreground/60">
              “
            </span>
            {stage.prompt}
            <span aria-hidden="true" className="text-muted-foreground/60">
              ”
            </span>
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {stage.result}
          </p>
        </div>
      </div>
    </li>
  );
}
