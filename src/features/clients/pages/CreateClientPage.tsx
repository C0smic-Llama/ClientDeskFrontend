import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ClientForm } from "../components/ClientForm";
import { useCreateClient } from "../hooks/useCreateClient";
import type { ClientFormData } from "../schemas/clientSchema";

export function CreateClientPage() {
  const navigate = useNavigate();

  const createClientMutation = useCreateClient();

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await createClientMutation.mutateAsync(data);

      navigate("/clients");
    } catch (error) {
      console.error("Failed to create client:", error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2"
        >
          <Link to="/clients">
            <ArrowLeft className="mr-2 size-4" />
            Back to Clients
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Add Client
          </h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Add a new client to your ClientDesk workspace.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6 shadow-sm sm:p-8">
        <ClientForm
          onSubmit={handleSubmit}
          isSubmitting={createClientMutation.isPending}
          submitLabel="Create Client"
        />

        {/* API Error */}
        {createClientMutation.isError && (
          <p
            role="alert"
            className="mt-4 text-sm text-clientdesk-red"
          >
            Failed to create client. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}