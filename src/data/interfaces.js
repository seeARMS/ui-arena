import { generatedModelSlots, generatedResults } from "./generated-results.js";
import { generatedTaste } from "./generated-taste.js";

export const surfaces = [
  {
    id: "landing",
    label: "Landing pages",
    description: "Marketing surfaces. Hero, value prop, social proof, and a CTA that earns the install.",
  },
  {
    id: "pricing",
    label: "Pricing",
    description: "Plan comparisons, usage limits, team upgrades, and the trust cues that close.",
  },
  {
    id: "dashboard",
    label: "Dashboards",
    description: "Analytics surfaces. Charts, KPIs, time ranges, and the tables behind them.",
  },
  {
    id: "auth",
    label: "Auth & access",
    description: "Login, signup, password reset, MFA, OAuth — every surface a session passes through.",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    description: "First-run flows that balance speed, confidence, and useful defaults.",
  },
  {
    id: "settings",
    label: "Settings & billing",
    description: "Account, workspace, billing, and team admin — the boring screens that ship the company.",
  },
  {
    id: "admin",
    label: "Admin tables",
    description: "Dense operational UI: rows, scopes, ownership, rotation, audit.",
  },
  {
    id: "mobile",
    label: "Mobile screens",
    description: "Single-screen mobile UI built for thumb reach and one job at a time.",
  },
  {
    id: "workflow",
    label: "Workflows & builders",
    description: "Visual editors and planners — triggers, branches, actions, performance.",
  },
  {
    id: "chat",
    label: "Chat & agents",
    description: "Conversational and agent surfaces. Streaming, tool calls, approvals, and follow-ups.",
  },
];

export const surfaceById = (id) => surfaces.find((s) => s.id === id);

const REACT_STACK_NOTE = `Stack: React app. Build it as a small project directory using mock data. The runner will install dependencies, compile the app, and repair build errors if needed.`;

const HTML_STACK_NOTE = `Stack: a single self-contained HTML file. No external assets, no runtime fetches. System fonts only.`;

