import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight, ArrowUpRight, BookOpen, FileCode2, FolderTree, ScrollText, type LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

interface Source {
  icon: LucideIcon;
  from: string;
  becomes: string;
  detail: string;
}

interface MigrationSectionProps {
  /**
   * Which entry point the reader is evaluating. Only the import command and
   * the closing CTA differ — the copy is shared so the two pages cannot drift.
   */
  entryPoint: "plugin" | "cli";
}

export function MigrationSection({ entryPoint }: MigrationSectionProps) {
  const { _ } = useLingui();

  const importCommand =
    entryPoint === "plugin" ? "/archcore:init" : "archcore init";

  const sources: Source[] = [
    {
      icon: FileCode2,
      from: "CLAUDE.md",
      becomes: _(msg`Rules and decisions`),
      detail: _(
        msg`One flat file for one tool becomes typed documents every agent can read: conventions as rules, the reasoning behind them as ADRs.`
      ),
    },
    {
      icon: ScrollText,
      from: "AGENTS.md · .cursor/rules",
      becomes: _(msg`Scoped rules`),
      detail: _(
        msg`Path-scoped instruction files keep their scope, but gain status, timestamps, and relations, so you can see what is still accepted and what a later decision superseded.`
      ),
    },
    {
      icon: FolderTree,
      from: "docs/",
      becomes: _(msg`Guides, specs, and plans`),
      detail: _(
        msg`Prose your team already wrote gets a type and a place in the graph, so an agent pulls the guide for the directory it is editing instead of grepping the whole folder.`
      ),
    },
  ];

  return (
    <SectionContainer id="migrate">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <Trans>Already have instruction files?</Trans>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>You don't start over.</Trans>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Trans>
              Running{" "}
              <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
                {importCommand}
              </code>{" "}
              imports the instruction files you already wrote (CLAUDE.md,
              AGENTS.md, .cursorrules, .cursor/rules/*) as typed documents. The
              context you wrote carries over; it just stops being one flat file
              per tool.
            </Trans>
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sources.map((source) => {
            const Icon = source.icon;
            return (
              <li
                key={source.from}
                className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3"
              >
                <div className="rounded-lg bg-muted p-2 w-fit">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <code className="font-mono text-xs text-foreground/90">
                    {source.from}
                  </code>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="font-semibold leading-tight">
                    {source.becomes}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {source.detail}
                </p>
              </li>
            );
          })}
        </ul>

        <nav
          aria-label={_(msg`Migration resources`)}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <a
            href={LINKS.docsMigrate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Migration guide</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={INTERNAL_LINKS.repoMemory}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Trans>What is repo memory?</Trans>
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </nav>
      </div>
    </SectionContainer>
  );
}
