Build a chat interface where an AI agent runs commands and edits files, but every tool call has to be approved first.

The user is a developer testing an agent. They want to see exactly what's about to happen before it happens, approve fast on the obvious, and reject confidently on the risky.

Build:

- A two-pane layout: chat on the left, "context inspector" on the right (the inspector shows the file, command, or diff the agent wants to touch).
- A live conversation with at least: user turn, assistant turn, two tool calls, two tool results, and one nested follow-up.
- Pending approvals must be visually prominent. Each has approve / reject / inspect (focuses the inspector).
- A "trust" affordance: allowlist this kind of call for the session.
- A typing indicator while the agent is "thinking", and a "stop" affordance during a tool call.
- Responsive behavior — the inspector collapses sensibly on narrow widths.

Stack: React app. Build it as a small project directory using mock data. The runner will install dependencies, compile the app, and repair build errors if needed.

The interface should create trust without making the workflow slow. Avoid blocking modals for routine approvals; reserve them for destructive ones.
