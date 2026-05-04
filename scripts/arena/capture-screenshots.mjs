import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { startPublicPreviewServer } from "./evaluate-results.mjs";
import {
  fileExists,
  loadResultManifests,
  parseArgs,
  publicDir,
  publicUrlFor,
  rootDir,
  writeJson,
} from "./shared.mjs";

const VIEWPORTS = [
  { key: "desktop", width: 1440, height: 1100 },
  { key: "mobile", width: 390, height: 844 },
];

export async function captureScreenshotsForResult(resultPath, result, serverContext = null) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const updated = structuredClone(result);
  const ownedServer = serverContext ? null : await startPublicPreviewServer();
  const server = serverContext ?? ownedServer;

  try {
    const previewPath = join(rootDir, updated.artifacts.localPreviewPath, "index.html");

    if (!(await fileExists(previewPath))) {
      throw new Error(`Preview HTML not found: ${previewPath}`);
    }

    updated.screenshots = updated.screenshots ?? {};

    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });
      const interfaceId = updated.interfaceId;
      const screenshotPath = join(publicDir, "screenshots", interfaceId, `${updated.runId}__${viewport.key}.png`);
      const targetUrl = `${server.origin}${updated.artifacts.preview}`;

      await mkdir(join(publicDir, "screenshots", interfaceId), { recursive: true });
      await page.goto(targetUrl, {
        waitUntil: "networkidle",
        timeout: 20000,
      });
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await page.close();

      updated.artifacts[`${viewport.key}Screenshot`] = publicUrlFor(screenshotPath);
      updated.screenshots[viewport.key] = {
        width: viewport.width,
        height: viewport.height,
        path: publicUrlFor(screenshotPath),
        capturedAt: new Date().toISOString(),
      };
    }
  } finally {
    await browser.close();
    if (ownedServer) {
      await ownedServer.close();
    }
  }

  await writeJson(resultPath, updated);
  return updated;
}

async function main() {
  const args = parseArgs();
  const interfaceFilter = args.interface;
  const runFilter = args.run;
  const results = await loadResultManifests();
  const targets = results.filter((result) => {
    if (result.status !== "complete") {
      return false;
    }

    const interfaceId = result.interfaceId;

    if (interfaceFilter && interfaceId !== interfaceFilter) {
      return false;
    }

    if (runFilter && result.runId !== runFilter) {
      return false;
    }

    return true;
  });

  for (const result of targets) {
    const resultPath = join(rootDir, result.artifacts.localResultPath);
    await captureScreenshotsForResult(resultPath, result);
    console.log(`Captured screenshots for ${result.runId}`);
  }

  if (targets.length === 0) {
    console.log("No complete runs matched.");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
