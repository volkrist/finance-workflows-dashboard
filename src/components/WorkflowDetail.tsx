import { Workflow } from "../data/workflows";

export function WorkflowDetail(props: {
  workflow: Workflow | null;
  onCompleteStep: (workflowId: string, stepId: string) => void;
}) {
  if (!props.workflow) {
    return (
      <div style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Select a workflow</h2>
        <p>Choose a workflow on the left to see steps.</p>
      </div>
    );
  }

  const w = props.workflow;

  return (
    <div style={{ padding: 24, flex: 1 }}>
      <h2 style={{ marginTop: 0 }}>{w.name}</h2>
      {w.description && <p style={{ opacity: 0.85 }}>{w.description}</p>}

      <h3>Steps</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {w.steps.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>status: {s.status}</div>
            </div>

            <button
              onClick={() => props.onCompleteStep(w.id, s.id)}
              disabled={s.status === "completed"}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: s.status === "completed" ? "#eee" : "white",
                cursor: s.status === "completed" ? "default" : "pointer",
              }}
            >
              Mark complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
