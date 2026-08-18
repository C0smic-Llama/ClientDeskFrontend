import {
  useEffect,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useClients } from "@/features/clients/hooks/useClients";

import { ProjectServiceForm } from "@/features/project-services/components/ProjectServiceForm";

import { useAssignServiceToProject } from "@/features/project-services/hooks/useAssignServiceToProject";
import { useDeleteProjectService } from "@/features/project-services/hooks/useDeleteProjectService";
import { useProjectServices } from "@/features/project-services/hooks/useProjectServices";
import { useUpdateProjectService } from "@/features/project-services/hooks/useUpdateProjectService";

import type {
  ProjectService,
  ProjectServiceRequest,
} from "@/features/project-services/types/project-service.types";

import { useStaffUsers } from "@/features/users/hooks/useStaffUsers";

import { StaffMultiSelect } from "../components/StaffMultiSelect";

import { useProject } from "../hooks/useProject";
import { useUpdateProject } from "../hooks/useUpdateProject";

import type {
  ProjectRequest,
  ProjectStatus,
} from "../types/project.types";

const statuses: {
  value: ProjectStatus;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export function EditProject() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const projectId = Number(id);

  /*
   * Project
   */
  const {
    data: project,
    isLoading: projectLoading,
    isError: projectError,
    error,
  } = useProject(projectId);

  /*
   * Clients
   */
  const {
    data: clientData,
    isLoading: clientsLoading,
    isError: clientsError,
  } = useClients({
    page: 0,
    size: 100,
  });

  /*
   * Staff
   */
  const {
    data: staffData,
    isLoading: staffLoading,
    isError: staffError,
  } = useStaffUsers();

  /*
   * Project Services
   */
  const {
    data: projectServices,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useProjectServices(projectId, {
    page: 0,
    size: 100,
    sort: "createdAt,asc",
  });

  /*
   * Mutations
   */
  const updateProject = useUpdateProject();

  const assignService =
    useAssignServiceToProject();

  const updateProjectService =
    useUpdateProjectService();

  const deleteProjectService =
    useDeleteProjectService();

  /*
   * Project form state
   */
  const [formData, setFormData] =
    useState<ProjectRequest>({
      projectName: "",
      description: "",
      status: "PENDING",
      startDate: "",
      deadline: "",
      quota: 0,
      notes: "",
      clientId: 0,
      assignedUserIds: [],
    });

  /*
   * Project Service UI state
   */
  const [showServiceForm, setShowServiceForm] =
    useState(false);

  const [editingService, setEditingService] =
    useState<ProjectService | null>(null);

  /*
   * Populate project form
   */
  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        deadline: project.deadline,
        quota: project.quota,
        notes: project.notes ?? "",
        clientId: project.clientId,
        assignedUserIds:
          project.assignedUsers.map(
            (user) => user.id,
          ),
      });
    }
  }, [project]);

  /*
   * Project field changes
   */
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "quota" ||
        name === "clientId"
          ? Number(value)
          : value,
    }));
  };

  /*
   * Staff changes
   */
  const handleStaffChange = (
    userIds: number[],
  ) => {
    setFormData((current) => ({
      ...current,
      assignedUserIds: userIds,
    }));
  };

  /*
   * Update project
   */
  const handleSubmit = (
    event: SubmitEvent,
  ) => {
    event.preventDefault();

    updateProject.mutate(
      {
        projectId,
        data: formData,
      },
      {
        onSuccess: () => {
          navigate("/projects");
        },
      },
    );
  };

  /*
   * Add Project Service
   */
  const handleAddService = async (
    service: ProjectServiceRequest,
  ) => {
    try {
      await assignService.mutateAsync({
        ...service,
        projectId,
      });

      setShowServiceForm(false);
    } catch {
      // Mutation error is displayed below.
    }
  };

  /*
   * Update Project Service
   */
  const handleUpdateService = async (
    service: ProjectServiceRequest,
  ) => {
    if (!editingService) {
      return;
    }

    try {
      await updateProjectService.mutateAsync({
        projectServiceId:
          editingService.id,
        data: {
          ...service,
          projectId,
        },
      });

      setEditingService(null);
    } catch {
      // Mutation error is displayed below.
    }
  };

  /*
   * Delete Project Service
   */
  const handleDeleteService = (
    projectServiceId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this service from the project?",
    );

    if (!confirmed) {
      return;
    }

    deleteProjectService.mutate(
      projectServiceId,
    );
  };

  /*
   * Convert response DTO to request DTO
   * for editing.
   */
  const getServiceFormData = (
    service: ProjectService,
  ): ProjectServiceRequest => ({
    projectId,
    serviceCatalogueId:
      service.serviceCatalogueId,
    quantity: service.quantity,
    agreedPrice: service.agreedPrice,
    discount:
      service.discount ?? undefined,
    remarks:
      service.remarks ?? undefined,
  });

  /*
   * Loading state
   */
  if (
    projectLoading ||
    clientsLoading ||
    staffLoading ||
    servicesLoading
  ) {
    return (
      <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-gray">
          Loading project...
        </p>
      </div>
    );
  }

  /*
   * Error state
   */
  if (
    projectError ||
    !project ||
    clientsError ||
    staffError ||
    servicesError
  ) {
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

  /*
   * Calculate total service cost
   */
  const totalServicesCost =
    projectServices?.content.reduce(
      (total, service) =>
        total + service.lineTotal,
      0,
    ) ?? 0;

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

        <h1 className="text-3xl font-semibold tracking-tight">
          Edit Project
        </h1>

        <p className="mt-1 text-sm text-clientdesk-gray">
          Update the project information, staff
          assignments, and services.
        </p>
      </div>

      {/* Main Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Project Name */}
          <div className="space-y-2">
            <label
              htmlFor="projectName"
              className="text-sm font-medium"
            >
              Project Name
            </label>

            <input
              id="projectName"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={handleChange}
              maxLength={70}
              required
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />

            <p className="text-xs text-clientdesk-gray">
              Maximum 70 characters.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />
          </div>

          {/* Client + Status */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Client */}
            <div className="space-y-2">
              <label
                htmlFor="clientId"
                className="text-sm font-medium"
              >
                Client
              </label>

              <select
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              >
                <option value="">
                  Select a client
                </option>

                {clientData?.content.map(
                  (client) => (
                    <option
                      key={client.id}
                      value={client.id}
                    >
                      {client.companyName}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-sm font-medium"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              >
                {statuses.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Start Date */}
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="text-sm font-medium"
              >
                Start Date
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label
                htmlFor="deadline"
                className="text-sm font-medium"
              >
                Deadline
              </label>

              <input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                min={
                  formData.startDate ||
                  undefined
                }
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>
          </div>

          {/* Quota */}
          <div className="space-y-2">
            <label
              htmlFor="quota"
              className="text-sm font-medium"
            >
              Quota
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clientdesk-gray">
                ₹
              </span>

              <input
                id="quota"
                name="quota"
                type="number"
                value={formData.quota}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="text-sm font-medium"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes ?? ""}
              onChange={handleChange}
              maxLength={1000}
              rows={4}
              className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />

            <p className="text-xs text-clientdesk-gray">
              Maximum 1000 characters.
            </p>
          </div>

          {/* Assigned Staff */}
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">
                Assigned Staff
              </label>

              <p className="mt-1 text-xs text-clientdesk-gray">
                Select at least one staff member.
              </p>
            </div>

            <StaffMultiSelect
              users={staffData?.content ?? []}
              selectedUserIds={
                formData.assignedUserIds
              }
              onChange={handleStaffChange}
              disabled={updateProject.isPending}
            />

            {formData.assignedUserIds
              .length === 0 && (
              <p className="text-xs text-clientdesk-red">
                At least one staff member must be
                assigned.
              </p>
            )}
          </div>

          {/* Project Services */}
          <div className="space-y-5 border-t border-clientdesk-light pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Project Services
                </h2>

                <p className="mt-1 text-sm text-clientdesk-gray">
                  Manage the services assigned to
                  this project.
                </p>
              </div>

              {!showServiceForm &&
                !editingService && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setEditingService(null);
                      setShowServiceForm(true);
                    }}
                  >
                    <Plus className="mr-2 size-4" />
                    Add Service
                  </Button>
                )}
            </div>

            {/* Add / Edit Service Form */}
            {(showServiceForm ||
              editingService !== null) && (
              <div className="rounded-lg border border-clientdesk-light bg-clientdesk-light/10 p-5">
                <h3 className="mb-4 font-medium">
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h3>

                <ProjectServiceForm
                  initialData={
                    editingService
                      ? getServiceFormData(
                          editingService,
                        )
                      : undefined
                  }
                  existingServiceIds={
                    projectServices?.content
                      .filter(
                        (service) =>
                          service.id !==
                          editingService?.id,
                      )
                      .map(
                        (service) =>
                          service.serviceCatalogueId,
                      ) ?? []
                  }
                  onSubmit={
                    editingService
                      ? handleUpdateService
                      : handleAddService
                  }
                  onCancel={() => {
                    setShowServiceForm(false);
                    setEditingService(null);
                  }}
                  isSubmitting={
                    assignService.isPending ||
                    updateProjectService.isPending
                  }
                />
              </div>
            )}

            {/* Services List */}
            {projectServices?.content &&
              projectServices.content.length >
                0 && (
                <div className="space-y-3">
                  {projectServices.content.map(
                    (service) => (
                      <div
                        key={service.id}
                        className="rounded-lg border border-clientdesk-light p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          {/* Service Details */}
                          <div className="min-w-0">
                            <p className="font-medium">
                              {service.serviceName}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-clientdesk-gray">
                              <span>
                                Quantity:{" "}
                                {service.quantity}
                              </span>

                              <span>
                                Price: ₹
                                {service.agreedPrice.toLocaleString(
                                  "en-IN",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                              </span>

                              {service.discount !==
                                null &&
                                service.discount >
                                  0 && (
                                  <span>
                                    Discount: ₹
                                    {service.discount.toLocaleString(
                                      "en-IN",
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      },
                                    )}
                                  </span>
                                )}
                            </div>

                            {service.remarks && (
                              <p className="mt-2 text-sm text-clientdesk-gray">
                                {service.remarks}
                              </p>
                            )}
                          </div>

                          {/* Total + Actions */}
                          <div className="flex shrink-0 items-start gap-4">
                            <div className="text-right">
                              <p className="text-xs text-clientdesk-gray">
                                Line Total
                              </p>

                              <p className="font-semibold">
                                ₹
                                {service.lineTotal.toLocaleString(
                                  "en-IN",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                title="Edit service"
                                disabled={
                                  assignService.isPending ||
                                  updateProjectService.isPending ||
                                  deleteProjectService.isPending
                                }
                                onClick={() => {
                                  setEditingService(
                                    service,
                                  );
                                  setShowServiceForm(
                                    false,
                                  );
                                }}
                              >
                                <Edit className="size-4" />
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                title="Remove service"
                                disabled={
                                  assignService.isPending ||
                                  updateProjectService.isPending ||
                                  deleteProjectService.isPending
                                }
                                onClick={() =>
                                  handleDeleteService(
                                    service.id,
                                  )
                                }
                              >
                                <Trash2 className="size-4 text-clientdesk-red" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}

            {/* Empty state */}
            {(!projectServices?.content ||
              projectServices.content.length ===
                0) &&
              !showServiceForm &&
              !editingService && (
                <div className="rounded-lg border border-dashed border-clientdesk-light p-8 text-center">
                  <p className="text-sm text-clientdesk-gray">
                    No services assigned to this
                    project.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() =>
                      setShowServiceForm(true)
                    }
                  >
                    <Plus className="mr-2 size-4" />
                    Add First Service
                  </Button>
                </div>
              )}

            {/* Services Total */}
            {projectServices?.content &&
              projectServices.content.length >
                0 && (
                <div className="border-t border-clientdesk-light pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Total Services Cost
                      </p>

                      <p className="mt-1 text-xs text-clientdesk-gray">
                        Current total of all assigned
                        services.
                      </p>
                    </div>

                    <p className="text-lg font-semibold">
                      ₹
                      {totalServicesCost.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </p>
                  </div>
                </div>
              )}

            {/* Service Mutation Error */}
            {(assignService.isError ||
              updateProjectService.isError ||
              deleteProjectService.isError) && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-clientdesk-red">
                  Failed to update project services.
                </p>

                {assignService.error instanceof
                  Error && (
                  <p className="mt-1 text-xs text-clientdesk-gray">
                    {assignService.error.message}
                  </p>
                )}

                {updateProjectService.error instanceof
                  Error && (
                  <p className="mt-1 text-xs text-clientdesk-gray">
                    {updateProjectService.error.message}
                  </p>
                )}

                {deleteProjectService.error instanceof
                  Error && (
                  <p className="mt-1 text-xs text-clientdesk-gray">
                    {deleteProjectService.error.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Project Update Error */}
          {updateProject.isError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-clientdesk-red">
                Failed to update project.
              </p>

              {updateProject.error instanceof
                Error && (
                <p className="mt-1 text-xs text-clientdesk-gray">
                  {updateProject.error.message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-clientdesk-light pt-6">
            <Button
              asChild
              variant="outline"
              disabled={
                updateProject.isPending
              }
            >
              <Link to="/projects">
                Cancel
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={
                updateProject.isPending ||
                formData.assignedUserIds
                  .length === 0
              }
            >
              {updateProject.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}