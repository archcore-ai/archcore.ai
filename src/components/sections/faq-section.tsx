import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { FaqList } from "@/components/faq-list";
import { RailSection } from "@/components/sections/rail-section";
import { useLingui } from "@lingui/react";

export function FAQSection() {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`How is this different from CLAUDE.md or AGENTS.md?`),
      answer: _(
        msg`Instruction files are flat memory: one tool, one file. Archcore is structured. It stores typed documents (ADR, rule, plan, guide, spec) with relations and versioned history, read and written during real work, and reused across every agent.`
      ),
    },
    {
      question: _(
        msg`I already have a CLAUDE.md or .cursor/rules. Do I start over?`
      ),
      answer: _(
        msg`No. archcore init imports your existing instruction files (CLAUDE.md, AGENTS.md, .cursorrules, .cursor/rules/*) as structured documents, so the context you already wrote carries over.`
      ),
    },
    {
      question: _(msg`Which AI agents are supported?`),
      answer: _(
        msg`The plugin runs inside Claude Code, Cursor 2.5+, Codex CLI 0.117+, and GitHub Copilot CLI. The CLI works with any MCP-aware agent: those four plus Gemini CLI, OpenCode, Roo Code, and Cline. It is also scriptable in CI.`
      ),
    },
    {
      question: _(msg`Does this eat my agent's context window?`),
      answer: _(
        msg`No. At session start the agent gets a compact index of your documents. Full documents are pulled on demand over MCP, through search, relations, and single reads, instead of being loaded wholesale.`
      ),
    },
    {
      question: _(msg`Does my code leave my machine?`),
      answer: _(
        msg`Archcore stores project documents locally in .archcore/. Your coding agent may send document excerpts to its model provider. Install and update analytics contain version and platform information, not your project content. See the privacy policy for details and opt-out options.`
      ),
    },
    {
      question: _(msg`Do I need both the plugin and the CLI?`),
      answer: _(
        msg`The install script adds the CLI and the plugin for Claude Code, Codex CLI, and GitHub Copilot CLI when their commands are on PATH. Run archcore init in each project where you want MCP tools and hooks. Cursor still needs plugin setup in its UI.`
      ),
    },
  ];

  return (
    <RailSection
      id="faq"
      heading={<Trans>Frequently Asked Questions</Trans>}
    >
      <FaqList faqs={faqs} surface="home_faq" className="w-full" />
    </RailSection>
  );
}
