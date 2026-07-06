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
        msg`Instruction files are flat memory — one tool, one file. Archcore is structured: typed documents (ADR, rule, plan, guide, spec) with relations, versioned history, read and written during real work, and reused across every agent.`
      ),
    },
    {
      question: _(msg`I already have a CLAUDE.md or .cursor/rules. Do I start over?`),
      answer: _(
        msg`No. archcore init imports your existing instruction files — CLAUDE.md, AGENTS.md, .cursorrules, .cursor/rules/* — as structured documents, so the context you already wrote carries over.`
      ),
    },
    {
      question: _(msg`Which AI agents are supported?`),
      answer: _(
        msg`The plugin runs inside Claude Code, Cursor 2.5+, and Codex CLI 0.117+. The CLI works with any MCP-aware agent — GitHub Copilot, Gemini CLI, OpenCode, Roo Code, Cline — and is scriptable in CI.`
      ),
    },
    {
      question: _(msg`Does this eat my agent's context window?`),
      answer: _(
        msg`No. At session start the agent gets a compact index of your documents; full documents are pulled on demand over MCP — search, relations, single reads — not loaded wholesale.`
      ),
    },
    {
      question: _(msg`Does my code leave my machine?`),
      answer: _(
        msg`No. The plugin and CLI run fully local — no accounts, no telemetry, no external services. .archcore/ is plain markdown versioned in your Git repo.`
      ),
    },
    {
      question: _(msg`Do I need both the plugin and the CLI?`),
      answer: _(
        msg`No. The plugin runs on the CLI under the hood — install the plugin and you get both. Want just the core context layer? Install the CLI on its own.`
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
