import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const interBold = readFileSync(
  join(process.cwd(), "scripts/fonts/Inter-Bold.ttf")
);
const interRegular = readFileSync(
  join(process.cwd(), "scripts/fonts/Inter-Regular.ttf")
);
const logoBase64 = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/logo.png")).toString("base64")}`;
const WIDTH = 1200;
const HEIGHT = 630;
const BG_COLOR = "#fdf6e3";
const TEXT_PRIMARY = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const TEXT_DIM = "#93a1a1";
const GRID_COLOR = "rgba(147, 161, 161, 0.08)";

export interface OgVariant {
  headline: string[];
  subtitle: string;
  bottomLabel: string;
}

export async function renderOgImage(variant: OgVariant): Promise<Uint8Array> {
  const svg = await satori(
    {
      key: null,
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

  return new Uint8Array(png);
}
