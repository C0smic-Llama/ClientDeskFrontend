import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ClientsPage } from "@/features/clients/pages/ClientsPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import api from "@/lib/axios";
import { CreateClientPage } from "@/features/clients/pages/CreateClientPage";
import { ClientDetailsPage } from "@/features/clients/pages/ClientDetailsPage";
import { EditClientPage } from "@/features/clients/pages/EditClientPage";
import { ServicesPage } from "@/features/services/pages/ServicesPage";
import { EditService } from "@/features/services/pages/EditService";
import { AddService } from "@/features/services/pages/AddService";
import { ProjectsPage } from "@/features/project/pages/ProjectsPage";
import { AddProject } from "@/features/project/pages/AddProject";
import { EditProject } from "@/features/project/pages/EditProject";
import { AddProjectService } from "@/features/project-services/pages/AddProjectService";
import { EditProjectService } from "@/features/project-services/pages/EditProjectService";
import { ProjectDetails } from "@/features/project/pages/ProjectDetails";
import { InvoicesPage } from "@/features/invoice/pages/InvoicesPage";
import { CreateInvoice } from "@/features/invoice/pages/CreateInvoice";
import { EditInvoice } from "@/features/invoice/pages/EditInvoice";
import { InvoiceDetails } from "@/features/invoice/pages/InvoiceDetails";
import CreatePayment from "@/features/payments/pages/CreatePayment";
import PaymentDetailsPage from "@/features/payments/pages/PaymentDetailsPage";
import EditPayment from "@/features/payments/pages/EditPayment";
import PaymentsPage from "@/features/payments/pages/PaymentsPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";



function DeliverablesPage() {
  return <h1 className="text-2xl font-semibold">Deliverables</h1>;
}

function UsersPage() {
  return <h1 className="text-2xl font-semibold">Users</h1>;
}

function SettingsPage() {
  return <h1 className="text-2xl font-semibold">Settings</h1>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "clients",
            element: <ClientsPage />,
          },
          {
            path: "clients/new",
            element: <CreateClientPage />,
          },
          {
            path: "clients/:clientId",
            element: <ClientDetailsPage />,
          },
          {
            path: "clients/:clientId/edit",
            element: <EditClientPage />,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
          },

          {
            path: "projects/new",
            element: <AddProject />,
          },
          {
            path: "/projects/:id",
            element: <ProjectDetails />,
          },
          {
            path: "/projects/:id/edit",
            element: <EditProject />,
          },
          {
            path: "/projects/:projectId/services/new",
            element: <AddProjectService />,
          },
          {
            path: "/projects/:projectId/services/:projectServiceId/edit",
            element: <EditProjectService />,
          },
          {
            path: "services",
            element: <ServicesPage />,
          },
          {
            path: "/services/:id/edit",
            element: <EditService />,
          },
          {
            path: "/services/new",
            element: <AddService />,
          },
          {
            path: "deliverables",
            element: <DeliverablesPage />,
          },
          {
            path: "invoices",
            element: <InvoicesPage />,
          },
          {
            path: "invoices/new",
            element: <CreateInvoice />,
          },
          {
            path: "invoices/:id",
            element: <InvoiceDetails />,
          },
          {
            path: "invoices/:id/edit",
            element: <EditInvoice />,
          },
          {
            path: "invoices/:invoiceId/payments/create",
            element: <CreatePayment />,
          },
          {
            path: "payments",
            element: <PaymentsPage/>,
          },
          {
            path: "payments/:id",
            element: <PaymentDetailsPage />,
          },
          {
            path: "payments/:id/edit",
            element: <EditPayment />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);
