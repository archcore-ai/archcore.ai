import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Terminal, XCircle } from "lucide-react";
import { SectionContainer } from "@/components/section-container";

interface Pain {
  title: string;
  detail: string;
}

export function CLIProblemSection() {
  const { _ } = useLingui();

  const pains: Pain[] = [
    {
      title: _(msg`Instructions live in one flat file`),
      detail: _(
        msg`CLAUDE.md and .cursorrules pile up — there's no type, no link, no history the agent can reason about.`
      ),
    },
    {
      title: _(msg`No shared context across agents`),
      detail: _(
        msg`Claude Code, Cursor, and Copilot each get their own bespoke prompt. Nothing is reused.`
      ),
    },
    {
      title: _(msg`Decisions never make it back to the repo`),
      detail: _(
        msg`The agent picks a direction in chat, but the rationale doesn't land in Git for the next session — or the next teammate.`
      ),
    },
    {
      title: _(msg`MCP servers stay generic`),
      detail: _(
        msg`Most MCP servers expose external services. None of them speak your codebase's typed decisions, rules, and plans.`
      ),
    },
  ];

  return (
    <SectionContainer id="problem">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>Why you need a CLI</Trans>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Instruction files don't scale.</Trans>
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Trans>
              Flat memory works for a few rules. Real teams need typed,
              queryable, versioned context every agent can read. That's what
              archcore init builds.
            </Trans>
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-4 font-mono text-sm text-left max-w-2xl mx-auto">
          <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-foreground">
            <Trans>"Read the ADRs before you touch payments."</Trans>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="rounded-xl border border-border bg-card p-5 flex items-start gap-3"
            >
              <XCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold leading-tight">
                  {pain.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pain.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground/80 max-w-2xl mx-auto">
          <Trans>
            One binary turns the repo itself into the source of truth — no
            servers, no accounts, no copy-paste prompts.
          </Trans>
        </p>
      </div>
    </SectionContainer>
  );
}
