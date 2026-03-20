import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";
import { ThemedImage } from "@/components/themed-image";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function WorksWithAgentsSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer id="works-with-agents">
      <SectionHeader
        title={_(msg`Works with AI agents`)}
        description={_(
          msg`Archcore uses the MCP protocol to expose context to most popular AI tools. Claude Code, Cursor, Copilot — they all read from the same .archcore/ source of truth.`
        )}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 items-start">
        <div className="rounded-lg overflow-hidden">
          <ThemedImage
            lightSrc="/images/agents-mcp-light.png"
            darkSrc="/images/agents-mcp-dark.png"
            alt="MCP integration with AI agents"
            className="w-full rounded-lg integration-card-image"
            width={674}
            height={466}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-start space-y-4">
          <p className="text-base text-muted-foreground leading-relaxed">
            <Trans>
              Hooks inject context at session start automatically. MCP exposes
              tools so agents can browse and edit .archcore/ documents during a
              session. Auto-detects installed agents.
            </Trans>
          </p>
          <div>
            <a
              href="https://github.com/archcore-ai/cli/tree/main?tab=readme-ov-file#supported-agents"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Trans>See full list of supported agents</Trans>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
