# TasteBench

An open benchmark for AI product taste.

TasteBench gives the same product brief to every frontier model — landing pages today, React dashboards and full apps next — then publishes the working build, the source, and the scores. Side by side. Same prompt. Every model. No vibes.

The site groups briefs by product surface (landing pages, pricing, dashboards, auth, onboarding, settings, admin tables, mobile screens, workflows, chat). Each brief runs through the lineup, gets rendered into a sandboxed iframe, scored with Lighthouse and axe, and dropped onto a leaderboard.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Running benchmark jobs

The site is static. Model runs are generated ahead of time, written to disk, and indexed into the Astro build.

```bash
cp .env.example .env
export OPENROUTER_API_KEY=...

# Required once before screenshot capture and local evaluators.
npm run arena:install-browsers

# Run every enabled model for the first brief.
# Writes previews, screenshots, and evaluator results by default.
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

The leaderboard embeds generated previews in sandboxed iframes and links to screenshots and the canonical run page. Generated HTML is treated as untrusted, so the runner injects a restrictive CSP into preview documents and the gallery iframe does not grant same-origin access.

Evaluators are declared in `arena/evaluators/manifest.json` and implemented as modules in `scripts/arena/evaluators`. Add a manifest entry plus a module exporting `runEvaluation()` to plug in another evaluator. The first evaluators are Lighthouse for performance/accessibility scores and axe-core for concrete accessibility violations.

Lighthouse uses Chrome discovery through `chrome-launcher`. Set `LIGHTHOUSE_CHROME_PATH` or `CHROME_PATH` if it cannot find a local Chrome/Chromium install.

## Notes

- Astro app configured for Cloudflare via `@astrojs/cloudflare`.
- Tailwind is wired through `@tailwindcss/vite`.
- Brief manifests live in `arena/interfaces`.
- Model manifests live in `arena/models`.
- Evaluator manifests live in `arena/evaluators`.
- Brief metadata, surface taxonomy, and gallery data are adapted in `src/data/interfaces.js` from `src/data/generated-results.js`.
