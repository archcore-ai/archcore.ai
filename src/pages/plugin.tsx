import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  StickyHeader,
  PluginHeroSection,
  PluginShowcaseSection,
  PluginProblemSection,
  PluginPillarsSection,
  PluginFAQSection,
  SiteNav,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function PluginPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`Archcore Plugin — repo context for Claude Code & Cursor`),
    description: _(
      msg`Archcore loads the right ADRs, specs, rules, and patterns before Claude Code and Cursor edit code. Capture decisions and standards without leaving chat.`
    ),
    canonical: "/plugin/",
    ogImage: "/og-image-plugin.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        <PluginHeroSection />
        <PluginShowcaseSection />
        <PluginProblemSection />
        <PluginPillarsSection />
        <PluginFAQSection />
      </main>
      <SiteNav />
    </div>
  );
}
