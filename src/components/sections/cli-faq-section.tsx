import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { FaqList } from "@/components/faq-list";

export function CLIFAQSection() {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`What does archcore init create?`),
      answer: _(
        msg`It creates .archcore/ and configures the agents you select. Project documents are created through MCP or with the plugin's skills.`
      ),
    },
    {
      question: _(msg`Which AI agents does the CLI support?`),
      answer: _(
        msg`Claude Code, Cursor, Codex CLI, GitHub Copilot CLI, Gemini CLI, OpenCode, Roo Code, and Cline. Cline needs manual MCP setup. Hook support differs by host; see the agent list above.`
      ),
    },
    {
      question: _(msg`Do I need any external services?`),
      answer: _(
        msg`Archcore stores project documents locally and runs an MCP server on your machine. It needs no hosted Archcore backend. Your coding agent's own provider and data settings still apply.`
      ),
    },
    {
      question: _(msg`What does the plugin add?`),
      answer: _(
        msg`The plugin adds skills for setup, planning, documentation, and review on Claude Code, Cursor, Codex CLI, and GitHub Copilot CLI. It uses the same CLI and project documents. Other MCP agents use the CLI directly.`
      ),
    },
  ];

  return (
    <section id="faq">
      <h2>{_(msg`CLI FAQ`)}</h2>

      <FaqList faqs={faqs} surface="cli_faq" />
    </section>
  );
}
