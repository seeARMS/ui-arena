import { generatedModelSlots, generatedResults } from "./generated-results.js";

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

const liveBriefs = [
  {
    number: "01",
    id: "pricing-ai-coding-assistant",
    surface: "pricing",
    title: "SaaS pricing page",
    eyebrow: "AI coding assistant",
    summary: "Three plans, a team upgrade path, usage limits, trust signals, FAQs.",
    prompt:
      "Design and implement a pricing page for an AI coding assistant. It should include three plans, a clear team upgrade path, usage limits, trust signals, FAQs, and responsive behavior.",
    status: "Live · ranked",
    stack: "HTML",
  },
  {
    number: "02",
    id: "newsletter-analytics-dashboard",
    surface: "dashboard",
    title: "Newsletter analytics dashboard",
    eyebrow: "Creator analytics",
    summary: "Growth, retention, revenue, and content-level performance for a working creator.",
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
    status: "Prompt ready",
    stack: "HTML",
  },
  {
    number: "05",
    id: "saas-billing-settings",
    surface: "settings",
    title: "Billing settings",
    eyebrow: "Team workspace",
    summary: "Seats, invoices, plan changes, payment state, and admin controls in one screen.",
    status: "Prompt ready",
    stack: "HTML",
  },
  {
    number: "06",
    id: "creator-publication-onboarding",
    surface: "onboarding",
    title: "Publication onboarding",
    eyebrow: "Creator setup",
    summary: "A focused setup that balances speed, confidence, and sensible defaults.",
    status: "Prompt ready",
    stack: "HTML",
  },
  {
    number: "07",
    id: "api-keys-admin-table",
    surface: "admin",
    title: "API keys admin table",
    eyebrow: "Permissions",
    summary: "Dense operational UI: scopes, ownership, rotation state, and audit trail.",
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
    status: "Prompt ready",
    stack: "React Native",
  },
  {
    number: "10",
    id: "newsletter-growth-workflow-builder",
    surface: "workflow",
    title: "Newsletter workflow builder",
    eyebrow: "Automation",
    summary: "A visual automation surface: triggers, branches, actions, and performance.",
    status: "Prompt ready",
    stack: "React",
  },
];

const placeholderBriefs = [
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

let placeholderCounter = liveBriefs.length;
const placeholderItems = placeholderBriefs.map((item) => {
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
    status: "Brief in queue",
    stack: item.stack,
    placeholder: true,
  };
});

export const interfacePrompts = liveBriefs.map((item) => ({
  ...item,
  href: `/interfaces/${item.id}/`,
}));

export const allBriefs = [
  ...interfacePrompts,
  ...placeholderItems.map((item) => ({ ...item, href: null })),
];

export function briefsForSurface(surfaceId) {
  return allBriefs.filter((brief) => brief.surface === surfaceId);
}

export const surfacesWithCounts = surfaces.map((surface) => ({
  ...surface,
  count: briefsForSurface(surface.id).length,
  liveCount: briefsForSurface(surface.id).filter((b) => !b.placeholder).length,
}));

export const pricingInterface = {
  ...interfacePrompts[0],
  prompt:
    "Design and implement a pricing page for an AI coding assistant. It should include three plans, a clear team upgrade path, usage limits, trust signals, FAQs, and responsive behavior.",
};

const modelSlots = generatedModelSlots.length
  ? generatedModelSlots
  : [
      {
        id: "gpt-5-2",
        displayName: "GPT-5.2",
        family: "OpenAI",
        accent: "#e04f2f",
        accentSoft: "#f7d9cd",
        gatewayModel: "openai/gpt-5.2",
      },
    ];

export function interfaceById(interfaceId) {
  return interfacePrompts.find((item) => item.id === interfaceId);
}

function latestResultFor(modelId, interfaceId) {
  return generatedResults
    .filter((result) => result.modelId === modelId && result.interfaceId === interfaceId)
    .sort((a, b) => String(b.completedAt ?? b.createdAt).localeCompare(String(a.completedAt ?? a.createdAt)))[0];
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
      runUrl: result ? `/interfaces/${interfaceId}/${result.runId}/` : "#",
      previewUrl: result ? `/interfaces/${interfaceId}/${result.runId}/` : "#",
      sourceUrl: result ? `/interfaces/${interfaceId}/${result.runId}/#source` : "#",
      rawPreviewUrl: result?.artifacts?.preview ?? "#",
      screenshotUrl: result?.artifacts?.desktopScreenshot ?? "#",
      rawSourceUrl: result?.artifacts?.source ?? "#",
      resultUrl: result ? "/results/index.json" : "#",
      pending: !isComplete,
      stats: statsFor(result),
      evaluations: evaluation.items,
      evaluationReportUrl: evaluation.reportUrl ?? "#",
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

  // Aggregate score: 70% accessibility weight, 30% perf, minus axe penalty.
  // (Taste leans on accessibility — bad contrast is bad taste.)
  const aggregate =
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
    aggregate,
  };
});

export const benchTotals = {
  totalRuns: modelAggregates.reduce((a, b) => a + b.runs, 0),
  totalCost: modelAggregates.reduce((a, b) => a + b.totalCost, 0),
  briefsLive: interfacePrompts.length,
  modelsActive: modelAggregates.filter((m) => m.runs > 0).length,
  modelsTotal: modelAggregates.length,
};
