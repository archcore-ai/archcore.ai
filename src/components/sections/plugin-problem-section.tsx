import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { MessageSquareText, XCircle } from "lucide-react";
import { SectionContainer } from "@/components/section-container";

interface Pain {
  title: string;
  detail: string;
}

export function PluginProblemSection() {
  const { _ } = useLingui();

  const pains: Pain[] = [
    {
      title: _(msg`Re-pasting context every chat`),
      detail: _(
        msg`You copy-paste the same architecture rules into every new conversation. The agent forgets the moment it ends.`
      ),
    },
    {
      title: _(msg`Generic suggestions for your codebase`),
      detail: _(
        msg`Claude Code and Cursor produce code that ignores your conventions, your ADRs, and your prior decisions.`
      ),
    },
    {
      title: _(msg`Decisions stuck in chat history`),
      detail: _(
        msg`You make a real call inside the agent — and a week later nobody, including the agent, remembers why.`
      ),
    },
    {
      title: _(msg`MCP setup is a chore`),
      detail: _(
        msg`Wiring an MCP server, editing config files, and keeping it updated isn't what you want to ship today.`
      ),
    },
  ];

  return (
    <SectionContainer id="problem">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>Why you need the plugin</Trans>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>Your agent forgets the rules every session.</Trans>
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Trans>
              Two install commands give Claude Code and Cursor a memory that
              lives next to the code — and slash commands to capture new
              decisions as they happen.
            </Trans>
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-4 font-mono text-sm text-left max-w-2xl mx-auto">
          <MessageSquareText className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-foreground">
            <Trans>"Before I touch src/auth/, what rules apply here?"</Trans>
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
            The plugin loads the right context before edits and captures every
            new decision back into Git.
          </Trans>
        </p>
      </div>
    </SectionContainer>
  );
}
