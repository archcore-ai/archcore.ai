import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";

const INSTALL_COMMANDS = `# Install the CLI
curl -fsSL https://archcore.ai/install.sh | bash

# Initialize in your repo
archcore init`;

export function QuickstartSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer
      id="quickstart"
      className="bg-muted/30 border-y border-border"
    >
      <SectionHeader title={_(msg`Two commands to get started`)} />

      <div className="max-w-2xl mx-auto space-y-8">
        <pre className="font-mono text-sm bg-background border rounded-lg p-6 overflow-x-auto leading-relaxed">
          {INSTALL_COMMANDS}
        </pre>

        <p className="text-center text-muted-foreground text-base md:text-lg leading-relaxed">
          <Trans>
            archcore init creates .archcore/, installs agent integrations, and
            gives you starter templates for ADRs, rules, plans, and experience.
            Your first document is one command away.
          </Trans>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <a
            href="https://docs.archcore.ai/getting-started/quick-start/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            <Trans>Read the full quickstart guide</Trans>
          </a>
        </p>
      </div>
    </SectionContainer>
  );
}
