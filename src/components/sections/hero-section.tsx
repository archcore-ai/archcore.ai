import { Trans } from "@lingui/react/macro";
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
              <Trans>Every codebase has unwritten rules.</Trans>
              <br />
              <Trans>Now they're written.</Trans>
            </h1>
            <p className="hero-description text-lg md:text-xl lg:text-xl leading-relaxed text-muted-foreground/90 max-w-4xl mx-auto">
              <Trans>
                Archcore captures decisions, rules, and guides as structured
                documents in .archcore/ — a knowledge base that every AI tool
                reads via MCP.
              </Trans>
            </p>
          </div>

          <InstallCommand variant="hero" />

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>Open Source</Trans>
            </Badge>
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>Works with all agents</Trans>
            </Badge>
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              MCP-native
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
