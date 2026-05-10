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
      question: _(msg`How is this different from CLAUDE.md or AGENTS.md?`),
      answer: _(
        msg`Instruction files are flat memory — one tool, one file. Archcore is structured: multiple document types (ADR, rule, plan, guide, spec), relations between them, versioned history, read and written during real work, and reusable across Claude Code, Cursor, Copilot, and other agents.`
      ),
    },
    {
      question: _(msg`Which AI agents are supported?`),
      answer: _(
        msg`Plugin: Claude Code (production), Cursor 2.5+, and Codex CLI 0.117+ (all implemented). GitHub Copilot is on the roadmap. The CLI works with 8 agents today via MCP and hooks: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline.`
      ),
    },
    {
      question: _(msg`Do I need any external services?`),
      answer: _(
        msg`No. Standalone CLI binary, everything stored in .archcore/ inside your repo. No servers, no databases, no accounts.`
      ),
    },
    {
      question: _(msg`Do I need both the plugin and the CLI?`),
      answer: _(
        msg`The plugin uses the CLI under the hood, so installing the plugin gives you both. If you only want the core context layer — .archcore/, MCP, hooks — install the CLI on its own.`
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
