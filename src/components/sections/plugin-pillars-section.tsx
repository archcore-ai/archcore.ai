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
  HelpCircle,
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
  command: string;
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
      title: _(msg`Context-aware edits`),
      outcome: _(
        msg`Before your agent touches code, it loads the rules, decisions, and patterns for that path — no more re-pasting conventions.`
      ),
      command: "/archcore:context",
    },
    {
      icon: FileText,
      title: _(msg`Document what's already in code`),
      outcome: _(
        msg`Turn tribal knowledge into versioned docs — modules, APIs, integrations — captured straight into your repo.`
      ),
      command: "/archcore:capture",
    },
    {
      icon: Gavel,
      title: _(msg`Decisions stop dying in chat`),
      outcome: _(
        msg`Record an ADR and (optionally) make it a team rule that auto-applies to every future edit in the same area.`
      ),
      command: "/archcore:decide",
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
      icon: Compass,
      command: "/archcore:context",
      outcome: _(msg`Load what's already decided before you change code`),
      when: _(msg`Daily, before editing`),
    },
    {
      icon: FileText,
      command: "/archcore:capture",
      outcome: _(msg`Document what already lives in code`),
      when: _(msg`A module has tribal knowledge but no doc`),
    },
    {
      icon: ListChecks,
      command: "/archcore:plan",
      outcome: _(msg`Turn an idea into a scoped implementation plan`),
      when: _(msg`New feature, refactor, or initiative`),
    },
    {
      icon: Gavel,
      command: "/archcore:decide",
      outcome: _(msg`Record a decision and make it a team rule`),
      when: _(msg`A decision was made`),
    },
    {
      icon: Stethoscope,
      command: "/archcore:audit",
      outcome: _(msg`Find stale, missing, or drifting docs`),
      when: _(msg`Health check`),
    },
    {
      icon: HelpCircle,
      command: "/archcore:help",
      outcome: _(msg`Navigate the skill catalog`),
      when: _(msg`When you forget which command fits`),
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
            The plugin is 7 slash commands. Here's what each one does for you.
          </Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            Describe what you want in plain English — Archcore routes it. The{" "}
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
              key={s.command}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="rounded-lg bg-muted p-2 w-fit">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.outcome}
              </p>
              <code className="mt-auto font-mono text-xs text-foreground/80 bg-muted/60 rounded px-2 py-1 w-fit">
                {s.command}
              </code>
            </li>
          );
        })}
      </ul>

      <div className="max-w-5xl mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/40">
          <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
            <Trans>All 7 commands at a glance</Trans>
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
