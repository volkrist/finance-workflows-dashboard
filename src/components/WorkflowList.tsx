import { Workflow } from "../data/workflows";

export function WorkflowList(props: {
  workflows: Workflow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ borderRight: "1px solid #ddd", padding: 16, width: 360 }}>
      <h2 style={{ marginTop: 0 }}>Workflows</h2>
      {props.workflows.map((w) => (
        <button
          key={w.id}
          onClick={() => props.onSelect(w.id)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: props.selectedId === w.id ? "#f2f2f2" : "white",
            cursor: "pointer",
          }}
        >
          <div style={{ fontWeight: 600 }}>{w.name}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{w.description ?? ""}</div>
        </button>
      ))}
    </div>
  );
}
