import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Power } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ServiceSearch } from "../components/ServiceSearch";
import { useServices } from "../hooks/useServices";
import { useActivateService } from "../hooks/useActivateService";
import { useDeactivateService } from "../hooks/useDeactivateService";

import type { ServiceCategory } from "../types/service.types";
import { DeleteServiceDialog } from "../components/DeleteServiceDialogue";

const categoryLabels: Record<ServiceCategory, string> = {
  PRODUCTION: "Production",
  EDITING: "Editing",
  DESIGN: "Design",
  BRANDING: "Branding",
  DIGITAL_MARKETING: "Digital Marketing",
  WEB_DEVELOPMENT: "Web Development",
  PHOTOGRAPHY: "Photography",
  CONTENT_WRITING: "Content Writing",

  OTHER: "Other",
};

export function ServicesPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ServiceCategory>();
  const [active, setActive] = useState<boolean>();

  const { data, isLoading, isError, error, isFetching } = useServices({
    page,
    size: 10,
    keyword: search,
    category,
    active,
  });

  const activateService = useActivateService();
  const deactivateService = useDeactivateService();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleCategoryChange = (value?: ServiceCategory) => {
    setCategory(value);
    setPage(0);
  };

  const handleActiveChange = (value?: boolean) => {
    setActive(value);
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

  const handleToggleActive = (serviceId: number, currentlyActive: boolean) => {
    if (currentlyActive) {
      deactivateService.mutate(serviceId);
    } else {
      activateService.mutate(serviceId);
    }
  };

  const isTogglePending =
    activateService.isPending || deactivateService.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Services</h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Manage your service catalogue.
          </p>
        </div>

        <Link
          to="/services/new"
          className="inline-flex flex-row items-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
        >
          <Plus className="size-4 shrink-0" />
          <span>Add Service</span>
        </Link>
      </div>

      {/* Search and filters */}
      <ServiceSearch
        search={search}
        category={category}
        active={active}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onActiveChange={handleActiveChange}
      />

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-gray">Loading services...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            Failed to load services.
          </p>

          {error instanceof Error && (
            <p className="mt-1 text-xs text-clientdesk-gray">{error.message}</p>
          )}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && data?.empty && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">
            {search || category || active !== undefined
              ? "No matching services"
              : "No services found"}
          </h2>

          <p className="mt-2 text-sm text-clientdesk-gray">
            {search || category || active !== undefined
              ? "Try changing your search or filter."
              : "You haven't added any services yet."}
          </p>

          {!search && !category && active === undefined && (
            <Link
              to="/services/new"
              className="inline-flex flex-row items-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
            >
              <Plus className="size-4 shrink-0" />
              <span>Add your first service</span>
            </Link>
          )}
        </div>
      )}

      {/* Service table */}
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
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Base Price
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
                {data.content.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-clientdesk-light last:border-0 hover:bg-clientdesk-light/20"
                  >
                    {/* Service name */}
                    <td className="px-6 py-4">
                      <Link
                        to={`/services/${service.id}/edit`}
                        className="font-medium hover:underline"
                      >
                        {service.serviceName}
                      </Link>

                      <p className="mt-1 max-w-md truncate text-xs text-clientdesk-gray">
                        {service.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {categoryLabels[service.category]}
                    </td>

                    {/* Base price */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      ₹
                      {service.basePrice.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1",
                          "text-xs font-medium",
                          service.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600",
                        ].join(" ")}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Edit service"
                          render={
                            <Link
                              to={`/services/${service.id}/edit`}
                              aria-label={`Edit ${service.serviceName}`}
                            />
                          }
                        >
                          <Edit className="size-4" />
                        </Button>
                        {/* Activate / Deactivate */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title={
                            service.active
                              ? "Deactivate service"
                              : "Activate service"
                          }
                          disabled={isTogglePending}
                          onClick={() =>
                            handleToggleActive(service.id, service.active)
                          }
                          aria-label={
                            service.active
                              ? `Deactivate ${service.serviceName}`
                              : `Activate ${service.serviceName}`
                          }
                        >
                          <Power
                            className={[
                              "size-4",
                              service.active
                                ? "text-green-600"
                                : "text-gray-400",
                            ].join(" ")}
                          />
                        </Button>

                        {/* Delete */}
                        <DeleteServiceDialog
                          serviceId={service.id}
                          serviceName={service.serviceName}
                          onDeleted={() => {
                            // The query has already been invalidated
                            // by useDeleteService().
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
              Showing {data.numberOfElements} of {data.totalElements} services
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
