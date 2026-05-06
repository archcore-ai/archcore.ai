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
    title: _(
      msg`Archcore Plugin — make Claude Code and Cursor follow your repo rules`
    ),
    description: _(
      msg`Archcore loads the right ADRs, specs, rules, and patterns before Claude Code and Cursor edit code. Capture decisions, standards, and plans without leaving chat.`
    ),
    canonical: "/plugin",
    ogImage: "/og-image-plugin.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
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
