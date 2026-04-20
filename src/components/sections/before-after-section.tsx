import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { AlertTriangle, Check, Terminal, X } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";

export function BeforeAfterSection() {
  const { _ } = useLingui();

  const without = [
    _(msg`Picks a folder that breaks your layer boundaries`),
    _(msg`Invents patterns that already exist elsewhere in the repo`),
    _(msg`Misses the logging, auth, and error-handling rules your team follows`),
    _(msg`Re-litigates decisions already made in an old ADR`),
  ];

  const withPlugin = [
    _(msg`Places files where your architecture ADR says they belong`),
    _(msg`Reuses existing patterns instead of inventing new ones`),
    _(msg`Applies team rules for logging, auth, and error handling consistently`),
    _(msg`References the ADR that already decided the question`),
  ];

  return (
    <SectionContainer id="before-after">
      <SectionHeader
        title={_(msg`The moment the agent starts understanding your repo`)}
        description={_(
          msg`Same prompt. Same codebase. The difference is whether the agent has structured project context or has to guess.`
        )}
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 mb-6 font-mono text-sm">
          <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground shrink-0">
            <Trans>Prompt</Trans>
          </span>
          <span className="text-foreground">
            {_(msg`“Add a new user-notifications service.”`)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="rounded-2xl border border-border bg-muted/30 p-6">
            <header className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-background p-2 border border-border">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-base">
                  <Trans>Without Archcore</Trans>
                </h3>
              </div>
              <Badge variant="outline" className="text-muted-foreground">
                <Trans>Agent guesses</Trans>
              </Badge>
            </header>

            <ul className="space-y-2.5">
              {without.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <X className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border-2 border-primary/40 bg-primary/[0.04] p-6 shadow-sm">
            <header className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">
                  <Trans>With the Archcore Plugin</Trans>
                </h3>
              </div>
              <Badge variant="default">
                <Trans>Agent reads your repo context</Trans>
              </Badge>
            </header>

            <ul className="space-y-2.5">
              {withPlugin.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed"
                >
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <Trans>
            The same context is available over MCP and hooks for teams that
            prefer the direct CLI path.
          </Trans>
        </p>
      </div>
    </SectionContainer>
  );
}
