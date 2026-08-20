import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Mail, MapPin, Phone, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useClient } from "../hooks/useClient";
import { DeleteClientDialog } from "../components/DeleteClientDialog";

export function ClientDetailsPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const id = Number(clientId);

  const { data: client, isLoading, isError, error } = useClient(id);

  if (isNaN(id)) {
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
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-clientdesk-light" />

        <div className="rounded-lg border border-clientdesk-light bg-white p-8">
          <div className="space-y-4">
            <div className="h-7 w-64 animate-pulse rounded bg-clientdesk-light" />
            <div className="h-4 w-40 animate-pulse rounded bg-clientdesk-light" />
            <div className="h-20 w-full animate-pulse rounded bg-clientdesk-light" />
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

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        render={<Link to="/clients" />}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to Clients
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-lg border border-clientdesk-light bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              {client.companyName}
            </h1>

            <span
              className={[
                "inline-flex rounded-full px-3 py-1",
                "text-xs font-medium",
                client.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600",
              ].join(" ")}
            >
              {client.status === "ACTIVE" ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="mt-1 text-sm text-clientdesk-gray">
            {client.contactPerson}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            render={<Link to={`/clients/${client.id}/edit`} />}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </Button>

          <DeleteClientDialog
            clientId={client.id}
            companyName={client.companyName}
            onDeleted={() => navigate("/clients")}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-clientdesk-light bg-white">
        <div className="border-b border-clientdesk-light px-6 py-4">
          <h2 className="font-semibold">Contact Information</h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-clientdesk-light/40 p-2">
              <Mail className="size-5 text-clientdesk-gray" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
                Email
              </p>

              <a
                href={`mailto:${client.email}`}
                className="mt-1 block text-sm font-medium hover:underline"
              >
                {client.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-clientdesk-light/40 p-2">
              <Phone className="size-5 text-clientdesk-gray" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
                Contact Number
              </p>

              <a
                href={`tel:${client.contactNumber}`}
                className="mt-1 block text-sm font-medium hover:underline"
              >
                {client.contactNumber}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-lg border border-clientdesk-light bg-white">
        <div className="border-b border-clientdesk-light px-6 py-4">
          <h2 className="font-semibold">Address</h2>
        </div>

        <div className="flex items-start gap-3 p-6">
          <div className="rounded-md bg-clientdesk-light/40 p-2">
            <MapPin className="size-5 text-clientdesk-gray" />
          </div>

          <p className="text-sm leading-6 text-clientdesk-gray">
            {client.address}
          </p>
        </div>
      </div>

      {/* Client Information */}
      <div className="rounded-lg border border-clientdesk-light bg-white">
        <div className="border-b border-clientdesk-light px-6 py-4">
          <h2 className="font-semibold">Client Information</h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Client ID
            </p>

            <p className="mt-1 text-sm font-medium">#{client.id}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Status
            </p>

            <p className="mt-1 text-sm font-medium">
              {client.status === "ACTIVE" ? "Active" : "Inactive"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Created
            </p>

            <p className="mt-1 text-sm font-medium">
              {formatDate(client.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Last Updated
            </p>

            <p className="mt-1 text-sm font-medium">
              {formatDate(client.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
