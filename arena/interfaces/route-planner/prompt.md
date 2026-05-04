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

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

No external services. Build a self-contained representation that still feels analytical and trustworthy.
