import { pathToFileURL } from "node:url";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  generatedTastePath,
  generatedResultsPath,
  generatedSourcesPath,
  loadOpenRouterModels,
  loadResultManifests,
  publicResultsIndexPath,
  publicTasteIndexPath,
  rootDir,
  tasteDir,
  toRepoPath,
  readJson,
  writeJson,
  writeText,
} from "./shared.mjs";

function compactResult(result) {
  return {
    schemaVersion: result.schemaVersion,
    runId: result.runId,
    interfaceId: result.interfaceId,
    modelId: result.modelId,
    modelDisplayName: result.modelDisplayName,
    family: result.family,
    gateway: result.gateway,
    gatewayModel: result.gatewayModel,
    gatewayGenerationId: result.gatewayGenerationId ?? null,
    providerName: result.providerName ?? null,
    status: result.status,
    createdAt: result.createdAt,
    completedAt: result.completedAt,
    execution: result.execution ?? null,
    usage: result.usage ?? null,
    evaluations: result.evaluations ?? null,
    repairs: result.repairs ?? null,
    artifacts: {
      preview: result.artifacts?.preview ?? null,
      source: result.artifacts?.source ?? null,
      sourceJson: result.artifacts?.sourceJson ?? null,
      sourceFormat: result.artifacts?.sourceFormat ?? null,
      sourceFiles: result.artifacts?.sourceFiles ?? null,
      desktopScreenshot: result.artifacts?.desktopScreenshot ?? null,
      mobileScreenshot: result.artifacts?.mobileScreenshot ?? null,
    },
    error: result.error
      ? {
          phase: result.error.phase,
          message: result.error.message,
        }
      : null,
  };
}

function compactModel(model) {
  return {
    id: model.id,
    displayName: model.displayName,
    family: model.family,
    accent: model.accent,
    accentSoft: model.accentSoft,
    gatewayModel: model.model,
  };
}

async function sourceForResult(result) {
  if (!result.artifacts?.source) {
    return null;
  }

  const sourcePath = join(rootDir, "public", result.artifacts.source.replace(/^\//, ""));
  return readFile(sourcePath, "utf8").catch(() => null);
}

async function sourceFilesForResult(result, source) {
  const sourcePaths = result.artifacts?.sourceFiles;
  const localSourcePath = result.artifacts?.localSourcePath;

  if (Array.isArray(sourcePaths) && localSourcePath) {
    const entries = await Promise.all(
      sourcePaths.map(async (path) => {
        const content = await readFile(join(rootDir, localSourcePath, path), "utf8").catch(() => null);
        return content === null ? null : { path, content };
      }),
    );
    const files = entries.filter(Boolean);

    if (files.length > 0) {
      return files;
    }
  }

  return source ? [{ path: "index.html", content: source }] : null;
}

async function loadTasteIndex() {
  return readJson(join(tasteDir, "taste.json")).catch(() => ({
    schemaVersion: 1,
    rubricVersion: "taste-v1",
    generatedAt: null,
    bootstrapSamples: 0,
    scenarios: {},
    models: {},
    votes: [],
  }));
}

async function main() {
  const [models, results, tasteIndex] = await Promise.all([
    loadOpenRouterModels(),
    loadResultManifests(),
    loadTasteIndex(),
  ]);
  const compactResults = results.map(compactResult);
  const generatedAt = compactResults[0]?.completedAt ?? null;
  const compactModels = models.map(compactModel);
  const sourceDataEntries = await Promise.all(
    results.map(async (result) => {
      const source = await sourceForResult(result);
      const files = await sourceFilesForResult(result, source);

      if (!source || !result.interfaceId) {
        return null;
      }

      return [`${result.interfaceId}/${result.runId}`, { source, files }];
    }),
  );
  const sourceData = Object.fromEntries(sourceDataEntries.filter(Boolean));
  const moduleSource = `export const generatedAt = ${JSON.stringify(generatedAt)};\nexport const generatedModelSlots = ${JSON.stringify(
    compactModels,
    null,
    2,
  )};\nexport const generatedResults = ${JSON.stringify(compactResults, null, 2)};\n`;
  const sourcesModuleSource = `export const generatedSources = ${JSON.stringify(
    Object.fromEntries(Object.entries(sourceData).map(([key, value]) => [key, value.source])),
    null,
    2,
  )};\nexport const generatedSourceFiles = ${JSON.stringify(
    Object.fromEntries(Object.entries(sourceData).map(([key, value]) => [key, value.files])),
    null,
    2,
  )};\n`;
  const tasteModuleSource = `export const generatedTaste = ${JSON.stringify(tasteIndex, null, 2)};\n`;

  await writeText(generatedResultsPath, moduleSource);
  await writeText(generatedSourcesPath, sourcesModuleSource);
  await writeText(generatedTastePath, tasteModuleSource);
  await writeJson(publicResultsIndexPath, {
    generatedAt,
    models: compactModels,
    results: compactResults,
  });
  await writeJson(publicTasteIndexPath, tasteIndex);

  console.log(`Indexed ${compactResults.length} run(s) into ${toRepoPath(generatedResultsPath)}`);
  console.log(`Wrote source module to ${toRepoPath(generatedSourcesPath)}`);
  console.log(`Wrote taste module to ${toRepoPath(generatedTastePath)}`);
  console.log(`Wrote public result index to ${toRepoPath(publicResultsIndexPath)}`);
  console.log(`Wrote public taste index to ${toRepoPath(publicTasteIndexPath)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
