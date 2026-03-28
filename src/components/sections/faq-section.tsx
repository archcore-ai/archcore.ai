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
        msg`Creates .archcore/ directory with 18 document types in three layers: Vision (PRD, Idea, Plan, MRD, BRD, URD, BRS, StRS, SyRS, SRS), Knowledge (ADR, RFC, Rule, Guide, Doc, Spec), Experience (Task Type, CPAT). Each is markdown with YAML frontmatter. Version-controlled with your code.`
      ),
    },
    {
      question: _(msg`Which AI agents does it support?`),
      answer: _(
        msg`8 agents: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline. Hooks (session start injection) for Claude Code/Cursor/Gemini CLI/GitHub Copilot. MCP (document tools) for all 8. Auto-detects installed agents.`
      ),
    },
    {
      question: _(msg`How do hooks and MCP work together?`),
      answer: _(
        msg`Hooks inject context at session start automatically. MCP exposes tools (list, get, create, update) so agents can browse/edit .archcore/ docs during a session. Set up with archcore hooks install and archcore mcp install.`
      ),
    },
    {
      question: _(msg`Do I need any external services?`),
      answer: _(
        msg`No. Standalone CLI binary. Everything in .archcore/ inside your repo — no servers, databases, accounts, or external dependencies. Install with curl -fsSL https://archcore.ai/install.sh | bash or go install.`
      ),
    },
    {
      question: _(msg`What document types are supported?`),
      answer: _(
        msg`18 types across three layers. Vision: PRD, Idea, Plan, MRD, BRD, URD, and ISO 29148 types. Knowledge: ADR, RFC, Rule, Guide, Doc, Spec. Experience: Task Type, CPAT. Markdown with YAML frontmatter (title, status), parseable by both humans and AI.`
      ),
    },
    {
      question: _(msg`How is this different from plain markdown?`),
      answer: _(
        msg`Plain markdown lacks consistent structure for AI parsing. Archcore docs have typed YAML frontmatter, semantic categories, and validation via archcore validate and archcore doctor. MCP tools use this structure to deliver relevant context — not raw text dumps.`
      ),
    },
    {
      question: _(msg`How do I keep the CLI updated?`),
      answer: _(
        msg`archcore update self-updates to latest version. Cross-platform (macOS, Linux, Windows) on amd64/arm64. Run archcore doctor anytime to verify setup and check for issues.`
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
