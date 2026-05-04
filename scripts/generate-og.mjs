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

const PALETTE = {
  bg: "#f7f7f5",
  paper: "#ffffff",
  ink: "#111111",
  inkSoft: "#4a4a4a",
  inkMute: "#8c8c8c",
  line: "#e2e2dd",
  lineStrong: "#1a1a1a",
  highlight: "#ffe566",
  good: "#137a3d",
  warn: "#b06b00",
  bad: "#b3261e",
  swatches: ["#d0e3ff", "#ffe1cf", "#d6f5d4", "#efd8ff", "#ffd6d6"],
};

function brandMark() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexWrap: "wrap",
        width: "44px",
        height: "44px",
        padding: "3px",
        gap: "2px",
        backgroundColor: PALETTE.ink,
      },
      children: ["#d0e3ff", "#ffe1cf", "#d6f5d4", "#efd8ff"].map((color) => ({
        type: "div",
        props: {
          style: {
            display: "flex",
            width: "18px",
            height: "18px",
            backgroundColor: color,
          },
        },
      })),
    },
  };
}

function leaderboardRow({ rank, model, family, swatch, perf, a11y, axe, medal }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0",
        height: "78px",
        borderBottom: `1px solid ${PALETTE.line}`,
        backgroundColor: PALETTE.paper,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "76px",
              height: "100%",
              borderRight: `1px solid ${PALETTE.line}`,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    border: `2px solid ${PALETTE.ink}`,
                    backgroundColor: medal ?? PALETTE.paper,
                    color: PALETTE.ink,
                    fontFamily: "JetBrains Mono",
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                  children: String(rank),
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
              alignItems: "center",
              gap: "16px",
              flex: 1,
              padding: "0 22px",
              height: "100%",
              borderRight: `1px solid ${PALETTE.line}`,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    width: "40px",
                    height: "40px",
                    border: `1px solid ${PALETTE.ink}`,
                    backgroundColor: swatch,
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          color: PALETTE.ink,
                          fontSize: "20px",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        },
                        children: model,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          color: PALETTE.inkMute,
                          fontFamily: "JetBrains Mono",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        },
                        children: family,
                      },
                    },
                  ],
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
              gap: "30px",
              alignItems: "center",
              padding: "0 28px",
              height: "100%",
            },
            children: [
              { label: "PERF", value: perf, tone: scoreTone(perf) },
              { label: "A11Y", value: a11y, tone: scoreTone(a11y) },
              { label: "AXE", value: axe, tone: axe === "0" ? "good" : axe === "—" ? "neutral" : "warn" },
            ].map(({ label, value, tone }) => ({
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: "60px",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        color: PALETTE.inkMute,
                        fontFamily: "JetBrains Mono",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                      },
                      children: label,
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        color:
                          tone === "good"
                            ? PALETTE.good
                            : tone === "warn"
                              ? PALETTE.warn
                              : tone === "bad"
                                ? PALETTE.bad
                                : PALETTE.ink,
                        fontFamily: "JetBrains Mono",
                        fontSize: "26px",
                        fontWeight: 700,
                      },
                      children: value,
                    },
                  },
                ],
              },
            })),
          },
        },
      ],
    },
  };
}

function scoreTone(value) {
  if (value === "—") return "neutral";
  const n = Number(value);
  if (!Number.isFinite(n)) return "neutral";
  if (n >= 90) return "good";
  if (n >= 70) return "warn";
  return "bad";
}

function buildMarkup() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        padding: "56px",
        backgroundColor: PALETTE.bg,
        backgroundImage:
          `linear-gradient(90deg, ${PALETTE.line} 1px, transparent 1px), linear-gradient(180deg, ${PALETTE.line} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  },
                  children: [
                    brandMark(),
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          color: PALETTE.ink,
                          fontSize: "32px",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
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
                    color: PALETTE.inkMute,
                    fontFamily: "JetBrains Mono",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
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
              flexDirection: "column",
              gap: "18px",
              marginTop: "44px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: PALETTE.inkMute,
                    fontFamily: "JetBrains Mono",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                  },
                  children: "OPEN BENCHMARK · PRODUCT TASTE",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: PALETTE.ink,
                    fontSize: "92px",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 0.95,
                    whiteSpace: "pre-line",
                  },
                  children: ogHeadline,
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
              flexDirection: "column",
              marginTop: "auto",
              border: `2px solid ${PALETTE.lineStrong}`,
              backgroundColor: PALETTE.paper,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    height: "44px",
                    backgroundColor: PALETTE.ink,
                    color: PALETTE.paper,
                    fontFamily: "JetBrains Mono",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  },
                  children: [
                    { type: "div", props: { style: { display: "flex", width: "76px", justifyContent: "center" }, children: "#" } },
                    { type: "div", props: { style: { display: "flex", flex: 1, paddingLeft: "22px" }, children: "MODEL" } },
                    { type: "div", props: { style: { display: "flex", paddingRight: "28px" }, children: "SCORES" } },
                  ],
                },
              },
              leaderboardRow({
                rank: 1, model: "Claude Sonnet 4.6", family: "Anthropic / sonnet-4-6",
                swatch: PALETTE.swatches[0],
                perf: "96", a11y: "98", axe: "0",
                medal: PALETTE.highlight,
              }),
              leaderboardRow({
                rank: 2, model: "Gemini 3.1 Flash", family: "Google / flash-lite",
                swatch: PALETTE.swatches[2],
                perf: "99", a11y: "94", axe: "1",
                medal: PALETTE.swatches[0],
              }),
              leaderboardRow({
                rank: 3, model: "GPT-5.2", family: "OpenAI / gpt-5-2",
                swatch: PALETTE.swatches[1],
                perf: "92", a11y: "88", axe: "2",
                medal: PALETTE.swatches[1],
              }),
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
