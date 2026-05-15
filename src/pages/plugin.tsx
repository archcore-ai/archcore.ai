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
      msg`Archcore Plugin — repo context for Claude Code, Cursor & Codex CLI`
    ),
    description: _(
      msg`The Archcore plugin loads your architecture, rules, and decisions into Claude Code, Cursor, and Codex CLI — so the agent stops guessing and starts following your team's truth.`
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
        <PluginShowcaseSection />
        <PluginProblemSection />
        <PluginFAQSection />
      </main>
      <SiteNav />
    </div>
  );
}
