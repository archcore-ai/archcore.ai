import { Trans } from "@lingui/react/macro";
import { RailSection } from "@/components/sections/rail-section";
import { CYCLE_STAGES } from "@/content/how-to-use";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * The four skills, as four sentences a reader could type today.
 *
 * Every prompt comes from CYCLE_STAGES, which lifts them from the trigger
 * phrases in the plugin's own skills (plugins/archcore/skills/*\/SKILL.md,
 * "When to use"), so a reader who copies one gets the stage described. The
 * list is vertical at every breakpoint and each stage shows its skill with its
 * prompt: both are fixed by .archcore/landing/how-to-use-cases.adr.md.
 *
 * The home page shows `leaves`, one compressed line per stage; /how-to-use
 * shows `result`, the full sentence. Both live in cycle.tsx, so a release
 * cannot update one surface and miss the other.
 */
export function SkillsSection() {
  return (
    <RailSection
      id="how-it-works"
      heading={<Trans>Four things you say</Trans>}
      aside={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <a
            href={INTERNAL_LINKS.howToUse}
            data-analytics-cta="home_loop_how_to_use"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            <Trans>See the skills in action</Trans>
          </a>
        </p>
      }
    >
      <p className="max-w-[70ch] text-base leading-relaxed text-muted-foreground">
        <Trans>
          Plain sentences, or the slash command. Each one uses what the last one
          saved, which is why the review at the end knows what the plan and the
          decision said.
        </Trans>
      </p>

      <ol className="grid">
        {CYCLE_STAGES.map((stage) => (
          <li
            key={stage.id}
            className="grid items-baseline gap-x-5 gap-y-1 border-t border-border py-4 last:border-b sm:grid-cols-[168px_minmax(0,1fr)]"
          >
            {/* The command is the anchor of the row, so it carries a surface
                rather than sitting as dim mono text beside a full-strength
                sentence. */}
            <code className="justify-self-start rounded-md border border-border bg-[var(--color-code-bg)] px-2 py-1 font-mono text-[0.8rem] font-semibold text-foreground">
              {stage.skill}
            </code>
            <div className="min-w-0">
              <p className="text-base leading-snug">
                <span aria-hidden="true" className="text-muted-foreground/60">
                  “
                </span>
                {stage.prompt}
                <span aria-hidden="true" className="text-muted-foreground/60">
                  ”
                </span>
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                {stage.leaves}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </RailSection>
  );
}
