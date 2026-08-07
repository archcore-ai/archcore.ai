import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  FileText,
  Gavel,
  Github,
  ListChecks,
  Rocket,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { LINKS } from "@/lib/links";

interface Spotlight {
  icon: LucideIcon;
  title: string;
  outcome: string;
  /**
   * The slash command that triggers it, or null when the plugin does it on its
   * own — since v0.7.0 everyday context injection needs no command at all.
   */
  command: string | null;
  /** Rendered in place of the command chip when `command` is null. */
  trigger?: string;
}

interface SkillRow {
  icon: LucideIcon;
  command: string;
  outcome: string;
  when: string;
}

export function PluginPillarsSection() {
  const { _ } = useLingui();

  const spotlights: Spotlight[] = [
    {
      icon: Compass,
      title: _(msg`Context-aware edits, no command`),
      outcome: _(
        msg`Hooks inject the rules and specs that apply to the file your agent is editing, and every session opens with a recap of what's decided and in progress.`
      ),
      command: null,
      trigger: _(msg`automatic`),
    },
    {
      icon: Gavel,
      title: _(msg`Decisions stop dying in chat`),
      outcome: _(
        msg`Record an ADR or RFC, optionally codified as a team rule that auto-applies to every future edit in the same area. Or document a module that only lives in someone's head.`
      ),
      command: "/archcore:document",
    },
    {
      icon: Stethoscope,
      title: _(msg`Catch drift before you merge`),
      outcome: _(
        msg`Review the branch against your recorded rules and decisions, in both directions: code that broke a doc, and docs the code left behind.`
      ),
      command: "/archcore:review",
    },
  ];

  const catalog: SkillRow[] = [
    {
      icon: Rocket,
      command: "/archcore:init",
      outcome: _(msg`Make your repo legible to AI agents`),
      when: _(msg`First-time setup`),
    },
    {
      icon: ListChecks,
      command: "/archcore:plan",
      outcome: _(msg`Turn an idea into a scoped implementation plan`),
      when: _(msg`New feature, refactor, or initiative`),
    },
    {
      icon: FileText,
      command: "/archcore:document",
      outcome: _(msg`Record a decision or document what lives in code`),
      when: _(msg`A decision was made, or a module has no doc`),
    },
    {
      icon: Stethoscope,
      command: "/archcore:review",
      outcome: _(msg`Check your changes and your docs against each other`),
      when: _(msg`Before merge; --drift and --deep for audits`),
    },
  ];

  return (
    <SectionContainer
      id="how-it-works"
      className="bg-muted/30 border-y border-border"
    >
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>What you get</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>
            Four slash commands. The everyday context needs none of them.
          </Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            Describe what you want in plain English and Archcore routes it. The{" "}
            <code className="font-mono text-[0.9em] rounded bg-muted px-1.5 py-0.5">
              /archcore:*
            </code>{" "}
            commands below are just shortcuts to the same workflows.
          </Trans>
        </p>
      </div>

      <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {spotlights.map((s) => {
          const Icon = s.icon;
          return (
            <li
              key={s.command ?? s.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="rounded-lg bg-muted p-2 w-fit">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.outcome}
              </p>
              {s.command ? (
                <code className="mt-auto font-mono text-xs text-foreground/80 bg-muted/60 rounded px-2 py-1 w-fit">
                  {s.command}
                </code>
              ) : (
                <span className="mt-auto text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted/60 rounded px-2 py-1 w-fit">
                  {s.trigger}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="max-w-5xl mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/40">
          <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
            <Trans>All 4 commands at a glance</Trans>
          </p>
        </div>
        <ul className="divide-y divide-border">
          {catalog.map((row) => {
            const Icon = row.icon;
            return (
              <li
                key={row.command}
                className="grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[auto_minmax(11rem,14rem)_minmax(0,1fr)_minmax(0,12rem)] items-start gap-3 sm:gap-5 px-5 py-4"
              >
                <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <code className="font-mono text-sm text-foreground whitespace-nowrap">
                  {row.command}
                </code>
                <p className="text-sm text-foreground/90 leading-snug col-span-2 sm:col-span-1">
                  {row.outcome}
                </p>
                <p className="text-xs text-muted-foreground leading-snug col-span-2 sm:col-span-1 sm:text-right">
                  {row.when}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <nav
        aria-label={_(msg`More info`)}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Trans>More info</Trans>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href="https://docs.archcore.ai/plugin/install/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <Trans>Plugin docs</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={LINKS.pluginRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Github className="h-4 w-4" />
            <Trans>Plugin repo</Trans>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </nav>
    </SectionContainer>
  );
}
