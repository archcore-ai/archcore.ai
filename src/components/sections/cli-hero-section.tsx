import { productCopy } from "@/data/product-copy";
import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ExternalLink, Github } from "lucide-react";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

export function CLIHeroSection() {
  const { _ } = useLingui();

  return (
    <>
      <h1>
        <Trans>Archcore CLI</Trans>
      </h1>

      <p>{_(productCopy.cliDescription)}</p>

      <section id="install">
        <h2>
          <Trans>Install CLI</Trans>
        </h2>
        <p>
          <Trans>
            Install the CLI, then run archcore init in your project folder.
          </Trans>
        </p>
        <div className="guide-install">
          <InstallCommand variant="inline" surface="cli_hero" />
          <InstallCommand
            variant="inline"
            command="archcore init"
            surface="cli_hero"
            installTarget="cli"
          />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1">
          <a
            href={LINKS.cliRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
            aria-label={_(msg`Star CLI on GitHub`)}
          >
            <Github className="h-3 w-3" />
            archcore-ai/cli
          </a>
          <span className="text-muted-foreground/40">·</span>
          <a
            href="https://docs.archcore.ai/cli/install/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            <Trans>CLI docs</Trans>
          </a>
        </p>
      </section>
    </>
  );
}
