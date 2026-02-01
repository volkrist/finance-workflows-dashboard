import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: 10,
        borderRadius: 10,
        textDecoration: "none",
        color: "black",
        background: active ? "#f2f2f2" : "transparent",
        border: "1px solid #ddd",
        marginBottom: 8,
      }}
    >
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, Arial" }}>
      <aside style={{ width: 320, borderRight: "1px solid #ddd", padding: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 12 }}>Finance Workflows</div>
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/inbox" label="Inbox" />
      </aside>

      <main style={{ flex: 1, padding: 24, overflow: "auto" }}>{children}</main>
    </div>
  );
}
