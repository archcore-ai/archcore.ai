import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  StickyHeader,
  PluginHeroSection,
  PluginShowcaseSection,
  PluginProblemSection,
  PluginPillarsSection,
  PluginHostsSection,
  PluginFAQSection,
  MigrationSection,
  HowToUseCtaSection,
  SiteNav,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function PluginPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(
      msg`Archcore Plugin — repo memory in Claude Code, Cursor, Codex`
    ),
    description: _(
      msg`The Archcore plugin loads your architecture, rules, and decisions into Claude Code, Cursor, and Codex CLI, so the agent follows your team's truth.`
    ),
    canonical: "/plugin/",
    ogImage: "/og-image-plugin.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
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
      <SiteNav />
    </div>
  );
}
