import { execFile } from "node:child_process";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, posix } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

import { build as viteBuild } from "vite";

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

const execFileAsync = promisify(execFile);
const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_GENERATION_URL = "https://openrouter.ai/api/v1/generation";
const DEFAULT_INTERFACE = "pricing-ai-coding-assistant";
const MAX_REPAIR_ATTEMPTS = 2;
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
const REACT_APP_CSP = [
  "default-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'none'",
  "media-src 'self' data: blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join("; ");

const REACT_UMD_SCRIPT = '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>';
const REACT_DOM_UMD_SCRIPT = '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>';
const BABEL_STANDALONE_SCRIPT = '<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>';

function promptUsesReactRuntime(prompt) {
  return /Stack:[\s\S]*React/i.test(prompt) || /React 18/i.test(prompt) || /src\/App\.jsx/i.test(prompt);
}

function buildMessages({ interfacePrompt, prompt }) {
  const usesReactRuntime = promptUsesReactRuntime(prompt);
  return [
    {
      role: "system",
      content: [
        "You are participating in UI Arena, a gallery of AI-generated product interface examples.",
        usesReactRuntime
          ? "Build a complete React project for the requested interface. Return only project files using the file block format below. Do not return markdown or explanations."
          : "Return exactly one complete static HTML document.",
        usesReactRuntime
          ? "For each file, write exactly: <<<FILE: path/to/file>>>, then the file content, then <<<END FILE>>>. Include any project files you want: package.json, index.html, Vite config, src files, public assets, styles, components, and mock data."
          : "The output must work by opening index.html directly in a browser.",
        usesReactRuntime
          ? "The runner will write the project to a directory, fill in missing Vite/React boilerplate when needed, install dependencies from package.json, run the build, and use the generated static output."
          : "The document must include all CSS and JavaScript inline.",
        usesReactRuntime
          ? "Prefer a Vite-compatible React SPA with mock data. If you omit package.json, index.html, or src/main.jsx, the runner will create sensible defaults."
          : "Do not use external fonts, images, scripts, stylesheets, CDNs, analytics, or network requests.",
        usesReactRuntime
          ? "Do not use external fonts, images, scripts, stylesheets, CDNs, analytics, or network requests; every runtime asset must be bundled into the project."
          : "",
        usesReactRuntime
          ? "Keep the project concise. Generate repeated mock rows programmatically instead of serializing huge arrays."
          : "Do not include explanations outside the HTML.",
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
        usesReactRuntime
          ? "- Build it as a React app project using mock data."
          : "- Keep it self-contained in one index.html file.",
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

function extractJsonObject(content) {
  const trimmed = String(content ?? "").trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model response did not contain a JSON object with generated files.");
  }

  return JSON.parse(candidate.slice(start, end + 1));
}

function filesToBlockText(files) {
  return files
    .map((file) => `<<<FILE: ${file.path}>>>\n${file.content.trimEnd()}\n<<<END FILE>>>`)
    .join("\n\n");
}

function extractFileBlocks(content) {
  const text = String(content ?? "");
  const blockPattern = /<<<FILE:\s*([^\n>]+?)\s*(?:>>>[^\S\r\n]*\r?\n|\r?\n)([\s\S]*?)\r?\n?<<<END FILE>>>/g;
  const files = [];
  let match;

  while ((match = blockPattern.exec(text)) !== null) {
    files.push({
      path: match[1].trim(),
      content: match[2].replace(/^\r?\n/, "").replace(/\r?\n$/, ""),
    });
  }

  return files;
}

function normalizeGeneratedProjectPath(path) {
  let normalized = String(path ?? "").trim().replaceAll("\\", "/").replace(/^\.?\//, "");

  if (/^(App|styles|data)\.(jsx|tsx|js|ts|css|json)$/i.test(normalized)) {
    normalized = `src/${normalized}`;
  }

  normalized = posix.normalize(normalized);

  if (
    !normalized ||
    posix.isAbsolute(normalized) ||
    normalized.startsWith("../") ||
    normalized.includes("/../")
  ) {
    throw new Error(`Unsafe generated file path: ${path}`);
  }

  if (
    normalized === "node_modules" ||
    normalized.startsWith("node_modules/") ||
    normalized === ".git" ||
    normalized.startsWith(".git/") ||
    normalized === "dist" ||
    normalized.startsWith("dist/") ||
    normalized === "build" ||
    normalized.startsWith("build/") ||
    normalized === "out" ||
    normalized.startsWith("out/")
  ) {
    return null;
  }

  return normalized;
}

function normalizePackageJson(content) {
  let packageJson = {};

  if (content?.trim()) {
    packageJson = JSON.parse(content);
  }

  const dependencies = { ...(packageJson.dependencies ?? {}) };
  const devDependencies = { ...(packageJson.devDependencies ?? {}) };

  dependencies.react ??= "^18.3.1";
  dependencies["react-dom"] ??= "^18.3.1";

  if (!dependencies.vite && !devDependencies.vite) {
    devDependencies.vite = "^7.3.2";
  }

  const scripts = { ...(packageJson.scripts ?? {}) };
  if (!scripts.build) {
    scripts.build = "vite build --base=./";
  } else if (/\bvite\s+build\b/.test(scripts.build) && !/\b--base(?:=|\s)/.test(scripts.build)) {
    scripts.build = scripts.build.replace(/\bvite\s+build\b/, "vite build --base=./");
  }

  return `${JSON.stringify(
    {
      private: true,
      type: "module",
      ...packageJson,
      scripts,
      dependencies,
      devDependencies,
    },
    null,
    2,
  )}\n`;
}

function findAppEntry(filesByPath) {
  return [
    "src/App.jsx",
    "src/App.tsx",
    "src/App.js",
    "src/App.ts",
    "src/app.jsx",
    "src/app.tsx",
    "src/app.js",
    "src/app.ts",
  ].find((path) => filesByPath.has(path));
}

function findMainEntry(filesByPath) {
  return [
    "src/main.jsx",
    "src/main.tsx",
    "src/main.js",
    "src/main.ts",
    "src/index.jsx",
    "src/index.tsx",
    "src/index.js",
    "src/index.ts",
  ].find((path) => filesByPath.has(path));
}

function ensureProjectIndexHtml(content, interfacePrompt, result) {
  const fallback = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Security-Policy" content="${REACT_APP_CSP}" />
    <title>${interfacePrompt.title} - ${result.modelDisplayName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

  if (!content?.trim()) {
    return fallback;
  }

  return injectReactAppCsp(content);
}

function injectReactAppCsp(html) {
  const withoutExistingCsp = html.replace(
    /<meta\s+[^>]*http-equiv=(["'])Content-Security-Policy\1[^>]*>\s*/gi,
    "",
  );
  const meta = `<meta http-equiv="Content-Security-Policy" content="${REACT_APP_CSP}" />`;

  if (/<head[^>]*>/i.test(withoutExistingCsp)) {
    return withoutExistingCsp.replace(/<head[^>]*>/i, (match) => `${match}\n    ${meta}`);
  }

  return withoutExistingCsp.replace(/<html[^>]*>/i, (match) => `${match}\n<head>\n    ${meta}\n</head>`);
}

function removeExternalDocumentAssets(html) {
  return String(html ?? "")
    .replace(
      /<script\b[^>]*\bsrc=(["'])https?:\/\/[^"']+\1[^>]*>\s*<\/script>\s*/gi,
      "",
    )
    .replace(
      /<link\b[^>]*\bhref=(["'])https?:\/\/[^"']+\1[^>]*>\s*/gi,
      "",
    );
}

function normalizeReactProjectFiles(content, { interfacePrompt, result }) {
  const blockFiles = extractFileBlocks(content);
  const payload = blockFiles.length > 0 ? null : extractJsonObject(content);
  const rawFiles = blockFiles.length > 0
    ? blockFiles
    : Array.isArray(payload.files)
      ? payload.files
      : Array.isArray(payload.project?.files)
        ? payload.project.files
        : Object.entries(payload).map(([path, fileContent]) => ({ path, content: fileContent }));
  const byPath = new Map();

  for (const file of rawFiles) {
    const filePath = normalizeGeneratedProjectPath(file.path);

    if (!filePath) {
      continue;
    }

    const fileContent =
      typeof file.content === "string"
        ? file.content
        : typeof file === "string"
          ? file
          : typeof file.content?.text === "string"
            ? file.content.text
            : "";

    byPath.set(filePath, fileContent);
  }

  const appPath = findAppEntry(byPath);
  const mainPath = findMainEntry(byPath);

  if (!appPath && !mainPath) {
    byPath.set(
      "src/App.jsx",
      `export default function App() {
  return (
    <main>
      <h1>${interfacePrompt.title}</h1>
      <p>Generated React project shell.</p>
    </main>
  );
}
`,
    );
  }

  const resolvedAppPath = findAppEntry(byPath);
  const resolvedMainPath = findMainEntry(byPath);

  if (!byPath.has("src/styles.css")) {
    byPath.set("src/styles.css", "");
  }

  if (!resolvedMainPath && resolvedAppPath) {
    const appImport = `./${posix.relative("src", resolvedAppPath)}`;
    byPath.set(
      "src/main.jsx",
      `import React from "react";
import { createRoot } from "react-dom/client";
import App from "${appImport}";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
    );
  }

  byPath.set("package.json", normalizePackageJson(byPath.get("package.json")));
  byPath.set("index.html", ensureProjectIndexHtml(byPath.get("index.html"), interfacePrompt, result));

  return [...byPath.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, fileContent]) => ({ path, content: fileContent }));
}

function reactFilesForDryRun({ interfacePrompt, model }) {
  return [
    {
      path: "src/App.jsx",
      content: `import { useMemo, useState } from "react";

const rows = Array.from({ length: 25 }, (_, index) => ({
  id: \`key-\${String(index + 1).padStart(2, "0")}\`,
  name: ["Production API", "CI deploy", "Analytics sync", "Billing export", "Webhook signer"][index % 5],
  owner: ["Avery", "Morgan", "Riley", "Jordan", "Casey"][index % 5],
  scopes: index % 4 === 0 ? "admin:all" : index % 3 === 0 ? "write:data" : "read:data",
  lastUsed: index % 5 === 0 ? "Never" : \`\${index + 2}h ago\`,
  expires: index % 4 === 0 ? "This week" : "90d",
  status: ["healthy", "stale", "expiring", "over-scoped"][index % 4],
}));

export default function App() {
  const [filter, setFilter] = useState("all");
  const visibleRows = useMemo(
    () => filter === "all" ? rows : rows.filter((row) => row.status === filter),
    [filter],
  );

  return (
    <main className="shell">
      <header className="header">
        <div>
          <p className="eyebrow">Dry run · ${model.displayName}</p>
          <h1>${interfacePrompt.title}</h1>
        </div>
        <button type="button">Rotate selected</button>
      </header>
      <section className="metrics" aria-label="API key summary">
        <strong>25<span>Total keys</span></strong>
        <strong>18<span>Active</span></strong>
        <strong>6<span>Over-scoped</span></strong>
        <strong>3<span>Expiring</span></strong>
      </section>
      <div className="toolbar">
        {["all", "healthy", "stale", "expiring", "over-scoped"].map((item) => (
          <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Owner</th><th>Scopes</th><th>Last used</th><th>Expires</th><th>Status</th></tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.id}>
              <td><strong>{row.name}</strong><span>{row.id}</span></td>
              <td>{row.owner}</td>
              <td>{row.scopes}</td>
              <td>{row.lastUsed}</td>
              <td>{row.expires}</td>
              <td><span className={\`pill \${row.status}\`}>{row.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
`,
    },
    {
      path: "src/styles.css",
      content: `* { box-sizing: border-box; }
body { margin: 0; background: #f5f5f0; color: #171713; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
.shell { max-width: 1180px; margin: 0 auto; padding: 32px; }
.header, .toolbar { display: flex; justify-content: space-between; gap: 16px; align-items: center; }
.eyebrow { margin: 0 0 6px; color: #68685f; text-transform: uppercase; font-size: 12px; letter-spacing: .08em; }
h1 { margin: 0; font-size: 34px; }
button { min-height: 36px; border: 1px solid #24241e; border-radius: 6px; background: #fff; padding: 0 12px; font-weight: 700; }
button.active { background: #24241e; color: #fff; }
.metrics { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid #d7d7cc; margin: 28px 0; background: #fff; }
.metrics strong { padding: 18px; font-size: 28px; border-right: 1px solid #d7d7cc; }
.metrics strong:last-child { border-right: 0; }
.metrics span { display: block; color: #68685f; font-size: 12px; font-weight: 600; text-transform: uppercase; }
table { width: 100%; margin-top: 16px; border-collapse: collapse; background: #fff; border: 1px solid #d7d7cc; }
th, td { padding: 12px; border-bottom: 1px solid #e4e4db; text-align: left; font-size: 13px; }
td span { display: block; color: #68685f; font-size: 12px; }
.pill { display: inline-block; border-radius: 999px; padding: 3px 8px; background: #eee; color: #171713; }
.pill.expiring, .pill.over-scoped { background: #ffe7bf; }
@media (max-width: 760px) { .shell { padding: 18px; } .header, .toolbar { align-items: stretch; flex-direction: column; } .metrics { grid-template-columns: 1fr 1fr; } table { display: block; overflow-x: auto; } }
`,
    },
  ];
}

function sourceTextForFiles(files) {
  return files
    .map((file) => `===== ${file.path} =====\n${file.content.trimEnd()}\n`)
    .join("\n");
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

async function callOpenRouterMessages({ apiKey, messages, model, requestTimeoutMs }) {
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

async function callOpenRouter({ apiKey, interfacePrompt, prompt, model, requestTimeoutMs }) {
  return callOpenRouterMessages({
    apiKey,
    messages: buildMessages({ interfacePrompt, prompt }),
    model,
    requestTimeoutMs,
  });
}

async function writeHtmlRunArtifacts({ interfacePrompt, runId, requestBody, responseJson, generation, html, result }) {
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

async function execCaptured(command, args, { cwd, timeoutMs = 120000 }) {
  try {
    return await execFileAsync(command, args, {
      cwd,
      timeout: timeoutMs,
      maxBuffer: 1024 * 1024 * 12,
      env: {
        ...process.env,
        CI: "1",
      },
    });
  } catch (error) {
    const details = [
      `$ ${command} ${args.join(" ")}`,
      error.stdout ? `stdout:\n${error.stdout}` : "",
      error.stderr ? `stderr:\n${error.stderr}` : "",
      error.message ? `error:\n${error.message}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    const wrapped = new Error(details);
    wrapped.cause = error;
    wrapped.stdout = error.stdout;
    wrapped.stderr = error.stderr;
    throw wrapped;
  }
}

async function writeProjectFiles(sourceDir, files) {
  await rm(sourceDir, { recursive: true, force: true });

  for (const file of files) {
    await writeText(join(sourceDir, file.path), file.content);
  }
}

async function patchPreviewAssetReferences(previewDir) {
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);

    for (const entry of entries) {
      const path = join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(path);
        continue;
      }

      if (!/\.(html|css|js)$/i.test(entry.name)) {
        continue;
      }

      const original = await readFile(path, "utf8");
      const next = original
        .replaceAll('="/assets/', '="./assets/')
        .replaceAll("='/assets/", "='./assets/")
        .replaceAll("url(/assets/", "url(./assets/");

      if (next !== original) {
        await writeFile(path, next);
      }
    }
  }

  await walk(previewDir);

  const indexPath = join(previewDir, "index.html");
  const indexHtml = await readFile(indexPath, "utf8").catch(() => null);

  if (indexHtml !== null) {
    const next = injectReactAppCsp(removeExternalDocumentAssets(indexHtml));
    if (next !== indexHtml) {
      await writeFile(indexPath, next);
    }
  }
}

async function findBuildOutputDir(sourceDir) {
  for (const candidate of ["dist", "build", "out"]) {
    const indexPath = join(sourceDir, candidate, "index.html");
    if (await readFile(indexPath, "utf8").then(() => true, () => false)) {
      return join(sourceDir, candidate);
    }
  }

  return null;
}

async function installProjectDependencies(sourceDir) {
  await execCaptured("npm", ["install", "--no-audit", "--no-fund", "--package-lock=false"], {
    cwd: sourceDir,
    timeoutMs: 180000,
  });
}

async function buildProjectOnce({ sourceDir, previewDir, files }) {
  await writeProjectFiles(sourceDir, files);

  try {
    await installProjectDependencies(sourceDir);
    await execCaptured("npm", ["run", "build"], { cwd: sourceDir, timeoutMs: 180000 });

    let outputDir = await findBuildOutputDir(sourceDir);

    if (!outputDir) {
      await viteBuild({
        root: sourceDir,
        base: "./",
        logLevel: "warn",
        esbuild: {
          jsx: "automatic",
          jsxImportSource: "react",
        },
        build: {
          outDir: join(sourceDir, "dist"),
          emptyOutDir: true,
          assetsDir: "assets",
          sourcemap: false,
          target: "es2020",
        },
      });
      outputDir = await findBuildOutputDir(sourceDir);
    }

    if (!outputDir) {
      throw new Error("Build completed but no static output was found in dist/, build/, or out/.");
    }

    await rm(previewDir, { recursive: true, force: true });
    await cp(outputDir, previewDir, { recursive: true });
    await patchPreviewAssetReferences(previewDir);
  } finally {
    await Promise.all([
      rm(join(sourceDir, "node_modules"), { recursive: true, force: true }),
      rm(join(sourceDir, "dist"), { recursive: true, force: true }),
      rm(join(sourceDir, "build"), { recursive: true, force: true }),
      rm(join(sourceDir, "out"), { recursive: true, force: true }),
    ]);
  }
}

function buildRepairMessages({ interfacePrompt, prompt, files, buildError }) {
  return [
    {
      role: "system",
      content: [
        "You are repairing a generated React project for UI Arena.",
        "Return only corrected project files using <<<FILE: path>>> and <<<END FILE>>> blocks.",
        "Do not return markdown or explanations. Include all files needed after the repair, not just a diff.",
        "Keep repeated mock data concise by generating rows programmatically where possible.",
      ].join("\n"),
    },
    {
      role: "user",
      content: [
        `Interface prompt: ${interfacePrompt.title}`,
        "",
        prompt.trim(),
        "",
        "The project failed to build. Fix the files so npm install and npm run build produce a static React app.",
        "",
        "Build error:",
        "```",
        String(buildError?.message ?? buildError).slice(0, 12000),
        "```",
        "",
        "Current project files:",
        "```",
        sourceTextForFiles(files).slice(0, 60000),
        "```",
      ].join("\n"),
    },
  ];
}

async function repairReactProject({ apiKey, interfacePrompt, prompt, model, files, buildError, requestTimeoutMs }) {
  const repairCall = await callOpenRouterMessages({
    apiKey,
    messages: buildRepairMessages({ interfacePrompt, prompt, files, buildError }),
    model,
    requestTimeoutMs,
  });

  return {
    repairCall,
    files: normalizeReactProjectFiles(repairCall.content, {
      interfacePrompt,
      result: {
        modelDisplayName: model.displayName,
      },
    }),
  };
}

async function writeReactRunArtifacts({
  apiKey,
  interfacePrompt,
  prompt,
  model,
  runId,
  requestBody,
  responseJson,
  generation,
  files,
  result,
  requestTimeoutMs,
  dryRun,
}) {
  const runDir = join(rootDir, "arena", "runs", interfacePrompt.id, runId);
  const sourceDir = join(runDir, "source");
  const previewDir = join(publicDir, "previews", interfacePrompt.id, runId);
  const publicSourceDir = join(publicDir, "sources", interfacePrompt.id, runId);
  const resultPath = join(runDir, "result.json");
  const repairs = [];
  let sourceFiles = files;

  await Promise.all([
    rm(previewDir, { recursive: true, force: true }),
    rm(publicSourceDir, { recursive: true, force: true }),
  ]);

  await mkdir(runDir, { recursive: true });
  await Promise.all([
    writeJson(join(runDir, "request.json"), requestBody),
    writeJson(join(runDir, "response.raw.json"), responseJson),
    generation ? writeJson(join(runDir, "generation.openrouter.json"), generation) : Promise.resolve(),
  ]);

  for (let attempt = 0; attempt <= MAX_REPAIR_ATTEMPTS; attempt += 1) {
    try {
      await buildProjectOnce({ sourceDir, previewDir, files: sourceFiles });
      break;
    } catch (buildError) {
      if (dryRun || attempt >= MAX_REPAIR_ATTEMPTS) {
        throw buildError;
      }

      console.warn(`Repairing ${interfacePrompt.id}/${runId} after build attempt ${attempt + 1}: ${buildError.message.split("\n")[0]}`);
      const repaired = await repairReactProject({
        apiKey,
        interfacePrompt,
        prompt,
        model,
        files: sourceFiles,
        buildError,
        requestTimeoutMs,
      });
      const repairNumber = repairs.length + 1;
      await Promise.all([
        writeJson(join(runDir, `repair-${repairNumber}.request.json`), repaired.repairCall.requestBody),
        writeJson(join(runDir, `repair-${repairNumber}.response.raw.json`), repaired.repairCall.responseJson),
        repaired.repairCall.generation
          ? writeJson(join(runDir, `repair-${repairNumber}.generation.openrouter.json`), repaired.repairCall.generation)
          : Promise.resolve(),
      ]);
      repairs.push({
        attempt: repairNumber,
        gatewayGenerationId: repaired.repairCall.responseJson.id,
        finishReason: repaired.repairCall.finishReason,
        buildError: buildError.message.slice(0, 8000),
        modelStartedAt: repaired.repairCall.modelStartedAt,
        modelCompletedAt: repaired.repairCall.modelCompletedAt,
        modelDurationMs: repaired.repairCall.modelDurationMs,
      });
      sourceFiles = repaired.files;
    }
  }

  await Promise.all([
    writeText(join(publicSourceDir, "source.txt"), sourceTextForFiles(sourceFiles)),
    writeJson(join(publicSourceDir, "files.json"), sourceFiles),
  ]);

  result.artifacts = {
    preview: `${publicUrlFor(previewDir)}/`,
    source: publicUrlFor(join(publicSourceDir, "source.txt")),
    sourceJson: publicUrlFor(join(publicSourceDir, "files.json")),
    localResultPath: toRepoPath(resultPath),
    localRunPath: toRepoPath(runDir),
    localSourcePath: toRepoPath(sourceDir),
    localPreviewPath: toRepoPath(previewDir),
    sourceFormat: "react-project",
    sourceFiles: sourceFiles.map((file) => file.path),
  };
  result.repairs = repairs;

  await writeJson(resultPath, result);
  return { resultPath, result };
}

function buildBaseResult({ interfacePrompt, prompt, model, runId, timestamp, dryRun, artifactType }) {
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
      artifactType,
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
  const artifactType = promptUsesReactRuntime(prompt) ? "react-project" : "html";
  const runId = `${model.id}__${safeTimestamp(timestamp)}`;
  const startedMs = performance.now();
  const result = buildBaseResult({ interfacePrompt, prompt, model, runId, timestamp, dryRun, artifactType });
  let requestBody = {};
  let responseJson = {};
  let generation = null;
  let html;
  let files;
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
            message: {
              content:
                artifactType === "react-project"
                  ? filesToBlockText(reactFilesForDryRun({ interfacePrompt, model }))
                  : htmlForDryRun({ interfacePrompt, model }),
            },
          },
        ],
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        },
      };
      if (artifactType === "react-project") {
        files = normalizeReactProjectFiles(responseJson.choices[0].message.content, { interfacePrompt, result });
      } else {
        html = responseJson.choices[0].message.content;
      }
      result.execution.modelStartedAt = timestamp.toISOString();
      result.execution.modelCompletedAt = new Date().toISOString();
      result.execution.modelDurationMs = 0;
    } else {
      const call = await callOpenRouter({ apiKey, interfacePrompt, prompt, model, requestTimeoutMs });
      requestBody = call.requestBody;
      responseJson = call.responseJson;
      generation = call.generation;
      if (artifactType === "react-project") {
        files = normalizeReactProjectFiles(call.content, { interfacePrompt, result });
      } else {
        html = extractHtml(call.content);
      }
      result.gatewayGenerationId = responseJson.id;
      result.providerName = generation?.provider_name ?? null;
      result.finishReason = call.finishReason;
      result.execution.modelStartedAt = call.modelStartedAt;
      result.execution.modelCompletedAt = call.modelCompletedAt;
      result.execution.modelDurationMs = call.modelDurationMs;
      result.execution.generationTimeMs = generation?.generation_time ?? null;
      result.execution.latencyMs = generation?.latency ?? null;
    }

    result.status = "complete";
    result.completedAt = new Date().toISOString();
    result.execution.completedAt = result.completedAt;
    result.execution.durationMs = Math.round(performance.now() - startedMs);
    result.usage = usageFrom({ responseJson, generation, dryRun });

    const written =
      artifactType === "react-project"
        ? await writeReactRunArtifacts({
            apiKey,
            interfacePrompt,
            prompt,
            model,
            runId,
            requestBody,
            responseJson,
            generation,
            files,
            result,
            requestTimeoutMs,
            dryRun,
          })
        : await writeHtmlRunArtifacts({
            interfacePrompt,
            runId,
            requestBody,
            responseJson,
            generation,
            html: injectPreviewCsp(normalizeReactRuntime(extractHtml(html))),
            result,
          });
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
      phase: html || files ? "artifact" : "model",
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
