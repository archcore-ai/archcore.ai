import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

interface NavLink {
  label: string;
  href: string;
  external: boolean;
  /** Same-site static page outside the SPA — needs a full page load. */
  reload?: boolean;
}

export function SiteNav() {
  const { _ } = useLingui();

  const primaryLinks: NavLink[] = [
    { label: _(msg`Plugin`), href: INTERNAL_LINKS.plugin, external: false },
    { label: _(msg`CLI`), href: INTERNAL_LINKS.cli, external: false },
    { label: _(msg`Docs`), href: LINKS.docs, external: true },
    { label: _(msg`Blog`), href: INTERNAL_LINKS.blog, external: false, reload: true },
    { label: _(msg`Learn`), href: INTERNAL_LINKS.learn, external: false, reload: true },
    { label: "GitHub", href: LINKS.org, external: true },
    { label: _(msg`Privacy`), href: INTERNAL_LINKS.privacy, external: false },
  ];

  // The five pillar pages, one canonical owner per query cluster
  // (product/seo-information-architecture). Linked here so /project-context/
  // and /mcp/ are reachable from every page rather than only from siblings.
  // Static Astro routes from the content-site sub-build: full page load.
  const referenceLinks: NavLink[] = [
    {
      label: _(msg`Context engineering`),
      href: INTERNAL_LINKS.contextEngineering,
      external: false,
      reload: true,
    },
    {
      label: _(msg`Spec-driven development`),
      href: INTERNAL_LINKS.specDrivenDevelopment,
      external: false,
      reload: true,
    },
    {
      label: _(msg`Project context`),
      href: INTERNAL_LINKS.projectContext,
      external: false,
      reload: true,
    },
    {
      label: _(msg`Git-native context`),
      href: INTERNAL_LINKS.gitNativeContext,
      external: false,
      reload: true,
    },
    { label: "MCP", href: INTERNAL_LINKS.mcp, external: false, reload: true },
  ];

  const communityLinks: NavLink[] = [
    { label: "Discord", href: LINKS.discord, external: true },
    { label: "X", href: LINKS.x, external: true },
    { label: "Telegram", href: LINKS.telegram, external: true },
  ];

  return (
    <footer className="border-t border-border px-6 py-12 md:py-14">
      <div className="max-w-[var(--container-max)] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Logo size="md" loading="lazy" />
          <p className="text-sm text-muted-foreground">
            <Trans>Git-native context for AI coding agents.</Trans>
          </p>
        </div>

        <nav
          aria-label={_(msg`Site navigation`)}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
        >
          {primaryLinks.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </nav>

        <nav
          aria-label={_(msg`Reference`)}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="font-medium">
            <Trans>Reference</Trans>
          </span>
          {referenceLinks.map((link) => (
            <NavItem key={link.label} link={link} muted />
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-border">
          <nav
            aria-label={_(msg`Community channels`)}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="font-medium">
              <Trans>Community</Trans>
            </span>
            {communityLinks.map((link) => (
              <NavItem key={link.label} link={link} muted />
            ))}
          </nav>
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} archcore.ai
          </div>
        </div>
      </div>
    </footer>
  );
}

function NavItem({ link, muted = false }: { link: NavLink; muted?: boolean }) {
  const className = muted
    ? "text-muted-foreground hover:text-foreground transition-colors"
    : "text-foreground/80 hover:text-foreground transition-colors";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }
  if (link.reload) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  );
}
