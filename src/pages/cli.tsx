import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  StickyHeader,
  CLIHeroSection,
  CLIShowcaseSection,
  CLIProblemSection,
  CLIPillarsSection,
  CLIFAQSection,
  SiteNav,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function CLIPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`Archcore CLI — repo memory for every AI coding agent`),
    description: _(
      msg`Archcore CLI creates .archcore/, wires MCP and hooks, and lets agents read and write decisions, rules, plans, and guides from Git.`
    ),
    canonical: "/cli/",
    ogImage: "/og-image-cli.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        <CLIHeroSection />
        <CLIShowcaseSection />
        <CLIProblemSection />
        <CLIPillarsSection />
        <CLIFAQSection />
      </main>
      <SiteNav />
    </div>
  );
}
