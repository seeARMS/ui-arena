import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  arenaDir,
  loadResultManifests,
  parseArgs,
  publicDir,
  publicUrlFor,
  readJson,
  rootDir,
  toRepoPath,
  writeJson,
} from "./shared.mjs";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function selectedEvaluatorSet(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Set) {
    return value;
  }

  if (Array.isArray(value)) {
    return new Set(value);
  }

  return new Set(String(value).split(",").map((item) => item.trim()).filter(Boolean));
}

function publicFileForRequest(pathname) {
  const normalizedPathname = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  const filePath = resolve(publicDir, `.${decodeURIComponent(normalizedPathname)}`);
  const publicRelativePath = relative(publicDir, filePath);

  if (publicRelativePath.startsWith("..") || isAbsolute(publicRelativePath)) {
    return null;
  }

  return filePath;
}

export async function startPublicPreviewServer() {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      const filePath = publicFileForRequest(requestUrl.pathname);

      if (!filePath) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": MIME_TYPES[extname(filePath)] ?? "application/octet-stream",
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", rejectListen);
      resolveListen();
    });
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;

  if (!port) {
    throw new Error("Could not start local preview server.");
  }

  return {
    origin: `http://127.0.0.1:${port}`,
    async close() {
      await new Promise((resolveClose, rejectClose) => {
        server.close((error) => (error ? rejectClose(error) : resolveClose()));
      });
    },
  };
}

async function loadEvaluatorDefinitions(selectedIds = null) {
  const manifest = await readJson(join(arenaDir, "evaluators", "manifest.json"));
  const evaluators = (manifest.evaluators ?? [])
    .filter((evaluator) => evaluator.enabled !== false)
    .filter((evaluator) => !selectedIds || selectedIds.has(evaluator.id));

  if (evaluators.length === 0) {
    throw new Error("No enabled evaluators matched.");
  }

  return Promise.all(
    evaluators.map(async (definition) => {
      const moduleUrl = new URL(`./evaluators/${definition.module}`, import.meta.url);
      const module = await import(moduleUrl.href);

      if (typeof module.runEvaluation !== "function") {
        throw new Error(`Evaluator ${definition.id} does not export runEvaluation().`);
      }

      return { definition, module };
    }),
  );
}

function compactEvaluation(evaluation) {
  return {
    id: evaluation.id,
    displayName: evaluation.displayName,
    status: evaluation.status,
    version: evaluation.version ?? null,
    completedAt: evaluation.completedAt,
    durationMs: evaluation.durationMs,
    scores: evaluation.scores ?? null,
    metrics: evaluation.metrics ?? null,
    summary: evaluation.summary ?? null,
    issues: (evaluation.issues ?? []).slice(0, 8),
    artifacts: evaluation.artifacts ?? {},
    error: evaluation.error ?? null,
  };
}

async function runSingleEvaluator({ evaluator, result, targetUrl }) {
  const { definition, module } = evaluator;
  const startedAt = new Date();
  const startedMs = performance.now();
  const publicOutputDir = join(publicDir, "evaluations", result.interfaceId, result.runId, definition.id);

  await mkdir(publicOutputDir, { recursive: true });

  try {
    const payload = await module.runEvaluation({
      evaluator: definition,
      result,
      targetUrl,
      outputDir: publicOutputDir,
      publicOutputUrl: `${publicUrlFor(publicOutputDir)}/`,
    });

    return {
      schemaVersion: 1,
      id: definition.id,
      displayName: definition.displayName,
      description: definition.description ?? null,
      categories: definition.categories ?? [],
      status: "complete",
      version: payload.version ?? null,
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Math.round(performance.now() - startedMs),
      scores: payload.scores ?? null,
      metrics: payload.metrics ?? null,
      summary: payload.summary ?? null,
      issues: payload.issues ?? [],
      artifacts: payload.artifacts ?? {},
    };
  } catch (error) {
    return {
      schemaVersion: 1,
      id: definition.id,
      displayName: definition.displayName,
      description: definition.description ?? null,
      categories: definition.categories ?? [],
      status: "error",
      version: null,
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Math.round(performance.now() - startedMs),
      scores: null,
      metrics: null,
      summary: null,
      issues: [],
      artifacts: {},
      error: {
        message: error.message,
        stack: error.stack,
      },
    };
  }
}

export async function evaluateResult({ resultPath, result, selectedEvaluatorIds = null, serverContext = null }) {
  if (result.status !== "complete") {
    throw new Error(`Cannot evaluate incomplete run ${result.runId}.`);
  }

  if (!result.artifacts?.preview) {
    throw new Error(`Cannot evaluate run ${result.runId} without a preview artifact.`);
  }

  const selectedIds = selectedEvaluatorSet(selectedEvaluatorIds);
  const evaluators = await loadEvaluatorDefinitions(selectedIds);
  const ownedServer = serverContext ? null : await startPublicPreviewServer();
  const server = serverContext ?? ownedServer;
  const targetUrl = `${server.origin}${result.artifacts.preview}`;
  const runEvaluationsDir = join(rootDir, "arena", "runs", result.interfaceId, result.runId, "evaluations");
  const updated = structuredClone(result);

  try {
    updated.evaluations = updated.evaluations ?? {};

    for (const evaluator of evaluators) {
      const evaluation = await runSingleEvaluator({ evaluator, result: updated, targetUrl });
      await writeJson(join(runEvaluationsDir, `${evaluation.id}.json`), evaluation);
      updated.evaluations[evaluation.id] = compactEvaluation(evaluation);

      const label = evaluation.status === "complete" ? "Evaluated" : "Evaluation failed";
      console.log(`${label} ${result.interfaceId}/${result.runId} with ${evaluation.displayName}`);
    }

    await writeJson(resultPath, updated);
    return updated;
  } finally {
    if (ownedServer) {
      await ownedServer.close();
    }
  }
}

async function main() {
  const args = parseArgs();
  const selectedEvaluatorIds = args.evaluators ?? null;
  const results = await loadResultManifests();
  const targets = results.filter((result) => {
    if (result.status !== "complete" || !result.artifacts?.preview) {
      return false;
    }

    if (args.interface && result.interfaceId !== args.interface) {
      return false;
    }

    if (args.run && result.runId !== args.run) {
      return false;
    }

    return true;
  });

  if (targets.length === 0) {
    console.log("No complete runs matched.");
    return;
  }

  const serverContext = await startPublicPreviewServer();

  try {
    for (const result of targets) {
      const resultPath = join(rootDir, result.artifacts.localResultPath);
      await evaluateResult({ resultPath, result, selectedEvaluatorIds, serverContext });
      console.log(`Wrote evaluations for ${toRepoPath(resultPath)}`);
    }
  } finally {
    await serverContext.close();
  }

  console.log("Evaluation complete. Rebuild the static index with `npm run arena:index`.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
