import { Trans } from "@lingui/react/macro";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function MigrationSection() {
  return (
    <section id="migrate">
      <h2>
        <Trans>Keep the instructions you already use</Trans>
      </h2>
      <p>
        <Trans>
          Keep CLAUDE.md, AGENTS.md, .cursor/rules, and docs/. Ask your agent to
          turn a useful section into an Archcore document, then review the
          result.
        </Trans>
      </p>
      <blockquote>
        <p>
          <Trans>
            “Turn the database decision in CLAUDE.md into an Archcore ADR.”
          </Trans>
        </p>
      </blockquote>
      <div className="product-resource-links">
        <a href={LINKS.docsMigrate} target="_blank" rel="noopener noreferrer">
          <Trans>Migration guide</Trans> ↗
        </a>
        <a href={INTERNAL_LINKS.repoMemory}>
          <Trans>What is repo memory?</Trans> →
        </a>
      </div>
    </section>
  );
}
