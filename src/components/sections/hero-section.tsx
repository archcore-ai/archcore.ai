import { Trans } from "@lingui/react/macro";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/cta";

export function HeroSection() {
  return (
    <section
      id="top"
      className="hero-pattern relative pt-28 lg:pt-32 pb-8 md:pb-10 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="space-y-8 text-center">
          <div className="space-y-6">
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <Trans>Archcore — System Context Platform</Trans>
            </h1>
            <p className="hero-description text-lg md:text-xl lg:text-xl leading-relaxed text-muted-foreground/90 max-w-4xl mx-auto">
              <Trans>Keeps humans and AI in sync with your system</Trans>
            </p>
          </div>

          <InstallCommand variant="hero" />

          <p className="text-sm text-muted-foreground/80">
            <Trans>Open source</Trans> · <Trans>Apache 2.0 licensed</Trans> ·{" "}
            <a
              href="https://github.com/archcore-ai/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Star
                className="inline-block h-3.5 w-3.5 -mt-0.5 mr-1"
                fill="currentColor"
              />
              <Trans>Star on GitHub</Trans>
            </a>
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>Context Engineering</Trans>
            </Badge>
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>Works with all agents</Trans>
            </Badge>
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              MCP
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
