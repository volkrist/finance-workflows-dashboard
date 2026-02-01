import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { seedTasks } from "../data/inbox";
import { useWorkflows } from "../lib/workflowsStore";
import { workflowCurrentStep, workflowDerivedStatus } from "../lib/workflowSelectors";

type Filter = "open" | "done" | "blocked" | "all";

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function Inbox() {
  const { workflows, completeStep } = useWorkflows();

  const [filter, setFilter] = useState<Filter>("open");

  const rows = useMemo(() => {
    return seedTasks.map((t) => {
      const wf = workflows.find((w) => w.id === t.workflowId);
      const derived = wf ? workflowDerivedStatus(wf) : "open";
      const currentStep = wf ? workflowCurrentStep(wf) : t.stepId;

      return {
        ...t,
        derivedStatus: derived,
        currentStep,
      };
    });
  }, [workflows]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter === "all") return true;
      return r.derivedStatus === filter;
    });
  }, [rows, filter]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 style={{ marginTop: 0 }}>Inbox</h2>

        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="open">Open</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f7f7f7" }}>
            <tr>
              {["Case", "Workflow", "Step", "Vendor", "Amount", "Due", "Priority", "Status", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #ddd" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => {
              const wf = workflows.find((w) => w.id === t.workflowId);
              const step = wf?.steps.find((s) => s.id === t.stepId);
              const stepCompleted = step?.status === "completed";
              const canComplete = t.derivedStatus === "open" && !stepCompleted;

              return (
                <tr key={t.id}>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee", fontWeight: 700 }}>{t.caseId}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{wf?.name ?? t.workflowId}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{t.currentStep}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{t.vendor}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{fmtUsd(t.amountUsd)}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{t.dueDate}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{t.priority}</td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        border: "1px solid #ddd",
                        background:
                          t.derivedStatus === "blocked"
                            ? "#fdecec"
                            : t.derivedStatus === "done"
                              ? "#f3fdf6"
                              : "#eef5ff",
                        fontWeight: 800,
                        fontSize: 12,
                      }}
                    >
                      {t.derivedStatus.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
                    <Link
                      to={`/workflows/${t.workflowId}?caseId=${t.caseId}`}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        textDecoration: "none",
                        color: "black",
                        background: "white",
                      }}
                    >
                      Open
                    </Link>

                    <button
                      onClick={() => completeStep(t.workflowId, t.stepId)}
                      disabled={!canComplete}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        background: canComplete ? "white" : "#eee",
                        cursor: canComplete ? "pointer" : "default",
                      }}
                    >
                      Mark complete
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} style={{ padding: 16, opacity: 0.7 }}>
                  No tasks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
