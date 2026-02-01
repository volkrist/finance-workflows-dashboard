export type FormState = {
  notes?: string;
  vendorVerified?: boolean;
  approvalComment?: string;
  paymentDate?: string;
};

const KEY = "workflow_forms_v1";
type AllForms = Record<string, FormState>;

function load(): AllForms {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function save(data: AllForms) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getForm(workflowId: string, stepId: string): FormState {
  const all = load();
  return all[`${workflowId}:${stepId}`] || {};
}

export function setForm(workflowId: string, stepId: string, value: FormState) {
  const all = load();
  const k = `${workflowId}:${stepId}`;
  all[k] = { ...(all[k] || {}), ...value };
  save(all);
}
