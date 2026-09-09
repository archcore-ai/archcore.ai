import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { FaqList } from "@/components/faq-list";

export function PluginFAQSection() {
  const { _ } = useLingui();

  const faqs = [
    {
      question: _(msg`Do I need to install the CLI separately?`),
      answer: _(
        msg`Yes. The plugin calls archcore from your PATH; it does not download the CLI. Install the CLI once, then follow the host-specific steps above.`
      ),
    },
    {
      question: _(msg`Which agents are supported?`),
      answer: _(
        msg`Claude Code, Cursor 2.5+, Codex CLI 0.117+, and GitHub Copilot CLI. Cursor needs MCP registration; Copilot needs project-level wiring. The host table above explains these differences.`
      ),
    },
    {
      question: _(msg`What are the plugin's commands?`),
      answer: _(
        msg`/archcore:init, /archcore:plan, /archcore:document, and /archcore:review. They cover setup, planning, recording decisions, and checking changes. You can also ask in plain language.`
      ),
    },
    {
      question: _(msg`Can I use my own CLI install?`),
      answer: _(
        msg`Yes. Put your chosen archcore binary on PATH before starting the coding agent. You can use an installed release or a build from source.`
      ),
    },
    {
      question: _(msg`Where do my docs live?`),
      answer: _(
        msg`In .archcore/ inside your repository, as Markdown with YAML frontmatter. You review and commit them with your code. Your coding agent's provider settings govern any context it sends to its model.`
      ),
    },
  ];

  return (
    <section id="faq">
      <h2>{_(msg`Plugin FAQ`)}</h2>

      <FaqList faqs={faqs} surface="plugin_faq" />
    </section>
  );
}
