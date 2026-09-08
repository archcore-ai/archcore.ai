import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  CLIHeroSection,
  CLIShowcaseSection,
  CLIProblemSection,
  CLIPillarsSection,
  CLIRepoLayoutSection,
  CLIAgentsSection,
  CLIFAQSection,
  MigrationSection,
  HowToUseCtaSection,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function CLIPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`Archcore CLI — Git-Native Context for AI Coding Agents`),
    description: _(
      msg`Archcore CLI creates .archcore/, wires MCP and hooks, and lets agents read and write specs, decisions, rules, and plans from Git.`
    ),
    canonical: "/cli/",
    ogImage: "/og-image-cli.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="main-content">
        <CLIHeroSection />
        <CLIProblemSection />
        <CLIShowcaseSection />
        <CLIPillarsSection />
        <HowToUseCtaSection />
        <CLIAgentsSection />
        <CLIRepoLayoutSection />
        <MigrationSection entryPoint="cli" />
        <CLIFAQSection />
        <HowToUseCtaSection variant="compact" />
      </main>
    </div>
  );
}
