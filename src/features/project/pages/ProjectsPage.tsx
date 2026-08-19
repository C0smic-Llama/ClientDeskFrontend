import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProjectSearch } from "../components/ProjectSearch";
import { useProjects } from "../hooks/useProjects";

import type { ProjectStatus } from "../types/project.types";
import { DeleteProjectDialog } from "../components/DeleteProjectDialogue";

const statusLabels: Record<ProjectStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function ProjectsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus>();

  const { data, isLoading, isError, error, isFetching } = useProjects({
    page,
    size: 10,
    keyword: search,
    status,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleStatusChange = (value?: ProjectStatus) => {
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
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Manage your projects and their progress.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex flex-row items-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
        >
          <Plus className="size-4 shrink-0" />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Search and filters */}
      <ProjectSearch
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-gray">Loading projects...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            Failed to load projects.
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
            {search || status ? "No matching projects" : "No projects found"}
          </h2>

          <p className="mt-2 text-sm text-clientdesk-gray">
            {search || status
              ? "Try changing your search or filter."
              : "You haven't added any projects yet."}
          </p>

          {!search && !status && (
            <Button asChild className="mt-5">
              <Link to="/projects/new">
                <Plus className="mr-2 size-4" />
                Add your first project
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Project table */}
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
                    Project
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Client
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Start Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Deadline
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Quota
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.content.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-clientdesk-light last:border-0 hover:bg-clientdesk-light/20"
                  >
                    {/* Project */}
                    <td className="px-6 py-4">
                      <Link
                        to={`/projects/${project.id}`}
                        className="font-medium hover:underline"
                      >
                        {project.projectName}
                      </Link>

                      <p className="mt-1 max-w-xs truncate text-xs text-clientdesk-gray">
                        {project.description}
                      </p>
                    </td>

                    {/* Client */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {project.clientName}
                    </td>

                    {/* Start date */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {project.startDate}
                    </td>

                    {/* Deadline */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {project.deadline}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1",
                          "text-xs font-medium",
                          project.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : project.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : project.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600",
                        ].join(" ")}
                      >
                        {statusLabels[project.status]}
                      </span>
                    </td>

                    {/* Quota */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      ₹
                      {project.quota.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          title="Create invoice"
                        >
                          <Link
                            to={`/invoices/new?projectId=${project.id}`}
                            aria-label={`Create invoice for ${project.projectName}`}
                          >
                            <FileText className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          title="Edit project"
                        >
                          <Link
                            to={`/projects/${project.id}/edit`}
                            aria-label={`Edit ${project.projectName}`}
                          >
                            <Edit className="size-4" />
                          </Link>
                        </Button>
                        <DeleteProjectDialog
                          projectId={project.id}
                          projectName={project.projectName}
                          onDeleted={() => {
                            // The query has already been invalidated
                            // by useDeleteProject().
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
              Showing {data.numberOfElements} of {data.totalElements} projects
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
