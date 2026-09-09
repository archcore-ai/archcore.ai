import { productCopy } from "../src/data/product-copy";
import { renderOgImage, type OgVariant } from "../src/lib/og-image";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const VARIANTS: (OgVariant & { output: string })[] = [
  {
    output: "og-image.png",
    headline: ["Spec-Driven Development &", "Context Engineering."],
    subtitle: productCopy.expanded.message,
    bottomLabel:
      "Plugin  ·  CLI + MCP  ·  Git-native context for AI coding agents",
  },
  {
    output: "og-image-plugin.png",
    headline: ["Archcore Plugin for AI agents"],
    subtitle: productCopy.pluginExpanded.message,
    bottomLabel: "Archcore skills for your coding agent",
  },
  {
    output: "og-image-cli.png",
    headline: ["Archcore CLI"],
    subtitle: productCopy.cliDescription.message,
    bottomLabel: "Archcore setup and agent connections",
  },
  {
    output: "og-image-how-to-use.png",
    headline: ["How to use Archcore."],
    subtitle: productCopy.howToDescription.message,
    bottomLabel: "init  ·  plan  ·  document  ·  review",
  },
];

for (const variant of VARIANTS) {
  const png = await renderOgImage(variant);
  const outputPath = join("public", variant.output);
  writeFileSync(outputPath, png);
  console.log(`✓ Generated OG image: ${outputPath} (${png.length} bytes)`);
}
