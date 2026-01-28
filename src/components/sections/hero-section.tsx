import { Check, Mail, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trans } from "@lingui/macro";

const DEMO_URL = "https://demo.archcore.ai";

interface HeroSectionProps {
  onContactClick?: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section id="top" className="hero-pattern relative py-12 pt-20 lg:pt-24 px-6 overflow-hidden">
      {/* Content layer */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="space-y-8 text-left">
          <div className="space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <Trans>One architectural context</Trans>
              <br />
              <Trans>for all AI tools</Trans>
            </h1>
            <p className="hero-description text-xl md:text-2xl lg:text-2xl leading-relaxed text-muted-foreground/90 max-w-4xl">
              <Trans>
                Archcore gathers architectural decisions from code, ADRs, and discussions, transforms them into an
                Architecture Record (versioned contract), and delivers it to IDEs/chats/agents via MCP — with traceable
                sources.
              </Trans>
            </p>

            {/* Measurable results bullets */}
            <div className="space-y-2 text-base">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <Trans>
                    Fewer PR iterations: AI considers module boundaries, patterns, and constraints before writing code.
                  </Trans>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <Trans>Faster onboarding: "why did we do this?" → answer + link to decision/ADR.</Trans>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <Trans>Safer code review: changes are validated against architectural constraints.</Trans>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop: Show both buttons */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="flex gap-3">
              <Button size="lg" onClick={onContactClick}>
                <Mail className="h-5 w-5 mr-2" />
                <Trans>Request Pilot</Trans>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  <Play className="h-5 w-5 mr-2" />
                  <Trans>Run demo</Trans>
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile: Show both buttons in a column */}
          <div className="flex lg:hidden flex-col gap-4 items-start">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  <Play className="h-5 w-5 mr-2" />
                  <Trans>Run demo</Trans>
                </a>
              </Button>
              <Button size="lg" onClick={onContactClick} className="w-full sm:w-auto">
                <Mail className="h-5 w-5 mr-2" />
                <Trans>Request Pilot</Trans>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <Trans>Demo is read-only. Creating/editing records available in self-hosted installation.</Trans>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-start">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>Self-hosted</Trans>
            </Badge>
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>Works with local LLMs</Trans>
            </Badge>
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Trans>MCP-native</Trans>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
