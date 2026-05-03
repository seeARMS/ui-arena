import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const LIGHTHOUSE_CATEGORIES = ["performance", "accessibility"];

function categoryScore(lhr, id) {
  const category = lhr.categories?.[id];
  const score = typeof category?.score === "number" ? category.score : null;

  return {
    title: category?.title ?? id,
    score,
    value: score === null ? null : Math.round(score * 100),
  };
}

function auditMetric(lhr, id) {
  const audit = lhr.audits?.[id];

  if (!audit) {
    return null;
  }

  return {
    id,
    title: audit.title,
    displayValue: audit.displayValue ?? null,
    numericValue: typeof audit.numericValue === "number" ? audit.numericValue : null,
    score: typeof audit.score === "number" ? audit.score : null,
  };
}

function accessibilityIssues(lhr) {
  const refs = lhr.categories?.accessibility?.auditRefs ?? [];

  return refs
    .map((ref) => lhr.audits?.[ref.id])
    .filter((audit) => {
      if (!audit || audit.scoreDisplayMode === "notApplicable") {
        return false;
      }

      return audit.score !== null && audit.score !== 1;
    })
    .map((audit) => ({
      id: audit.id,
      title: audit.title,
      score: typeof audit.score === "number" ? audit.score : null,
      displayValue: audit.displayValue ?? null,
      description: audit.description ?? null,
    }));
}

function reportByType(report, type) {
  const reports = Array.isArray(report) ? report : [report];

  if (type === "json") {
    return reports.find((item) => String(item).trimStart().startsWith("{"));
  }

  return reports.find((item) => /<!doctype html|<html/i.test(String(item).slice(0, 120))) ?? reports[0];
}

export async function runEvaluation({ targetUrl, outputDir, publicOutputUrl }) {
  const chromePath = process.env.LIGHTHOUSE_CHROME_PATH ?? process.env.CHROME_PATH;
  const chrome = await launch({
    ...(chromePath ? { chromePath } : {}),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  try {
    const runnerResult = await lighthouse(
      targetUrl,
      {
        port: chrome.port,
        output: ["html", "json"],
        onlyCategories: LIGHTHOUSE_CATEGORIES,
        logLevel: "error",
      },
      {
        extends: "lighthouse:default",
        settings: {
          formFactor: "desktop",
          throttlingMethod: "simulate",
          screenEmulation: {
            mobile: false,
            width: 1440,
            height: 1100,
            deviceScaleFactor: 1,
            disabled: false,
          },
        },
      },
    );

    if (!runnerResult?.lhr) {
      throw new Error("Lighthouse did not return a report.");
    }

    const { lhr } = runnerResult;
    const htmlReport = reportByType(runnerResult.report, "html");
    const jsonReport = reportByType(runnerResult.report, "json") ?? JSON.stringify(lhr, null, 2);
    const issues = accessibilityIssues(lhr);

    await Promise.all([
      writeFile(join(outputDir, "report.html"), htmlReport),
      writeFile(join(outputDir, "lhr.json"), jsonReport),
    ]);

    return {
      version: lhr.lighthouseVersion ?? null,
      scores: {
        performance: categoryScore(lhr, "performance"),
        accessibility: categoryScore(lhr, "accessibility"),
      },
      metrics: {
        firstContentfulPaint: auditMetric(lhr, "first-contentful-paint"),
        largestContentfulPaint: auditMetric(lhr, "largest-contentful-paint"),
        speedIndex: auditMetric(lhr, "speed-index"),
        totalBlockingTime: auditMetric(lhr, "total-blocking-time"),
        cumulativeLayoutShift: auditMetric(lhr, "cumulative-layout-shift"),
      },
      summary: {
        requestedUrl: lhr.requestedUrl,
        finalUrl: lhr.finalDisplayedUrl ?? lhr.finalUrl,
        fetchTime: lhr.fetchTime,
        accessibilityIssueCount: issues.length,
      },
      issues,
      artifacts: {
        report: `${publicOutputUrl}report.html`,
        json: `${publicOutputUrl}lhr.json`,
      },
    };
  } finally {
    await chrome.kill();
  }
}
