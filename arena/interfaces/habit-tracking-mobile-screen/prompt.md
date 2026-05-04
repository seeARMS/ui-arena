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

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

The screen must look fine in a desktop browser, but the primary design target is mobile. Tone supports consistency without guilt-tripping.
