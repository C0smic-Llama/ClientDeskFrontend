import {
  useEffect,
  useState,
  type ChangeEvent,
} from "react";

import { Button } from "@/components/ui/button";

import { useServices } from "@/features/services/hooks/useServices";

import type { ProjectServiceRequest } from "../types/project-service.types";

interface ProjectServiceFormProps {
  initialData?: ProjectServiceRequest;
  existingServiceIds?: number[];
  onSubmit: (data: ProjectServiceRequest) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ProjectServiceForm({
  initialData,
  existingServiceIds = [],
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProjectServiceFormProps) {
  const {
    data,
    isLoading,
    isError,
  } = useServices({
    page: 0,
    size: 100,
  });

  const [formData, setFormData] =
    useState<ProjectServiceRequest>(
      initialData ?? {
        projectId: 0,
        serviceCatalogueId: 0,
        quantity: 1,
        agreedPrice: 0,
        discount: undefined,
        remarks: "",
      },
    );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleServiceChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const serviceCatalogueId =
      Number(event.target.value);

    const selectedService =
      data?.content.find(
        (service) =>
          service.id === serviceCatalogueId,
      );

    setFormData((current) => ({
      ...current,
      serviceCatalogueId,
      agreedPrice:
        selectedService?.basePrice ??
        current.agreedPrice,
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

  const handleAddService = () => {
    onSubmit(formData);
  };

  const availableServices =
    data?.content.filter(
      (service) =>
        !existingServiceIds.includes(
          service.id,
        ) ||
        service.id ===
          formData.serviceCatalogueId,
    ) ?? [];

  return (
    <div className="space-y-5">
      {/* Service */}
      <div className="space-y-2">
        <label
          htmlFor="project-service-catalogue"
          className="text-sm font-medium"
        >
          Service
        </label>

        {isLoading ? (
          <div className="rounded-md border border-clientdesk-light px-3 py-2 text-sm text-clientdesk-gray">
            Loading services...
          </div>
        ) : isError ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-clientdesk-red">
            Failed to load services.
          </div>
        ) : (
          <select
            id="project-service-catalogue"
            name="serviceCatalogueId"
            value={
              formData.serviceCatalogueId || ""
            }
            onChange={handleServiceChange}
            className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
          >
            <option value="">
              Select a service
            </option>

            {availableServices.map(
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
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label
          htmlFor="project-service-quantity"
          className="text-sm font-medium"
        >
          Quantity
        </label>

        <input
          id="project-service-quantity"
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
        />
      </div>

      {/* Agreed Price */}
      <div className="space-y-2">
        <label
          htmlFor="project-service-price"
          className="text-sm font-medium"
        >
          Agreed Price
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clientdesk-gray">
            ₹
          </span>

          <input
            id="project-service-price"
            name="agreedPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.agreedPrice}
            onChange={handleChange}
            className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
          />
        </div>
      </div>

      {/* Discount */}
      <div className="space-y-2">
        <label
          htmlFor="project-service-discount"
          className="text-sm font-medium"
        >
          Discount
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clientdesk-gray">
            ₹
          </span>

          <input
            id="project-service-discount"
            name="discount"
            type="number"
            min="0"
            step="0.01"
            value={formData.discount ?? ""}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
          />
        </div>
      </div>

      {/* Remarks */}
      <div className="space-y-2">
        <label
          htmlFor="project-service-remarks"
          className="text-sm font-medium"
        >
          Remarks
        </label>

        <textarea
          id="project-service-remarks"
          name="remarks"
          value={formData.remarks ?? ""}
          onChange={handleChange}
          rows={3}
          placeholder="Add remarks..."
          className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-clientdesk-gray"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-clientdesk-light pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={
            isSubmitting ||
            !formData.serviceCatalogueId ||
            formData.quantity < 1
          }
          onClick={handleAddService}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Service"
              : "Add Service"}
        </Button>
      </div>
    </div>
  );
}