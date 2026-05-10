import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const publicDir = join(rootDir, "public");

const interBold = readFileSync(join(__dirname, "fonts", "Inter-Bold.ttf"));
const interRegular = readFileSync(join(__dirname, "fonts", "Inter-Regular.ttf"));

const logoBuffer = readFileSync(join(publicDir, "logo.png"));
const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

const WIDTH = 1200;
const HEIGHT = 630;

// Light theme colors (matching the site's hero-pattern / Solarized Light palette)
const BG_COLOR = "#fdf6e3";
const TEXT_PRIMARY = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const TEXT_DIM = "#93a1a1";
const GRID_COLOR = "rgba(147, 161, 161, 0.08)";

interface Variant {
  /** Output filename inside public/. */
  output: string;
  /** Headline lines — each rendered at 56px, mirrors the page hero H1. */
  headline: [string, string];
  /** Subtitle — mirrors the hero subhead. */
  subtitle: string;
  /** Right-side label in the bottom bar. */
  bottomLabel: string;
}

const VARIANTS: Variant[] = [
  {
    output: "og-image.png",
    headline: [
      "Stop re-explaining your repo",
      "to every AI agent.",
    ],
    subtitle:
      "Archcore keeps decisions, rules, guides, and plans in Git — so AI coding agents follow your architecture instead of guessing.",
    bottomLabel: "Plugin  ·  CLI + MCP  ·  Git-native context for AI coding agents",
  },
  {
    output: "og-image-plugin.png",
    headline: [
      "Claude Code, Cursor &",
      "Codex CLI plugin for AI agents.",
    ],
    subtitle:
      "Archcore loads your architecture, rules, and decisions into Claude Code, Cursor, and Codex CLI — so the agent stops guessing and starts following your team's truth.",
    bottomLabel:
      "Claude Code · Cursor · Codex CLI plugin  ·  Intent-based slash commands",
  },
  {
    output: "og-image-cli.png",
    headline: [
      "Repo memory for every",
      "AI coding agent.",
    ],
    subtitle:
      "Archcore CLI creates .archcore/, wires MCP and hooks, and lets your agents read and write decisions, rules, plans, and guides from Git.",
    bottomLabel: "Standalone binary  ·  MCP + hooks  ·  8 AI coding agents",
  },
];

async function render(variant: Variant): Promise<void> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG_COLOR,
          backgroundImage: `linear-gradient(${GRID_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${GRID_COLOR} 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
          padding: "60px 80px",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", gap: "16px" },
              children: [
                {
                  type: "img",
                  props: {
                    src: logoBase64,
                    width: 48,
                    height: 48,
                    style: { borderRadius: "4px" },
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "28px",
                      fontWeight: 700,
                      color: TEXT_PRIMARY,
                      letterSpacing: "-0.02em",
                    },
                    children: "archcore",
                  },
                },
              ],
            },
          },

          { type: "div", props: { style: { flex: "1" } } },

          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: "8px" },
              children: variant.headline.map((line) => ({
                type: "div",
                props: {
                  style: {
                    fontSize: "56px",
                    fontWeight: 700,
                    color: TEXT_PRIMARY,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  },
                  children: line,
                },
              })),
            },
          },

          {
            type: "div",
            props: {
              style: {
                fontSize: "22px",
                color: TEXT_MUTED,
                marginTop: "24px",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
              },
              children: variant.subtitle,
            },
          },

          { type: "div", props: { style: { flex: "1" } } },

          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "18px",
                      color: TEXT_DIM,
                      letterSpacing: "0.02em",
                    },
                    children: "archcore.ai",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { fontSize: "16px", color: TEXT_DIM },
                    children: variant.bottomLabel,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal" as const,
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal" as const,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width" as const, value: WIDTH },
  });
  const png = resvg.render().asPng();

  const outputPath = join(publicDir, variant.output);
  writeFileSync(outputPath, png);
  console.log(`✓ Generated OG image: ${outputPath} (${png.length} bytes)`);
}

for (const variant of VARIANTS) {
  await render(variant);
}