const liveScenarios = [
  {
    number: "01",
    id: "pricing-ai-coding-assistant",
    surface: "pricing",
    title: "SaaS pricing page",
    eyebrow: "AI coding assistant",
    summary: "Three plans, a team upgrade path, usage limits, trust signals, FAQs.",
    prompt: `Design and implement a pricing page for an AI coding assistant.

The product helps developers plan changes, edit code, run tests, and review pull requests with an AI agent. Pricing has to let an individual decide today, give an engineering team a reason to upgrade, and route enterprises to sales.

Build:
- Three paid plans with realistic prices and concrete usage limits (per-month tokens, parallel agents, indexed repos, context window).
- A team upgrade path that's specific (shared budgets, audit log, SSO, role-based permissions).
- Trust signals about source-code privacy, model providers, retention, and SOC 2.
- An FAQ that answers real buying objections — not filler.
- Strong visual hierarchy: the recommended plan should be obvious without hiding tradeoffs.
- Responsive behavior for mobile, tablet, and desktop.

${REACT_STACK_NOTE}

Avoid generic SaaS template energy. Make this feel specific to an AI coding assistant and the engineers who buy it.`,
    status: "Live · ranked",
    stack: "React",
  },
  {
    number: "02",
    id: "newsletter-analytics-dashboard",
    surface: "dashboard",
    title: "Newsletter analytics dashboard",
    eyebrow: "Creator analytics",
    summary: "Growth, retention, revenue, and content-level performance for a working creator.",
    prompt: `Build an analytics dashboard for a newsletter platform — the home screen a working creator opens to figure out what to do next.

The user is a solo creator or a small media team. They want to understand subscriber growth, churn, revenue, traffic sources, and which posts moved the audience. They have ~20 minutes a week to act on this.

Build:
- A header with publication name, time-range selector (7D / 30D / 90D / All), and a refresh state.
- A four-tile metric strip (subscribers, paid, revenue, open rate) with deltas vs the previous period.
- A growth chart and a churn-vs-acquired chart. Render charts with SVG — no external chart libraries.
- A "recent posts" table with sortable columns (open rate, paid conversions, click-through).
- An "insights" rail with at least three concrete recommendations the data justifies.
- Empty states, loading flicker, and at least one disabled filter that hints at depth.
- Responsive behavior for mobile, tablet, and desktop.

${REACT_STACK_NOTE}

Make this feel like a working operational product, not a decorative mockup. Bake in realistic mock data.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "03",
    id: "ai-chat-tool-approvals",
    surface: "chat",
    title: "AI chat with tool approvals",
    eyebrow: "Agent workspace",
    summary: "A chat surface that makes every tool call inspectable before it runs.",
    prompt: `Build a chat interface where an AI agent runs commands and edits files, but every tool call has to be approved first.

The user is a developer testing an agent. They want to see exactly what's about to happen before it happens, approve fast on the obvious, and reject confidently on the risky.

Build:
- A two-pane layout: chat on the left, "context inspector" on the right (the inspector shows the file, command, or diff the agent wants to touch).
- A live conversation with at least: user turn, assistant turn, two tool calls, two tool results, and one nested follow-up.
- Pending approvals must be visually prominent. Each has approve / reject / inspect (focuses the inspector).
- A "trust" affordance: allowlist this kind of call for the session.
- A typing indicator while the agent is "thinking", and a "stop" affordance during a tool call.
- Responsive behavior — the inspector collapses sensibly on narrow widths.

${REACT_STACK_NOTE}

The interface should create trust without making the workflow slow. Avoid blocking modals for routine approvals; reserve them for destructive ones.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "04",
    id: "route-planner",
    surface: "workflow",
    title: "Route planner",
    eyebrow: "Cycling and running",
    summary: "Distance, elevation, pace, weather, and route comparison on one canvas.",
    prompt: `Build a route planner for cyclists and runners deciding where to head out.

The user is comparing two or three candidate routes for today. They want distance, elevation, surface (paved/gravel/trail), estimated time at their pace, weather window, and a sense of how busy each option is.

Build:
- A canvas-style route view (SVG; no map tiles, no remote assets) — show route shapes as stylized polylines on a stylized terrain background.
- A side rail listing 3 candidate routes with summary stats. Selecting a route highlights it on the canvas.
- A toggle for cycling vs running that updates the pace estimate.
- A weather strip (temperature, wind, precip) for the next few hours, with an automatically chosen "best window".
- An elevation profile for the selected route as an SVG line chart.
- A "compare" mode that overlays two route stats side by side.
- Responsive behavior for mobile and desktop.

${REACT_STACK_NOTE}

No external services. Build a self-contained representation that still feels analytical and trustworthy.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "05",
    id: "saas-billing-settings",
    surface: "settings",
    title: "Billing settings",
    eyebrow: "Team workspace",
    summary: "Seats, invoices, plan changes, payment state, and admin controls in one screen.",
    prompt: `Build a billing settings page for a SaaS team workspace.

The user is a workspace admin doing a real billing task — adding seats, swapping cards, downgrading, or pulling an invoice for finance. They visit weekly and want efficiency, not delight.

Build:
- A "current plan" panel: tier, renewal date, monthly cost, included seats, current usage.
- A seats table: members and their roles, with a way to add seats, remove members, and flag over-permissioned accounts.
- A payment method block with card brand, last four, and an "update" affordance that opens an inline form (no modal).
- An invoices table with PDF download icons, status pills, and a search/filter.
- A "danger zone" for downgrade or cancel with a friction step (typed confirmation).
- Role-aware UI: non-admin viewers see read-only states with an explanation.
- Responsive behavior for mobile and desktop.

${REACT_STACK_NOTE}

Optimize for the second-time admin. Inline editing beats modals. Keyboard-first beats mouse-first.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "06",
    id: "creator-publication-onboarding",
    surface: "onboarding",
    title: "Publication onboarding",
    eyebrow: "Creator setup",
    summary: "A focused setup that balances speed, confidence, and sensible defaults.",
    prompt: `Build a multi-step onboarding flow for a creator starting a new publication.

The creator is on step zero of building an audience. They need to name the publication, pick an audience focus, set a cadence, choose basic branding (color, type), and post a welcome note. They will judge the product by how confident they feel after step three.

Build:
- A four- or five-step flow with clear progress indication and a way to go back.
- Step 1 — identity: name, handle (with availability-check feel), short tagline.
- Step 2 — audience and cadence: who it's for + how often; smart defaults from the audience answer.
- Step 3 — branding: a small color/type system preview that reacts to choices in real time.
- Step 4 — first post: title, body (textarea), preview tile, and a "publish welcome" CTA.
- A persistent live "preview card" rail that updates as the creator fills out the steps.
- Friendly skip handling: any step beyond identity should be skippable with sane defaults.
- Responsive behavior for mobile and desktop.

${REACT_STACK_NOTE}

The flow should feel quick but not flimsy. Smart defaults beat clever copy.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "07",
    id: "api-keys-admin-table",
    surface: "admin",
    title: "API keys admin table",
    eyebrow: "Permissions",
    summary: "Dense operational UI: scopes, ownership, rotation state, and audit trail.",
    prompt: `Build an admin table for managing API keys and permissions in an engineering workspace.

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

${REACT_STACK_NOTE}

Mock at least 25 rows with varied states. Prioritize density and operational confidence — avoid empty whitespace and decorative elements that dilute scanning.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "08",
    id: "open-source-developer-tool-landing",
    surface: "landing",
    title: "Developer tool landing page",
    eyebrow: "Open source",
    summary: "Explain the tool, earn trust, and get a developer to install in under a minute.",
    prompt: `Build the landing page for an open-source developer tool.

The tool helps developers do something hard or annoying — pick a believable category (e.g., a CLI for migrating between deploy targets, a typed API client generator, a local-first observability runner). Pretend it has 3.4k stars and one paid tier.

Build:
- Hero with project name, sharp value prop, copyable install command, and primary CTA.
- A feature grid grounded in real workflow moments — not abstract bullet points.
- A "how it works" block — three steps with code snippets that look real.
- Social proof: GitHub stars, contributors count, a quote or two from named-but-fictional developers.
- A "for teams" upsell strip with a paid tier.
- Clear paths to docs, GitHub, and Discord.
- Responsive behavior for mobile and desktop.

${HTML_STACK_NOTE}

Avoid generic startup copy. The page should feel like it was written by an engineer who shipped this.`,
    status: "Prompt ready",
    stack: "HTML",
  },
  {
    number: "09",
    id: "habit-tracking-mobile-screen",
    surface: "mobile",
    title: "Habit tracking mobile screen",
    eyebrow: "Daily use",
    summary: "A daily-use mobile screen with progress, streaks, editing, and motivation.",
    prompt: `Build the today screen of a mobile habit-tracking app.

The user opens this app every morning. They want to see today's habits, tap to complete them, peek at streaks, edit the plan, and feel a small lift — not guilt.

Build:
- A mobile-shaped canvas (max-width ~430px) centered in the viewport.
- A header with the date and a streak summary.
- A "today" list of 5–7 habits with tappable completion controls (rings, checks, or sliders that animate).
- A progress band that updates as habits complete.
- An add-habit affordance and an edit/reorder mode.
- A small "yesterday" recap that shows what slipped without scolding.
- Smooth ~200ms transitions on completion taps.

${REACT_STACK_NOTE}

The screen must look fine in a desktop browser, but the primary design target is mobile. Tone supports consistency without guilt-tripping.`,
    status: "Prompt ready",
    stack: "React",
  },
  {
    number: "10",
    id: "newsletter-growth-workflow-builder",
    surface: "workflow",
    title: "Newsletter workflow builder",
    eyebrow: "Automation",
    summary: "A visual automation surface: triggers, branches, actions, and performance.",
    prompt: `Build a visual workflow builder for automating newsletter growth.

The user is an operator setting up a sequence: trigger when someone subscribes from a specific source, send a welcome series, branch on engagement, tag, recommend a paid post, and measure conversion to paid.

Build:
- A canvas with draggable nodes connected by lines. Node types: trigger, action (send email, tag, wait), condition (branch), and goal.
- A side configuration panel for the selected node with realistic fields (subject line, delay, branching condition, recommendation source).
- A header with workflow name, status (draft / live), publish/test buttons, and last-edited time.
- An analytics overlay toggle: each node shows entered, completed, conversion rate.
- Undo/redo and a "fit to view" affordance.
- An empty state for a brand-new workflow that teaches the user how to start.
- Responsive behavior — the canvas should degrade to a structured list on narrow screens.

${REACT_STACK_NOTE}

Use SVG (or absolutely-positioned divs) for the canvas — no flow-chart libraries. Make the automation details visible without cluttering the canvas.`,
    status: "Prompt ready",
    stack: "React",
  },
];

