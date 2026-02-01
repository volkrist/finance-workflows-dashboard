import type { Workflow } from "../data/workflows";

type Props = {
  workflow: Workflow;
  onSelect: (stepId: string) => void;
  activeStepId: string;
};

export function WorkflowStepper({ workflow, onSelect, activeStepId }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {workflow.steps.map((step, idx) => {
        const completed = step.status === "completed";
        const blocked = step.status === "blocked";
        const active = step.id === activeStepId;

        return (
          <div
            key={step.id}
            onClick={() => onSelect(step.id)}
            style={{
              cursor: "pointer",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #ddd",
              background: blocked
                ? "#fdecec"
                : active
                  ? "#eef5ff"
                  : completed
                    ? "#f3fdf6"
                    : "white",
              opacity: blocked ? 1 : completed || active ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 700 }}>
                {idx + 1}. {step.title}
              </div>
              {completed && <span style={{ fontSize: 12 }}>✓</span>}
              {blocked && <span style={{ fontSize: 12, color: "#b00020" }}>blocked</span>}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              status: {step.status}
            </div>
          </div>
        );
      })}
    </div>
  );
}
