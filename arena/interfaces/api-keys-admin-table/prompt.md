Build an admin table for managing API keys and permissions in an engineering workspace.

The user is a platform engineer auditing key hygiene. They need to see owners, scopes, last-used time, expiry, rotation health, and the keys that are scary right now.

Build:

- A dense, scannable table (no card layouts) with sortable columns: name, owner, scopes, last used, created, expires, status.
- A search input plus segmented filters (all / active / stale / expiring / over-scoped).
- Status pills for healthy / stale / expiring / leaked-suspected / revoked.
- Row actions in a popover: rotate, revoke, edit scopes, view audit trail.
- Bulk select with a sticky action bar.
- A summary header strip: total keys, active, over-scoped, expiring this week.
- A side drawer that opens with full audit/event detail when a row is clicked.
- Responsive behavior — degrade gracefully to a stacked list on narrow screens.

Stack: React app. Build it as a small project directory using mock data. The runner will install dependencies, compile the app, and repair build errors if needed.

Mock at least 25 rows with varied states. Prioritize density and operational confidence — avoid empty whitespace and decorative elements that dilute scanning.
