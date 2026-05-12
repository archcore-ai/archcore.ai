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
        msg`Yes — one global install. Run curl -fsSL https://archcore.ai/install.sh | bash (or the PowerShell equivalent on Windows), then add the plugin. MCP launches archcore from your PATH.`
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
        msg`Yes — the plugin always uses whichever archcore is on your PATH. Install it however you like (curl, PowerShell, build from source) — see https://docs.archcore.ai/cli/install/.`
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
