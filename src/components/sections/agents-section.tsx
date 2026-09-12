import { Trans } from "@lingui/react/macro";
import { RailSection } from "@/components/sections/rail-section";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Cross-agent support, stated in prose rather than as a wall of chips.
 *
 * This is a summary, not a matrix. The single source for CLI agent support is
 * cli-agents-section.tsx on /cli, and for plugin hosts it is
 * plugin-hosts-section.tsx on /plugin (.archcore/messaging-alignment.rule.md).
 * Names listed here must appear there; wiring details must not be restated.
 *
 * This section also carries the context-engineering term and its link, because
 * this is where the home page says how context reaches an agent: hooks where
 * the host supports them, MCP everywhere else. Copilot has no pre-write
 * injection, so the claim stays about what Archcore does and the per-host
 * truth stays on the two matrix pages.
 */
export function AgentsSection() {
  return (
    <RailSection
      id="cross-agent"
      heading={<Trans>Every agent reads the same folder</Trans>}
      aside={
        <p className="grid gap-1 text-sm leading-relaxed text-muted-foreground">
          <a
            href={INTERNAL_LINKS.contextEngineering}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            <Trans>Context engineering for AI coding agents</Trans>
          </a>
          <a
            href={INTERNAL_LINKS.specDrivenDevelopment}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            <Trans>Spec-driven development for AI coding agents</Trans>
          </a>
        </p>
      }
    >
      <p className="max-w-[70ch] text-base leading-relaxed text-muted-foreground">
        <Trans>
          Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, OpenCode,
          Roo Code, and Cline. Slash commands, skills, and guardrails run inside
          the first four; the rest reach the same documents over MCP. Where the
          host supports hooks, they arrive before the edit with no command from
          you.
        </Trans>
      </p>

      <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
        <Trans>Setting up a specific agent?</Trans>{" "}
        {[
          { label: "Claude Code", href: INTERNAL_LINKS.claudeCode },
          { label: "Cursor", href: INTERNAL_LINKS.cursor },
          { label: "Codex CLI", href: INTERNAL_LINKS.codex },
          { label: "GitHub Copilot", href: INTERNAL_LINKS.githubCopilot },
          { label: "Gemini CLI", href: INTERNAL_LINKS.geminiCli },
        ].map((page, index) => (
          <span key={page.href}>
            {index > 0 && <span aria-hidden="true"> · </span>}
            <a
              href={page.href}
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              {page.label}
            </a>
          </span>
        ))}
      </p>
    </RailSection>
  );
}
