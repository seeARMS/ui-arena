import { pathToFileURL } from "node:url";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  generatedResultsPath,
  generatedSourcesPath,
  loadOpenRouterModels,
  loadResultManifests,
  publicResultsIndexPath,
  rootDir,
  toRepoPath,
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
    artifacts: {
      preview: result.artifacts?.preview ?? null,
      source: result.artifacts?.source ?? null,
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

async function main() {
  const [models, results] = await Promise.all([loadOpenRouterModels(), loadResultManifests()]);
  const compactResults = results.map(compactResult);
  const generatedAt = compactResults[0]?.completedAt ?? null;
  const compactModels = models.map(compactModel);
  const sourceEntries = await Promise.all(
    results.map(async (result) => {
      const source = await sourceForResult(result);

      if (!source || !result.interfaceId) {
        return null;
      }

      return [`${result.interfaceId}/${result.runId}`, source];
    }),
  );
  const moduleSource = `export const generatedAt = ${JSON.stringify(generatedAt)};\nexport const generatedModelSlots = ${JSON.stringify(
    compactModels,
    null,
    2,
  )};\nexport const generatedResults = ${JSON.stringify(compactResults, null, 2)};\n`;
  const sourcesModuleSource = `export const generatedSources = ${JSON.stringify(
    Object.fromEntries(sourceEntries.filter(Boolean)),
    null,
    2,
  )};\n`;

  await writeText(generatedResultsPath, moduleSource);
  await writeText(generatedSourcesPath, sourcesModuleSource);
  await writeJson(publicResultsIndexPath, {
    generatedAt,
    models: compactModels,
    results: compactResults,
  });

  console.log(`Indexed ${compactResults.length} run(s) into ${toRepoPath(generatedResultsPath)}`);
  console.log(`Wrote source module to ${toRepoPath(generatedSourcesPath)}`);
  console.log(`Wrote public result index to ${toRepoPath(publicResultsIndexPath)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
