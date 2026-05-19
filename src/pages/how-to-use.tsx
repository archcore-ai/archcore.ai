import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  StickyHeader,
  HowToUseWizardSection,
  SiteNav,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function HowToUsePage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`How to use Archcore — interactive walkthrough`),
    description: _(
      msg`A short interactive walkthrough that shows when to use the plugin, when to use the CLI, and how to wire context into your AI coding agent — in 3-5 steps.`
    ),
    canonical: "/how-to-use/",
    ogImage: "/og-image-how-to-use.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        <HowToUseWizardSection />
      </main>
      <SiteNav />
    </div>
  );
}
