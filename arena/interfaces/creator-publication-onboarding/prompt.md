Build a multi-step onboarding flow for a creator starting a new publication.

The creator is on step zero of building an audience. They need to name the publication, pick an audience focus, set a cadence, choose basic branding (color, type), and post a welcome note. They will judge the product by how confident they feel after step three.

Build:

- A four- or five-step flow with clear progress indication and a way to go back.
- Step 1 — identity: name, handle (with availability-check feel), short tagline.
- Step 2 — audience and cadence: who it's for + how often; smart defaults from the audience answer.
- Step 3 — branding: a small color/type system preview that reacts to choices in real time.
- Step 4 — first post: title, body (textarea), preview tile, and a "publish welcome" CTA.
- A persistent live "preview card" rail that updates as the creator fills out the steps.
- Friendly skip handling: any step beyond identity should be skippable with sane defaults.
- Responsive behavior for mobile and desktop.

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

The flow should feel quick but not flimsy. Smart defaults beat clever copy.
