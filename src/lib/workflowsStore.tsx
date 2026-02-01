import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { initialWorkflows, Workflow } from "../data/workflows";

export type ActivityEvent = {
  id: string;
  timestamp: string;
  action: string;
  details?: string;
  workflowId?: string;
  stepId?: string;
  userId?: string;
};

type Ctx = {
  workflows: Workflow[];
  completeStep: (workflowId: string, stepId: string) => void;
  blockStep: (workflowId: string, stepId: string) => void;
  activities: ActivityEvent[];
  logActivity: (action: string, details?: string, workflowId?: string, stepId?: string) => void;
};

const WorkflowsCtx = createContext<Ctx | null>(null);

export function WorkflowsProvider({ children }: { children: React.ReactNode }) {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  const logActivity = useCallback(
    (action: string, details?: string, workflowId?: string, stepId?: string) => {
      setActivities((prev) => [
        ...prev,
        {
          id: `act-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: new Date().toISOString(),
          action,
          details,
          workflowId,
          stepId,
          userId: "current-user",
        },
      ]);
    },
    []
  );

  function completeStep(workflowId: string, stepId: string) {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id !== workflowId
          ? w
          : { ...w, steps: w.steps.map((s) => (s.id === stepId ? { ...s, status: "completed" } : s)) }
      )
    );
  }

  function blockStep(workflowId: string, stepId: string) {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id !== workflowId
          ? w
          : {
            ...w,
            steps: w.steps.map((s) =>
              s.id === stepId ? { ...s, status: "blocked" } : s
            ),
          }
      )
    );
  }

  const value = useMemo(
    () => ({ workflows, completeStep, blockStep, activities, logActivity }),
    [workflows, activities, logActivity]
  );

  return <WorkflowsCtx.Provider value={value}>{children}</WorkflowsCtx.Provider>;
}

export function useWorkflows() {
  const ctx = useContext(WorkflowsCtx);
  if (!ctx) throw new Error("useWorkflows must be used inside WorkflowsProvider");
  return ctx;
}
