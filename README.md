# UI Arena

Examples of how different AI models generate different product interfaces.

UI Arena runs the same interface prompt through multiple models, renders the outputs as live static pages, and publishes the screenshots, source, and run metadata side by side.

Browse generated pricing pages, dashboards, onboarding flows, AI chat interfaces, settings pages, and more.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Running Arena Jobs

The site is static. Model runs are generated ahead of time, written to disk, and then indexed into the Astro build.

```bash
cp .env.example .env
export OPENROUTER_API_KEY=...

# Required once before screenshot capture and local evaluators.
npm run arena:install-browsers

# Run every enabled model for the first pricing-page interface.
# This writes previews, screenshots, and evaluator results by default.
npm run arena:run -- --interface pricing-ai-coding-assistant

# Run one model.
npm run arena:run -- --interface pricing-ai-coding-assistant --models gpt-5-2

# Re-run evaluators for existing completed runs without calling models again.
npm run arena:evaluate -- --interface pricing-ai-coding-assistant

# Exercise the full artifact pipeline without calling OpenRouter.
npm run arena:dry-run -- --interface pricing-ai-coding-assistant --models gpt-5-2

# Rebuild the compact result index used by Astro.
npm run arena:index

# Refresh delayed OpenRouter /generation metadata for existing runs.
npm run arena:refresh-usage -- --interface pricing-ai-coding-assistant
npm run arena:index
```

Each run writes:

- `arena/runs/<interface>/<run>/result.json` with timing, prompt/completion tokens, cost, provider metadata, artifacts, and errors.
- `arena/runs/<interface>/<run>/evaluations/<evaluator>.json` with full evaluator output.
- `arena/runs/<interface>/<run>/request.json` with the exact model request.
- `arena/runs/<interface>/<run>/response.raw.json` with the raw gateway response.
- `arena/runs/<interface>/<run>/generation.openrouter.json` when OpenRouter usage metadata is available.
- `public/previews/<interface>/<run>/index.html` for static live previews.
- `public/sources/<interface>/<run>/index.html.txt` for source viewing.
- `public/screenshots/<interface>/<run>__desktop.png` and `__mobile.png`.
- `public/evaluations/<interface>/<run>/...` for Lighthouse reports and axe JSON.

The gallery embeds generated previews in sandboxed iframes and links to screenshots and the rendered source-viewer route. Generated HTML is treated as untrusted, so the runner injects a restrictive CSP into preview documents and the gallery iframe does not grant same-origin access.

Evaluators are declared in `arena/evaluators/manifest.json` and implemented as modules in `scripts/arena/evaluators`. Add a manifest entry plus a module exporting `runEvaluation()` to plug in another evaluator later. The first evaluators are Lighthouse for performance/accessibility scores and axe-core for concrete accessibility violations.

Lighthouse uses Chrome discovery through `chrome-launcher`. Set `LIGHTHOUSE_CHROME_PATH` or `CHROME_PATH` if it cannot find a local Chrome/Chromium install.

## Notes

- Astro app configured for Cloudflare via `@astrojs/cloudflare`.
- Tailwind is wired through `@tailwindcss/vite`.
- Interface prompt manifests live in `arena/interfaces`.
- Model manifests live in `arena/models`.
- Evaluator manifests live in `arena/evaluators`.
- Gallery data is adapted in `src/data/interfaces.js` from `src/data/generated-results.js`.
