export type Priority = "low" | "medium" | "high";
export type TaskStatus = "open" | "done";

export type InboxTask = {
  id: string;
  caseId: string;
  workflowId: string;
  stepId: string;
  vendor: string;
  amountUsd: number;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  assignee: string | null;
  status: TaskStatus;
};

export const seedTasks: Omit<InboxTask, "status">[] = [
  {
    id: "t-1",
    caseId: "INV-2026-0142",
    workflowId: "wf-1",
    stepId: "s-1",
    vendor: "Shenzhen Parts Co.",
    amountUsd: 1840,
    dueDate: "2026-02-05",
    priority: "high",
    assignee: null,
  },
  {
    id: "t-2",
    caseId: "INV-2026-0143",
    workflowId: "wf-1",
    stepId: "s-2",
    vendor: "Guangzhou Trading Ltd.",
    amountUsd: 760,
    dueDate: "2026-02-08",
    priority: "medium",
    assignee: "Alex",
  },
  {
    id: "t-3",
    caseId: "EXP-2026-0091",
    workflowId: "wf-2",
    stepId: "s-1",
    vendor: "Employee: M. Kim",
    amountUsd: 120,
    dueDate: "2026-02-04",
    priority: "low",
    assignee: null,
  },
  {
    id: "t-4",
    caseId: "KYC-2026-0020",
    workflowId: "wf-3",
    stepId: "s-2",
    vendor: "Customer: A. Chen",
    amountUsd: 0,
    dueDate: "2026-02-06",
    priority: "high",
    assignee: null,
  },
];
