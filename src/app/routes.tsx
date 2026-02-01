import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import Dashboard from "../pages/Dashboard";
import Inbox from "../pages/Inbox";
import WorkflowDetails from "../pages/WorkflowDetails";

export function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/workflows/:workflowId" element={<WorkflowDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
