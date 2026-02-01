import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuditEvent = {
  id: string;
  workflowId: string;
  message: string;
  at: string; // ISO
};

type Ctx = {
  events: AuditEvent[];
  log: (workflowId: string, message: string) => void;
};

const AuditCtx = createContext<Ctx | null>(null);

const LS_KEY = "audit_events_v1";

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<AuditEvent[]>(() => {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(events));
  }, [events]);

  function log(workflowId: string, message: string) {
    setEvents((prev) => [
      {
        id: crypto.randomUUID(),
        workflowId,
        message,
        at: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  const value = useMemo(() => ({ events, log }), [events]);

  return <AuditCtx.Provider value={value}>{children}</AuditCtx.Provider>;
}

export function useAudit() {
  const ctx = useContext(AuditCtx);
  if (!ctx) throw new Error("useAudit must be used inside AuditProvider");
  return ctx;
}
