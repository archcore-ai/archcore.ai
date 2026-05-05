import { Trans } from "@lingui/react/macro";
import { Terminal, XCircle } from "lucide-react";
import { SectionContainer } from "@/components/section-container";

export function ProblemSection() {
  return (
    <SectionContainer id="problem">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>What breaks without Archcore</Trans>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Your AI agent keeps guessing your architecture.</Trans>
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-4 font-mono text-sm text-left max-w-2xl mx-auto">
          <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-foreground">
            <Trans>“Add a new user-notifications service.”</Trans>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            <Trans>Guess folder structure</Trans>,
            <Trans>Ignore team conventions</Trans>,
            <Trans>Re-litigate old decisions</Trans>,
            <Trans>Need the same rules repeated in every chat</Trans>,
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-4 flex items-start gap-3"
            >
              <XCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
