import { GuidePageLayout } from "@/components/guide-page-layout";
import { productCopy } from "@/data/product-copy";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { InstallCommand } from "@/components/cta/install-command";
import { PromoVideo } from "@/components/promo-video";
import { CYCLE_STAGES, INIT_COMMAND } from "@/content/how-to-use";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

export function HowToUsePage() {
  const { _ } = useLingui();
  const { plugin } = useGitHubStars();

  usePageMeta({
    title: _(msg`How to use Archcore`),
    description: _(productCopy.howToDescription),
    canonical: "/how-to-use/",
    ogImage: "/og-image-how-to-use.png",
  });

  return (
    <GuidePageLayout
      outline={[
        { id: "install", label: <Trans>Install Archcore</Trans> },
        {
          id: "cycle",
          label: <Trans>Use Archcore’s four skills in order</Trans>,
        },
        ...CYCLE_STAGES.map((stage, index) => ({
          id: stage.id,
          label: (
            <>
              {index + 1}. {stage.title}
            </>
          ),
        })),
      ]}
      cta={
        <section className="recipe-cta" data-analytics-cta="how_to_use_github">
          <div>
            <h2>
              <Trans>Explore Archcore on GitHub.</Trans>
            </h2>
            <p>
              <Trans>The CLI and the plugin live in one repository.</Trans>
            </p>
          </div>
          <div className="recipe-cta__actions">
            <a
              className="btn btn--primary"
              href={LINKS.org}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trans>View on GitHub →</Trans>
            </a>
          </div>
        </section>
      }
    >
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
            The install script adds the Archcore CLI and the plugin for Claude
            Code, Codex CLI, and GitHub Copilot CLI when their commands are on
            PATH. Then run archcore init in your project folder.
          </Trans>
        </p>
        <div className="guide-install">
          <InstallCommand
            variant="inline"
            surface="how_to_use_install"
            installTarget="cli"
          />
          <InstallCommand
            variant="inline"
            command={INIT_COMMAND}
            surface="how_to_use_install"
            installTarget="cli"
          />
        </div>
        <p>
          <Trans>
            During setup, choose the agents you use. Archcore connects them to
            the project through MCP and hooks. Cursor needs plugin setup in its
            Plugins panel.
          </Trans>
        </p>
        <p>
          <Trans>
            Already have a CLAUDE.md, AGENTS.md, or rule files? Run{" "}
            <code>/archcore:init import</code> in your agent to turn them into
            project documents.
          </Trans>
        </p>
      </section>

      <section id="cycle">
        <h2>
          <Trans>Use Archcore’s four skills in order</Trans>
        </h2>
        <p>
          <Trans>
            A skill is a set of instructions your agent follows for one job.
            Here, four skills help you add rate limiting to a public API: a cap
            on how often clients can call it.
          </Trans>
        </p>
        <figure className="my-6 grid gap-2">
          <PromoVideo />
          <figcaption className="text-sm leading-relaxed text-muted-foreground">
            <Trans>
              The recording runs the same plan, build, and review steps on a
              different feature: rescheduling a delivery.
            </Trans>
          </figcaption>
        </figure>
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
              {stage.altPrompt && <p>{stage.altPrompt}</p>}
            </blockquote>
            <p>{stage.result}</p>
            {stage.details}
          </section>
        ))}
        <p>
          <Trans>
            You do not need all four on every change. Each command also works
            alone: record a decision while you code, or review a branch that had
            no plan.
          </Trans>
        </p>
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

      {/* One link: the CLI and the plugin share archcore-ai/archcore since the
          2026-09-22 rename, so LINKS.cliRepo and LINKS.pluginRepo are equal. */}
      <p className="guide-repos">
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
          archcore-ai/archcore
        </a>
      </p>
    </GuidePageLayout>
  );
}
