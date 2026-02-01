import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkflows } from "../lib/workflowsStore";
import { WorkflowHeader } from "../components/WorkflowHeader";
import { WorkflowStepper } from "../components/WorkflowStepper";
import { StepPanel } from "../components/StepPanel";
import { ActivityLog } from "../components/ActivityLog";

export default function WorkflowDetails() {
  const { workflowId } = useParams();
  const { workflows, completeStep, blockStep } = useWorkflows();

  const wf = useMemo(() => workflows.find((w) => w.id === workflowId) ?? null, [workflows, workflowId]);

  const firstPending = wf?.steps.find((s) => s.status !== "completed")?.id ?? wf?.steps[0]?.id ?? "";
  const [activeStepId, setActiveStepId] = useState(firstPending);

  if (!wf) return <div>Workflow not found</div>;

  return (
    <div>
      <WorkflowHeader workflow={wf} />

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        {/* Stepper */}
        <WorkflowStepper
          workflow={wf}
          activeStepId={activeStepId}
          onSelect={(id) => {
            const step = wf.steps.find((s) => s.id === id);
            if (step?.status === "completed") return;
            setActiveStepId(id);
          }}
        />

        {/* Step panel + Activity log */}
        <div>
          <StepPanel
            key={activeStepId}
            workflow={wf}
            activeStepId={activeStepId}
            completeStep={completeStep}
            blockStep={blockStep}
            setActiveStepId={setActiveStepId}
          />

          <div style={{ marginTop: 16 }}>
            <ActivityLog workflowId={wf.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
