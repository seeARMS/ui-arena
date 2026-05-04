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

Stack: React app. Build it as a small project directory using mock data. The runner will install dependencies, compile the app, and repair build errors if needed.

Optimize for the second-time admin. Inline editing beats modals. Keyboard-first beats mouse-first.
