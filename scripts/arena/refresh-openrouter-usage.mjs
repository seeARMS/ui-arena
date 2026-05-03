import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { loadResultManifests, parseArgs, rootDir, writeJson } from "./shared.mjs";

const OPENROUTER_GENERATION_URL = "https://openrouter.ai/api/v1/generation";

async function fetchGeneration({ apiKey, generationId }) {
  const url = new URL(OPENROUTER_GENERATION_URL);
  url.searchParams.set("id", generationId);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      body: await response.text(),
    };
  }

  const json = await response.json();
  return json.data ?? json;
}

function upstreamInferenceCostFrom(result, generation) {
  if (generation.upstream_inference_cost && generation.upstream_inference_cost > 0) {
    return generation.upstream_inference_cost;
  }

  return result.usage?.rawResponseUsage?.cost_details?.upstream_inference_cost ?? result.usage?.upstreamInferenceCost ?? null;
}

function updateResultWithGeneration(result, generation) {
  const promptTokens = generation.tokens_prompt ?? result.usage?.promptTokens ?? null;
  const completionTokens = generation.tokens_completion ?? result.usage?.completionTokens ?? null;

  result.providerName = generation.provider_name ?? result.providerName ?? null;
  result.finishReason = generation.finish_reason ?? result.finishReason ?? null;
  result.nativeFinishReason = generation.native_finish_reason ?? result.nativeFinishReason ?? null;
  result.execution = result.execution ?? {};
  result.execution.generationTimeMs = generation.generation_time ?? result.execution.generationTimeMs ?? null;
  result.execution.latencyMs = generation.latency ?? result.execution.latencyMs ?? null;
  result.usage = {
    ...result.usage,
    source: "openrouter:generation",
    promptTokens,
    completionTokens,
    totalTokens:
      promptTokens !== null && completionTokens !== null
        ? promptTokens + completionTokens
        : result.usage?.totalTokens ?? null,
    nativePromptTokens: generation.native_tokens_prompt ?? result.usage?.nativePromptTokens ?? null,
    nativeCompletionTokens: generation.native_tokens_completion ?? result.usage?.nativeCompletionTokens ?? null,
    reasoningTokens: generation.native_tokens_reasoning ?? result.usage?.reasoningTokens ?? null,
    cachedPromptTokens: generation.native_tokens_cached ?? result.usage?.cachedPromptTokens ?? null,
    cacheDiscount: generation.cache_discount ?? result.usage?.cacheDiscount ?? null,
    totalCost: generation.total_cost ?? generation.usage ?? result.usage?.totalCost ?? null,
    upstreamInferenceCost: upstreamInferenceCostFrom(result, generation),
    currency: "USD",
  };

  return result;
}

async function main() {
  const args = parseArgs();
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is required.");
  }

  const results = await loadResultManifests();
  const targets = results.filter((result) => {
    if (result.gateway !== "openrouter" || !result.gatewayGenerationId) {
      return false;
    }

    const interfaceFilter = args.interface;
    const interfaceId = result.interfaceId;

    if (interfaceFilter && interfaceId !== interfaceFilter) {
      return false;
    }

    if (args.run && result.runId !== args.run) {
      return false;
    }

    return true;
  });

  for (const result of targets) {
    const generation = await fetchGeneration({ apiKey, generationId: result.gatewayGenerationId });

    if (generation.error) {
      console.warn(`Could not refresh ${result.runId}: ${generation.status} ${generation.body.slice(0, 120)}`);
      continue;
    }

    const resultPath = join(rootDir, result.artifacts.localResultPath);
    const generationPath = join(rootDir, result.artifacts.localRunPath, "generation.openrouter.json");
    const updated = updateResultWithGeneration(result, generation);

    await Promise.all([writeJson(generationPath, generation), writeJson(resultPath, updated)]);
    console.log(`Refreshed usage for ${result.runId}`);
  }

  if (targets.length === 0) {
    console.log("No OpenRouter runs matched.");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
