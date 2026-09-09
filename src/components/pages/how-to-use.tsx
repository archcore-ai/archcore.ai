import { productCopy } from "@/data/product-copy";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { InstallCommand } from "@/components/cta/install-command";
import { CYCLE_STAGES, INSTALL_COMMANDS } from "@/content/how-to-use";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

export function HowToUsePage() {
  const { _ } = useLingui();
  const { cli, plugin } = useGitHubStars();

  usePageMeta({
    title: _(msg`How to use Archcore`),
    description: _(productCopy.howToDescription),
    canonical: "/how-to-use/",
    ogImage: "/og-image-how-to-use.png",
  });

  return (
    <main id="main-content" className="page page--reading page--with-toc">
      <article className="article how-to-guide" id="top">
        <h1>
          <Trans>How to use Archcore</Trans>
        </h1>
        <p>{_(productCopy.howToDescription)}</p>

        <section id="install">
          <h2>
            <Trans>Install Archcore</Trans>
          </h2>
          <p>
            <Trans>
              Run these commands in your project folder to install Archcore and
              connect your coding agent.
            </Trans>
          </p>
          <div className="guide-install">
            {INSTALL_COMMANDS.map((command) => (
              <InstallCommand
                key={command}
                variant="inline"
                command={command}
                surface="how_to_use_install"
                installTarget="cli"
              />
            ))}
          </div>
          <p>
            <Trans>
              During setup, choose the agents you use. Archcore configures their
              connection to the project.
            </Trans>
          </p>
        </section>

        <section id="cycle">
          <h2>
            <Trans>Use Archcore’s four skills in order</Trans>
          </h2>
          <p>
            <Trans>
              A skill is a workflow your agent follows for a specific job. Here,
              four skills help you add rate limiting to a public API: a cap on
              how often clients can call it.
            </Trans>
          </p>
          <p>
            <Trans>
              Ask your agent using the example prompt, or run the slash command
              shown below. The commands work in Claude Code, Cursor, Codex CLI,
              and Copilot. Other agents access Archcore through MCP.
            </Trans>
          </p>
          {CYCLE_STAGES.map((stage, index) => (
            <section id={stage.id} key={stage.id}>
              <h3>
                {index + 1}. {stage.title}
              </h3>
              <p>
                <code>{stage.skill}</code>
              </p>
              <blockquote>
                <p>{stage.prompt}</p>
              </blockquote>
              <p>{stage.result}</p>
            </section>
          ))}
          <p>
            <Trans>
              While you code, supported hooks bring relevant specs and decisions
              to your agent. At the start of a session, they provide a recap of
              decisions and work in progress. Other agents can read the same
              documents through MCP.
            </Trans>
          </p>
          <p>
            <Trans>
              The next feature starts with the context you have already saved.
              Your specs and decisions stay in Git alongside the code.
            </Trans>
          </p>
        </section>

        <p className="guide-repos">
          <a
            href={LINKS.cliRepo}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-handled
            onClick={() =>
              track("github_star_clicked", {
                repo: "cli",
                stars: cli,
                surface: "star_cta_section",
              })
            }
          >
            archcore-ai/cli
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href={LINKS.pluginRepo}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-handled
            onClick={() =>
              track("github_star_clicked", {
                repo: "plugin",
                stars: plugin,
                surface: "star_cta_section",
              })
            }
          >
            archcore-ai/plugin
          </a>
        </p>
      </article>
      <section className="recipe-cta" data-analytics-cta="back_to_install">
        <div>
          <h2>
            <Trans>Start with Archcore.</Trans>
          </h2>
          <p>
            <Trans>Keep your project decisions ready for the next task.</Trans>
          </p>
        </div>
        <div className="recipe-cta__actions">
          <a className="btn btn--primary" href="#install">
            <Trans>Install Archcore →</Trans>
          </a>
          <a href="#cycle">
            <Trans>See how it works</Trans>
          </a>
        </div>
      </section>
      <nav className="article-toc" aria-label={_(msg`On this page`)}>
        <p className="pillar-toc__label">
          <Trans>On this page</Trans>
        </p>
        <ul>
          <li>
            <a href="#install">
              <Trans>Install Archcore</Trans>
            </a>
          </li>
          <li>
            <a href="#cycle">
              <Trans>Use Archcore’s four skills in order</Trans>
            </a>
          </li>
          {CYCLE_STAGES.map((stage, index) => (
            <li key={stage.id}>
              <a href={`#${stage.id}`}>
                {index + 1}. {stage.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
