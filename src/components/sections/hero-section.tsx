import { Trans } from "@lingui/react/macro";
import { Star } from "lucide-react";
import { InstallCommand } from "@/components/cta/install-command";

export function HeroSection() {
  return (
    <section
      id="top"
      className="hero-pattern relative pt-28 lg:pt-32 pb-16 md:pb-20 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="space-y-8 text-center">
          <p className="text-sm md:text-base text-muted-foreground/90">
            <Trans>
              Archcore brings context engineering into the codebase.
            </Trans>
          </p>

          <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            <Trans>
              Shared architectural memory
              <br />
              for AI coding agents
            </Trans>
          </h1>

          <p className="hero-description text-lg md:text-xl leading-relaxed text-muted-foreground/90 max-w-4xl mx-auto">
            <Trans>
              Keep decisions, rules, plans, and experience in your repo so AI
              coding agents stop starting from scratch.
            </Trans>
          </p>

          <InstallCommand variant="hero" />

          <div className="space-y-1 text-sm text-muted-foreground/70">
            <p>
              <Trans>
                Works with Claude Code, Cursor, Copilot, Gemini CLI, Codex CLI,
                and more
              </Trans>
            </p>
            <p>
              <Trans>Open source · Version-controlled · Setup in minutes</Trans>
              {" · "}
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
          </div>
        </div>
      </div>
    </section>
  );
}
