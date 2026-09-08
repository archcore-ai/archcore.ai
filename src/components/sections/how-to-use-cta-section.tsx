import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ArrowRight, Compass } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { cn } from "@/lib/utils";
import { INTERNAL_LINKS } from "@/lib/links";

interface HowToUseCtaSectionProps {
  variant?: "default" | "compact";
}

export function HowToUseCtaSection({
  variant = "default",
}: HowToUseCtaSectionProps) {
  if (variant === "compact") {
    return (
      <SectionContainer narrow className="py-10 md:py-14">
        <div
          className={cn(
            "rounded-2xl border border-border bg-card/60 backdrop-blur-sm",
            "px-5 md:px-7 py-5 md:py-6",
            "flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6"
          )}
        >
          <div className="min-w-0 space-y-1">
            <h3 className="text-base md:text-lg font-semibold tracking-tight leading-snug">
              <Trans>
                New to Archcore? See what a week with it looks like.
              </Trans>
            </h3>
            <p className="text-sm text-muted-foreground leading-snug">
              <Trans>
                One loop on a real feature: init, plan, document, review.
              </Trans>
            </p>
          </div>
          <WalkthroughLink size="sm">
            <Trans>See how it works</Trans>
          </WalkthroughLink>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer narrow id="how-to-use-cta">
      <div
        className={cn(
          "rounded-2xl border border-border bg-card/60 backdrop-blur-sm",
          "px-6 md:px-10 py-10 md:py-14",
          "flex flex-col items-center text-center space-y-5"
        )}
      >
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <span
            className="nav-live-dot text-[var(--color-action)]"
            aria-hidden="true"
          />
          <Trans>Not sure where to start?</Trans>
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance max-w-2xl">
          <Trans>See what it looks like before you install it.</Trans>
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          <Trans>
            One loop through Archcore on a real feature, from init to review.
            Every step is a sentence you say to your agent, with the file it
            leaves behind.
          </Trans>
        </p>

        <div className="pt-2">
          <WalkthroughLink size="md">
            <Trans>See how it works</Trans>
          </WalkthroughLink>
        </div>
      </div>
    </SectionContainer>
  );
}

interface WalkthroughLinkProps {
  size: "sm" | "md";
  children: React.ReactNode;
}

function WalkthroughLink({ size, children }: WalkthroughLinkProps) {
  const { _ } = useLingui();
  const ariaLabel = _(msg`See how Archcore is used`);

  return (
    <a
      href={INTERNAL_LINKS.howToUse}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md",
        "bg-[var(--color-action)] text-[var(--color-text-inverse)]",
        "font-medium tracking-[-0.005em]",
        "transition-[transform,background-color] duration-200",
        "hover:bg-[var(--color-action-hover)] hover:-translate-y-[1px]",
        "active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-text)]",
        size === "sm"
          ? "h-10 px-4 text-sm justify-center self-start md:self-auto shrink-0"
          : "h-11 px-5 text-sm md:text-base"
      )}
    >
      <Compass
        className={cn(
          "shrink-0 opacity-90",
          size === "sm" ? "h-4 w-4" : "h-4 w-4 md:h-[18px] md:w-[18px]"
        )}
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap">{children}</span>
      <ArrowRight
        className={cn(
          "transition-transform group-hover:translate-x-0.5",
          size === "sm"
            ? "h-4 w-4 opacity-70"
            : "h-4 w-4 md:h-[18px] md:w-[18px] opacity-80"
        )}
        aria-hidden="true"
      />
    </a>
  );
}
