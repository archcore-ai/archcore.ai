import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

interface FAQSectionProps {
  onContactClick: () => void;
}

export function FAQSection({ onContactClick }: FAQSectionProps) {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`How is Archcore different from GitHub Copilot or Cursor?`),
      answer: _(msg`Copilot and Cursor generate code from patterns in public repos. Archcore ensures AI follows your specific architectural rules, decisions, and constraints. It's about governance, not just generation.`)
    },
    {
      question: _(msg`Do I need to rewrite our documentation?`),
      answer: _(msg`No. Archcore ingests existing ADRs, RFCs, docs, and code. You can start with what you have and gradually enhance coverage as you document new decisions.`)
    },
    {
      question: _(msg`What if we use local LLMs (not Claude/GPT)?`),
      answer: _(msg`Archcore works with Claude, GPT, and local models via Ollama or LM Studio. It's MCP-native, so any MCP-compatible AI tool can use your Architecture Record.`)
    },
    {
      question: _(msg`How long does setup take?`),
      answer: _(msg`30 minutes to deploy the binary. 1-2 days to ingest initial sources and configure connectors. Context building is incremental from there.`)
    },
    {
      question: _(msg`Can we control what context AI tools see?`),
      answer: _(msg`Yes. Context Packs let you define role-based access (e.g., junior devs see standards, seniors see ADRs). Audit logs track every AI query and retrieval.`)
    },
    {
      question: _(msg`What if we have legacy systems with no documentation?`),
      answer: _(msg`Start with code analysis and capture decisions as they're discovered. Archcore helps you build the record incrementally—you don't need perfect docs on day one.`)
    },
    {
      question: _(msg`Is Archcore SOC2 / ISO 27001 compliant?`),
      answer: _(msg`Compliance certifications are on our roadmap. Archcore is self-hosted, so you control the infrastructure and can map it to your existing compliance frameworks.`)
    }
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader
        title={_(msg`Frequently Asked Questions`)}
        description={_(msg`Common questions about Architecture Record and how Archcore works`)}
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
        <p className="text-muted-foreground mb-4"><Trans>Still have questions?</Trans></p>
        <Button onClick={onContactClick}><Trans>Contact Us</Trans></Button>
      </div>
    </SectionContainer>
  );
}
