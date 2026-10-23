import { Trans } from "@lingui/react/macro";
import { InstallCommand } from "@/components/cta/install-command";
import { LINKS } from "@/lib/links";

/**
 * H1, then two sentences beside the install commands.
 *
 * The two sentences are the point of this revision. The H1 is the category
 * line, which is what a search engine needs and what a first-time reader
 * cannot decode: "spec-driven development", "context engineering", and
 * "git-native context layer" all describe the product to someone who already
 * knows the category. A visitor read the shipped page and said he could not
 * tell what it was or what it gave him. So the first sentence says what
 * Archcore is in words that need no glossary, and the second says what changes
 * because of it. See .archcore/landing/home-plain-language-rail.adr.md.
 *
 * The install block is one path, not a choice. It carried a Plugin / CLI tab
 * pair until 2026-08-27: two tabs asked the reader to decide between two
 * things before they knew what either was, and the Plugin tab was the
 * incomplete one, since the plugin invokes `archcore` from PATH and never
 * fetches it. The platform installer now adds plugins for supported host
 * CLIs already on PATH. `archcore init` sets up a repository later.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="hero-section relative page-hero site-gutters overflow-hidden pb-6 md:pb-8"
    >
      <div className="relative z-10 mx-auto grid max-w-[var(--container-max)] gap-7">
        {/* Full container width. It was capped at 21ch, which wrapped the
            line to three and left the right half of the hero empty. */}
        <h1 className="type-hero text-balance">
          <Trans>
            Spec-Driven Development &amp; Context Engineering
            <br />
            for AI Coding Agents
          </Trans>
        </h1>

        <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-x-14">
          <div className="grid content-start gap-3.5">
            <p className="text-xl font-medium leading-snug md:text-[23px]">
              <Trans>
                Archcore keeps your project's decisions, specs, and rules in the
                repo.
              </Trans>
            </p>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              <Trans>
                Your coding agent reads them before it writes, so it builds by
                this repo's rules instead of the ones it happens to know.
              </Trans>
            </p>
          </div>

          <div className="grid min-w-0 content-start gap-3" id="install">
            {/* A command scrolls rather than wrapping: the default break-all
                split `install.sh` across two lines on a phone. `min-w-0` keeps
                the no-wrap line from widening the grid track past the viewport,
                which it did at 768px, clipped by the section's overflow-hidden
                and invisible to the build. */}
            <InstallCommand
              variant="inline"
              surface="home_hero_install"
              className="min-w-0 overflow-x-auto whitespace-nowrap break-normal"
            />
            {/* The per-host plugin path, the one link the rule allows under
                the install command. Same wording as the docs install page. */}
            <a
              href={LINKS.docsInstallPerHost}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-self-start text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              <Trans>Or install from your AI agent</Trans> ↗
            </a>

          </div>
        </div>

        {/* Under both columns, not inside the install one. Kept there, the
            right column ran 80px past the left and the two stopped reading as
            one row. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          {/* Shortened on 2026-09-12: the sentence form ran two lines in the
              hero. The host list and the trust strip are the two canonical
              pieces; the verb was the part carrying no information. */}
          <p>
            <Trans>
              Claude Code · Cursor · Codex CLI · Copilot · Gemini CLI · any MCP
              agent
            </Trans>
          </p>
          {/* One style for the whole row: four groups in three styles read as
              a pile of facts. The GitHub link left on 2026-10-23; the header
              star button and the footer already carry it. The per-host link
              moved under the install command. */}
          <p className="text-muted-foreground/70">
            <Trans>Open source · Local-first</Trans>
          </p>
        </div>
      </div>
    </section>
  );
}
