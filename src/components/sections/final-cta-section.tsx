import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen, Github, Puzzle, Terminal } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function FinalCTASection() {
  const { _ } = useLingui();

  const links = [
    {
      href: LINKS.pluginRepo,
      icon: Puzzle,
      label: _(msg`Plugin repo`),
    },
    {
      href: LINKS.cliRepo,
      icon: Terminal,
      label: _(msg`CLI repo`),
    },
    {
      href: LINKS.docs,
      icon: BookOpen,
      label: _(msg`Docs`),
    },
    {
      href: LINKS.org,
      icon: Github,
      label: _(msg`GitHub`),
    },
  ];

  return (
    <SectionContainer id="more-info" className="py-16 md:py-20">
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <Trans>Give your agent your repo's context.</Trans>
        </h2>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Button size="lg" className="gap-2" asChild>
            <Link to={INTERNAL_LINKS.plugin}>
              <Trans>Use the Plugin</Trans>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link to={INTERNAL_LINKS.cli}>
              <Trans>Start with CLI</Trans>
            </Link>
          </Button>
        </div>
      </div>

      <nav
        aria-label={_(msg`More info`)}
        className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {links.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card p-4 flex items-center gap-3 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
          >
            <Icon className="h-4 w-4 text-foreground/80 shrink-0" />
            <span className="font-medium text-sm flex-1 truncate">{label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary shrink-0" />
          </a>
        ))}
      </nav>
    </SectionContainer>
  );
}
