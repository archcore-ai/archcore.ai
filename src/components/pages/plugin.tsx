import { GuidePageLayout } from "@/components/guide-page-layout";
import { LocalizedClosingCta } from "@/components/closing-cta";
import { productCopy } from "@/data/product-copy";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  PluginHeroSection,
  PluginPillarsSection,
  PluginHostsSection,
  PluginFAQSection,
  MigrationSection,
} from "@/components/sections";
import { usePageMeta } from "@/hooks/use-page-meta";

export function PluginPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(msg`Archcore Plugin for AI agents`),
    description: _(productCopy.pluginDescription),
    canonical: "/plugin/",
    ogImage: "/og-image-plugin.png",
  });

  return (
    <GuidePageLayout
      outline={[
        { id: "install", label: _(msg`Install plugin`) },
        {
          id: "how-it-works",
          label: _(msg`What the plugin adds`),
        },
        { id: "hosts", label: _(msg`Check your agent’s setup requirements`) },
        { id: "migrate", label: _(msg`Keep the instructions you already use`) },
        { id: "faq", label: _(msg`Plugin FAQ`) },
      ]}
      cta={<LocalizedClosingCta analyticsCta="plugin_install" />}
    >
      <PluginHeroSection />
      <PluginPillarsSection />
      <PluginHostsSection />
      <MigrationSection />
      <PluginFAQSection />
    </GuidePageLayout>
  );
}
