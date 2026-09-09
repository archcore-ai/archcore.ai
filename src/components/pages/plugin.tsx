import { productCopy } from "@/data/product-copy";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  PluginHeroSection,
  PluginShowcaseSection,
  PluginProblemSection,
  PluginPillarsSection,
  PluginHostsSection,
  PluginFAQSection,
  MigrationSection,
  HowToUseCtaSection,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function PluginPage() {
  const { _ } = useLingui();

  usePageMeta({
    // Four hosts no longer fit a ≤60-char title, so the title stays
    // category-led (like the home title) and the hosts moved to the
    // description, which has room for all four.
    title: _(msg`Archcore Plugin — Spec-Driven Development for Coding Agents`),
    description: _(productCopy.pluginDescription),
    canonical: "/plugin/",
    ogImage: "/og-image-plugin.png",
  });

  return (
    <div className="min-h-screen text-foreground">
      <main id="main-content">
        <PluginHeroSection />
        <PluginPillarsSection />
        <HowToUseCtaSection />
        {/* Hosts answer "does it run in my agent?" — a qualifying question, so
            it sits close to install. Migration answers "I already have
            CLAUDE.md" — an objection, so it sits just before the FAQ. The
            Hero → Pillars → Showcase → Problem → FAQ order fixed by
            plugin-page-action-framing.adr.md is preserved. */}
        <PluginHostsSection />
        <PluginShowcaseSection />
        <PluginProblemSection />
        <MigrationSection entryPoint="plugin" />
        <PluginFAQSection />
        <HowToUseCtaSection variant="compact" />
      </main>
    </div>
  );
}
