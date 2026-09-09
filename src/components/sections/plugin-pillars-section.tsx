import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { LINKS } from "@/lib/links";

export function PluginPillarsSection() {
  const { _ } = useLingui();
  const commands = [
    {
      command: "/archcore:init",
      outcome: _(
        msg`Read the repository and create its initial project documents.`
      ),
    },
    {
      command: "/archcore:plan",
      outcome: _(msg`Scope a feature or refactor before implementation.`),
    },
    {
      command: "/archcore:document",
      outcome: _(msg`Record a decision or document existing code.`),
    },
    {
      command: "/archcore:review",
      outcome: _(
        msg`Check the branch against recorded decisions and rules. Flag stale documents too.`
      ),
    },
  ];
  return (
    <section id="how-it-works">
      <h2>
        <Trans>What the plugin adds</Trans>
      </h2>
      <p>
        <Trans>
          Ask in plain language, or use these four shortcuts in order: init,
          plan, document, review.
        </Trans>
      </p>
      <ol>
        {commands.map((row) => (
          <li key={row.command}>
            <code>{row.command}</code>
            <p>{row.outcome}</p>
          </li>
        ))}
      </ol>
      <section id="problem">
        <h3>
          <Trans>Context between commands</Trans>
        </h3>
        <p>
          <Trans>
            Session hooks provide a recap of project decisions and work in
            progress. On hosts with pre-write hooks, applicable rules and specs
            arrive before edits. Other hosts read project context through MCP.
          </Trans>
        </p>
      </section>
      <div className="product-resource-links">
        <a
          href="https://docs.archcore.ai/plugin/install/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Trans>Plugin docs</Trans> ↗
        </a>
        <a href={LINKS.pluginRepo} target="_blank" rel="noopener noreferrer">
          <Trans>Plugin repo</Trans> ↗
        </a>
      </div>
    </section>
  );
}
