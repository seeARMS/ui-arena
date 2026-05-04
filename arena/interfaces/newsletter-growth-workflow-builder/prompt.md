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

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

Use SVG (or absolutely-positioned divs) for the canvas — no flow-chart libraries. Make the automation details visible without cluttering the canvas.
