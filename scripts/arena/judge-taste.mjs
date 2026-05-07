import { createHash } from "node:crypto";
import { mkdir, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { pathToFileURL } from "node:url";

import {
  generatedTastePath,
  loadInterfacePrompt,
  loadResultManifests,
  parseArgs,
  publicDir,
  publicTasteIndexPath,
  readJson,
  rootDir,
  sha256,
  tasteDir,
  toRepoPath,
  writeJson,
  writeText,
} from "./shared.mjs";

const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const RUBRIC_VERSION = "taste-v1";
const DEFAULT_JUDGES = [
  "openai/gpt-5.5",
  "anthropic/claude-opus-4.6",
  "google/gemini-3.1-pro-preview",
];
const CHEAP_JUDGES = ["google/gemini-3.1-flash-lite-preview"];
const DEFAULT_VIEWPORTS = ["desktop", "mobile"];
const DEFAULT_BOOTSTRAP_SAMPLES = 1000;
const BT_ITERATIONS = 900;
const BT_STEP = 0.08;
const BT_L2 = 0.08;

function listArg(value) {
  if (!value || value === true) return null;
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function boolArg(value) {
  return value === true || value === "true" || value === "1";
}

function intArg(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function safeJudgeKey(judge) {
  return String(judge).replace(/[^a-z0-9._-]+/gi, "_");
}

function percentile(values, p) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * p;
  const low = Math.floor(index);
  const high = Math.ceil(index);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (index - low);
}

function round(value, digits = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function sigmoid(value) {
  if (value > 35) return 1;
  if (value < -35) return 0;
  return 1 / (1 + Math.exp(-value));
}

function rngFromSeed(seed) {
  let state = Number.parseInt(sha256(seed).slice(0, 8), 16) >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hashBuffer(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function dataUrlForScreenshot(path, buffer) {
  const extension = extname(path).toLowerCase();
  const mime = extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/png";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

function publicArtifactPath(publicUrl) {
  if (!publicUrl || !String(publicUrl).startsWith("/")) return null;
  return join(publicDir, String(publicUrl).replace(/^\//, ""));
}

function artifactForViewport(result, viewport) {
  if (viewport === "desktop") return result.artifacts?.desktopScreenshot;
  if (viewport === "mobile") return result.artifacts?.mobileScreenshot;
  return result.artifacts?.[`${viewport}Screenshot`];
}

async function screenshotBundleForResult(result, viewports) {
  const screenshots = [];

  for (const viewport of viewports) {
    const publicUrl = artifactForViewport(result, viewport);
    const filePath = publicArtifactPath(publicUrl);

    if (!filePath) return null;

    const buffer = await readFile(filePath).catch(() => null);
    if (!buffer) return null;

    screenshots.push({
      viewport,
      publicUrl,
      filePath,
      sha256: hashBuffer(buffer),
      dataUrl: dataUrlForScreenshot(filePath, buffer),
    });
  }

  return screenshots;
}

function latestCompletedResults(results, interfaceIds, modelIds = null) {
  const modelFilter = modelIds ? new Set(modelIds) : null;
  const interfaceFilter = interfaceIds ? new Set(interfaceIds) : null;
  const latest = new Map();

  for (const result of results) {
    if (result.status !== "complete") continue;
    if (!result.interfaceId || !result.modelId || !result.runId) continue;
    if (interfaceFilter && !interfaceFilter.has(result.interfaceId)) continue;
    if (modelFilter && !modelFilter.has(result.modelId)) continue;

    const key = `${result.interfaceId}/${result.modelId}`;
    const current = latest.get(key);
    const resultTime = String(result.completedAt ?? result.createdAt ?? "");
    const currentTime = String(current?.completedAt ?? current?.createdAt ?? "");

    if (!current || resultTime > currentTime) {
      latest.set(key, result);
    }
  }

  return [...latest.values()].sort((a, b) => {
    const scenarioCompare = a.interfaceId.localeCompare(b.interfaceId);
    return scenarioCompare || a.modelId.localeCompare(b.modelId);
  });
}

function pairsForScenario(results) {
  const sorted = [...results].sort((a, b) => a.modelId.localeCompare(b.modelId));
  const pairs = [];

  for (let i = 0; i < sorted.length; i += 1) {
    for (let j = i + 1; j < sorted.length; j += 1) {
      pairs.push({ resultA: sorted[i], resultB: sorted[j] });
    }
  }

  return pairs;
}

function comparisonHash({ resultA, resultB, screenshotsA, screenshotsB, viewports }) {
  return sha256(
    [
      RUBRIC_VERSION,
      resultA.interfaceId,
      resultA.modelId,
      resultA.runId,
      resultB.modelId,
      resultB.runId,
      viewports.join(","),
      ...screenshotsA.map((item) => item.sha256),
      ...screenshotsB.map((item) => item.sha256),
    ].join("|"),
  ).slice(0, 16);
}

function sideAssignment(comparisonId, judge, resultA, resultB) {
  const swap = Number.parseInt(sha256(`${comparisonId}|${judge}`).slice(0, 8), 16) % 2 === 1;
  return {
    left: swap ? resultB : resultA,
    right: swap ? resultA : resultB,
    leftLabel: "A",
    rightLabel: "B",
  };
}

function extractJsonObject(content) {
  const text = Array.isArray(content)
    ? content.map((item) => item?.text ?? "").join("\n")
    : String(content ?? "");
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : text.trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Judge response did not contain a JSON object.");
  }

  return JSON.parse(candidate.slice(start, end + 1));
}

function normalizeWinner(value) {
  const winner = String(value ?? "").trim().toLowerCase();
  if (["a", "left", "design a"].includes(winner)) return "A";
  if (["b", "right", "design b"].includes(winner)) return "B";
  if (["tie", "draw", "neither", "equal"].includes(winner)) return "tie";
  throw new Error(`Invalid winner: ${value}`);
}

function buildJudgeMessages({ prompt, screenshotsByModel, assignment }) {
  const content = [
    {
      type: "text",
      text: [
        "Scenario brief:",
        prompt.trim(),
        "",
        "Task: Compare Design A and Design B. Decide which interface has better product taste for this exact brief.",
        "",
        "Taste means brief fit, information hierarchy, typography, spacing rhythm, color/material restraint, polish, completeness, responsive judgment, and practical usability. Penalize generic SaaS-template energy, decorative excess, weak hierarchy, poor density for operational tools, inaccessible contrast when visible, and designs that ignore the brief.",
        "",
        "Return JSON only with this shape:",
        "{\"winner\":\"A|B|tie\",\"confidence\":0.0,\"rationale\":\"one concise sentence\",\"dimensions\":{\"briefFit\":\"A|B|tie\",\"hierarchy\":\"A|B|tie\",\"typography\":\"A|B|tie\",\"spacing\":\"A|B|tie\",\"color\":\"A|B|tie\",\"polish\":\"A|B|tie\",\"usability\":\"A|B|tie\"}}",
      ].join("\n"),
    },
  ];

  for (const side of [
    { label: "A", result: assignment.left },
    { label: "B", result: assignment.right },
  ]) {
    const screenshots = screenshotsByModel.get(side.result.modelId) ?? [];
    content.push({ type: "text", text: `Design ${side.label}: ${screenshots.map((s) => s.viewport).join(" and ")} screenshot(s).` });
    for (const screenshot of screenshots) {
      content.push({
        type: "image_url",
        image_url: { url: screenshot.dataUrl },
      });
    }
  }

  return [
    {
      role: "system",
      content: "You are a senior product design critic judging blinded UI benchmark entries. You are strict, comparative, and brief-fit oriented.",
    },
    {
      role: "user",
      content,
    },
  ];
}

async function callOpenRouterJudge({ apiKey, judge, messages, timeoutMs }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(OPENROUTER_CHAT_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.UI_ARENA_SITE_URL ?? "https://uiarena.armstr.ng",
        "X-Title": process.env.UI_ARENA_APP_NAME ?? "TasteBench",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: judge,
        messages,
        temperature: 0,
        max_tokens: 700,
      }),
    });

    const responseText = await response.text();
    let responseJson = null;

    try {
      responseJson = JSON.parse(responseText);
    } catch {
      throw new Error(`OpenRouter returned non-JSON response: ${responseText.slice(0, 300)}`);
    }

    if (!response.ok) {
      throw new Error(responseJson?.error?.message ?? `OpenRouter request failed with ${response.status}`);
    }

    const choice = responseJson.choices?.[0];
    const content = choice?.message?.content;
    const parsed = extractJsonObject(content);

    return {
      parsed,
      raw: responseJson,
      usage: responseJson.usage ?? null,
      finishReason: choice?.finish_reason ?? null,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function dryRunJudgment({ comparisonId, assignment }) {
  const value = Number.parseInt(sha256(`${comparisonId}|dry-run`).slice(0, 8), 16) % 9;
  const winner = value === 0 ? "tie" : value % 2 === 0 ? "A" : "B";
  const preferred = winner === "tie" ? "tie" : winner === "A" ? assignment.left.modelDisplayName : assignment.right.modelDisplayName;

  return {
    parsed: {
      winner,
      confidence: winner === "tie" ? 0.5 : 0.72,
      rationale: winner === "tie"
        ? "Dry-run fixture marked the entries as closely matched."
        : `Dry-run fixture preferred ${preferred} for clearer hierarchy and polish.`,
      dimensions: {
        briefFit: winner,
        hierarchy: winner,
        typography: winner,
        spacing: winner,
        color: winner === "tie" ? "tie" : winner,
        polish: winner,
        usability: winner,
      },
    },
    raw: null,
    usage: null,
    finishReason: "dry-run",
  };
}

function compactDimensions(dimensions) {
  const keys = ["briefFit", "hierarchy", "typography", "spacing", "color", "polish", "usability"];
  return Object.fromEntries(
    keys.map((key) => {
      try {
        return [key, normalizeWinner(dimensions?.[key])];
      } catch {
        return [key, "tie"];
      }
    }),
  );
}

function winnerModelIdFor(winner, assignment) {
  if (winner === "tie") return null;
  return winner === "A" ? assignment.left.modelId : assignment.right.modelId;
}

function comparisonOutcomeForModelA(vote) {
  if (vote.winner === "tie") return 0.5;
  return vote.winnerModelId === vote.models.a.modelId ? 1 : 0;
}

function fitBradleyTerry(votes, modelIds) {
  if (modelIds.length === 0) return new Map();
  if (modelIds.length === 1) return new Map([[modelIds[0], 0]]);

  const indexByModel = new Map(modelIds.map((modelId, index) => [modelId, index]));
  const betas = new Array(modelIds.length).fill(0);

  for (let iteration = 0; iteration < BT_ITERATIONS; iteration += 1) {
    const gradients = new Array(modelIds.length).fill(0);

    for (const vote of votes) {
      const i = indexByModel.get(vote.models.a.modelId);
      const j = indexByModel.get(vote.models.b.modelId);
      if (i === undefined || j === undefined) continue;

      const y = comparisonOutcomeForModelA(vote);
      const p = sigmoid(betas[i] - betas[j]);
      const delta = y - p;
      gradients[i] += delta;
      gradients[j] -= delta;
    }

    for (let i = 0; i < betas.length; i += 1) {
      gradients[i] -= BT_L2 * betas[i];
      betas[i] += BT_STEP * gradients[i] / Math.sqrt(iteration + 1);
    }

    const mean = betas.reduce((sum, value) => sum + value, 0) / betas.length;
    for (let i = 0; i < betas.length; i += 1) {
      betas[i] -= mean;
    }
  }

  return new Map(modelIds.map((modelId, index) => [modelId, betas[index]]));
}

function scoresFromBetas(betas, modelIds) {
  return new Map(
    modelIds.map((modelId) => {
      const opponents = modelIds.filter((id) => id !== modelId);
      if (opponents.length === 0) return [modelId, 50];

      const beta = betas.get(modelId) ?? 0;
      const expected = opponents.reduce((sum, opponentId) => {
        return sum + sigmoid(beta - (betas.get(opponentId) ?? 0));
      }, 0) / opponents.length;

      return [modelId, expected * 100];
    }),
  );
}

function voteRecordCounts(votes, modelIds) {
  const counts = new Map(
    modelIds.map((modelId) => [
      modelId,
      { wins: 0, losses: 0, ties: 0, votes: 0, comparisons: new Set() },
    ]),
  );

  for (const vote of votes) {
    const a = vote.models.a.modelId;
    const b = vote.models.b.modelId;
    const aCounts = counts.get(a);
    const bCounts = counts.get(b);
    if (!aCounts || !bCounts) continue;

    aCounts.votes += 1;
    bCounts.votes += 1;
    aCounts.comparisons.add(vote.comparisonId);
    bCounts.comparisons.add(vote.comparisonId);

    if (vote.winner === "tie") {
      aCounts.ties += 1;
      bCounts.ties += 1;
    } else if (vote.winnerModelId === a) {
      aCounts.wins += 1;
      bCounts.losses += 1;
    } else if (vote.winnerModelId === b) {
      bCounts.wins += 1;
      aCounts.losses += 1;
    }
  }

  return counts;
}

function bootstrapIntervals(votes, modelIds, samples, seed) {
  const intervals = new Map(modelIds.map((modelId) => [modelId, []]));
  if (votes.length === 0 || samples <= 0) return intervals;

  const random = rngFromSeed(seed);

  for (let sample = 0; sample < samples; sample += 1) {
    const resampled = new Array(votes.length);
    for (let i = 0; i < votes.length; i += 1) {
      resampled[i] = votes[Math.floor(random() * votes.length)];
    }
    const betas = fitBradleyTerry(resampled, modelIds);
    const scores = scoresFromBetas(betas, modelIds);

    for (const modelId of modelIds) {
      intervals.get(modelId)?.push(scores.get(modelId) ?? 50);
    }
  }

  return intervals;
}

function summarizeScenario({ interfaceId, votes, latestByScenarioModel, bootstrapSamples }) {
  const modelIds = [
    ...new Set(
      votes.flatMap((vote) => [vote.models.a.modelId, vote.models.b.modelId]),
    ),
  ].sort();
  const betas = fitBradleyTerry(votes, modelIds);
  const scores = scoresFromBetas(betas, modelIds);
  const counts = voteRecordCounts(votes, modelIds);
  const intervals = bootstrapIntervals(votes, modelIds, bootstrapSamples, `${interfaceId}|${votes.length}`);
  const models = {};

  for (const modelId of modelIds) {
    const count = counts.get(modelId) ?? { wins: 0, losses: 0, ties: 0, votes: 0, comparisons: new Set() };
    const bootstrapScores = intervals.get(modelId) ?? [];
    const latest = latestByScenarioModel.get(`${interfaceId}/${modelId}`);

    models[modelId] = {
      modelId,
      runId: latest?.runId ?? null,
      score: round(scores.get(modelId) ?? 50, 1),
      ciLow: round(percentile(bootstrapScores, 0.025), 1),
      ciHigh: round(percentile(bootstrapScores, 0.975), 1),
      beta: round(betas.get(modelId) ?? 0, 3),
      wins: count.wins,
      losses: count.losses,
      ties: count.ties,
      votes: count.votes,
      comparisons: count.comparisons.size,
      provisional: count.votes < 50,
    };
  }

  return {
    interfaceId,
    status: votes.length > 0 ? "scored" : "empty",
    votes: votes.length,
    comparisons: new Set(votes.map((vote) => vote.comparisonId)).size,
    models,
  };
}

function summarizeGlobalModels(scenarios) {
  const byModel = new Map();

  for (const scenario of Object.values(scenarios)) {
    for (const model of Object.values(scenario.models ?? {})) {
      const bucket = byModel.get(model.modelId) ?? {
        modelId: model.modelId,
        scenarioScores: [],
        scenarioCiLow: [],
        scenarioCiHigh: [],
        scenarios: 0,
        votes: 0,
        comparisons: 0,
        wins: 0,
        losses: 0,
        ties: 0,
      };

      bucket.scenarioScores.push(model.score);
      if (typeof model.ciLow === "number") bucket.scenarioCiLow.push(model.ciLow);
      if (typeof model.ciHigh === "number") bucket.scenarioCiHigh.push(model.ciHigh);
      bucket.scenarios += 1;
      bucket.votes += model.votes;
      bucket.comparisons += model.comparisons;
      bucket.wins += model.wins;
      bucket.losses += model.losses;
      bucket.ties += model.ties;
      byModel.set(model.modelId, bucket);
    }
  }

  return Object.fromEntries(
    [...byModel.entries()].map(([modelId, bucket]) => {
      const score = bucket.scenarioScores.reduce((sum, value) => sum + value, 0) / bucket.scenarioScores.length;
      const ciLow = bucket.scenarioCiLow.length
        ? bucket.scenarioCiLow.reduce((sum, value) => sum + value, 0) / bucket.scenarioCiLow.length
        : null;
      const ciHigh = bucket.scenarioCiHigh.length
        ? bucket.scenarioCiHigh.reduce((sum, value) => sum + value, 0) / bucket.scenarioCiHigh.length
        : null;

      return [
        modelId,
        {
          modelId,
          score: round(score, 1),
          ciLow: round(ciLow, 1),
          ciHigh: round(ciHigh, 1),
          scenarios: bucket.scenarios,
          votes: bucket.votes,
          comparisons: bucket.comparisons,
          wins: bucket.wins,
          losses: bucket.losses,
          ties: bucket.ties,
          provisional: bucket.scenarios < 3 || bucket.votes < 50,
        },
      ];
    }),
  );
}

function compactVoteForPublic(vote) {
  return {
    comparisonId: vote.comparisonId,
    interfaceId: vote.interfaceId,
    judge: vote.judge,
    modelA: vote.models.a.modelId,
    runA: vote.models.a.runId,
    modelB: vote.models.b.modelId,
    runB: vote.models.b.runId,
    winner: vote.winner,
    winnerModelId: vote.winnerModelId,
    confidence: vote.confidence,
    rationale: vote.rationale,
    completedAt: vote.completedAt,
  };
}

async function walkJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkJsonFiles(path));
    } else if (entry.name.endsWith(".json")) {
      files.push(path);
    }
  }

  return files;
}

async function loadTasteVotes() {
  const files = await walkJsonFiles(join(tasteDir, "votes"));
  const entries = await Promise.all(
    files.map(async (file) => {
      try {
        return await readJson(file);
      } catch {
        return null;
      }
    }),
  );

  return entries.filter((entry) => entry?.status === "complete");
}

function currentVotesOnly(votes, latestByScenarioModel) {
  return votes.filter((vote) => {
    const latestA = latestByScenarioModel.get(`${vote.interfaceId}/${vote.models?.a?.modelId}`);
    const latestB = latestByScenarioModel.get(`${vote.interfaceId}/${vote.models?.b?.modelId}`);
    return latestA?.runId === vote.models?.a?.runId && latestB?.runId === vote.models?.b?.runId;
  });
}

async function buildTasteIndex({ bootstrapSamples = DEFAULT_BOOTSTRAP_SAMPLES } = {}) {
  const results = await loadResultManifests();
  const latestResults = latestCompletedResults(results, null, null);
  const latestByScenarioModel = new Map(
    latestResults.map((result) => [`${result.interfaceId}/${result.modelId}`, result]),
  );
  const votes = currentVotesOnly(await loadTasteVotes(), latestByScenarioModel);
  const votesByScenario = new Map();

  for (const vote of votes) {
    const scenarioVotes = votesByScenario.get(vote.interfaceId) ?? [];
    scenarioVotes.push(vote);
    votesByScenario.set(vote.interfaceId, scenarioVotes);
  }

  const scenarios = {};
  for (const [interfaceId, scenarioVotes] of [...votesByScenario.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    scenarios[interfaceId] = summarizeScenario({
      interfaceId,
      votes: scenarioVotes,
      latestByScenarioModel,
      bootstrapSamples,
    });
  }

  return {
    schemaVersion: 1,
    rubricVersion: RUBRIC_VERSION,
    generatedAt: new Date().toISOString(),
    bootstrapSamples,
    scenarios,
    models: summarizeGlobalModels(scenarios),
    votes: votes.map(compactVoteForPublic).sort((a, b) => String(b.completedAt).localeCompare(String(a.completedAt))),
  };
}

async function writeTasteArtifacts(tasteIndex) {
  await writeJson(join(tasteDir, "taste.json"), tasteIndex);
  await writeJson(publicTasteIndexPath, tasteIndex);
  await writeText(generatedTastePath, `export const generatedTaste = ${JSON.stringify(tasteIndex, null, 2)};\n`);
}

async function judgePair({ pair, prompt, judge, apiKey, dryRun, force, timeoutMs, viewports }) {
  const [screenshotsA, screenshotsB] = await Promise.all([
    screenshotBundleForResult(pair.resultA, viewports),
    screenshotBundleForResult(pair.resultB, viewports),
  ]);

  if (!screenshotsA || !screenshotsB) {
    console.log(`Skipped ${pair.resultA.interfaceId}: missing screenshots for ${pair.resultA.modelId} vs ${pair.resultB.modelId}`);
    return null;
  }

  const comparisonId = comparisonHash({
    resultA: pair.resultA,
    resultB: pair.resultB,
    screenshotsA,
    screenshotsB,
    viewports,
  });
  const judgeKey = safeJudgeKey(judge);
  const votePath = join(tasteDir, "votes", pair.resultA.interfaceId, `${comparisonId}__${judgeKey}.json`);

  if (!force) {
    const cached = await readJson(votePath).catch(() => null);
    if (cached?.status === "complete") {
      console.log(`Cached taste vote ${pair.resultA.interfaceId}/${comparisonId} ${judge}`);
      return cached;
    }
  }

  const assignment = sideAssignment(comparisonId, judge, pair.resultA, pair.resultB);
  const screenshotsByModel = new Map([
    [pair.resultA.modelId, screenshotsA],
    [pair.resultB.modelId, screenshotsB],
  ]);
  const startedAt = new Date();
  const startedMs = performance.now();

  try {
    const judgment = dryRun
      ? dryRunJudgment({ comparisonId, assignment })
      : await callOpenRouterJudge({
          apiKey,
          judge,
          timeoutMs,
          messages: buildJudgeMessages({ prompt, screenshotsByModel, assignment }),
        });
    const winner = normalizeWinner(judgment.parsed.winner);
    const confidence = Math.max(0, Math.min(1, Number(judgment.parsed.confidence ?? 0.5)));
    const winnerModelId = winnerModelIdFor(winner, assignment);
    const vote = {
      schemaVersion: 1,
      rubricVersion: RUBRIC_VERSION,
      status: "complete",
      comparisonId,
      interfaceId: pair.resultA.interfaceId,
      judge,
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Math.round(performance.now() - startedMs),
      viewports,
      models: {
        a: {
          modelId: pair.resultA.modelId,
          runId: pair.resultA.runId,
          displayName: pair.resultA.modelDisplayName,
          screenshotHashes: screenshotsA.map((item) => ({ viewport: item.viewport, sha256: item.sha256 })),
        },
        b: {
          modelId: pair.resultB.modelId,
          runId: pair.resultB.runId,
          displayName: pair.resultB.modelDisplayName,
          screenshotHashes: screenshotsB.map((item) => ({ viewport: item.viewport, sha256: item.sha256 })),
        },
      },
      sides: {
        A: {
          modelId: assignment.left.modelId,
          runId: assignment.left.runId,
        },
        B: {
          modelId: assignment.right.modelId,
          runId: assignment.right.runId,
        },
      },
      winner,
      winnerModelId,
      confidence: round(confidence, 3),
      rationale: String(judgment.parsed.rationale ?? "").replace(/\s+/g, " ").trim().slice(0, 360),
      dimensions: compactDimensions(judgment.parsed.dimensions),
      usage: judgment.usage,
      finishReason: judgment.finishReason,
    };

    await writeJson(votePath, vote);
    console.log(`Wrote taste vote ${pair.resultA.interfaceId}/${comparisonId} ${judge}: ${winner}${winnerModelId ? ` (${winnerModelId})` : ""}`);
    return vote;
  } catch (error) {
    const failed = {
      schemaVersion: 1,
      rubricVersion: RUBRIC_VERSION,
      status: "error",
      comparisonId,
      interfaceId: pair.resultA.interfaceId,
      judge,
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Math.round(performance.now() - startedMs),
      models: {
        a: { modelId: pair.resultA.modelId, runId: pair.resultA.runId },
        b: { modelId: pair.resultB.modelId, runId: pair.resultB.runId },
      },
      error: {
        message: error.message,
        stack: error.stack,
      },
    };

    await mkdir(dirname(votePath), { recursive: true });
    await writeJson(votePath, failed);
    console.log(`Taste vote failed ${pair.resultA.interfaceId}/${comparisonId} ${judge}: ${error.message}`);
    return failed;
  }
}

async function main() {
  const args = parseArgs();
  const dryRun = boolArg(args.dryRun);
  const force = boolArg(args.force);
  const selectedModels = listArg(args.models);
  const selectedJudges = listArg(args.judges)
    ?? (boolArg(args.cheap) ? CHEAP_JUDGES : listArg(process.env.TASTEBENCH_JUDGE_MODELS) ?? DEFAULT_JUDGES);
  const viewports = listArg(args.viewports) ?? DEFAULT_VIEWPORTS;
  const bootstrapSamples = intArg(args.bootstrapSamples, DEFAULT_BOOTSTRAP_SAMPLES);
  const maxPairs = args.maxPairs ? intArg(args.maxPairs, Infinity) : Infinity;
  const timeoutMs = intArg(args.timeoutMs, 120000);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!dryRun && !apiKey) {
    throw new Error("OPENROUTER_API_KEY is required unless --dry-run is set.");
  }

  const interfaceIds = listArg(args.interface);
  if (!interfaceIds) {
    throw new Error("Pass --interface <scenario-id> for v1 taste judging.");
  }

  const allResults = await loadResultManifests();
  const latest = latestCompletedResults(allResults, interfaceIds, selectedModels);
  const resultsByScenario = new Map();

  for (const result of latest) {
    const scenarioResults = resultsByScenario.get(result.interfaceId) ?? [];
    scenarioResults.push(result);
    resultsByScenario.set(result.interfaceId, scenarioResults);
  }

  let judgedPairs = 0;

  for (const interfaceId of interfaceIds) {
    const scenarioResults = resultsByScenario.get(interfaceId) ?? [];
    const { prompt } = await loadInterfacePrompt(interfaceId);

    if (scenarioResults.length < 2) {
      console.log(`Skipped ${interfaceId}: need at least two completed runs with screenshots.`);
      continue;
    }

    const pairs = pairsForScenario(scenarioResults).slice(0, maxPairs);
    console.log(`Judging ${pairs.length} pair(s) for ${interfaceId} with ${selectedJudges.length} judge(s).`);

    for (const pair of pairs) {
      for (const judge of selectedJudges) {
        await judgePair({
          pair,
          prompt,
          judge,
          apiKey,
          dryRun,
          force,
          timeoutMs,
          viewports,
        });
      }
      judgedPairs += 1;
    }
  }

  const tasteIndex = await buildTasteIndex({ bootstrapSamples });
  await writeTasteArtifacts(tasteIndex);

  console.log(`Taste judging complete: ${judgedPairs} pair(s) processed.`);
  console.log(`Wrote ${toRepoPath(join(tasteDir, "taste.json"))}`);
  console.log(`Wrote ${toRepoPath(generatedTastePath)}`);
  console.log(`Wrote ${toRepoPath(publicTasteIndexPath)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