const placeholderScenarios = [
  // Landing
  { surface: "landing", title: "Consumer mobile app landing", eyebrow: "Habit app", summary: "App-store-bound landing with hero device, feature loop, social proof.", stack: "HTML" },
  { surface: "landing", title: "B2B platform landing", eyebrow: "Enterprise SaaS", summary: "Trust, logos, integrations, ROI calculator, demo-request form.", stack: "HTML" },
  { surface: "landing", title: "Series A startup announcement", eyebrow: "Newsroom", summary: "A press-style launch page with timeline, founder note, and links.", stack: "HTML" },
  // Pricing
  { surface: "pricing", title: "Consumer subscription pricing", eyebrow: "Streaming", summary: "Two tiers, billing cadence, family plan, regional pricing.", stack: "HTML" },
  { surface: "pricing", title: "Usage-based pricing", eyebrow: "Inference platform", summary: "Per-token sliders, model picker, monthly estimate, fine print.", stack: "React" },
  { surface: "pricing", title: "Enterprise pricing", eyebrow: "Workspace product", summary: "Custom plan with seat tiers, SSO, audit, contact sales.", stack: "HTML" },
  // Dashboard
  { surface: "dashboard", title: "E-commerce ops dashboard", eyebrow: "Storefront ops", summary: "Orders, fulfillment SLA, inventory, returns funnel — five charts.", stack: "React" },
  { surface: "dashboard", title: "Customer support dashboard", eyebrow: "Helpdesk", summary: "Queue depth, CSAT, response time, agent leaderboard.", stack: "React" },
  { surface: "dashboard", title: "Inference cost dashboard", eyebrow: "AI ops", summary: "Spend by model, by feature, by tenant. Tokens, latency, cache hit rate.", stack: "React" },
  // Auth
  { surface: "auth", title: "Login screen", eyebrow: "Workspace", summary: "Email + password, SSO, magic link, recovery — one screen, three modes.", stack: "HTML" },
  { surface: "auth", title: "Signup with team invite", eyebrow: "Onboarding", summary: "Account creation that handles invite tokens, plan inheritance, OAuth.", stack: "React" },
  { surface: "auth", title: "MFA setup", eyebrow: "Security", summary: "TOTP enrollment, recovery codes, backup methods, copy-paste-proof flows.", stack: "React" },
  { surface: "auth", title: "Password reset", eyebrow: "Recovery", summary: "Email entry, token verify, password set — three states, one route.", stack: "HTML" },
  // Onboarding
  { surface: "onboarding", title: "Devtool first-run", eyebrow: "CLI bootstrap", summary: "Install confirm, project pick, telemetry opt-in, three example commands.", stack: "HTML" },
  { surface: "onboarding", title: "Team workspace setup", eyebrow: "B2B SaaS", summary: "Workspace name, invites, integrations, sample data — skippable but smart.", stack: "React" },
  // Settings
  { surface: "settings", title: "Profile & notifications", eyebrow: "Personal", summary: "Profile fields, email digest cadence, channel toggles, two-step auth.", stack: "React" },
  { surface: "settings", title: "Workspace settings", eyebrow: "Team", summary: "Domains, SSO, audit log, default permissions — sectioned dense form.", stack: "React" },
  { surface: "settings", title: "Integrations panel", eyebrow: "Connected apps", summary: "Connected providers, scopes, last-sync, revoke, add-integration modal.", stack: "React" },
  // Admin tables
  { surface: "admin", title: "Users admin table", eyebrow: "Team admin", summary: "Search, role filter, bulk actions, last-active, invite-pending state.", stack: "React" },
  { surface: "admin", title: "Audit log table", eyebrow: "Compliance", summary: "Time-ordered event stream with filters, actor expansion, export.", stack: "React" },
  // Mobile
  { surface: "mobile", title: "Workout tracker home", eyebrow: "Fitness", summary: "Today's plan, streak, primary action, quick-log sheet.", stack: "React Native" },
  { surface: "mobile", title: "Banking transactions list", eyebrow: "Personal finance", summary: "Pending vs cleared, search, filters, swipe to categorize.", stack: "React Native" },
  { surface: "mobile", title: "Read-later inbox", eyebrow: "Reading app", summary: "Article list with progress, tags, swipe-archive, dark mode default.", stack: "React Native" },
  // Workflow
  { surface: "workflow", title: "CI pipeline editor", eyebrow: "DevOps", summary: "Step graph, parallel branches, secrets, run-on-trigger config.", stack: "React" },
  { surface: "workflow", title: "Form-to-database builder", eyebrow: "No-code", summary: "Drag fields onto a canvas; live database schema and form preview.", stack: "React" },
  // Chat
  { surface: "chat", title: "Customer-support copilot", eyebrow: "Helpdesk", summary: "Chat next to ticket detail. Suggested replies, knowledge cites, tone presets.", stack: "React" },
  { surface: "chat", title: "Coding agent transcript", eyebrow: "Dev tool", summary: "Streamed agent steps with tool calls, diffs inline, accept/reject affordances.", stack: "React" },
  { surface: "chat", title: "Voice assistant playground", eyebrow: "Audio", summary: "Push-to-talk, waveform, transcript, model picker, latency badge.", stack: "React" },
];

