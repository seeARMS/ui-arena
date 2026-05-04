Build a chat interface where an AI agent runs commands and edits files, but every tool call has to be approved first.

The user is a developer testing an agent. They want to see exactly what's about to happen before it happens, approve fast on the obvious, and reject confidently on the risky.

Build:

- A two-pane layout: chat on the left, "context inspector" on the right (the inspector shows the file, command, or diff the agent wants to touch).
- A live conversation with at least: user turn, assistant turn, two tool calls, two tool results, and one nested follow-up.
- Pending approvals must be visually prominent. Each has approve / reject / inspect (focuses the inspector).
- A "trust" affordance: allowlist this kind of call for the session.
- A typing indicator while the agent is "thinking", and a "stop" affordance during a tool call.
- Responsive behavior — the inspector collapses sensibly on narrow widths.

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

The interface should create trust without making the workflow slow. Avoid blocking modals for routine approvals; reserve them for destructive ones.
