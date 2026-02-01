import { useMemo } from "react";
import type { Workflow } from "../data/workflows";
import { seedTasks } from "../data/inbox";

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function daysUntil(dateStr: string) {
  const due = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const ms = due.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function workflowStatus(wf: Workflow) {
  const total = wf.steps.length;
  const completed = wf.steps.filter((s) => s.status === "completed").length;
  if (completed === 0) return { label: "Not started", tone: "neutral" as const };
  if (completed < total) return { label: "In progress", tone: "info" as const };
  return { label: "Completed", tone: "success" as const };
}

function Badge({ text, tone }: { text: string; tone: "neutral" | "info" | "success" | "danger" }) {
  const bg =
    tone === "success" ? "#e8f7ee" : tone === "danger" ? "#fdecec" : tone === "info" ? "#eef5ff" : "#f2f2f2";
  const border =
    tone === "success" ? "#bfe7cd" : tone === "danger" ? "#f5bcbc" : tone === "info" ? "#c9defc" : "#dddddd";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 999,
        background: bg,
        border: `1px solid ${border}`,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}

export function WorkflowHeader({ workflow }: { workflow: Workflow }) {
  const meta = useMemo(() => seedTasks.find((t) => t.workflowId === workflow.id) ?? null, [workflow.id]);

  const status = workflowStatus(workflow);

  const sla = useMemo(() => {
    if (!meta?.dueDate) return null;
    const d = daysUntil(meta.dueDate);
    if (d < 0) return { text: `Overdue by ${Math.abs(d)}d`, tone: "danger" as const };
    if (d === 0) return { text: "Due today", tone: "danger" as const };
    if (d <= 2) return { text: `Due in ${d}d`, tone: "danger" as const };
    return { text: `Due in ${d}d`, tone: "info" as const };
  }, [meta?.dueDate]);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 16, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{workflow.name}</div>
          <div style={{ opacity: 0.75, marginTop: 4 }}>{workflow.description}</div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Badge text={status.label} tone={status.tone} />
          {sla && <Badge text={sla.text} tone={sla.tone} />}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
          marginTop: 14,
        }}
      >
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 700 }}>Case</div>
          <div style={{ fontWeight: 800, marginTop: 4 }}>{meta?.caseId ?? "—"}</div>
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 700 }}>Vendor</div>
          <div style={{ fontWeight: 800, marginTop: 4 }}>{meta?.vendor ?? "—"}</div>
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 700 }}>Amount</div>
          <div style={{ fontWeight: 800, marginTop: 4 }}>{meta ? fmtUsd(meta.amountUsd) : "—"}</div>
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 700 }}>Due date</div>
          <div style={{ fontWeight: 800, marginTop: 4 }}>{meta?.dueDate ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}
