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
      question: _(msg`What does archcore init create?`),
      answer: _(
        msg`It creates a .archcore/ directory in your repo with structured categories: vision, knowledge, and experience. Inside you'll find markdown documents organized by type — ADRs, rules, guides, RFCs, and more. Everything is version-controlled with your code.`
      ),
    },
    {
      question: _(msg`How does it work with Claude Code?`),
      answer: _(
        msg`Run archcore hooks install to auto-configure Claude Code hooks. These hooks inject your architectural context at session start and suggest creating ADRs when you make decisions. Claude Code can also query .archcore/ directly via the MCP server.`
      ),
    },
    {
      question: _(msg`Does it work with other editors?`),
      answer: _(
        msg`Yes. archcore mcp starts an MCP server that exposes your docs to any AI tool supporting the Model Context Protocol — that's 30+ editors including Cursor, VS Code, Windsurf, Zed, and more.`
      ),
    },
    {
      question: _(msg`Do I need a server or database?`),
      answer: _(
        msg`No. Archcore is a CLI tool. Everything lives in .archcore/ inside your repo. No servers, no databases, no accounts, no Docker. Just files in your repository.`
      ),
    },
    {
      question: _(msg`What document types are supported?`),
      answer: _(
        msg`11 built-in templates: ADR (Architecture Decision Record), RFC, Rule, Guide, PRD (Product Requirements), Plan, Doc, Idea, CPAT (Corrective/Preventive Action), and more. Each has a structured markdown format with frontmatter for metadata and code path linking.`
      ),
    },
    {
      question: _(
        msg`How is this different from plain markdown files?`
      ),
      answer: _(
        msg`Plain markdown has no structure AI can reliably parse. Archcore documents have typed frontmatter, code path links, and semantic categories. The MCP server uses this structure to deliver precisely relevant context to AI tools — not just raw text dumps.`
      ),
    },
    {
      question: _(msg`Is it open source?`),
      answer: _(
        msg`Yes. The CLI, templates, hooks, and MCP server are all open source. Your architectural knowledge stays in your repo. Optional cloud sync is coming for teams who want to share across projects.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader
        title={_(msg`Frequently Asked Questions`)}
      />

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
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
