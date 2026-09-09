import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function CLIAgentsSection() {
  const { _ } = useLingui();
  const agents = [
    {
      name: "Claude Code · Cursor · Gemini CLI",
      detail: _(msg`MCP and session hooks.`),
    },
    {
      name: "Codex CLI",
      detail: _(
        msg`MCP and hooks. Check your Codex version, trust the project, and approve hooks before relying on them.`
      ),
    },
    {
      name: "GitHub Copilot CLI",
      detail: _(
        msg`MCP and session hooks. Pre-write context injection is not available.`
      ),
    },
    {
      name: "OpenCode · Roo Code",
      detail: _(msg`MCP configuration through the CLI.`),
    },
    { name: "Cline", detail: _(msg`Manual MCP configuration.`) },
  ];
  return (
    <section id="agents">
      <h2>
        <Trans>Connect the agents your team uses</Trans>
      </h2>
      <p>
        <Trans>
          All eight agents below can read the same project documents through
          MCP. Hook support varies by host.
        </Trans>
      </p>
      <dl className="product-support-list">
        {agents.map((agent) => (
          <div key={agent.name}>
            <dt>{agent.name}</dt>
            <dd>{agent.detail}</dd>
          </div>
        ))}
      </dl>
      <div className="product-resource-links">
        <a
          href={LINKS.docsAgentIntegrations}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Trans>Per-agent setup</Trans> ↗
        </a>
        <a href={INTERNAL_LINKS.plugin}>
          <Trans>See what the plugin adds</Trans> →
        </a>
      </div>
    </section>
  );
}
