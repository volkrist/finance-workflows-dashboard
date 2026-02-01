import { useEffect, useMemo, useState } from "react";
import type { Workflow } from "../data/workflows";
import { useAudit } from "../lib/auditStore";
import { getForm, setForm } from "../lib/formsStore";

type Props = {
  workflow: Workflow;
  activeStepId: string;
  completeStep: (workflowId: string, stepId: string) => void;
  blockStep: (workflowId: string, stepId: string) => void;
  setActiveStepId: (id: string) => void;
};

function nextPendingStepId(workflow: Workflow) {
  return workflow.steps.find((s) => s.status !== "completed")?.id ?? workflow.steps[workflow.steps.length - 1]?.id;
}

function stepType(title: string) {
  const t = title.toLowerCase();
  if (t.includes("receive")) return "receive";
  if (t.includes("validate")) return "validate";
  if (t.includes("approve")) return "approve";
  if (t.includes("schedule")) return "schedule";
  return "generic";
}

export function StepPanel({ workflow, activeStepId, completeStep, blockStep, setActiveStepId }: Props) {
  const { log } = useAudit();

  const step = useMemo(() => workflow.steps.find((s) => s.id === activeStepId)!, [workflow, activeStepId]);
  const type = stepType(step.title);

  const saved = getForm(workflow.id, step.id);
  const [notes, setNotes] = useState(saved.notes ?? "");
  const [vendorVerified, setVendorVerified] = useState(saved.vendorVerified ?? false);
  const [approvalComment, setApprovalComment] = useState(saved.approvalComment ?? "");
  const [paymentDate, setPaymentDate] = useState(saved.paymentDate ?? "");

  useEffect(() => {
    const s = getForm(workflow.id, step.id);
    setNotes(s.notes ?? "");
    setVendorVerified(s.vendorVerified ?? false);
    setApprovalComment(s.approvalComment ?? "");
    setPaymentDate(s.paymentDate ?? "");
  }, [workflow.id, step.id]);

  const disabled = step.status === "completed" || step.status === "blocked";

  function done(message: string) {
    completeStep(workflow.id, step.id);
    log(workflow.id, message);
    const nextId = nextPendingStepId(workflow);
    if (nextId) setActiveStepId(nextId);
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{step.title}</div>
      <div style={{ opacity: 0.7, marginBottom: 14 }}>status: {step.status}</div>

      {type === "receive" && (
        <>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Invoice notes</div>
          <textarea
            value={notes}
            onChange={(e) => {
              const v = e.target.value;
              setNotes(v);
              setForm(workflow.id, step.id, { notes: v });
            }}
            placeholder="Add notes about the invoice..."
            disabled={disabled}
            style={{
              width: "100%",
              minHeight: 110,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              disabled
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#eee",
                fontWeight: 700,
              }}
              title="Mock only"
            >
              Attach invoice (mock)
            </button>

            <button
              onClick={() => done(`Step completed: ${step.title}`)}
              disabled={disabled}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: disabled ? "#eee" : "white",
                cursor: disabled ? "default" : "pointer",
                fontWeight: 700,
              }}
            >
              Mark complete
            </button>
          </div>
        </>
      )}

      {type === "validate" && (
        <>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
            <input
              type="checkbox"
              checked={vendorVerified}
              onChange={(e) => {
                const v = e.target.checked;
                setVendorVerified(v);
                setForm(workflow.id, step.id, { vendorVerified: v });
              }}
              disabled={disabled}
            />
            Vendor verified
          </label>

          <div style={{ fontWeight: 700, marginTop: 12, marginBottom: 8 }}>Validation notes</div>
          <textarea
            value={notes}
            onChange={(e) => {
              const v = e.target.value;
              setNotes(v);
              setForm(workflow.id, step.id, { notes: v });
            }}
            placeholder="Checks performed, documents, results..."
            disabled={disabled}
            style={{
              width: "100%",
              minHeight: 110,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={() => done(`Step completed: ${step.title} (verified=${vendorVerified})`)}
              disabled={disabled || !vendorVerified}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: disabled || !vendorVerified ? "#eee" : "white",
                cursor: disabled || !vendorVerified ? "default" : "pointer",
                fontWeight: 700,
              }}
            >
              Mark complete
            </button>
          </div>
        </>
      )}

      {type === "approve" && (
        <>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Approval comment</div>
          <textarea
            value={approvalComment}
            onChange={(e) => {
              const v = e.target.value;
              setApprovalComment(v);
              setForm(workflow.id, step.id, { approvalComment: v });
            }}
            placeholder="Reason, policy reference, exceptions..."
            disabled={disabled}
            style={{
              width: "100%",
              minHeight: 110,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={() => done(`Approved: ${step.title}`)}
              disabled={disabled}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: disabled ? "#eee" : "white",
                cursor: disabled ? "default" : "pointer",
                fontWeight: 800,
              }}
            >
              Approve
            </button>

            <button
              onClick={() => {
                blockStep(workflow.id, step.id);
                log(workflow.id, `Rejected: ${step.title}`);
              }}
              disabled={disabled}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: disabled ? "#eee" : "white",
                cursor: disabled ? "default" : "pointer",
                fontWeight: 800,
              }}
            >
              Reject
            </button>
          </div>
        </>
      )}

      {type === "schedule" && (
        <>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Payment date</div>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => {
              const v = e.target.value;
              setPaymentDate(v);
              setForm(workflow.id, step.id, { paymentDate: v });
            }}
            disabled={disabled}
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              width: 220,
            }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={() => done(`Payment scheduled: ${paymentDate || "n/a"}`)}
              disabled={disabled || !paymentDate}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: disabled || !paymentDate ? "#eee" : "white",
                cursor: disabled || !paymentDate ? "default" : "pointer",
                fontWeight: 800,
              }}
            >
              Schedule
            </button>
          </div>
        </>
      )}

      {type === "generic" && (
        <button
          onClick={() => done(`Step completed: ${step.title}`)}
          disabled={disabled}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: disabled ? "#eee" : "white",
            cursor: disabled ? "default" : "pointer",
            fontWeight: 700,
          }}
        >
          Mark complete
        </button>
      )}
    </div>
  );
}
