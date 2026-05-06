import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";

export function CLIFAQSection() {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`What does archcore init create?`),
      answer: _(
        msg`A .archcore/ directory with templates and config for 18 document types in three layers — vision (PRD, idea, plan, MRD, BRD, URD, BRS, StRS, SyRS, SRS), knowledge (ADR, RFC, rule, guide, doc, spec), and experience (task-type, CPAT).`
      ),
    },
    {
      question: _(msg`Which AI agents does the CLI support?`),
      answer: _(
        msg`Eight today via MCP and session hooks: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, and Cline. Run archcore mcp install or archcore hooks install to wire each one up.`
      ),
    },
    {
      question: _(msg`Do I need any external services?`),
      answer: _(
        msg`No. Standalone binary. Everything in .archcore/ stays in your repo — no servers, databases, accounts, or external dependencies.`
      ),
    },
    {
      question: _(msg`Should I install the plugin instead?`),
      answer: _(
        msg`If you use Claude Code or Cursor, yes — the plugin uses the CLI under the hood and gives you intent-based slash commands. Install the CLI on its own when you want the raw context layer or work with another MCP-capable agent.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader title={_(msg`CLI FAQ`)} />

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
