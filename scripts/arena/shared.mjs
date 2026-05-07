import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const rootDir = dirname(fileURLToPath(new URL("../../package.json", import.meta.url)));
export const arenaDir = join(rootDir, "arena");
export const publicDir = join(rootDir, "public");
export const generatedResultsPath = join(rootDir, "src", "data", "generated-results.js");
export const generatedSourcesPath = join(rootDir, "src", "data", "generated-sources.js");
export const generatedTastePath = join(rootDir, "src", "data", "generated-taste.js");
export const publicResultsIndexPath = join(publicDir, "results", "index.json");
export const publicTasteIndexPath = join(publicDir, "results", "taste.json");
export const tasteDir = join(arenaDir, "taste");

export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

export async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

export async function writeText(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, value);
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function toPosixPath(value) {
  return value.split("\\").join("/");
}

export function toRepoPath(path) {
  return toPosixPath(relative(rootDir, path));
}

export function safeTimestamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

export function publicUrlFor(path) {
  return `/${toPosixPath(relative(publicDir, path))}`;
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (!arg.startsWith("--")) {
      continue;
    }

    const [rawKey, inlineValue] = arg.slice(2).split("=");
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

    if (inlineValue !== undefined) {
      args[key] = inlineValue;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

export async function loadInterfacePrompt(interfaceId) {
  const dir = join(arenaDir, "interfaces", interfaceId);
  const [manifest, prompt] = await Promise.all([
    readJson(join(dir, "manifest.json")),
    readFile(join(dir, "prompt.md"), "utf8"),
  ]);

  return { dir, manifest, prompt };
}

export async function loadOpenRouterModels() {
  const catalog = await readJson(join(arenaDir, "models", "openrouter.json"));
  return catalog.models.filter((model) => model.enabled !== false);
}

export async function loadResultManifests() {
  const runsDir = join(arenaDir, "runs");
  const results = [];

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);

    for (const entry of entries) {
      const path = join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(path);
        continue;
      }

      if (entry.name !== "result.json") {
        continue;
      }

      results.push(await readJson(path));
    }
  }

  await walk(runsDir);
  return results.sort((a, b) => String(b.completedAt ?? b.createdAt).localeCompare(String(a.completedAt ?? a.createdAt)));
}

export async function fileExists(path) {
  return stat(path).then(() => true, () => false);
}
