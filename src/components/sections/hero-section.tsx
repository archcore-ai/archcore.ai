import { Trans } from "@lingui/react/macro";
import { Star } from "lucide-react";
import { EntryPointCards } from "@/components/cta/entry-point-cards";
import { LINKS } from "@/lib/links";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative pt-28 lg:pt-32 pb-16 md:pb-20 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto">
        <div className="space-y-8 text-center">
          <h1 className="type-hero text-balance">
            <Trans>
              Turn your repository into structured,
              <br />
              machine-readable context.
            </Trans>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
            <Trans>
              So AI agents can follow your architecture, rules, and decisions
              — instead of guessing.
            </Trans>
          </p>

          <EntryPointCards />

          <div className="space-y-1 text-sm text-muted-foreground/70">
            <p>
              <Trans>
                Works with Claude Code, Cursor, Copilot, Gemini CLI, Codex CLI,
                and more
              </Trans>
            </p>
            <p>
              <Trans>Open source · Versioned in Git · Set up in minutes</Trans>
              {" · "}
              <a
                href={LINKS.cliRepo}
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
          </div>
        </div>
      </div>
    </section>
  );
}
