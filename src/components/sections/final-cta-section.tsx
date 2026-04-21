import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight, ArrowUpRight, BookOpen, Github, Puzzle, Terminal } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";
import { ANCHORS, LINKS } from "@/lib/links";

export function FinalCTASection() {
  const { _ } = useLingui();

  const links = [
    {
      href: LINKS.pluginRepo,
      icon: Puzzle,
      label: _(msg`Plugin repository`),
      description: _(msg`Source, releases, and issues for the Claude Code and Cursor plugin.`),
    },
    {
      href: LINKS.cliRepo,
      icon: Terminal,
      label: _(msg`CLI repository`),
      description: _(msg`Source and releases for the CLI and MCP server.`),
    },
    {
      href: LINKS.docs,
      icon: BookOpen,
      label: _(msg`Documentation`),
      description: _(msg`Guides, reference, and quickstart for Archcore.`),
    },
    {
      href: LINKS.org,
      icon: Github,
      label: _(msg`GitHub organization`),
      description: _(msg`All Archcore repositories in one place.`),
    },
  ];

  return (
    <SectionContainer id="more-info" className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <Button size="lg" className="gap-2" asChild>
          <a href={ANCHORS.install}>
            <Trans>Use the Plugin</Trans>
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <Button size="lg" variant="outline" className="gap-2" asChild>
          <a href={ANCHORS.installCli}>
            <Trans>Start with CLI</Trans>
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <nav
        aria-label={_(msg`More info`)}
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {links.map(({ href, icon: Icon, label, description }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl border border-border bg-card p-5 flex items-start gap-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
          >
            <div className="rounded-lg bg-muted p-2.5 shrink-0">
              <Icon className="h-5 w-5 text-foreground/80" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 font-semibold text-sm mb-1">
                <span>{label}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </a>
        ))}
      </nav>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Trans>Same context layer. Different entry points.</Trans>
      </p>
    </SectionContainer>
  );
}
