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

Stack: a single self-contained HTML file that boots React 18 in the browser. Use these CDNs (no build step):

- https://unpkg.com/react@18/umd/react.production.min.js
- https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- https://unpkg.com/@babel/standalone/babel.min.js for in-browser JSX (`<script type="text/babel" data-presets="react">`)

All state, components, styles, and mock data live in this one file. No external assets, no runtime fetches beyond those CDNs.

Optimize for the second-time admin. Inline editing beats modals. Keyboard-first beats mouse-first.
