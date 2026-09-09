import { Trans } from "@lingui/react/macro";

export function CLIRepoLayoutSection() {
  return (
    <section id="what-you-get">
      <h2>
        <Trans>Project documents you can review in Git</Trans>
      </h2>
      <p>
        <Trans>
          Documents are Markdown files with YAML frontmatter. You choose their
          folders; each agent keeps its own MCP configuration.
        </Trans>
      </p>
      <figure className="product-file-example">
        <figcaption>
          <Trans>Example project documents</Trans>
        </figcaption>
        <pre>
          <code>{`.archcore/
├─ auth/
│  ├─ rate-limits.adr.md
│  └─ api-errors.rule.md
└─ release-checklist.guide.md`}</code>
        </pre>
      </figure>
    </section>
  );
}
