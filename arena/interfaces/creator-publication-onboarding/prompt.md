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

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

The flow should feel quick but not flimsy. Smart defaults beat clever copy.
