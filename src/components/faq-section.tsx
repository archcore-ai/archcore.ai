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
        msg`How can I use Archcore in code editors?`
      ),
      answer: _(
        msg`Deployed Archcore system connects to any AI agent that supports MCP (Model Context Protocol). Nearly every editor or terminal allows you to run AI agents for your tasks: Cursor, VSCode, Warp, and others.`
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
        msg`Yes, Archcore is compatible with local LLMs such as Llama 3, Qwen 2, and others via Ollama or LM Studio. You can flexibly configure embeddings and chat with different models separately.`
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
        msg`Not required. Archcore focuses on technical details - it's closer to source code and infrastructure. You can use it as another system, but exclusively for technical tasks. However, the system doesn't limit you and has sufficient functionality to keep documentation entirely within it, considering the limitations of our layers and the specifics of its purpose.`
      ),
    },
    {
      question: _(
        msg`How is Archcore different from GitHub Copilot or Cursor?`
      ),
      answer: _(
        msg`Copilot, Cursor, Claude, and other AI agents generate code from patterns in public repositories. Archcore serves as a context source and complements the AI agent's knowledge. In other words, Archcore is the persistent memory of your project.`
      ),
    },
    {
      question: _(msg`Can we control what context AI tools can access?`),
      answer: _(
        msg`Yes. When connecting your system via MCP, you can specify specific projects you want to work with. Additionally, we can refine context with tags for filtering.`
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
            <AccordionContent className="text-muted-foreground [&_a]:!no-underline [&_a:hover]:!no-underline">
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
