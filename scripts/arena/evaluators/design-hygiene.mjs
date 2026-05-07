const VIEWPORT = { width: 1440, height: 1100 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function scoreFromSummary(summary) {
  const spacingFit = typeof summary.spacingGridFit === "number" ? summary.spacingGridFit : 0;
  const penalties = [
    Math.max(0, summary.fontFamilyCount - 2) * 8,
    Math.max(0, summary.fontSizeCount - 10) * 2,
    Math.max(0, summary.paletteColorCount - 14) * 1.8,
    Math.max(0, summary.radiusCount - 6) * 3,
    Math.max(0, summary.shadowCount - 4) * 4,
    (1 - spacingFit) * 30,
  ];

  return clamp(100 - penalties.reduce((sum, value) => sum + value, 0), 0, 100);
}

function buildIssues(summary, score) {
  const issues = [];

  if (summary.fontFamilyCount > 2) {
    issues.push({
      id: "font-family-sprawl",
      impact: summary.fontFamilyCount > 4 ? "serious" : "moderate",
      help: `${summary.fontFamilyCount} distinct font families detected`,
      detail: "Tasteful product UI usually keeps typography to one primary family plus a mono or accent family.",
    });
  }

  if (summary.fontSizeCount > 12) {
    issues.push({
      id: "font-size-sprawl",
      impact: "moderate",
      help: `${summary.fontSizeCount} distinct font sizes detected`,
      detail: "A compact type scale usually reads more intentional than many ad hoc sizes.",
    });
  }

  if (summary.spacingGridFit < 0.72 && summary.spacingSampleCount > 0) {
    issues.push({
      id: "spacing-rhythm",
      impact: "moderate",
      help: `${Math.round(summary.spacingGridFit * 100)}% of spacing values fit a 4px grid`,
      detail: "Low grid fit often indicates accidental margins, padding, or gaps.",
    });
  }

  if (summary.paletteColorCount > 18) {
    issues.push({
      id: "palette-sprawl",
      impact: "minor",
      help: `${summary.paletteColorCount} quantized colors detected`,
      detail: "A broad palette can be valid, but often means accents and neutrals are not being reused deliberately.",
    });
  }

  if (summary.shadowCount > 5) {
    issues.push({
      id: "shadow-sprawl",
      impact: "minor",
      help: `${summary.shadowCount} distinct shadow treatments detected`,
      detail: "Many shadow recipes can make elevation feel noisy or inconsistent.",
    });
  }

  if (score < 45) {
    issues.push({
      id: "low-design-discipline",
      impact: "serious",
      help: "Computed style metrics suggest weak visual discipline",
      detail: "This is a heuristic signal only; pairwise taste remains the headline judgment.",
    });
  }

  return issues;
}

export async function runEvaluationWithPage(page) {
  return page.evaluate(() => {
    const PX_PROPS = [
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "gap",
      "rowGap",
      "columnGap",
    ];
    const RADIUS_PROPS = [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomRightRadius",
      "borderBottomLeftRadius",
    ];

    function firstFontFamily(value) {
      return String(value ?? "")
        .split(",")[0]
        .replace(/^['"]|['"]$/g, "")
        .trim()
        .toLowerCase();
    }

    function px(value) {
      const match = String(value ?? "").match(/^(-?\d+(?:\.\d+)?)px$/);
      return match ? Number(match[1]) : null;
    }

    function quantizedColor(value) {
      const match = String(value ?? "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (!Number.isFinite(alpha) || alpha < 0.08) return null;
      const channels = [Number(match[1]), Number(match[2]), Number(match[3])]
        .map((channel) => Math.round(channel / 16) * 16)
        .map((channel) => Math.max(0, Math.min(255, channel)));
      return channels.join(",");
    }

    function isVisible(element, style, rect) {
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
        return false;
      }

      return rect.width > 0 && rect.height > 0;
    }

    const elements = Array.from(document.querySelectorAll("body, body *"));
    const fontFamilies = new Set();
    const fontSizes = new Set();
    const spacingValues = [];
    const radiusValues = new Set();
    const shadows = new Set();
    const colors = new Set();
    let visibleElementCount = 0;
    let textElementCount = 0;

    for (const element of elements) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      if (!isVisible(element, style, rect)) {
        continue;
      }

      visibleElementCount += 1;

      const hasText = (element.textContent ?? "").trim().length > 0;
      if (hasText) {
        textElementCount += 1;
        const family = firstFontFamily(style.fontFamily);
        const size = px(style.fontSize);
        if (family) fontFamilies.add(family);
        if (size !== null) fontSizes.add(Math.round(size * 2) / 2);
      }

      for (const prop of PX_PROPS) {
        const value = px(style[prop]);
        if (value !== null && value > 0 && value < 240) {
          spacingValues.push(value);
        }
      }

      for (const prop of RADIUS_PROPS) {
        const value = px(style[prop]);
        if (value !== null && value > 0 && value < 96) {
          radiusValues.add(Math.round(value));
        }
      }

      if (style.boxShadow && style.boxShadow !== "none") {
        shadows.add(style.boxShadow.replace(/\s+/g, " ").trim());
      }

      for (const prop of ["color", "backgroundColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"]) {
        const color = quantizedColor(style[prop]);
        if (color) colors.add(color);
      }
    }

    const gridFitCount = spacingValues.filter((value) => {
      const nearest = Math.round(value / 4) * 4;
      return Math.abs(value - nearest) <= 0.5;
    }).length;
    const spacingGridFit = spacingValues.length ? gridFitCount / spacingValues.length : 1;

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      visibleElementCount,
      textElementCount,
      fontFamilyCount: fontFamilies.size,
      fontSizeCount: fontSizes.size,
      paletteColorCount: colors.size,
      spacingSampleCount: spacingValues.length,
      spacingGridFit,
      radiusCount: radiusValues.size,
      shadowCount: shadows.size,
      topFontFamilies: Array.from(fontFamilies).slice(0, 8),
      topFontSizes: Array.from(fontSizes).sort((a, b) => a - b).slice(0, 16),
    };
  });
}

export async function runEvaluation({ targetUrl }) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
    });

    await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: 20000,
    });

    const rawSummary = await runEvaluationWithPage(page);
    await page.close();

    const disciplineScore = scoreFromSummary(rawSummary);
    const summary = {
      ...rawSummary,
      spacingGridFit: Math.round(rawSummary.spacingGridFit * 1000) / 1000,
      disciplineScore: Math.round(disciplineScore * 10) / 10,
    };

    return {
      version: "1.0.0",
      scores: {
        discipline: {
          label: "Design hygiene",
          score: disciplineScore / 100,
          value: Math.round(disciplineScore * 10) / 10,
          displayValue: `${Math.round(disciplineScore)}`,
        },
      },
      metrics: {
        fontFamilyCount: summary.fontFamilyCount,
        fontSizeCount: summary.fontSizeCount,
        paletteColorCount: summary.paletteColorCount,
        spacingGridFit: summary.spacingGridFit,
        radiusCount: summary.radiusCount,
        shadowCount: summary.shadowCount,
        visibleElementCount: summary.visibleElementCount,
      },
      summary,
      issues: buildIssues(summary, disciplineScore),
      artifacts: {},
    };
  } finally {
    await browser.close();
  }
}
