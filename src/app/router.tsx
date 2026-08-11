import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import api from "@/lib/axios";

function DashboardPage() {
  const testProtectedEndpoint = async () => {
    try {
      const response = await api.get("/users");

      console.log("Protected API response:", response.data);
    } catch (error) {
      console.error("Protected API request failed:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <button
        onClick={testProtectedEndpoint}
        className="mt-4 rounded-md bg-clientdesk-red px-4 py-2 text-white"
      >
        Test Protected API
      </button>
    </div>
  );
}

function ClientsPage() {
  return <h1 className="text-2xl font-semibold">Clients</h1>;
}

function ProjectsPage() {
  return <h1 className="text-2xl font-semibold">Projects</h1>;
}

function ServicesPage() {
  return <h1 className="text-2xl font-semibold">Services</h1>;
}

function DeliverablesPage() {
  return <h1 className="text-2xl font-semibold">Deliverables</h1>;
}

function InvoicesPage() {
  return <h1 className="text-2xl font-semibold">Invoices</h1>;
}

function PaymentsPage() {
  return <h1 className="text-2xl font-semibold">Payments</h1>;
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
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "services",
            element: <ServicesPage />,
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
            path: "payments",
            element: <PaymentsPage />,
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
