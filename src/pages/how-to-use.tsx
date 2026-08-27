import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  StickyHeader,
  HowToUseStartSection,
  HowToUseCycleSection,
  StarCtaSection,
  SiteNav,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function HowToUsePage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`How to use Archcore — one loop from init to review`),
    description: _(
      msg`One loop through Archcore on a real feature: init, plan, document, review. Each step shows the sentence you say to your agent and the slash-command shortcut that does the same thing.`
    ),
    canonical: "/how-to-use/",
    ogImage: "/og-image-how-to-use.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        <HowToUseStartSection />
        <HowToUseCycleSection />
        <StarCtaSection />
      </main>
      <SiteNav />
    </div>
  );
}
