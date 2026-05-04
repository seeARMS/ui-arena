Build a visual workflow builder for automating newsletter growth.

The user is an operator setting up a sequence: trigger when someone subscribes from a specific source, send a welcome series, branch on engagement, tag, recommend a paid post, and measure conversion to paid.

Build:

- A canvas with draggable nodes connected by lines. Node types: trigger, action (send email, tag, wait), condition (branch), and goal.
- A side configuration panel for the selected node with realistic fields (subject line, delay, branching condition, recommendation source).
- A header with workflow name, status (draft / live), publish/test buttons, and last-edited time.
- An analytics overlay toggle: each node shows entered, completed, conversion rate.
- Undo/redo and a "fit to view" affordance.
- An empty state for a brand-new workflow that teaches the user how to start.
- Responsive behavior — the canvas should degrade to a structured list on narrow screens.

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

Use SVG (or absolutely-positioned divs) for the canvas — no flow-chart libraries. Make the automation details visible without cluttering the canvas.
