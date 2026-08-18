import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useClients } from "@/features/clients/hooks/useClients";
import { useAssignServiceToProject } from "@/features/project-services/hooks/useAssignServiceToProject";
import { ProjectServiceForm } from "@/features/project-services/components/ProjectServiceForm";
import type { ProjectServiceRequest } from "@/features/project-services/types/project-service.types";
import { useServices } from "@/features/services/hooks/useServices";
import { useCreateProject } from "../hooks/useCreateProject";

import type { ProjectRequest } from "../types/project.types";
import { useStaffUsers } from "@/features/users/hooks/useStaffUsers";
import { StaffMultiSelect } from "../components/StaffMultiSelect";

export function AddProject() {
  const navigate = useNavigate();

  const createProject = useCreateProject();
  const assignService = useAssignServiceToProject();

  const { data: clientData, isLoading: clientsLoading } = useClients({
    page: 0,
    size: 100,
  });
  const { data: serviceData } = useServices({
    page: 0,
    size: 100,
  });

  const { data: staffData, isLoading: staffLoading } = useStaffUsers();

  const [formData, setFormData] = useState<ProjectRequest>({
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

  const [services, setServices] = useState<ProjectServiceRequest[]>([]);

  const [showServiceForm, setShowServiceForm] = useState(false);

  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(
    null,
  );

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "clientId" || name === "quota" ? Number(value) : value,
    }));
  };

  const handleAddService = (service: ProjectServiceRequest) => {
    setServices((current) => [
      ...current,
      {
        ...service,
        projectId: 0,
      },
    ]);

    setShowServiceForm(false);
  };

  const handleUpdateService = (service: ProjectServiceRequest) => {
    if (editingServiceIndex === null) {
      return;
    }

    setServices((current) =>
      current.map((item, index) =>
        index === editingServiceIndex
          ? {
              ...service,
              projectId: 0,
            }
          : item,
      ),
    );

    setEditingServiceIndex(null);
    setShowServiceForm(false);
  };

  const handleDeleteService = (index: number) => {
    setServices((current) =>
      current.filter((_, serviceIndex) => serviceIndex !== index),
    );
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    createProject.mutate(formData, {
      onSuccess: async (createdProject) => {
        try {
          /*
           * Create each project service after
           * the project has been created.
           */
          for (const service of services) {
            await assignService.mutateAsync({
              ...service,
              projectId: createdProject.id,
            });
          }

          navigate(`/projects/${createdProject.id}`);
        } catch {
          /*
           * The project was created, but one of
           * the services failed.
           */
        }
      },
    });
  };

  const editingService =
    editingServiceIndex !== null ? services[editingServiceIndex] : undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button asChild variant="ghost" className="mb-3 -ml-2">
          <Link to="/projects">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Link>
        </Button>

        <h1 className="text-3xl font-semibold tracking-tight">Add Project</h1>

        <p className="mt-1 text-sm text-clientdesk-gray">
          Create a project and assign its services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Information */}
        <div className="rounded-lg border border-clientdesk-light bg-white p-6">
          <h2 className="text-lg font-semibold">Project Information</h2>

          <div className="mt-6 space-y-5">
            {/* Project Name */}
            <div className="space-y-2">
              <label htmlFor="projectName" className="text-sm font-medium">
                Project Name
              </label>

              <input
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
                maxLength={150}
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>

            {/* Client */}
            <div className="space-y-2">
              <label htmlFor="clientId" className="text-sm font-medium">
                Client
              </label>

              <select
                id="clientId"
                name="clientId"
                value={formData.clientId || ""}
                onChange={handleChange}
                required
                disabled={clientsLoading}
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
              >
                <option value="">
                  {clientsLoading ? "Loading clients..." : "Select a client"}
                </option>

                {clientData?.content.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.companyName}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
              >
                <option value="PENDING">Pending</option>

                <option value="IN_PROGRESS">In Progress</option>

                <option value="COMPLETED">Completed</option>

                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="deadline" className="text-sm font-medium">
                  Deadline
                </label>

                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
                />
              </div>
            </div>

            {/* Quota */}
            <div className="space-y-2">
              <label htmlFor="quota" className="text-sm font-medium">
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
                  min="0"
                  step="0.01"
                  value={formData.quota}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                value={formData.notes ?? ""}
                onChange={handleChange}
                rows={3}
                maxLength={1000}
                className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>
          </div>
        </div>

        {/* Assigned Staff */}
        <div className="rounded-lg border border-clientdesk-light bg-white p-6">
          <h2 className="text-lg font-semibold">Assigned Staff</h2>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Select the staff members who will work on this project.
          </p>

          <div className="mt-5">
            {staffLoading ? (
              <div className="rounded-md border border-clientdesk-light p-4 text-center">
                <p className="text-sm text-clientdesk-gray">
                  Loading staff members...
                </p>
              </div>
            ) : (
              <StaffMultiSelect
                users={staffData?.content ?? []}
                selectedUserIds={formData.assignedUserIds}
                onChange={(userIds) =>
                  setFormData((current) => ({
                    ...current,
                    assignedUserIds: userIds,
                  }))
                }
                disabled={staffLoading}
              />
            )}
          </div>
        </div>
        {/* Services */}
        <div className="rounded-lg border border-clientdesk-light bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Project Services</h2>

              <p className="mt-1 text-sm text-clientdesk-gray">
                Add the services that will be delivered for this project.
              </p>
            </div>

            {!showServiceForm && editingServiceIndex === null && (
              <Button
                type="button"
                size="sm"
                onClick={() => setShowServiceForm(true)}
              >
                <Plus className="mr-2 size-4" />
                Add Service
              </Button>
            )}
          </div>

          {/* Existing services */}
          {services.length > 0 && (
            <div className="mt-5 space-y-3">
              {services.map((service, index) => {
                const selectedService = serviceData?.content.find(
                  (catalogueService) =>
                    catalogueService.id === service.serviceCatalogueId,
                );

                const subtotal = service.quantity * service.agreedPrice;

                const discount = service.discount ?? 0;

                const lineTotal = Math.max(subtotal - discount, 0);

                return (
                  <div
                    key={index}
                    className="rounded-lg border border-clientdesk-light p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {selectedService?.serviceName ?? "Unknown Service"}
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-clientdesk-gray">
                          <span>Quantity: {service.quantity}</span>

                          <span>
                            Price: ₹
                            {service.agreedPrice.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>

                          {service.discount !== undefined &&
                            service.discount > 0 && (
                              <span>
                                Discount: ₹
                                {service.discount.toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                            )}
                        </div>

                        {service.remarks && (
                          <p className="mt-2 text-sm text-clientdesk-gray">
                            {service.remarks}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-start gap-4">
                        <div className="text-right">
                          <p className="text-xs text-clientdesk-gray">
                            Line Total
                          </p>

                          <p className="font-semibold">
                            ₹
                            {lineTotal.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            title="Edit service"
                            onClick={() => {
                              setEditingServiceIndex(index);
                              setShowServiceForm(false);
                            }}
                          >
                            <Edit className="size-4" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            title="Remove service"
                            onClick={() => handleDeleteService(index)}
                          >
                            <Trash2 className="size-4 text-clientdesk-red" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {services.length > 0 && (
            <div className="mt-5 border-t border-clientdesk-light pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Services Cost</p>

                  <p className="mt-1 text-xs text-clientdesk-gray">
                    Based on the services currently added.
                  </p>
                </div>

                <p className="text-lg font-semibold">
                  ₹
                  {services
                    .reduce((total, service) => {
                      const subtotal = service.quantity * service.agreedPrice;

                      const discount = service.discount ?? 0;

                      return total + Math.max(subtotal - discount, 0);
                    }, 0)
                    .toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </p>
              </div>
            </div>
          )}

          {services.length === 0 && !showServiceForm && (
            <div className="mt-5 rounded-lg border border-dashed border-clientdesk-light p-8 text-center">
              <p className="text-sm text-clientdesk-gray">
                No services added yet.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setShowServiceForm(true)}
              >
                <Plus className="mr-2 size-4" />
                Add First Service
              </Button>
            </div>
          )}

          {/* Add/Edit service form */}
          {(showServiceForm || editingServiceIndex !== null) && (
            <div className="mt-5 rounded-lg border border-clientdesk-light bg-clientdesk-light/10 p-5">
              <h3 className="mb-4 font-medium">
                {editingServiceIndex !== null ? "Edit Service" : "Add Service"}
              </h3>

              <ProjectServiceForm
                initialData={editingService}
                existingServiceIds={services.map(
                  (service) => service.serviceCatalogueId,
                )}
                onSubmit={
                  editingServiceIndex !== null
                    ? handleUpdateService
                    : handleAddService
                }
                onCancel={() => {
                  setShowServiceForm(false);
                  setEditingServiceIndex(null);
                }}
              />
            </div>
          )}
        </div>

        {/* Error */}
        {createProject.isError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-clientdesk-red">
              Failed to create project.
            </p>

            {createProject.error instanceof Error && (
              <p className="mt-1 text-xs text-clientdesk-gray">
                {createProject.error.message}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button asChild variant="outline" disabled={createProject.isPending}>
            <Link to="/projects">Cancel</Link>
          </Button>

          <Button
            type="submit"
            disabled={
              createProject.isPending ||
              assignService.isPending ||
              !formData.clientId ||
              !formData.projectName ||
              !formData.startDate ||
              !formData.deadline
            }
          >
            {createProject.isPending || assignService.isPending
              ? "Creating Project..."
              : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
