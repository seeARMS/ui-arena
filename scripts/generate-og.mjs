import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { defaultSiteUrl, ogHeadline, siteName } from "../src/site-meta.js";

const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const outputDir = join(rootDir, "public", "og");
const outputPath = join(outputDir, "home.png");
const brandHost = new URL(defaultSiteUrl).host;

function artifactTile(label, value, color) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "180px",
        height: "148px",
        padding: "18px",
        border: "2px solid #17130d",
        backgroundColor: "#fffaf0",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "42px",
              height: "10px",
              backgroundColor: color,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#17130d",
                    fontSize: "46px",
                    fontWeight: 800,
                    lineHeight: 1,
                  },
                  children: value,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#4e463b",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: 1,
                  },
                  children: label,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

function buildMarkup() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#f3efe6",
        padding: "54px 62px",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(90deg, rgba(23, 19, 13, 0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(23, 19, 13, 0.08) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              right: "-90px",
              top: "120px",
              width: "500px",
              height: "280px",
              border: "2px solid #17130d",
              backgroundColor: "rgba(255, 250, 240, 0.78)",
              transform: "rotate(3deg)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              left: "-70px",
              bottom: "88px",
              width: "360px",
              height: "190px",
              border: "2px solid #17130d",
              backgroundColor: "rgba(255, 250, 240, 0.78)",
              transform: "rotate(-3deg)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "relative",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          width: "42px",
                          height: "42px",
                          border: "2px solid #17130d",
                          backgroundColor: "#fffaf0",
                          padding: "4px",
                          gap: "2px",
                        },
                        children: ["#17130d", "#e04f2f", "#0c8f83", "#c69228"].map((color) => ({
                          type: "div",
                          props: {
                            style: {
                              display: "flex",
                              width: "14px",
                              height: "14px",
                              backgroundColor: color,
                            },
                          },
                        })),
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          color: "#17130d",
                          fontSize: "30px",
                          fontWeight: 800,
                          lineHeight: 1,
                        },
                        children: siteName,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#4e463b",
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: 1,
                  },
                  children: brandHost,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              gap: "32px",
              width: "790px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#e04f2f",
                    fontSize: "22px",
                    fontWeight: 800,
                    lineHeight: 1,
                    textTransform: "uppercase",
                  },
                  children: "AI product interface examples",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#17130d",
                    fontSize: "82px",
                    fontWeight: 800,
                    lineHeight: 0.98,
                  },
                  children: ogHeadline,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "14px",
                  },
                  children: [
                    artifactTile("Prompt", "01", "#e04f2f"),
                    artifactTile("Preview", "HTML", "#0c8f83"),
                    artifactTile("Source", "SRC", "#276fc2"),
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  const [interMedium, interSemiBold, interBold] = await Promise.all([
    readFile(join(rootDir, "src", "assets", "fonts", "Inter-500.woff")),
    readFile(join(rootDir, "src", "assets", "fonts", "Inter-600.woff")),
    readFile(join(rootDir, "src", "assets", "fonts", "Inter-700.woff")),
  ]);

  const svg = await satori(buildMarkup(), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      { name: "Inter", data: interBold, weight: 700, style: "normal" },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, png);
  console.log(`Generated ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
