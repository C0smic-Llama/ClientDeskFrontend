import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ClientForm } from "../components/ClientForm";
import { useClient } from "../hooks/useClient";
import { useUpdateClient } from "../hooks/useUpdateClient";
import type { ClientFormData } from "../schemas/clientSchema";

export function EditClientPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const id = Number(clientId);

  const { data: client, isLoading, isError, error } = useClient(id);

  const updateClientMutation = useUpdateClient();

  if (Number.isNaN(id)) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Invalid Client</h1>

        <Button variant="outline" render={<Link to="/clients" />}>
          <ArrowLeft className="mr-2 size-4" />
          Back to Clients
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-clientdesk-light" />

        <div className="rounded-lg border border-clientdesk-light bg-white p-8">
          <div className="space-y-5">
            <div className="h-10 animate-pulse rounded bg-clientdesk-light" />
            <div className="h-10 animate-pulse rounded bg-clientdesk-light" />
            <div className="h-10 animate-pulse rounded bg-clientdesk-light" />
            <div className="h-24 animate-pulse rounded bg-clientdesk-light" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !client) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Unable to load client</h1>

        <p className="text-sm text-clientdesk-gray">
          {error instanceof Error
            ? error.message
            : "The requested client could not be found."}
        </p>

        <Button variant="outline" render={<Link to="/clients" />}>
          <ArrowLeft className="mr-2 size-4" />
          Back to Clients
        </Button>
      </div>
    );
  }

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await updateClientMutation.mutateAsync({
        clientId: id,
        data,
      });

      navigate(`/clients/${id}`);
    } catch (error) {
      console.error("Failed to update client:", error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          render={<Link to={`/clients/${id}`} />}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Client
        </Button>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Edit Client</h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Update the information for{" "}
            <span className="font-medium text-foreground">
              {client.companyName}
            </span>
            .
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6 shadow-sm sm:p-8">
        <ClientForm
          defaultValues={{
            companyName: client.companyName,
            contactPerson: client.contactPerson,
            email: client.email,
            contactNumber: client.contactNumber,
            status: client.status,
            address: client.address,
          }}
          onSubmit={handleSubmit}
          isSubmitting={updateClientMutation.isPending}
          submitLabel="Update Client"
        />

        {/* API Error */}
        {updateClientMutation.isError && (
          <p role="alert" className="mt-4 text-sm text-clientdesk-red">
            Failed to update client. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
