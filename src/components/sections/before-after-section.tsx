import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { ArrowRight, Check, X } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { cn } from "@/lib/utils";

interface Panel {
  tone: "before" | "after";
  label: string;
  prompt: string;
  lines: { text: string; good?: boolean }[];
  footnote: string;
}

export function BeforeAfterSection() {
  const { _ } = useLingui();

  const panels: Panel[] = [
    {
      tone: "before",
      label: _(msg`Without Archcore`),
      prompt: _(msg`Add rate limiting to the auth endpoints.`),
      lines: [
        { text: _(msg`Picks a random library it knows`) },
        { text: _(msg`Ignores the Redis store you already use`) },
        { text: _(msg`Reinvents conventions the team already settled`) },
        { text: _(msg`You re-explain the same rules. Again.`) },
      ],
      footnote: _(msg`Logical code — just not how this repo works.`),
    },
    {
      tone: "after",
      label: _(msg`With Archcore`),
      prompt: _(msg`Add rate limiting to the auth endpoints.`),
      lines: [
        { text: _(msg`Loads the ADR: "Rate limiting via Redis token bucket"`), good: true },
        { text: _(msg`Pulls the rule for src/auth/ error shapes`), good: true },
        { text: _(msg`Reuses the existing middleware pattern`), good: true },
        { text: _(msg`Writes the decision back as a versioned doc`), good: true },
      ],
      footnote: _(msg`Code that matches your architecture on the first try.`),
    },
  ];

  return (
    <SectionContainer id="before-after">
      <div className="text-center space-y-4 mb-10 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>See the difference</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Same prompt. Different agent.</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            The only difference is whether it could see your decisions, rules,
            and patterns first.
          </Trans>
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {panels.map((panel) => {
          const isAfter = panel.tone === "after";
          return (
            <article
              key={panel.tone}
              className={cn(
                "rounded-xl border bg-card overflow-hidden flex flex-col",
                isAfter
                  ? "border-[var(--color-action)]/30 ring-1 ring-[var(--color-action)]/10"
                  : "border-border"
              )}
            >
              <div
                className={cn(
                  "px-5 py-2.5 text-xs uppercase tracking-wider font-semibold border-b",
                  isAfter
                    ? "text-[var(--color-action)] border-[var(--color-action)]/20 bg-[var(--color-action)]/[0.04]"
                    : "text-muted-foreground border-border bg-muted/30"
                )}
              >
                {panel.label}
              </div>

              <div className="p-5 space-y-4 flex flex-col flex-1">
                <div className="rounded-lg bg-[var(--color-code-bg)] border border-border px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium mb-1">
                    <Trans>You</Trans>
                  </p>
                  <p className="font-mono text-sm text-foreground leading-relaxed">
                    {panel.prompt}
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {panel.lines.map((line, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          line.good
                            ? "bg-[var(--color-action)]/15 text-[var(--color-action)]"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {line.good ? (
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        ) : (
                          <X className="h-2.5 w-2.5" strokeWidth={3} />
                        )}
                      </span>
                      <span
                        className={cn(
                          "leading-snug",
                          line.good ? "text-foreground/90" : "text-muted-foreground"
                        )}
                      >
                        {line.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={cn(
                    "text-sm leading-snug pt-3 border-t flex items-start gap-2",
                    isAfter
                      ? "text-foreground/80 border-[var(--color-action)]/15"
                      : "text-muted-foreground border-border"
                  )}
                >
                  {isAfter && (
                    <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-action)]" />
                  )}
                  <span>{panel.footnote}</span>
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionContainer>
  );
}
