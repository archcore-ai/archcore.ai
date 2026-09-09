import { GuidePageLayout } from "@/components/guide-page-layout";
import { LocalizedClosingCta } from "@/components/closing-cta";
import { productCopy } from "@/data/product-copy";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  CLIHeroSection,
  CLIPillarsSection,
  CLIRepoLayoutSection,
  CLIAgentsSection,
  CLIFAQSection,
  MigrationSection,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function CLIPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`Archcore CLI`),
    description: _(productCopy.cliDescription),
    canonical: "/cli/",
    ogImage: "/og-image-cli.png",
  });

  return (
    <GuidePageLayout
      outline={[
        { id: "install", label: _(msg`Install CLI`) },
        {
          id: "how-it-works",
          label: _(msg`What the CLI does`),
        },
        { id: "agents", label: _(msg`Connect the agents your team uses`) },
        {
          id: "what-you-get",
          label: _(msg`Project documents you can review in Git`),
        },
        { id: "migrate", label: _(msg`Keep the instructions you already use`) },
        { id: "faq", label: _(msg`CLI FAQ`) },
      ]}
      cta={<LocalizedClosingCta analyticsCta="cli_install" />}
    >
      <CLIHeroSection />
      <CLIPillarsSection />
      <CLIAgentsSection />
      <CLIRepoLayoutSection />
      <MigrationSection />
      <CLIFAQSection />
    </GuidePageLayout>
  );
}
