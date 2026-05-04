Design and implement a pricing page for an AI coding assistant.

The product helps developers plan changes, edit code, run tests, and review pull requests with an AI agent. Pricing has to let an individual decide today, give an engineering team a reason to upgrade, and route enterprises to sales.

Build:

- Three paid plans with realistic prices and concrete usage limits (per-month tokens, parallel agents, indexed repos, context window).
- A team upgrade path that's specific (shared budgets, audit log, SSO, role-based permissions).
- Trust signals about source-code privacy, model providers, retention, and SOC 2.
- An FAQ that answers real buying objections — not filler.
- Strong visual hierarchy: the recommended plan should be obvious without hiding tradeoffs.
- Responsive behavior for mobile, tablet, and desktop.

Stack: a compiled React 18 app built by the TasteBench runner with Vite. Return source files only, not HTML. The runner provides React, ReactDOM, the Vite build, index.html, and the root render call.

Return exactly this JSON shape, with no markdown wrapper:
{
  "files": [
    { "path": "src/App.jsx", "content": "..." },
    { "path": "src/styles.css", "content": "..." }
  ]
}

src/App.jsx must export default App. Use normal React imports from "react" for hooks. Put all CSS in src/styles.css. Do not include package.json, index.html, ReactDOM/createRoot code, script tags, CDN URLs, Tailwind CDN, runtime Babel, external assets, or network requests.

Avoid generic SaaS template energy. Make this feel specific to an AI coding assistant and the engineers who buy it.
