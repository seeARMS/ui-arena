Build the today screen of a mobile habit-tracking app.

The user opens this app every morning. They want to see today's habits, tap to complete them, peek at streaks, edit the plan, and feel a small lift — not guilt.

Build:

- A mobile-shaped canvas (max-width ~430px) centered in the viewport.
- A header with the date and a streak summary.
- A "today" list of 5–7 habits with tappable completion controls (rings, checks, or sliders that animate).
- A progress band that updates as habits complete.
- An add-habit affordance and an edit/reorder mode.
- A small "yesterday" recap that shows what slipped without scolding.
- Smooth ~200ms transitions on completion taps.

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

The screen must look fine in a desktop browser, but the primary design target is mobile. Tone supports consistency without guilt-tripping.