let placeholderCounter = liveScenarios.length;
const placeholderItems = placeholderScenarios.map((item) => {
  placeholderCounter += 1;
  const slugSource = (item.title ?? `placeholder-${placeholderCounter}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return {
    number: String(placeholderCounter).padStart(2, "0"),
    id: `placeholder-${item.surface}-${slugSource}`,
    surface: item.surface,
    title: item.title,
    eyebrow: item.eyebrow,
    summary: item.summary,
    status: "Scenario in queue",
    stack: item.stack,
    placeholder: true,
  };
});

export const scenarioPrompts = liveScenarios.map((item) => ({
  ...item,
  href: `/scenarios/${item.id}/`,
}));

export const interfacePrompts = scenarioPrompts;

export const allScenarios = [
  ...scenarioPrompts,
  ...placeholderItems.map((item) => ({ ...item, href: null })),
];

export const allBriefs = allScenarios;

export function scenariosForSurface(surfaceId) {
  return allScenarios.filter((scenario) => scenario.surface === surfaceId);
}

export const briefsForSurface = scenariosForSurface;

export const surfacesWithCounts = surfaces.map((surface) => ({
  ...surface,
  count: scenariosForSurface(surface.id).length,
  liveCount: scenariosForSurface(surface.id).filter((b) => !b.placeholder).length,
}));

export const pricingInterface = {
  ...scenarioPrompts[0],
};

const modelSlots = generatedModelSlots.length
  ? generatedModelSlots
  : [
      {
        id: "gpt-5-5",
        displayName: "GPT-5.5",
        family: "OpenAI",
        accent: "#e04f2f",
        accentSoft: "#f7d9cd",
        gatewayModel: "openai/gpt-5.5",
      },
      {
        id: "claude-opus-4-6",
        displayName: "Claude Opus 4.6",
        family: "Anthropic",
        accent: "#8b4f28",
        accentSoft: "#eddacb",
        gatewayModel: "anthropic/claude-opus-4.6",
      },
      {
        id: "claude-opus-4-5",
        displayName: "Claude Opus 4.5",
        family: "Anthropic",
        accent: "#5a4c8f",
        accentSoft: "#dfd9f0",
        gatewayModel: "anthropic/claude-opus-4.5",
      },
      {
        id: "gemini-3-flash-preview",
        displayName: "Gemini 3 Flash Preview",
        family: "Google",
        accent: "#c56b14",
        accentSoft: "#f3dfc8",
        gatewayModel: "google/gemini-3-flash-preview",
      },
    ];

export function interfaceById(interfaceId) {
  return scenarioPrompts.find((item) => item.id === interfaceId);
}

export const scenarioById = interfaceById;

function latestResultFor(modelId, interfaceId) {
  return generatedResults
    .filter((result) => result.modelId === modelId && result.interfaceId === interfaceId)
    .sort((a, b) => String(b.completedAt ?? b.createdAt).localeCompare(String(a.completedAt ?? a.createdAt)))[0];
}

export function latestResultForScenarioModel(scenarioId, modelId) {
  return latestResultFor(modelId, scenarioId);
}

export function resultPathFor(result) {
  return result ? `/scenarios/${result.interfaceId}/${result.modelId}/` : "#";
}

export function tasteForResult(result) {
  if (!result || result.status !== "complete") {
    return null;
  }

  const scenarioTaste = generatedTaste?.scenarios?.[result.interfaceId];
  const modelTaste = scenarioTaste?.models?.[result.modelId];

  if (!modelTaste || modelTaste.runId !== result.runId) {
    return null;
  }

  return modelTaste;
}

function modelTasteFor(modelId) {
  return generatedTaste?.models?.[modelId] ?? null;
}

function formatDate(value) {
  if (!value) {
    return "not run yet";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDuration(ms) {
  if (typeof ms !== "number") {
    return "-";
  }

  if (ms < 1000) {
    return `${ms}ms`;
  }

  return `${(ms / 1000).toFixed(ms < 10000 ? 1 : 0)}s`;
}

function formatTokens(value) {
  if (typeof value !== "number") {
    return "-";
  }

  return new Intl.NumberFormat("en").format(value);
}

function formatCost(value) {
  if (typeof value !== "number") {
    return "-";
  }

  if (value === 0) {
    return "$0";
  }

  return `$${value.toFixed(value < 0.01 ? 5 : 4)}`;
}

function formatScore(score) {
  if (!score || typeof score.value !== "number") {
    return "-";
  }

  return String(score.value);
}

function scoreTone(value) {
  if (typeof value !== "number") {
    return "neutral";
  }

  if (value >= 90) {
    return "good";
  }

  if (value >= 70) {
    return "warn";
  }

  return "bad";
}

function formatIssueCount(value) {
  if (typeof value !== "number") {
    return "-";
  }

  return value === 1 ? "1 issue" : `${value} issues`;
}

function statusLabel(result) {
  if (!result) {
    return "Pending";
  }

  if (result.status === "error") {
    return "Failed";
  }

  return "Generated";
}

function statsFor(result) {
  if (!result || result.status !== "complete") {
    return [];
  }

  return [
    { label: "Time", value: formatDuration(result.execution?.durationMs) },
    { label: "Prompt", value: formatTokens(result.usage?.promptTokens) },
    { label: "Completion", value: formatTokens(result.usage?.completionTokens) },
    { label: "Cost", value: formatCost(result.usage?.totalCost) },
  ];
}

function evaluationsFor(result) {
  if (!result || result.status !== "complete") {
    return { items: [], reportUrl: null };
  }

  const evaluations = result.evaluations ?? {};
  const lighthouse = evaluations.lighthouse;
  const axe = evaluations.axe;
  const items = [];

  if (lighthouse?.status === "complete") {
    const performanceValue = lighthouse.scores?.performance?.value;
    const accessibilityValue = lighthouse.scores?.accessibility?.value;

    items.push({
      label: "Performance",
      value: formatScore(lighthouse.scores?.performance),
      detail: "Lighthouse",
      tone: scoreTone(performanceValue),
      percent: typeof performanceValue === "number" ? performanceValue : 0,
    });
    items.push({
      label: "Accessibility",
      value: formatScore(lighthouse.scores?.accessibility),
      detail: "Lighthouse",
      tone: scoreTone(accessibilityValue),
      percent: typeof accessibilityValue === "number" ? accessibilityValue : 0,
    });
  } else if (lighthouse?.status === "error") {
    items.push({
      label: "Lighthouse",
      value: "Error",
      detail: lighthouse.error?.message ?? "Evaluation failed",
      tone: "bad",
      percent: 0,
    });
  }

  if (axe?.status === "complete") {
    const violationCount = axe.summary?.violationCount;
    const seriousOrCriticalCount = axe.summary?.seriousOrCriticalCount;

    items.push({
      label: "Axe",
      value: formatIssueCount(violationCount),
      detail:
        typeof seriousOrCriticalCount === "number"
          ? `${seriousOrCriticalCount} serious/critical`
          : "Accessibility checks",
      tone: violationCount === 0 ? "good" : seriousOrCriticalCount > 0 ? "bad" : "warn",
      percent: violationCount === 0 ? 100 : seriousOrCriticalCount > 0 ? 18 : 52,
    });
  } else if (axe?.status === "error") {
    items.push({
      label: "Axe",
      value: "Error",
      detail: axe.error?.message ?? "Evaluation failed",
      tone: "bad",
      percent: 0,
    });
  }

  return {
    items,
    reportUrl: lighthouse?.artifacts?.report ?? axe?.artifacts?.json ?? null,
  };
}

export function outputsForInterface(interfaceId) {
  return modelSlots.map((slot) => {
    const result = latestResultFor(slot.id, interfaceId);
    const isComplete = result?.status === "complete";
    const isError = result?.status === "error";
    const evaluation = evaluationsFor(result);
    const taste = tasteForResult(result);

    return {
      modelId: slot.id,
      runId: result?.runId ?? null,
      model: slot.displayName,
      family: slot.family,
      status: isComplete ? `Generated ${formatDate(result.completedAt)}` : isError ? "Run failed" : "Output slot ready",
      stateLabel: statusLabel(result),
      note: isComplete
        ? `Rendered from ${slot.gatewayModel}. Usage, artifacts, and evaluator results are stored with the run.`
        : isError
          ? result.error?.message ?? "The run failed before a preview was created."
          : `Placeholder for ${slot.gatewayModel}. Run this slot with npm run arena:run -- --interface ${interfaceId} --models ${slot.id}.`,
      accent: slot.accent,
      accentSoft: slot.accentSoft,
      runUrl: resultPathFor(result),
      previewUrl: resultPathFor(result),
      sourceUrl: result ? `${resultPathFor(result)}#source` : "#",
      rawPreviewUrl: result?.artifacts?.preview ?? "#",
      screenshotUrl: result?.artifacts?.desktopScreenshot ?? "#",
      rawSourceUrl: result?.artifacts?.source ?? "#",
      resultUrl: result ? "/results/index.json" : "#",
      pending: !isComplete,
      stats: statsFor(result),
      evaluations: evaluation.items,
      evaluationReportUrl: evaluation.reportUrl ?? "#",
      tasteScore: taste?.score ?? null,
      tasteCiLow: taste?.ciLow ?? null,
      tasteCiHigh: taste?.ciHigh ?? null,
      tasteVotes: taste?.votes ?? 0,
      tasteWins: taste?.wins ?? 0,
      tasteLosses: taste?.losses ?? 0,
      tasteTies: taste?.ties ?? 0,
      tasteProvisional: taste?.provisional ?? true,
    };
  });
}

