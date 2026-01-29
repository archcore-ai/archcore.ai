import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";

interface FAQSectionProps {
  onContactClick: () => void;
}

export function FAQSection({ onContactClick }: FAQSectionProps) {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(
        msg`Can I use Archcore directly in VSCode or JetBrains IDEs?`
      ),
      answer: _(
        msg`Yes, Archcore search and chat can be integrated with both VSCode and JetBrains IDEs via MCP. This allows you to interact with your Architecture Record directly from your preferred development environment.`
      ),
    },
    {
      question: _(
        msg`Can Archcore be deployed on-premises for my organization?`
      ),
      answer: _(
        msg`Yes, you can deploy Archcore entirely within your infrastructure and even use your own LLM providers for greater flexibility. This option allows you to maintain complete confidentiality and security of your Architecture Record. Available only for enterprise customers—contact us for more information.`
      ),
    },
    {
      question: _(
        msg`Can I use Archcore with local LLMs instead of cloud providers?`
      ),
      answer: _(
        msg`Yes, Archcore is compatible with local LLMs such as Llama 3, Qwen 2, and others via Ollama or LM Studio. It's MCP-native, so any MCP-compatible AI tool can access your Architecture Record while keeping everything on-premises.`
      ),
    },
    {
      question: _(msg`Does Archcore integrate with AI agents via MCP?`),
      answer: _(
        msg`Yes, Archcore can be integrated with AI agents via MCP. This allows you to connect Cursor, Claude Code, and other tools to the Archcore platform, enriching your project context with deep knowledge of architectural decisions and constraints.`
      ),
    },
    {
      question: _(msg`Do I need to rewrite our existing documentation?`),
      answer: _(
        msg`No. Archcore ingests existing ADRs, RFCs, documentation, and code. You can start with what you have and gradually enhance coverage as you document new architectural decisions.`
      ),
    },
    {
      question: _(
        msg`How is Archcore different from GitHub Copilot or Cursor?`
      ),
      answer: _(
        msg`Copilot and Cursor generate code from patterns in public repositories. Archcore ensures AI follows your specific architectural rules, decisions, and constraints. It's about governance and consistency, not just code generation.`
      ),
    },
    {
      question: _(msg`Can we control what context AI tools can access?`),
      answer: _(
        msg`Yes. Context Packs let you define role-based access (e.g., junior developers see coding standards, seniors see ADRs and strategic decisions). Audit logs track every AI query and context retrieval for compliance.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader
        title={_(msg`Frequently Asked Questions`)}
        // description={_(msg`Common questions about Architecture Record and how Archcore works`)}
      />

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          <Trans>Still have questions?</Trans>
        </p>
        <Button onClick={onContactClick}>
          <Trans>Contact Us</Trans>
        </Button>
      </div>
    </SectionContainer>
  );
}
