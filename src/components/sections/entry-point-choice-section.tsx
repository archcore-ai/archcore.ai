import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Check, Puzzle, Terminal } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";

export function EntryPointChoiceSection() {
  const { _ } = useLingui();

  const pluginReasons = [
    _(msg`You use Claude Code or Cursor daily`),
    _(msg`You want guided, multi-step workflows inside your agent`),
    _(msg`You want team-wide adoption with consistent behavior`),
    _(msg`You want the fastest path to value without wiring up MCP manually`),
  ];

  const cliReasons = [
    _(msg`You want the core context layer directly — .archcore/, MCP, hooks`),
    _(msg`You run custom agent flows or your own orchestration`),
    _(msg`You use an agent the plugin does not yet support`),
    _(msg`You prefer a minimal, scriptable surface`),
  ];

  return (
    <SectionContainer id="choose-path">
      <SectionHeader
        title={_(msg`How to choose between Plugin and CLI`)}
        description={_(
          msg`Both paths use the same repository context. The difference is the experience layer.`
        )}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="relative rounded-2xl border-2 border-primary/40 bg-primary/[0.04] p-8 shadow-md">
          <Badge className="absolute -top-3 left-8" variant="default">
            <Trans>Recommended</Trans>
          </Badge>

          <header className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Puzzle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">
              <Trans>Choose the Plugin if</Trans>
            </h3>
          </header>

          <ul className="space-y-3">
            {pluginReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2.5 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/80 leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-border bg-card p-8">
          <header className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-muted p-2.5">
              <Terminal className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">
              <Trans>Choose CLI if</Trans>
            </h3>
          </header>

          <ul className="space-y-3">
            {cliReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2.5 text-sm">
                <Check className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-foreground/80 leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SectionContainer>
  );
}
