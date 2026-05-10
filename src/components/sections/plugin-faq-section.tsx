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

export function PluginFAQSection() {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`Do I need to install the CLI separately?`),
      answer: _(
        msg`No. The plugin bundles a launcher that auto-resolves and caches the Archcore CLI on first tool call (~5s, one-time). If you already have archcore on PATH, the launcher defers to it.`
      ),
    },
    {
      question: _(msg`Which agents are supported?`),
      answer: _(
        msg`Claude Code (production), Cursor 2.5+ (implemented), and Codex CLI 0.117+ (implemented). GitHub Copilot is on the roadmap. For other MCP-capable agents, use the CLI directly.`
      ),
    },
    {
      question: _(msg`Can I use my own CLI install?`),
      answer: _(
        msg`Yes. Set ARCHCORE_BIN=/abs/path/to/archcore to point the plugin at your own binary, or ARCHCORE_SKIP_DOWNLOAD=1 to disable the auto-download — useful for offline or enterprise deployments.`
      ),
    },
    {
      question: _(msg`Where do my docs live?`),
      answer: _(
        msg`In .archcore/ inside your repository. Markdown with YAML frontmatter, versioned with your code. No external services, accounts, or databases.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq">
      <SectionHeader title={_(msg`Plugin FAQ`)} />

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
