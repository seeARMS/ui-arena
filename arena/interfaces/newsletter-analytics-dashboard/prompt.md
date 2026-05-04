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

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

Make this feel like a working operational product, not a decorative mockup. Bake in realistic mock data.
