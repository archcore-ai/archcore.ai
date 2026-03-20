import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { Logo } from "@/components/logo";
import { InlineEmailCapture } from "@/components/cta";
import { useLingui } from "@lingui/react";

export function FooterSection() {
  const { _ } = useLingui();

  const footerLinks = [
    { label: _(msg`Docs`), href: "https://docs.archcore.ai/", external: true },
    { label: "GitHub", href: "https://github.com/archcore-ai", external: true },
    { label: "Discord", href: "https://discord.gg/5YC8pdjD", external: true },
    { label: "X", href: "https://x.com/archcore_ai", external: true },
    { label: "Telegram", href: "https://t.me/archcore_ai", external: true },
  ];
  return (
    <footer className="border-t border-border px-6 py-20 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-4">
            <Logo size="md" loading="lazy" />
            <p className="text-sm text-muted-foreground max-w-sm">
              <Trans>
                Shared architectural memory for AI coding agents.
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
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} archcore.ai
          </div>
        </div>
      </div>
    </footer>
  );
}
