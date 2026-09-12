import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

const SURFACE = "star_cta_section";

/**
 * One row, not a block.
 *
 * This was a centred card with its own icon, heading, and paragraph, which is
 * a lot of page for the lowest-stakes action on it. The star is worth asking
 * for and it is worth one line: the sentence on the left, the actions on the
 * right, a hairline above. The owner asked for it to be compact on
 * 2026-09-12.
 */
export function StarCtaSection() {
  const { _ } = useLingui();
  const { plugin } = useGitHubStars();

  return (
    <section className="site-gutters pb-4 pt-10 md:pt-12">
      <div
        className={cn(
          "mx-auto flex max-w-[var(--container-max)] flex-wrap items-center gap-x-7 gap-y-4",
          "border-t border-border pt-7"
        )}
      >
        <p className="text-base leading-relaxed">
          <Trans>
            <span className="font-semibold">Open source, built in public.</span>{" "}
            A star helps more developers find it.
          </Trans>
        </p>

        <div className="ms-auto flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href="#install"
            onClick={() =>
              track("cta_clicked", {
                cta: "back_to_install",
                destination: "#install",
                surface: SURFACE,
              })
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium leading-relaxed text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            <Trans>Install now</Trans>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>

          <a
            href={LINKS.pluginRepo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={_(msg`Star Archcore on GitHub`)}
            data-analytics-handled
            onClick={() =>
              track("github_star_clicked", {
                repo: "plugin",
                stars: plugin,
                surface: SURFACE,
              })
            }
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2",
              "bg-[var(--color-action)] text-[var(--color-text-inverse)]",
              "text-sm font-semibold tracking-[-0.005em]",
              "transition-colors duration-200 hover:bg-[var(--color-action-hover)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2"
            )}
          >
            <Star className="h-4 w-4 shrink-0" fill="currentColor" />
            <Trans>Star on GitHub</Trans>
          </a>
        </div>
      </div>
    </section>
  );
}
