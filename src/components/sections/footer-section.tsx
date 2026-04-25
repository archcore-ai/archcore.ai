import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { InlineEmailCapture } from "@/components/cta";
import { useLingui } from "@lingui/react";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function FooterSection() {
  const { _ } = useLingui();

  const footerLinks = [
    { label: _(msg`Plugin`), href: INTERNAL_LINKS.plugin, external: false },
    { label: _(msg`CLI`), href: INTERNAL_LINKS.cli, external: false },
    { label: _(msg`Docs`), href: LINKS.docs, external: true },
    { label: "GitHub", href: LINKS.org, external: true },
    { label: "Discord", href: LINKS.discord, external: true },
    { label: "X", href: LINKS.x, external: true },
    { label: "Telegram", href: LINKS.telegram, external: true },
    { label: _(msg`Privacy`), href: INTERNAL_LINKS.privacy, external: false },
  ];
  return (
    <footer className="border-t border-border px-6 py-20 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-4">
            <Logo size="md" loading="lazy" />
            <p className="text-sm text-muted-foreground max-w-sm">
              <Trans>
                Archcore turns your repository into structured, machine-readable
                context — so AI agents understand your architecture, rules, and
                decisions.
              </Trans>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              <Trans>Stay Updated</Trans>
            </h3>
            <InlineEmailCapture
              placeholder={_(msg`Enter your work email`)}
              buttonLabel={_(msg`Subscribe`)}
              successMessage={_(msg`Thanks! You're on the list.`)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} archcore.ai
          </div>
        </div>
      </div>
    </footer>
  );
}
