import type { Workflow } from "../data/workflows";

export function workflowDerivedStatus(w: Workflow): "open" | "done" | "blocked" {
  const anyBlocked = w.steps.some((s) => s.status === "blocked");
  if (anyBlocked) return "blocked";

  const allCompleted = w.steps.every((s) => s.status === "completed");
  if (allCompleted) return "done";

  return "open";
}

export function workflowCurrentStep(w: Workflow) {
  return w.steps.find((s) => s.status !== "completed")?.title ?? "—";
}
