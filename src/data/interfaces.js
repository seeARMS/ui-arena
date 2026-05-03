import { generatedModelSlots, generatedResults } from "./generated-results.js";

export const interfacePrompts = [
  {
    number: "01",
    id: "pricing-ai-coding-assistant",
    title: "SaaS pricing page",
    eyebrow: "AI coding assistant",
    summary: "Three plans, a team upgrade path, usage limits, trust signals, FAQs.",
    prompt:
      "Design and implement a pricing page for an AI coding assistant. It should include three plans, a clear team upgrade path, usage limits, trust signals, FAQs, and responsive behavior.",
    status: "Live · ranked",
  },
  {
    number: "02",
    id: "newsletter-analytics-dashboard",
    title: "Newsletter analytics dashboard",
    eyebrow: "Creator analytics",
    summary: "Growth, retention, revenue, and content-level performance for a working creator.",
    status: "Prompt ready",
  },
  {
    number: "03",
    id: "ai-chat-tool-approvals",
    title: "AI chat with tool approvals",
    eyebrow: "Agent workspace",
    summary: "A chat surface that makes every tool call inspectable before it runs.",
    status: "Prompt ready",
  },
  {
    number: "04",
    id: "route-planner",
    title: "Route planner",
    eyebrow: "Cycling and running",
    summary: "Distance, elevation, pace, weather, and route comparison on one canvas.",
    status: "Prompt ready",
  },
  {
    number: "05",
    id: "saas-billing-settings",
    title: "Billing settings",
    eyebrow: "Team workspace",
    summary: "Seats, invoices, plan changes, payment state, and admin controls in one screen.",
    status: "Prompt ready",
  },
  {
    number: "06",
    id: "creator-publication-onboarding",
    title: "Publication onboarding",
    eyebrow: "Creator setup",
    summary: "A focused setup that balances speed, confidence, and sensible defaults.",
    status: "Prompt ready",
  },
  {
    number: "07",
    id: "api-keys-admin-table",
    title: "API keys admin table",
    eyebrow: "Permissions",
    summary: "Dense operational UI: scopes, ownership, rotation state, and audit trail.",
    status: "Prompt ready",
  },
  {
    number: "08",
    id: "open-source-developer-tool-landing",
    title: "Developer tool landing page",
    eyebrow: "Open source",
    summary: "Explain the tool, earn trust, and get a developer to install in under a minute.",
    status: "Prompt ready",
  },
  {
    number: "09",
    id: "habit-tracking-mobile-screen",
    title: "Habit tracking mobile screen",
    eyebrow: "Daily use",
    summary: "A daily-use mobile screen with progress, streaks, editing, and motivation.",
    status: "Prompt ready",
  },
  {
    number: "10",
    id: "newsletter-growth-workflow-builder",
    title: "Newsletter workflow builder",
    eyebrow: "Automation",
    summary: "A visual automation surface: triggers, branches, actions, and performance.",
    status: "Prompt ready",
  },
].map((item) => ({
  ...item,
  href: `/interfaces/${item.id}/`,
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
      previewUrl: result?.artifacts?.preview ?? "#",
      screenshotUrl: result?.artifacts?.desktopScreenshot ?? "#",
      sourceUrl: result ? `/interfaces/${interfaceId}/${result.runId}/source/` : "#",
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
