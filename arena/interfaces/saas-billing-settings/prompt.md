Build a billing settings page for a SaaS team workspace.

The user is a workspace admin doing a real billing task — adding seats, swapping cards, downgrading, or pulling an invoice for finance. They visit weekly and want efficiency, not delight.

Build:

- A "current plan" panel: tier, renewal date, monthly cost, included seats, current usage.
- A seats table: members and their roles, with a way to add seats, remove members, and flag over-permissioned accounts.
- A payment method block with card brand, last four, and an "update" affordance that opens an inline form (no modal).
- An invoices table with PDF download icons, status pills, and a search/filter.
- A "danger zone" for downgrade or cancel with a friction step (typed confirmation).
- Role-aware UI: non-admin viewers see read-only states with an explanation.
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

Optimize for the second-time admin. Inline editing beats modals. Keyboard-first beats mouse-first.
