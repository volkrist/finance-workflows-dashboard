import { useAudit } from "../lib/auditStore";

function fmt(ts: string) {
  return new Date(ts).toLocaleString();
}

export function ActivityLog({ workflowId }: { workflowId: string }) {
  const { events } = useAudit();

  const list = events.filter((e) => e.workflowId === workflowId);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
      <div style={{ fontWeight: 800, marginBottom: 12 }}>Activity log</div>

      {list.length === 0 && <div style={{ opacity: 0.6 }}>No activity yet</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((e) => (
          <div
            key={e.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div style={{ fontWeight: 700 }}>{e.message}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{fmt(e.at)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
