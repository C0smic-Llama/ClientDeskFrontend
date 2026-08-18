import { Link } from "react-router-dom";
import { Edit, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useProjectServices } from "../hooks/useProjectServices";
import { DeleteProjectServiceDialog } from "./DeleteProjectServiceDialog";

interface ProjectServicesListProps {
  projectId: number;
}

export function ProjectServicesList({
  projectId,
}: ProjectServicesListProps) {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProjectServices(projectId);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Project Services
          </h2>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Services assigned to this project.
          </p>
        </div>

        <Button asChild size="sm">
          <Link
            to={`/projects/${projectId}/services/new`}
          >
            <Plus className="mr-2 size-4" />
            Add Service
          </Link>
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-6 text-center">
          <p className="text-sm text-clientdesk-gray">
            Loading project services...
          </p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-6">
          <p className="text-sm text-clientdesk-red">
            Failed to load project services.
          </p>

          {error instanceof Error && (
            <p className="mt-1 text-xs text-clientdesk-gray">
              {error.message}
            </p>
          )}
        </div>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        data?.empty && (
          <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
            <h3 className="font-medium">
              No services assigned
            </h3>

            <p className="mt-1 text-sm text-clientdesk-gray">
              Add a service to this project to get
              started.
            </p>

            <Button
              asChild
              size="sm"
              className="mt-4"
            >
              <Link
                to={`/projects/${projectId}/services/new`}
              >
                <Plus className="mr-2 size-4" />
                Add Service
              </Link>
            </Button>
          </div>
        )}

      {/* Services */}
      {!isLoading &&
        !isError &&
        data &&
        data.content.length > 0 && (
          <div className="relative space-y-3">
            {/* Updating indicator */}
            {isFetching && (
              <div className="absolute right-2 top-0 z-10 rounded-md bg-white px-3 py-1 text-xs text-clientdesk-gray shadow-sm">
                Updating...
              </div>
            )}

            {data.content.map(
              (projectService) => (
                <div
                  key={projectService.id}
                  className="rounded-lg border border-clientdesk-light bg-white p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Service information */}
                    <div className="min-w-0">
                      <h3 className="font-semibold">
                        {projectService.serviceName}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-clientdesk-gray">
                        <span>
                          Quantity:{" "}
                          {projectService.quantity}
                        </span>

                        <span>
                          Agreed Price: ₹
                          {projectService.agreedPrice.toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </span>

                        {projectService.discount !==
                          null && (
                          <span>
                            Discount: ₹
                            {projectService.discount.toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        )}
                      </div>

                      {projectService.remarks && (
                        <p className="mt-3 text-sm text-clientdesk-gray">
                          {projectService.remarks}
                        </p>
                      )}
                    </div>

                    {/* Total */}
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-xs text-clientdesk-gray">
                        Line Total
                      </p>

                      <p className="text-lg font-semibold">
                        ₹
                        {projectService.lineTotal.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-end gap-1 border-t border-clientdesk-light pt-3">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      title="Edit service"
                    >
                      <Link
                        to={`/projects/${projectId}/services/${projectService.id}/edit`}
                        aria-label={`Edit ${projectService.serviceName}`}
                      >
                        <Edit className="size-4" />
                      </Link>
                    </Button>

                    <DeleteProjectServiceDialog
                      projectServiceId={
                        projectService.id
                      }
                      serviceName={
                        projectService.serviceName
                      }
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        )}
    </div>
  );
}