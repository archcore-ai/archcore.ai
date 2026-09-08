import { Trans } from "@lingui/react/macro";
import { InstallCommand } from "@/components/cta/install-command";
import { INSTALL_COMMANDS } from "@/content/how-to-use";

/**
 * Top of /how-to-use: the claim, then the one thing to install.
 *
 * Deliberately thin. The page used to open with a five-branch picker, then
 * with a three-step first run; both spent the fold explaining themselves
 * before showing anything. The loop below is the content
 * (.archcore/landing/how-to-use-cases.adr.md).
 */
export function HowToUseStartSection() {
  return (
    <section
      id="top"
      className="hero-section relative page-hero pb-6 site-gutters overflow-hidden"
    >
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>How to use Archcore</Trans>
        </p>

        <h1 className="type-hero text-balance">
          <Trans>
            Tell your agent what you want.
            <br />
            Archcore writes it down.
          </Trans>
        </h1>

        <p className="text-lg leading-relaxed text-muted-foreground">
          <Trans>
            One thing to install, and nothing to configure after that.
          </Trans>
        </p>

        {/* The star CTA's "Install now" link targets #install on every page
            that renders it, so this block owns the anchor here. */}
        <div id="install" className="space-y-2 text-left pt-2 scroll-mt-24">
          {INSTALL_COMMANDS.map((command) => (
            <InstallCommand
              key={command}
              variant="inline"
              command={command}
              surface="how_to_use_install"
              installTarget="cli"
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          <Trans>
            Run it in the repo you want to work in. It picks up the coding
            agents you already have and wires them.
          </Trans>
        </p>
      </div>
    </section>
  );
}
