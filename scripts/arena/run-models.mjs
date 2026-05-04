import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { captureScreenshotsForResult } from "./capture-screenshots.mjs";
import { evaluateResult } from "./evaluate-results.mjs";
import {
  loadInterfacePrompt,
  loadOpenRouterModels,
  parseArgs,
  publicDir,
  publicUrlFor,
  rootDir,
  safeTimestamp,
  sha256,
  toRepoPath,
  writeJson,
  writeText,
} from "./shared.mjs";

const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_GENERATION_URL = "https://openrouter.ai/api/v1/generation";
const DEFAULT_INTERFACE = "pricing-ai-coding-assistant";
const PREVIEW_CSP = [
  "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'",
  "script-src * data: blob: 'unsafe-inline' 'unsafe-eval'",
  "style-src * data: blob: 'unsafe-inline'",
  "img-src * data: blob:",
  "font-src * data: blob:",
  "connect-src * data: blob:",
  "media-src * data: blob:",
  "worker-src * data: blob:",
  "frame-src * data: blob:",
  "object-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join("; ");

const REACT_UMD_SCRIPT = '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>';
const REACT_DOM_UMD_SCRIPT = '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>';
const BABEL_STANDALONE_SCRIPT = '<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>';

function promptUsesReactRuntime(prompt) {
  return /React 18/i.test(prompt) || /esm\.sh\/react/i.test(prompt) || /@babel\/standalone/i.test(prompt);
}

function buildMessages({ interfacePrompt, prompt }) {
  const usesReactRuntime = promptUsesReactRuntime(prompt);
  return [
    {
      role: "system",
      content: [
        "You are participating in UI Arena, a gallery of AI-generated product interface examples.",
        "Return exactly one complete static HTML document.",
        usesReactRuntime
          ? "The scenario may use browser-global React 18 scripts from unpkg plus Babel Standalone. Keep all app code, CSS, data, and assets inside the HTML document."
          : "The document must include all CSS and JavaScript inline.",
        usesReactRuntime
          ? "Do not use external fonts, images, analytics, API calls, or any network requests beyond runtime CDNs needed by the static preview."
          : "Do not use external fonts, images, scripts, stylesheets, CDNs, analytics, or network requests.",
        "The output must work by opening index.html directly in a browser.",
        "Do not include explanations outside the HTML.",
      ].join("\n"),
    },
    {
      role: "user",
      content: [
        `Interface prompt: ${interfacePrompt.title}`,
        `Category: ${interfacePrompt.category}`,
        "",
        prompt.trim(),
        "Implementation requirements:",
        "- Build a production-quality product interface, not a marketing explanation.",
        "- Use semantic HTML and accessible controls.",
        "- Make it responsive from mobile to desktop.",
        "- Include realistic copy, states, and content needed for the interface.",
        "- Keep it self-contained in one index.html file.",
        usesReactRuntime
          ? "- If you use JSX, load React globals with unpkg UMD scripts before Babel: react@18/umd/react.production.min.js, react-dom@18/umd/react-dom.production.min.js, then @babel/standalone/babel.min.js."
          : "",
      ].join("\n"),
    },
  ];
}

function extractHtml(content) {
  const trimmed = String(content ?? "").trim();
  const fenced = trimmed.match(/```(?:html)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.search(/<!doctype html|<html[\s>]/i);

  if (start === -1) {
    throw new Error("Model response did not contain a complete HTML document.");
  }

  const html = candidate.slice(start);
  const end = html.toLowerCase().lastIndexOf("</html>");

  if (end === -1) {
    throw new Error("Model response did not include a closing </html> tag; the output was likely truncated.");
  }

  return html.slice(0, end + "</html>".length);
}

function normalizeReactRuntime(html) {
  return html
    .replace(/<script\b[^>]*src=["']https:\/\/esm\.sh\/react@18[^"']*["'][^>]*>\s*<\/script>/gi, REACT_UMD_SCRIPT)
    .replace(/<script\b[^>]*src=["']https:\/\/esm\.sh\/react-dom@18\/client[^"']*["'][^>]*>\s*<\/script>/gi, REACT_DOM_UMD_SCRIPT)
    .replace(/<script\b[^>]*src=["']https:\/\/unpkg\.com\/@babel\/standalone(?:\/babel\.min\.js)?["'][^>]*>\s*<\/script>/gi, BABEL_STANDALONE_SCRIPT);
}

function injectPreviewCsp(html) {
  const meta = `<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">`;
  const withoutExistingCsp = html.replace(
    /<meta\s+[^>]*http-equiv=(["'])Content-Security-Policy\1[^>]*>\s*/gi,
    "",
  );

  if (/<head[^>]*>/i.test(withoutExistingCsp)) {
    return withoutExistingCsp.replace(/<head[^>]*>/i, (match) => `${match}\n    ${meta}`);
  }

  return withoutExistingCsp.replace(/<html[^>]*>/i, (match) => `${match}\n<head>\n    ${meta}\n</head>`);
}

function htmlForDryRun({ interfacePrompt, model }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${interfacePrompt.title} - ${model.displayName}</title>
    <style>
      :root { color-scheme: light; --ink: #15120d; --paper: #fffaf0; --line: #d7cdbd; --accent: ${model.accent}; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; background: #f3efe6; color: var(--ink); font-family: Avenir Next, Segoe UI, sans-serif; }
      main { max-width: 1100px; margin: 0 auto; padding: 56px 22px; }
      header { display: flex; justify-content: space-between; gap: 24px; align-items: center; margin-bottom: 54px; }
      .mark { width: 44px; height: 44px; background: var(--accent); box-shadow: 8px 8px 0 var(--ink); }
      h1 { max-width: 780px; margin: 0 0 16px; font-family: Georgia, serif; font-size: clamp(44px, 8vw, 92px); line-height: .95; }
      p { color: #554c40; font-size: 18px; line-height: 1.55; }
      .plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 38px; }
      article { min-height: 300px; border: 1px solid var(--ink); border-radius: 8px; background: var(--paper); padding: 22px; }
      article:nth-child(2) { background: color-mix(in srgb, var(--accent) 18%, var(--paper)); transform: translateY(-12px); box-shadow: 8px 8px 0 var(--ink); }
      h2 { margin: 0 0 10px; font-size: 24px; }
      strong { display: block; margin: 20px 0; font-size: 42px; }
      ul { margin: 0; padding-left: 20px; color: #554c40; }
      button { width: 100%; min-height: 44px; margin-top: 22px; border: 1px solid var(--ink); border-radius: 6px; background: var(--ink); color: var(--paper); font-weight: 800; }
      @media (max-width: 760px) { header { align-items: flex-start; flex-direction: column; } .plans { grid-template-columns: 1fr; } article:nth-child(2) { transform: none; } }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div><div class="mark" aria-hidden="true"></div></div>
        <p>Dry-run artifact for ${model.displayName}. Replace this with a real OpenRouter run.</p>
      </header>
      <h1>Pricing built for teams shipping with AI.</h1>
      <p>A self-contained placeholder preview generated by UI Arena's dry-run mode for ${interfacePrompt.title}.</p>
      <section class="plans" aria-label="Pricing plans">
        <article><h2>Starter</h2><strong>$19</strong><ul><li>Solo coding sessions</li><li>100 agent runs</li><li>Email support</li></ul><button>Start</button></article>
        <article><h2>Team</h2><strong>$49</strong><ul><li>Shared workspaces</li><li>2,000 agent runs</li><li>Admin controls</li></ul><button>Upgrade</button></article>
        <article><h2>Enterprise</h2><strong>Custom</strong><ul><li>SAML and SCIM</li><li>Audit logs</li><li>Dedicated support</li></ul><button>Contact sales</button></article>
      </section>
    </main>
  </body>
</html>`;
}

function usageFrom({ responseJson, generation, dryRun }) {
  const usage = responseJson?.usage ?? {};
  const promptTokens = generation?.tokens_prompt ?? usage.prompt_tokens ?? null;
  const completionTokens = generation?.tokens_completion ?? usage.completion_tokens ?? null;
  const totalTokens = usage.total_tokens ?? (promptTokens !== null && completionTokens !== null ? promptTokens + completionTokens : null);
  const upstreamInferenceCost =
    generation?.upstream_inference_cost && generation.upstream_inference_cost > 0
      ? generation.upstream_inference_cost
      : usage.cost_details?.upstream_inference_cost ?? null;

  return {
    source: dryRun ? "dry-run" : generation ? "openrouter:generation" : "openrouter:response",
    promptTokens,
    completionTokens,
    totalTokens,
    nativePromptTokens: generation?.native_tokens_prompt ?? null,
    nativeCompletionTokens: generation?.native_tokens_completion ?? null,
    reasoningTokens:
      usage.reasoning_tokens ??
      usage.completion_tokens_details?.reasoning_tokens ??
      generation?.native_tokens_reasoning ??
      null,
    cachedPromptTokens:
      usage.cache_read_input_tokens ??
      usage.prompt_tokens_details?.cached_tokens ??
      generation?.native_tokens_cached ??
      null,
    cacheDiscount:
      generation?.cache_discount ??
      generation?.cache_discount_tokens ??
      null,
    totalCost: dryRun ? 0 : generation?.total_cost ?? usage.cost ?? usage.total_cost ?? null,
    upstreamInferenceCost: dryRun ? 0 : upstreamInferenceCost,
    currency: "USD",
    rawResponseUsage: usage,
  };
}

async function fetchOpenRouterGeneration({ apiKey, generationId }) {
  if (!generationId) {
    return null;
  }

  const url = new URL(OPENROUTER_GENERATION_URL);
  url.searchParams.set("id", generationId);

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      return json.data ?? json;
    }

    if (response.status !== 404 && response.status !== 429) {
      return {
        error: true,
        status: response.status,
        body: await response.text(),
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 750 * attempt));
  }

  return null;
}

async function callOpenRouter({ apiKey, interfacePrompt, prompt, model, requestTimeoutMs }) {
  const messages = buildMessages({ interfacePrompt, prompt });
  const body = {
    model: model.model,
    messages,
    ...model.params,
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  const startedAt = new Date();
  const startMs = performance.now();
  let response;
  let responseText;

  try {
    response = await fetch(OPENROUTER_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.UI_ARENA_SITE_URL ?? "https://uiarena.armstr.ng",
        "X-Title": process.env.UI_ARENA_APP_NAME ?? "UI Arena",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    responseText = await response.text();
  } finally {
    clearTimeout(timeout);
  }

  const completedAt = new Date();
  const modelDurationMs = Math.round(performance.now() - startMs);
  const responseJson = JSON.parse(responseText);

  if (!response.ok) {
    const message = responseJson?.error?.message ?? response.statusText;
    const error = new Error(`OpenRouter request failed (${response.status}): ${message}`);
    error.responseJson = responseJson;
    error.requestBody = body;
    throw error;
  }

  const generation = await fetchOpenRouterGeneration({ apiKey, generationId: responseJson.id });

  return {
    requestBody: body,
    responseJson,
    generation,
    content: responseJson.choices?.[0]?.message?.content,
    finishReason: responseJson.choices?.[0]?.finish_reason ?? null,
    modelStartedAt: startedAt.toISOString(),
    modelCompletedAt: completedAt.toISOString(),
    modelDurationMs,
  };
}

async function writeRunArtifacts({ interfacePrompt, runId, requestBody, responseJson, generation, html, result }) {
  const runDir = join(rootDir, "arena", "runs", interfacePrompt.id, runId);
  const sourceDir = join(runDir, "source");
  const previewDir = join(publicDir, "previews", interfacePrompt.id, runId);
  const publicSourceDir = join(publicDir, "sources", interfacePrompt.id, runId);
  const resultPath = join(runDir, "result.json");

  await Promise.all([
    writeJson(join(runDir, "request.json"), requestBody),
    writeJson(join(runDir, "response.raw.json"), responseJson),
    generation ? writeJson(join(runDir, "generation.openrouter.json"), generation) : Promise.resolve(),
    writeText(join(sourceDir, "index.html"), html),
    writeText(join(previewDir, "index.html"), html),
    writeText(join(publicSourceDir, "index.html.txt"), html),
  ]);

  result.artifacts = {
    preview: `${publicUrlFor(previewDir)}/`,
    source: publicUrlFor(join(publicSourceDir, "index.html.txt")),
    localResultPath: toRepoPath(resultPath),
    localRunPath: toRepoPath(runDir),
    localSourcePath: toRepoPath(sourceDir),
    localPreviewPath: toRepoPath(previewDir),
  };

  await writeJson(resultPath, result);
  return { resultPath, result };
}

function buildBaseResult({ interfacePrompt, prompt, model, runId, timestamp, dryRun }) {
  return {
    schemaVersion: 1,
    runId,
    interfaceId: interfacePrompt.id,
    interfaceTitle: interfacePrompt.title,
    modelId: model.id,
    modelDisplayName: model.displayName,
    family: model.family,
    gateway: model.adapter,
    gatewayModel: model.model,
    gatewayGenerationId: null,
    providerName: null,
    status: "running",
    createdAt: timestamp.toISOString(),
    completedAt: null,
    request: {
      dryRun,
      promptSha256: sha256(prompt),
      params: model.params,
    },
    execution: {
      startedAt: timestamp.toISOString(),
      completedAt: null,
      durationMs: null,
      modelStartedAt: null,
      modelCompletedAt: null,
      modelDurationMs: null,
      generationTimeMs: null,
      latencyMs: null,
    },
    usage: null,
    artifacts: {},
  };
}

async function runModel({
  apiKey,
  interfaceBundle,
  model,
  timestamp,
  dryRun,
  screenshots,
  evaluations,
  evaluatorIds,
  requestTimeoutMs,
}) {
  const { manifest: interfacePrompt, prompt } = interfaceBundle;
  const runId = `${model.id}__${safeTimestamp(timestamp)}`;
  const startedMs = performance.now();
  const result = buildBaseResult({ interfacePrompt, prompt, model, runId, timestamp, dryRun });
  let requestBody = {};
  let responseJson = {};
  let generation = null;
  let html;
  let resultPath;

  try {
    if (dryRun) {
      requestBody = {
        dryRun: true,
        messages: buildMessages({ interfacePrompt, prompt }),
        model: model.model,
        ...model.params,
      };
      responseJson = {
        id: `dry-${runId}`,
        choices: [
          {
            finish_reason: "dry_run",
            message: { content: htmlForDryRun({ interfacePrompt, model }) },
          },
        ],
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        },
      };
      html = responseJson.choices[0].message.content;
      result.execution.modelStartedAt = timestamp.toISOString();
      result.execution.modelCompletedAt = new Date().toISOString();
      result.execution.modelDurationMs = 0;
    } else {
      const call = await callOpenRouter({ apiKey, interfacePrompt, prompt, model, requestTimeoutMs });
      requestBody = call.requestBody;
      responseJson = call.responseJson;
      generation = call.generation;
      html = extractHtml(call.content);
      result.gatewayGenerationId = responseJson.id;
      result.providerName = generation?.provider_name ?? null;
      result.finishReason = call.finishReason;
      result.execution.modelStartedAt = call.modelStartedAt;
      result.execution.modelCompletedAt = call.modelCompletedAt;
      result.execution.modelDurationMs = call.modelDurationMs;
      result.execution.generationTimeMs = generation?.generation_time ?? null;
      result.execution.latencyMs = generation?.latency ?? null;
    }

    html = injectPreviewCsp(normalizeReactRuntime(extractHtml(html)));
    result.status = "complete";
    result.completedAt = new Date().toISOString();
    result.execution.completedAt = result.completedAt;
    result.execution.durationMs = Math.round(performance.now() - startedMs);
    result.usage = usageFrom({ responseJson, generation, dryRun });

    const written = await writeRunArtifacts({ interfacePrompt, runId, requestBody, responseJson, generation, html, result });
    resultPath = written.resultPath;
    let updatedResult = written.result;

    if (screenshots) {
      try {
        updatedResult = await captureScreenshotsForResult(resultPath, updatedResult);
      } catch (screenshotError) {
        updatedResult.screenshotError = {
          message: screenshotError.message,
          capturedAt: new Date().toISOString(),
        };
        await writeJson(resultPath, updatedResult);
        console.warn(`Skipped screenshots for ${interfacePrompt.id}/${runId}: ${screenshotError.message}`);
      }
    }

    if (evaluations) {
      try {
        updatedResult = await evaluateResult({
          resultPath,
          result: updatedResult,
          selectedEvaluatorIds: evaluatorIds,
        });
      } catch (evaluationError) {
        updatedResult.evaluationError = {
          message: evaluationError.message,
          capturedAt: new Date().toISOString(),
        };
        await writeJson(resultPath, updatedResult);
        console.warn(`Skipped evaluations for ${interfacePrompt.id}/${runId}: ${evaluationError.message}`);
      }
    }

    console.log(`Completed ${interfacePrompt.id}/${runId}`);
    return updatedResult;
  } catch (error) {
    result.status = "error";
    result.completedAt = new Date().toISOString();
    result.execution.completedAt = result.completedAt;
    result.execution.durationMs = Math.round(performance.now() - startedMs);
    result.error = {
      phase: html ? "artifact" : "model",
      message: error.message,
      stack: error.stack,
    };

    const runDir = join(rootDir, "arena", "runs", interfacePrompt.id, runId);
    resultPath = join(runDir, "result.json");
    result.artifacts = {
      localResultPath: toRepoPath(resultPath),
      localRunPath: toRepoPath(runDir),
    };

    await mkdir(runDir, { recursive: true });
    await Promise.all([
      writeJson(join(runDir, "request.json"), requestBody),
      writeJson(join(runDir, "response.raw.json"), error.responseJson ?? responseJson),
      writeJson(resultPath, result),
    ]);

    console.error(`Failed ${interfacePrompt.id}/${runId}: ${error.message}`);
    return result;
  }
}

async function main() {
  const args = parseArgs();
  const interfaceId = args.interface || DEFAULT_INTERFACE;
  const dryRun = Boolean(args.dryRun);
  const screenshots = args.screenshots !== "false" && args.noScreenshots !== true;
  const evaluations = args.evaluations !== "false" && args.noEvaluations !== true;
  const evaluatorIds = args.evaluators ?? null;
  const requestTimeoutMs = Number(args.timeoutMs ?? 240000);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!dryRun && !apiKey) {
    throw new Error("OPENROUTER_API_KEY is required. Use --dry-run to exercise the pipeline without API calls.");
  }

  const timestamp = new Date();
  const [interfaceBundle, allModels] = await Promise.all([loadInterfacePrompt(interfaceId), loadOpenRouterModels()]);
  const selectedIds = args.models ? new Set(String(args.models).split(",").map((id) => id.trim()).filter(Boolean)) : null;
  const models = (selectedIds ? allModels.filter((model) => selectedIds.has(model.id)) : allModels).map((model) => {
    const params = { ...model.params };

    if (args.maxTokens) {
      params.max_tokens = Number(args.maxTokens);
    }

    if (args.temperature) {
      params.temperature = Number(args.temperature);
    }

    return { ...model, params };
  });

  if (models.length === 0) {
    throw new Error("No models matched.");
  }

  for (const model of models) {
    await runModel({
      apiKey,
      interfaceBundle,
      model,
      timestamp,
      dryRun,
      screenshots,
      evaluations,
      evaluatorIds,
      requestTimeoutMs,
    });
  }

  console.log("Run complete. Rebuild the static index with `npm run arena:index`.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
