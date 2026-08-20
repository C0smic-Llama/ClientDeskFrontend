import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useServices } from "@/features/services/hooks/useServices";

import { useProjectService } from "../hooks/useProjectService";
import { useUpdateProjectService } from "../hooks/useUpdateProjectService";

import type { ProjectServiceRequest } from "../types/project-service.types";

export function EditProjectService() {
  const { projectId: projectIdParam, projectServiceId: projectServiceIdParam } =
    useParams<{
      projectId: string;
      projectServiceId: string;
    }>();

  const navigate = useNavigate();

  const projectId = Number(projectIdParam);
  const projectServiceId = Number(projectServiceIdParam);

  const {
    data: projectService,
    isLoading: projectServiceLoading,
    isError: projectServiceError,
    error,
  } = useProjectService(projectServiceId);

  const {
    data: serviceData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useServices({
    page: 0,
    size: 100,
  });

  const updateProjectService = useUpdateProjectService();

  const [formData, setFormData] = useState<ProjectServiceRequest>({
    projectId,
    serviceCatalogueId: 0,
    quantity: 1,
    agreedPrice: 0,
    discount: undefined,
    remarks: "",
  });

  useEffect(() => {
    if (projectService) {
      setFormData({
        projectId: projectService.projectId,
        serviceCatalogueId: projectService.serviceCatalogueId,
        quantity: projectService.quantity,
        agreedPrice: projectService.agreedPrice,
        discount: projectService.discount ?? undefined,
        remarks: projectService.remarks ?? "",
      });
    }
  }, [projectService]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,

      [name]:
        name === "quantity" || name === "agreedPrice" || name === "discount"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const handleServiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const serviceCatalogueId = Number(event.target.value);

    const selectedService = serviceData?.content.find(
      (service) => service.id === serviceCatalogueId,
    );

    setFormData((current) => ({
      ...current,
      serviceCatalogueId,
      agreedPrice: selectedService?.basePrice ?? current.agreedPrice,
    }));
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    updateProjectService.mutate(
      {
        projectServiceId,
        data: formData,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}`);
        },
      },
    );
  };

  if (projectServiceLoading || servicesLoading) {
    return (
      <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-gray">
          Loading project service...
        </p>
      </div>
    );
  }

  if (projectServiceError || !projectService || servicesError) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          className="-ml-2"
          render={<Link to={`/projects/${projectId}`} />}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Project
        </Button>

        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            Failed to load project service.
          </p>

          {error instanceof Error && (
            <p className="mt-1 text-xs text-clientdesk-gray">{error.message}</p>
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
          variant="ghost"
          className="mb-3 -ml-2"
          render={<Link to={`/projects/${projectId}`} />}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Project
        </Button>

        <h1 className="text-3xl font-semibold tracking-tight">
          Edit Project Service
        </h1>

        <p className="mt-1 text-sm text-clientdesk-gray">
          Update the service assigned to this project.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service */}
          <div className="space-y-2">
            <label htmlFor="serviceCatalogueId" className="text-sm font-medium">
              Service
            </label>

            <select
              id="serviceCatalogueId"
              name="serviceCatalogueId"
              value={formData.serviceCatalogueId}
              onChange={handleServiceChange}
              required
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            >
              <option value="">Select a service</option>

              {serviceData?.content.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName} — ₹
                  {service.basePrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity + Price */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Quantity */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </label>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>

            {/* Agreed Price */}
            <div className="space-y-2">
              <label htmlFor="agreedPrice" className="text-sm font-medium">
                Agreed Price
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clientdesk-gray">
                  ₹
                </span>

                <input
                  id="agreedPrice"
                  name="agreedPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.agreedPrice}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
                />
              </div>
            </div>
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <label htmlFor="discount" className="text-sm font-medium">
              Discount
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clientdesk-gray">
                ₹
              </span>

              <input
                id="discount"
                name="discount"
                type="number"
                min="0"
                step="0.01"
                value={formData.discount ?? ""}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label htmlFor="remarks" className="text-sm font-medium">
              Remarks
            </label>

            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks ?? ""}
              onChange={handleChange}
              rows={4}
              placeholder="Add any remarks about this service..."
              className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />
          </div>

          {/* API Error */}
          {updateProjectService.isError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-clientdesk-red">
                Failed to update project service.
              </p>

              {updateProjectService.error instanceof Error && (
                <p className="mt-1 text-xs text-clientdesk-gray">
                  {updateProjectService.error.message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-clientdesk-light pt-6">
            <Button
              variant="outline"
              disabled={updateProjectService.isPending}
              render={<Link to={`/projects/${projectId}`} />}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                updateProjectService.isPending ||
                formData.quantity < 1 ||
                !formData.serviceCatalogueId
              }
            >
              {updateProjectService.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
