export type StepStatus = "pending" | "completed" | "blocked";
export type Step = { id: string; title: string; status: StepStatus };
export type Workflow = { id: string; name: string; description?: string; steps: Step[] };

export const initialWorkflows: Workflow[] = [
  {
    id: "wf-1",
    name: "Invoice approval",
    description: "Approve an incoming invoice and log actions.",
    steps: [
      { id: "s-1", title: "Receive invoice", status: "pending" },
      { id: "s-2", title: "Validate vendor", status: "pending" },
      { id: "s-3", title: "Approve", status: "pending" },
      { id: "s-4", title: "Schedule payment", status: "pending" },
    ],
  },
  {
    id: "wf-2",
    name: "Expense reimbursement",
    description: "Submit and approve employee reimbursement.",
    steps: [
      { id: "s-1", title: "Submit request", status: "pending" },
      { id: "s-2", title: "Attach receipt", status: "pending" },
      { id: "s-3", title: "Manager approval", status: "pending" },
      { id: "s-4", title: "Payout", status: "pending" },
    ],
  },
  {
    id: "wf-3",
    name: "KYC onboarding",
    description: "Basic KYC workflow for a new customer.",
    steps: [
      { id: "s-1", title: "Collect documents", status: "pending" },
      { id: "s-2", title: "Verify identity", status: "pending" },
      { id: "s-3", title: "Risk scoring", status: "pending" },
      { id: "s-4", title: "Activate account", status: "pending" },
    ],
  },
  {
    id: "wf-4",
    name: "Chargeback handling",
    description: "Process a card chargeback dispute.",
    steps: [
      { id: "s-1", title: "Open case", status: "pending" },
      { id: "s-2", title: "Collect evidence", status: "pending" },
      { id: "s-3", title: "Respond to issuer", status: "pending" },
      { id: "s-4", title: "Close case", status: "pending" },
    ],
  },
];
