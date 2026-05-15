import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionContainer } from "@/components/section-container";

interface Row {
  text: string;
}

export function ProblemSection() {
  const { _ } = useLingui();

  const before: Row[] = [
    { text: _(msg`Drop files anywhere`) },
    { text: _(msg`Reopen decisions you already made`) },
    { text: _(msg`Forget the rules each session`) },
    { text: _(msg`One bespoke prompt per agent`) },
  ];

  const after: Row[] = [
    { text: _(msg`Follow your conventions`) },
    { text: _(msg`Respect ADRs and rules`) },
    { text: _(msg`Persist across sessions`) },
    { text: _(msg`One source of truth, every agent`) },
  ];

  return (
    <SectionContainer id="problem">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>The day-to-day reality</Trans>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Your AI agent doesn't know your codebase.</Trans>
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Trans>
              It has read your code, not your architecture. So it improvises —
              every session, every agent.
            </Trans>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              <Trans>What agents do today</Trans>
            </p>
            <ul className="space-y-3">
              {before.map((row) => (
                <li
                  key={row.text}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <XCircle className="h-4 w-4 mt-0.5 shrink-0 opacity-70" />
                  <span className="leading-snug">{row.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <p className="text-xs uppercase tracking-wider text-foreground/80 font-medium">
              <Trans>What you want</Trans>
            </p>
            <ul className="space-y-3">
              {after.map((row) => (
                <li
                  key={row.text}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-foreground/80" />
                  <span className="leading-snug">{row.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
