import { useMemo, useState } from "react";
import { initialWorkflows, Workflow } from "./data/workflows";
import { WorkflowList } from "./components/WorkflowList";
import { WorkflowDetail } from "./components/WorkflowDetail";

export default function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [selectedId, setSelectedId] = useState<string | null>(workflows[0]?.id ?? null);

  const selected = useMemo(
    () => workflows.find((w) => w.id === selectedId) ?? null,
    [workflows, selectedId]
  );

  function onCompleteStep(workflowId: string, stepId: string) {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id !== workflowId
          ? w
          : {
            ...w,
            steps: w.steps.map((s) => (s.id === stepId ? { ...s, status: "completed" } : s)),
          }
      )
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, Arial" }}>
      <WorkflowList workflows={workflows} selectedId={selectedId} onSelect={setSelectedId} />
      <WorkflowDetail workflow={selected} onCompleteStep={onCompleteStep} />
    </div>
  );
}
