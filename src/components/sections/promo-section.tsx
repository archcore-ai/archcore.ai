import { Trans } from "@lingui/react/macro";
import { PromoVideo } from "@/components/promo-video";
import { RailSection } from "./rail-section";

/**
 * The recording, right under the hero.
 *
 * It answers "what does this look like" before the page lists what you get.
 * The paragraph under the video states what the recording shows, so a reader
 * who does not press play, a screen reader, and a crawler get the same claim.
 */
export function PromoSection() {
  return (
    <RailSection
      id="demo"
      heading={<Trans>From idea to reviewed code</Trans>}
      aside={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <Trans>One feature in 50 seconds.</Trans>
        </p>
      }
    >
      <PromoVideo />
      <p className="max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">
        <Trans>
          A research note goes into{" "}
          <code className="font-mono text-[0.9em]">/archcore:plan</code>, which
          asks about the edge case and writes a spec, examples, and a plan. The
          agent builds from them. Before merge,{" "}
          <code className="font-mono text-[0.9em]">/archcore:review</code> finds
          the rule the code missed, and the agent fixes it.
        </Trans>
      </p>
    </RailSection>
  );
}
