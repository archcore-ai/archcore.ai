import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

export function CLIPillarsSection() {
  const { _ } = useLingui();
  const steps = [
    {
      title: _(msg`Create the context directory`),
      description: _(
        msg`archcore init creates .archcore/ for project documents and configuration.`
      ),
    },
    {
      title: _(msg`Connect your agents`),
      description: _(
        msg`Choose the agents to configure. The CLI writes their MCP configuration and installs hooks where supported.`
      ),
    },
    {
      title: _(msg`Add the plugin where available`),
      description: _(
        msg`For selected plugin hosts, init also installs the plugin. Cursor requires installation through its Plugins panel.`
      ),
    },
  ];
  return (
    <section id="how-it-works">
      <div id="problem">
        <h2>
          <Trans>What the CLI does</Trans>
        </h2>
        <p>
          <Trans>
            Run archcore init in your repository, then choose the agents you
            use.
          </Trans>
        </p>
      </div>
      <ol>
        {steps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}.</strong> {step.description}
          </li>
        ))}
      </ol>
    </section>
  );
}
