import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProjectServicesList } from "@/features/project-services/components/ProjectServicesList";

import { useProject } from "../hooks/useProject";

import type { ProjectStatus } from "../types/project.types";

const statusLabels: Record<ProjectStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function getStatusClasses(status: ProjectStatus) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-700";

    case "PENDING":
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const projectId = Number(id);

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useProject(projectId);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-gray">
          Loading project...
        </p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="space-y-4">
        <Button
          asChild
          variant="ghost"
          className="-ml-2"
        >
          <Link to="/projects">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            Failed to load project.
          </p>

          {error instanceof Error && (
            <p className="mt-1 text-xs text-clientdesk-gray">
              {error.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          asChild
          variant="ghost"
          className="mb-3 -ml-2"
        >
          <Link to="/projects">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {project.projectName}
            </h1>

            <p className="mt-1 text-sm text-clientdesk-gray">
              {project.clientName}
            </p>
          </div>

          <Button asChild>
            <Link
              to={`/projects/${project.id}/edit`}
            >
              <Edit className="mr-2 size-4" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Status */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Status
            </p>

            <span
              className={[
                "mt-2 inline-flex rounded-full px-2.5 py-1",
                "text-xs font-medium",
                getStatusClasses(project.status),
              ].join(" ")}
            >
              {statusLabels[project.status]}
            </span>
          </div>

          {/* Start Date */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Start Date
            </p>

            <p className="mt-2 text-sm font-medium">
              {project.startDate}
            </p>
          </div>

          {/* Deadline */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Deadline
            </p>

            <p className="mt-2 text-sm font-medium">
              {project.deadline}
            </p>
          </div>

          {/* Quota */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-clientdesk-gray">
              Quota
            </p>

            <p className="mt-2 text-sm font-medium">
              ₹
              {project.quota.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <h2 className="text-lg font-semibold">
          Description
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-clientdesk-gray">
          {project.description}
        </p>

        {project.notes && (
          <div className="mt-6 border-t border-clientdesk-light pt-5">
            <h3 className="text-sm font-semibold">
              Notes
            </h3>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-clientdesk-gray">
              {project.notes}
            </p>
          </div>
        )}
      </div>

      {/* Assigned Staff */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Assigned Staff
            </h2>

            <p className="mt-1 text-sm text-clientdesk-gray">
              Staff members working on this project.
            </p>
          </div>

          <span className="text-sm text-clientdesk-gray">
            {project.assignedUsers.length} assigned
          </span>
        </div>

        {project.assignedUsers.length === 0 ? (
          <p className="mt-5 text-sm text-clientdesk-gray">
            No staff members assigned.
          </p>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.assignedUsers.map(
              (user) => (
                <div
                  key={user.id}
                  className="rounded-md border border-clientdesk-light p-4"
                >
                  <p className="text-sm font-medium">
                    {user.firstName}{" "}
                    {user.lastName}
                  </p>

                  <p className="mt-1 text-xs text-clientdesk-gray">
                    {user.role}
                  </p>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* Project Services */}
      <ProjectServicesList
        projectId={project.id}
      />
    </div>
  );
}