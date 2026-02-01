import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WorkflowList } from "../components/WorkflowList";
import { useWorkflows } from "../lib/workflowsStore";

const demoByWorkflowId: Record<string, string> = {
  "wf-1": "wf-1", // Invoice approval (INV-2026-0142)
  "wf-2": "wf-2", // Expense reimbursement
  "wf-3": "wf-3", // KYC onboarding
  "wf-4": "wf-4", // Chargeback handling
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { workflows } = useWorkflows();
  const [selectedId, setSelectedId] = useState<string | null>(workflows[0]?.id ?? null);

  const selected = useMemo(
    () => workflows.find((w) => w.id === selectedId) ?? null,
    [workflows, selectedId]
  );

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 360 }}>
        <WorkflowList workflows={workflows} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      <div style={{ flex: 1 }}>
        {!selected ? (
          <div style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Select a workflow</h2>
            <p>Choose a workflow on the left.</p>
          </div>
        ) : (
          <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 6 }}>{selected.name}</div>
            <div style={{ opacity: 0.7, marginBottom: 12 }}>{selected.description}</div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => navigate("/inbox")}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", fontWeight: 800 }}
              >
                Open Inbox
              </button>

              <button
                onClick={() => navigate(`/workflows/${demoByWorkflowId[selected.id] ?? "wf-1"}`)}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", fontWeight: 800 }}
              >
                Open demo case
              </button>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
              Demo shows: forms, audit log, blocked status, persistence.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
