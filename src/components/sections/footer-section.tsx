import { Logo } from "@/components/logo";
import { InlineEmailCapture } from "@/components/cta";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const footerLinks = {
  Resources: [{ label: "GitHub", href: "https://github.com/archcore-ai", external: true }],
};

interface FooterSectionProps {
  onContactClick?: () => void;
}

export function FooterSection({ onContactClick }: FooterSectionProps) {
  const { _ } = useLingui();
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <Logo size="md" loading="lazy" />
            <p className="text-sm text-muted-foreground max-w-sm">
              <Trans>Verified architectural context for AI-assisted development. Self-hosted, MCP-native.</Trans>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium"><Trans>Stay Updated</Trans></h3>
            <InlineEmailCapture
              placeholder={_(msg`Enter your work email`)}
              buttonLabel={_(msg`Subscribe`)}
              successMessage={_(msg`Thanks! You're on the list.`)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {Object.values(footerLinks)
              .flat()
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            <button onClick={onContactClick} className="text-muted-foreground hover:text-foreground transition-colors">
              <Trans>Contact Us</Trans>
            </button>
          </div>

          <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} archcore.ai</div>
        </div>
      </div>
    </footer>
  );
}
