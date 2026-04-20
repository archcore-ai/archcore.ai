import { msg } from "@lingui/core/macro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";

export function FAQSection() {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`Do I need both the plugin and the CLI?`),
      answer: _(
        msg`The plugin uses the CLI under the hood, so installing the plugin gives you both. If you only want the core context layer — .archcore/, MCP, hooks — install the CLI on its own.`
      ),
    },
    {
      question: _(msg`Which path should I start with — Plugin or CLI?`),
      answer: _(
        msg`Start with the Plugin if you use Claude Code or Cursor and want the best day-to-day experience. Start with CLI if you want the core directly — for custom agent flows, minimal setups, or agents that the plugin does not yet support.`
      ),
    },
    {
      question: _(msg`Which AI agents are supported?`),
      answer: _(
        msg`Plugin hosts: Claude Code (production) and Cursor (implemented). Copilot and Codex CLI are on the plugin roadmap. The CLI (with MCP and hooks) works with 8 agents today: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline.`
      ),
    },
    {
      question: _(msg`What does archcore init create?`),
      answer: _(
        msg`Creates .archcore/ with 18 document types in three layers: Vision (PRD, Idea, Plan, MRD, BRD, URD, BRS, StRS, SyRS, SRS), Knowledge (ADR, RFC, Rule, Guide, Doc, Spec), Experience (Task Type, CPAT). Each is markdown with YAML frontmatter, versioned with your code.`
      ),
    },
    {
      question: _(msg`How do hooks and MCP work together?`),
      answer: _(
        msg`Hooks inject context at session start automatically. MCP exposes tools (list, get, create, update) so agents can browse and edit .archcore/ documents during a session. Set up with archcore hooks install and archcore mcp install.`
      ),
    },
    {
      question: _(msg`Do I need any external services?`),
      answer: _(
        msg`No. Standalone CLI binary. Everything in .archcore/ inside your repo — no servers, databases, accounts, or external dependencies. Install with curl -fsSL https://archcore.ai/install.sh | bash or go install.`
      ),
    },
    {
      question: _(msg`How is this different from CLAUDE.md or AGENTS.md?`),
      answer: _(
        msg`Instruction files are flat, tool-specific, and weakly structured. Archcore gives you multiple document types, relations between them, versioned history, and reads and writes during real work — reusable across Claude Code, Cursor, Copilot, and other agents.`
      ),
    },
    {
      question: _(msg`How do I keep the CLI updated?`),
      answer: _(
        msg`archcore update self-updates to the latest version. Cross-platform (macOS, Linux, Windows) on amd64/arm64. Run archcore doctor anytime to verify setup and check for issues.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader title={_(msg`Frequently Asked Questions`)} />

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem key={faq.question} value={`item-${idx}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground [&_a]:!no-underline [&_a:hover]:!no-underline">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionContainer>
  );
}
