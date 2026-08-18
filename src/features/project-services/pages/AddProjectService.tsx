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
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useServices } from "@/features/services/hooks/useServices";

import { useAssignServiceToProject } from "../hooks/useAssignServiceToProject";

import type { ProjectServiceRequest } from "../types/project-service.types";

export function AddProjectService() {
  const { projectId: projectIdParam } =
    useParams<{ projectId: string }>();

  const navigate = useNavigate();

  const projectId = Number(projectIdParam);

  const assignService =
    useAssignServiceToProject();

  const {
    data: serviceData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useServices({
    page: 0,
    size: 100,
  });

  const [formData, setFormData] =
    useState<ProjectServiceRequest>({
      projectId,
      serviceCatalogueId: 0,
      quantity: 1,
      agreedPrice: 0,
      discount: undefined,
      remarks: "",
    });

  /*
   * When the URL project ID is available,
   * make sure the form contains it.
   */
  useEffect(() => {
    setFormData((current) => ({
      ...current,
      projectId,
    }));
  }, [projectId]);

  /*
   * When a service is selected, automatically
   * populate the agreed price with its base price.
   */
  const handleServiceChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const serviceCatalogueId =
      Number(event.target.value);

    const selectedService =
      serviceData?.content.find(
        (service) =>
          service.id === serviceCatalogueId,
      );

    setFormData((current) => ({
      ...current,
      serviceCatalogueId,
      agreedPrice:
        selectedService?.basePrice ?? 0,
    }));
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,

      [name]:
        name === "quantity" ||
        name === "agreedPrice" ||
        name === "discount"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (
    event: SubmitEvent,
  ) => {
    event.preventDefault();

    assignService.mutate(formData, {
      onSuccess: () => {
        navigate(
          `/projects/${projectId}`,
        );
      },
    });
  };

  if (servicesLoading) {
    return (
      <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-gray">
          Loading services...
        </p>
      </div>
    );
  }

  if (servicesError) {
    return (
      <div className="space-y-4">
        <Button
          asChild
          variant="ghost"
          className="-ml-2"
        >
          <Link
            to={`/projects/${projectId}`}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Project
          </Link>
        </Button>

        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            Failed to load services.
          </p>

          <p className="mt-1 text-xs text-clientdesk-gray">
            Please refresh the page and try again.
          </p>
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
          <Link
            to={`/projects/${projectId}`}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Project
          </Link>
        </Button>

        <h1 className="text-3xl font-semibold tracking-tight">
          Add Service
        </h1>

        <p className="mt-1 text-sm text-clientdesk-gray">
          Assign a service from the service catalogue
          to this project.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Service */}
          <div className="space-y-2">
            <label
              htmlFor="serviceCatalogueId"
              className="text-sm font-medium"
            >
              Service
            </label>

            <select
              id="serviceCatalogueId"
              name="serviceCatalogueId"
              value={
                formData.serviceCatalogueId || ""
              }
              onChange={handleServiceChange}
              required
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            >
              <option value="">
                Select a service
              </option>

              {serviceData?.content.map(
                (service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.serviceName} — ₹
                    {service.basePrice.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Quantity + Agreed Price */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Quantity */}
            <div className="space-y-2">
              <label
                htmlFor="quantity"
                className="text-sm font-medium"
              >
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
              <label
                htmlFor="agreedPrice"
                className="text-sm font-medium"
              >
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
                  value={
                    formData.agreedPrice
                  }
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
                />
              </div>

              <p className="text-xs text-clientdesk-gray">
                Automatically populated from the
                service base price.
              </p>
            </div>
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <label
              htmlFor="discount"
              className="text-sm font-medium"
            >
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
                value={
                  formData.discount ?? ""
                }
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label
              htmlFor="remarks"
              className="text-sm font-medium"
            >
              Remarks
            </label>

            <textarea
              id="remarks"
              name="remarks"
              value={
                formData.remarks ?? ""
              }
              onChange={handleChange}
              rows={4}
              placeholder="Add any remarks about this service..."
              className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />
          </div>

          {/* Error */}
          {assignService.isError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-clientdesk-red">
                Failed to assign service.
              </p>

              {assignService.error instanceof
                Error && (
                <p className="mt-1 text-xs text-clientdesk-gray">
                  {
                    assignService.error
                      .message
                  }
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
                assignService.isPending
              }
            >
              <Link
                to={`/projects/${projectId}`}
              >
                Cancel
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={
                assignService.isPending ||
                !formData.serviceCatalogueId ||
                formData.quantity < 1
              }
            >
              {assignService.isPending
                ? "Assigning..."
                : "Assign Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}