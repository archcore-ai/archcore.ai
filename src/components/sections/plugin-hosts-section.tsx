import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function PluginHostsSection() {
  const { _ } = useLingui();
  const hosts = [
    {
      name: "Claude Code",
      detail: _(msg`The plugin registers MCP automatically.`),
    },
    {
      name: "Cursor 2.5+",
      detail: _(
        msg`Install in the Plugins panel, then register MCP for your project.`
      ),
    },
    {
      name: "Codex CLI 0.117+",
      detail: _(
        msg`MCP registration is automatic. Hook availability depends on the installed Codex version and its hooks setting.`
      ),
    },
    {
      name: "GitHub Copilot CLI",
      detail: _(
        msg`Run archcore init --agent copilot in each project to connect MCP. VS Code agent mode does not load this plugin.`
      ),
    },
  ];
  return (
    <section id="hosts">
      <h2>
        <Trans>Check your agent’s setup requirements</Trans>
      </h2>
      <p>
        <Trans>
          The plugin runs in four hosts. MCP registration and hooks differ
          between them.
        </Trans>
      </p>
      <dl className="product-support-list">
        {hosts.map((host) => (
          <div key={host.name}>
            <dt>{host.name}</dt>
            <dd>{host.detail}</dd>
          </div>
        ))}
      </dl>
      <div className="product-resource-links">
        <a href={INTERNAL_LINKS.cli}>
          <Trans>Using another MCP agent? See the CLI</Trans> →
        </a>
        <a
          href={LINKS.docsSupportedHosts}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Trans>Full host matrix</Trans> ↗
        </a>
      </div>
    </section>
  );
}
