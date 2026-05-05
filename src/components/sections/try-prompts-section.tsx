import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { SectionContainer } from "@/components/section-container";

export function TryPromptsSection() {
  const { _ } = useLingui();

  const prompts = [
    {
      prompt: _(
        msg`Before I touch src/auth/, what rules and prior decisions apply here?`
      ),
      result: _(msg`The agent loads relevant rules, ADRs, and patterns first.`),
    },
    {
      prompt: _(msg`Add a new API handler and follow this repo's conventions.`),
      result: _(msg`Code lands where the architecture expects it.`),
    },
    {
      prompt: _(msg`We picked PostgreSQL. Record it as a team standard.`),
      result: _(msg`Archcore creates an ADR, rule, and guide in Git.`),
    },
  ];

  return (
    <SectionContainer id="try-first" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-8 lg:gap-10 items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>Try these first</Trans>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Ask your agent for repo memory, not generic advice.</Trans>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            <Trans>
              These are the first prompts that make Archcore feel real: load
              context, follow conventions, then capture a decision for the next
              session.
            </Trans>
          </p>
        </div>

        <div className="space-y-3">
          {prompts.map((item) => (
            <article
              key={item.prompt}
              className="rounded-xl border border-border bg-card p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <MessageSquareText className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                <div className="min-w-0 flex-1 space-y-3">
                  <p className="font-mono text-sm leading-relaxed">
                    “{item.prompt}”
                  </p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">{item.result}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
