import { msg } from "@lingui/core/macro";
import { FaqList } from "@/components/faq-list";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
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
        msg`No. The plugin and CLI run fully local: no accounts, no telemetry, no external services. .archcore/ is plain markdown versioned in your Git repo.`
      ),
    },
    {
      question: _(msg`Do I need both the plugin and the CLI?`),
      answer: _(
        msg`You install one thing. The plugin runs on the CLI, so the CLI comes first: archcore init wires your agents and installs the plugin on the hosts you pick (Claude Code, Cursor, Codex CLI, GitHub Copilot CLI). On any other MCP-aware agent the CLI is all there is to install.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader title={_(msg`Frequently Asked Questions`)} />

      <FaqList faqs={faqs} surface="home_faq" />
    </SectionContainer>
  );
}
