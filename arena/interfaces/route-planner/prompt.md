Build a route planner for cyclists and runners deciding where to head out.

The user is comparing two or three candidate routes for today. They want distance, elevation, surface (paved/gravel/trail), estimated time at their pace, weather window, and a sense of how busy each option is.

Build:

- A canvas-style route view (SVG; no map tiles, no remote assets) — show route shapes as stylized polylines on a stylized terrain background.
- A side rail listing 3 candidate routes with summary stats. Selecting a route highlights it on the canvas.
- A toggle for cycling vs running that updates the pace estimate.
- A weather strip (temperature, wind, precip) for the next few hours, with an automatically chosen "best window".
- An elevation profile for the selected route as an SVG line chart.
- A "compare" mode that overlays two route stats side by side.
- Responsive behavior for mobile and desktop.

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

No external services. Build a self-contained representation that still feels analytical and trustworthy.
