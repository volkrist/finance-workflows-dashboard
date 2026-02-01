import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/routes";
import { WorkflowsProvider } from "./lib/workflowsStore";
import { AuditProvider } from "./lib/auditStore";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WorkflowsProvider>
      <AuditProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuditProvider>
    </WorkflowsProvider>
  </StrictMode>
);
