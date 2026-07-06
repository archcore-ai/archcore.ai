import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { usePostHog } from "posthog-js/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, Github, Star } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { cn } from "@/lib/utils";
import { useGitHubStars, formatStars } from "@/hooks/use-github-stars";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

/**
 * Bottom-of-page conversion block built around the single lowest-friction
 * action for cold GitHub / social traffic: a star. Install stays the primary
 * action up top; this captures everyone who scrolled the whole page but isn't
 * ready to install yet.
 */
export function StarCtaSection() {
  const { _ } = useLingui();
  const { cli, plugin, total } = useGitHubStars();
  const posthog = usePostHog();

  return (
    <SectionContainer narrow className="py-12 md:py-16">
      <p className="mb-6 text-center text-base text-muted-foreground">
        <Trans>Free and local today.</Trans>{" "}
        <Link
          to={INTERNAL_LINKS.teamsGettingStarted}
          onClick={() => posthog.capture("teams_link_click")}
          className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:text-[var(--color-action)] transition-colors"
        >
          <Trans>Managed when your team needs it</Trans>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </p>

      <div
        className={cn(
          "rounded-2xl border border-border bg-card/60 backdrop-blur-sm",
          "px-6 md:px-10 py-10 md:py-12",
          "flex flex-col items-center text-center space-y-5"
        )}
      >
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-action)]/10 text-[var(--color-action)]"
        >
          <Star className="h-5 w-5" fill="currentColor" />
        </span>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance max-w-2xl">
          <Trans>Like where this is going? Star it on GitHub.</Trans>
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          <Trans>
            Archcore is open source and built in public. A star helps more
            developers find it — and tells us which direction to push next.
          </Trans>
        </p>

        <div className="pt-2 flex flex-col items-center gap-3">
          <a
            href={LINKS.org}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={_(msg`Star Archcore on GitHub`)}
            onClick={() =>
              posthog.capture("star_cta_click", { repo: "org", total })
            }
            className={cn(
              "group inline-flex items-center gap-2.5 rounded-md h-12 px-6",
              "bg-[var(--color-action)] text-[var(--color-text-inverse)]",
              "text-sm md:text-base font-semibold tracking-[-0.005em]",
              "transition-[transform,background-color] duration-200",
              "hover:bg-[var(--color-action-hover)] hover:-translate-y-[1px] active:translate-y-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-text)]"
            )}
          >
            <Star
              className="h-4 w-4 md:h-[18px] md:w-[18px] shrink-0"
              fill="currentColor"
            />
            <span className="whitespace-nowrap">
              <Trans>Star on GitHub</Trans>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-text-inverse)]/15 px-2 py-0.5 text-xs font-bold tabular-nums">
              {formatStars(total)}
            </span>
          </a>

          <a
            href="#install"
            onClick={() => posthog.capture("star_cta_install_click")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            <Trans>Ready to try? Install now</Trans>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <a
              href={LINKS.cliRepo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("star_cta_click", { repo: "cli", total: cli })
              }
              className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              archcore-ai/cli
              <span className="not-italic tabular-nums">★ {formatStars(cli)}</span>
            </a>
            <a
              href={LINKS.pluginRepo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("star_cta_click", {
                  repo: "plugin",
                  total: plugin,
                })
              }
              className="inline-flex items-center gap-1 font-mono underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              archcore-ai/plugin
              <span className="not-italic tabular-nums">
                ★ {formatStars(plugin)}
              </span>
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
