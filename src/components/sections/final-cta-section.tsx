import { Trans } from "@lingui/react/macro";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/section-container";

export function FinalCTASection() {
  return (
    <SectionContainer id="final-cta" className="py-24 md:py-32">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <Trans>Stop re-explaining your codebase to AI agents</Trans>
        </h2>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          <Trans>
            Install Archcore and give every agent the same project context.
            Ship faster with consistent, context-aware output.
          </Trans>
        </p>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <a href="#quickstart">
              <Trans>Install CLI</Trans>
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/archcore-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trans>View on GitHub</Trans>
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://docs.archcore.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trans>Read the docs</Trans>
            </a>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