export const pricingOutputs = outputsForInterface(pricingInterface.id);

function avgOrNull(values) {
  const filtered = values.filter((v) => typeof v === "number" && Number.isFinite(v));
  if (filtered.length === 0) return null;
  return filtered.reduce((a, b) => a + b, 0) / filtered.length;
}

function sumOrZero(values) {
  return values.filter((v) => typeof v === "number" && Number.isFinite(v)).reduce((a, b) => a + b, 0);
}

export const modelAggregates = modelSlots.map((slot) => {
  const completedRuns = generatedResults.filter(
    (r) => r.modelId === slot.id && r.status === "complete",
  );
  const liveBriefIds = new Set(interfacePrompts.map((b) => b.id));
  const briefsCovered = new Set(completedRuns.map((r) => r.interfaceId).filter((id) => liveBriefIds.has(id)));

  const perfValues = completedRuns
    .map((r) => r.evaluations?.lighthouse?.scores?.performance?.value)
    .filter((v) => typeof v === "number");
  const a11yValues = completedRuns
    .map((r) => r.evaluations?.lighthouse?.scores?.accessibility?.value)
    .filter((v) => typeof v === "number");
  const axeValues = completedRuns
    .map((r) => r.evaluations?.axe?.summary?.violationCount)
    .filter((v) => typeof v === "number");
  const seriousValues = completedRuns
    .map((r) => r.evaluations?.axe?.summary?.seriousOrCriticalCount)
    .filter((v) => typeof v === "number");
  const durations = completedRuns.map((r) => r.execution?.durationMs).filter((v) => typeof v === "number");
  const costs = completedRuns.map((r) => r.usage?.totalCost).filter((v) => typeof v === "number");
  const completionTokens = completedRuns
    .map((r) => r.usage?.completionTokens)
    .filter((v) => typeof v === "number");

  const avgPerf = avgOrNull(perfValues);
  const avgA11y = avgOrNull(a11yValues);
  const avgAxe = avgOrNull(axeValues);
  const avgSerious = avgOrNull(seriousValues);
  const avgTime = avgOrNull(durations);
  const totalCost = sumOrZero(costs);
  const avgCompletionTokens = avgOrNull(completionTokens);
  const taste = modelTasteFor(slot.id);

  // Hygiene score: 70% accessibility weight, 30% perf, minus axe penalty.
  // This stays separate from taste; it captures implementation hygiene, not aesthetic judgment.
  const hygieneScore =
    avgPerf !== null && avgA11y !== null
      ? avgPerf * 0.3 + avgA11y * 0.7 - (avgAxe ?? 0) * 1.5 - (avgSerious ?? 0) * 3
      : null;

  return {
    modelId: slot.id,
    displayName: slot.displayName,
    family: slot.family,
    gatewayModel: slot.gatewayModel,
    accent: slot.accent,
    accentSoft: slot.accentSoft,
    runs: completedRuns.length,
    coverage: briefsCovered.size,
    coverageTotal: liveBriefIds.size,
    avgPerf,
    avgA11y,
    avgAxe,
    avgSerious,
    avgTime,
    totalCost,
    avgCompletionTokens,
    hygieneScore,
    aggregate: hygieneScore,
    tasteScore: taste?.score ?? null,
    tasteCiLow: taste?.ciLow ?? null,
    tasteCiHigh: taste?.ciHigh ?? null,
    tasteScenarios: taste?.scenarios ?? 0,
    tasteVotes: taste?.votes ?? 0,
    tasteComparisons: taste?.comparisons ?? 0,
    tasteWins: taste?.wins ?? 0,
    tasteLosses: taste?.losses ?? 0,
    tasteTies: taste?.ties ?? 0,
    tasteProvisional: taste?.provisional ?? true,
  };
});

export const benchTotals = {
  totalRuns: modelAggregates.reduce((a, b) => a + b.runs, 0),
  totalCost: modelAggregates.reduce((a, b) => a + b.totalCost, 0),
  tasteVotes: Object.values(generatedTaste?.scenarios ?? {}).reduce((sum, scenario) => sum + (scenario.votes ?? 0), 0),
  tasteScenarios: Object.values(generatedTaste?.scenarios ?? {}).filter((scenario) => scenario.status === "scored").length,
  tasteGeneratedAt: generatedTaste?.generatedAt ?? null,
  briefsLive: interfacePrompts.length,
  modelsActive: modelAggregates.filter((m) => m.runs > 0).length,
  modelsTotal: modelAggregates.length,
};
