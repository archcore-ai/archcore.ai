import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { cn } from "@/lib/utils";

/**
 * The 50-second product recording: an idea goes through /archcore:plan, the
 * agent writes the code, and /archcore:review catches a missed rule and a
 * missing test before merge.
 *
 * Source: the `promo/idea-to-code-en` composition, re-encoded for the web as
 * public/promo.{webm,mp4} at 1440x810 with public/promo-poster.jpg. The
 * recording is 16:9 and spans its column, which is what the 8:5 hero demo
 * hidden on 2026-09-12 could not do.
 *
 * It starts paused and muted: the reader chooses to play it, and the sound is
 * one click away. `preload="none"` keeps the 2 MB file off the critical path.
 */
export function PromoVideo({ className }: { className?: string }) {
  const { _ } = useLingui();

  return (
    <video
      className={cn(
        "block aspect-video w-full rounded-xl border border-border bg-[var(--color-code-bg)]",
        className
      )}
      controls
      muted
      playsInline
      preload="none"
      poster="/promo-poster.jpg"
      width={1440}
      height={810}
      aria-label={_(
        msg`Archcore recording: an idea becomes a spec and a plan, the agent writes the code, and review catches a missed rule before merge`
      )}
    >
      <source src="/promo.webm" type="video/webm" />
      <source src="/promo.mp4" type="video/mp4" />
    </video>
  );
}
