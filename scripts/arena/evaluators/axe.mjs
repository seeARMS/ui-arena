import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

function impactCounts(violations) {
  return violations.reduce(
    (counts, violation) => {
      const key = violation.impact ?? "unknown";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    },
    { critical: 0, serious: 0, moderate: 0, minor: 0, unknown: 0 },
  );
}

function compactViolation(violation) {
  return {
    id: violation.id,
    impact: violation.impact ?? "unknown",
    help: violation.help,
    helpUrl: violation.helpUrl,
    description: violation.description,
    nodeCount: violation.nodes.length,
    targets: violation.nodes.slice(0, 4).map((node) => node.target.join(" ")),
  };
}

export async function runEvaluation({ targetUrl, outputDir, publicOutputUrl }) {
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      bypassCSP: true,
      viewport: { width: 1440, height: 1100 },
    });
    const page = await context.newPage();

    await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    const results = await new AxeBuilder({ page }).analyze();
    const counts = impactCounts(results.violations);

    await writeFile(join(outputDir, "axe.json"), JSON.stringify(results, null, 2));
    await context.close();

    return {
      version: results.testEngine?.version ?? null,
      scores: null,
      metrics: null,
      summary: {
        violationCount: results.violations.length,
        passCount: results.passes.length,
        incompleteCount: results.incomplete.length,
        inapplicableCount: results.inapplicable.length,
        seriousOrCriticalCount: counts.critical + counts.serious,
        impactCounts: counts,
      },
      issues: results.violations.map(compactViolation),
      artifacts: {
        json: `${publicOutputUrl}axe.json`,
      },
    };
  } finally {
    await browser.close();
  }
}
