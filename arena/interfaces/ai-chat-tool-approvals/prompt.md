Build a chat interface where an AI agent runs commands and edits files, but every tool call has to be approved first.

The user is a developer testing an agent. They want to see exactly what's about to happen before it happens, approve fast on the obvious, and reject confidently on the risky.

Build:

- A two-pane layout: chat on the left, "context inspector" on the right (the inspector shows the file, command, or diff the agent wants to touch).
- A live conversation with at least: user turn, assistant turn, two tool calls, two tool results, and one nested follow-up.
- Pending approvals must be visually prominent. Each has approve / reject / inspect (focuses the inspector).
- A "trust" affordance: allowlist this kind of call for the session.
- A typing indicator while the agent is "thinking", and a "stop" affordance during a tool call.
- Responsive behavior — the inspector collapses sensibly on narrow widths.

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

The interface should create trust without making the workflow slow. Avoid blocking modals for routine approvals; reserve them for destructive ones.
