Build an analytics dashboard for a newsletter platform — the home screen a working creator opens to figure out what to do next.

The user is a solo creator or a small media team. They want to understand subscriber growth, churn, revenue, traffic sources, and which posts moved the audience. They have ~20 minutes a week to act on this.

Build:

- A header with publication name, time-range selector (7D / 30D / 90D / All), and a refresh state.
- A four-tile metric strip (subscribers, paid, revenue, open rate) with deltas vs the previous period.
- A growth chart and a churn-vs-acquired chart. Render charts with SVG — no external chart libraries.
- A "recent posts" table with sortable columns (open rate, paid conversions, click-through).
- An "insights" rail with at least three concrete recommendations the data justifies.
- Empty states, loading flicker, and at least one disabled filter that hints at depth.
- Responsive behavior for mobile, tablet, and desktop.

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

Make this feel like a working operational product, not a decorative mockup. Bake in realistic mock data.
