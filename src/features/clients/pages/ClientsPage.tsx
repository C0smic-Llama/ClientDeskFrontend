import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteClientDialog } from "../components/DeleteClientDialog";

import { useClients } from "../hooks/useClients";
import { ClientSearch } from "../components/ClientSearch";

import type { ClientStatus } from "../types/client.types";

export function ClientsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ClientStatus>();

  const { data, isLoading, isError, error, isFetching } = useClients({
    page,
    size: 10,
    keyword: search,
    status,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleStatusChange = (value?: ClientStatus) => {
    setStatus(value);
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  };

  const handleNextPage = () => {
    if (data && !data.last) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Clients</h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Manage your clients and their information.
          </p>
        </div>

        <Link
          to="/clients/new"
          className="inline-flex flex-row items-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          <Plus className="size-4 shrink-0" />
          <span>Add Client</span>
        </Link>
      </div>

      {/* Search and filters */}
      <ClientSearch
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-gray">Loading clients...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">Failed to load clients.</p>

          {error instanceof Error && (
            <p className="mt-1 text-xs text-clientdesk-gray">{error.message}</p>
          )}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && data?.empty && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">
            {search || status ? "No matching clients" : "No clients found"}
          </h2>

          <p className="mt-2 text-sm text-clientdesk-gray">
            {search || status
              ? "Try changing your search or filter."
              : "You haven't added any clients yet."}
          </p>

          {!search && !status && (
            <Link
              to="/clients/new"
              className="mt-5 inline-flex flex-row items-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
            >
              <Plus className="size-4 shrink-0" />
              <span>Add your first client</span>
            </Link>
          )}
        </div>
      )}

      {/* Client table */}
      {!isLoading && !isError && data && data.content.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-clientdesk-light bg-white">
          <div className="relative overflow-x-auto">
            {/* Refetch indicator */}
            {isFetching && !isLoading && (
              <div className="absolute right-4 top-4 z-10 rounded-md bg-white px-3 py-1 text-xs text-clientdesk-gray shadow-sm">
                Updating...
              </div>
            )}

            <table className="w-full">
              <thead>
                <tr className="border-b border-clientdesk-light">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Contact Person
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Contact Number
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.content.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-clientdesk-light last:border-0 hover:bg-clientdesk-light/20"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/clients/${client.id}`}
                        className="font-medium hover:underline"
                      >
                        {client.companyName}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {client.contactPerson}
                    </td>

                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {client.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {client.contactNumber}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1",
                          "text-xs font-medium",
                          client.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600",
                        ].join(" ")}
                      >
                        {client.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Edit client"
                          render={
                            <Link
                              to={`/clients/${client.id}/edit`}
                              aria-label={`Edit ${client.companyName}`}
                            />
                          }
                        >
                          <Edit className="size-4" />
                        </Button>

                        {/* Delete */}
                        <DeleteClientDialog
                          clientId={client.id}
                          companyName={client.companyName}
                          onDeleted={() => {
                            // The query has already been invalidated
                            // by useDeleteClient().
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-clientdesk-light px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-clientdesk-gray">
              Showing {data.numberOfElements} of {data.totalElements} clients
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.first || isFetching}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>

              <span className="px-2 text-sm text-clientdesk-gray">
                Page {data.number + 1} of {data.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={data.last || isFetching}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
