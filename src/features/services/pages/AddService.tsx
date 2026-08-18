import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCreateService } from "../hooks/useCreateService";
import type {
  ServiceCategory,
  ServiceRequest,
} from "../types/service.types";

const categories: {
  value: ServiceCategory;
  label: string;
}[] = [
  {
    value: "PRODUCTION",
    label: "Production",
  },
  {
    value: "EDITING",
    label: "Editing",
  },
  {
    value: "DESIGN",
    label: "Design",
  },
  {
    value: "BRANDING",
    label: "Branding",
  },
  {
    value: "DIGITAL_MARKETING",
    label: "Digital Marketing",
  },
  {
    value: "WEB_DEVELOPMENT",
    label: "Web Development",
  },
  {
    value: "PHOTOGRAPHY",
    label: "Photography",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

export function AddService() {
  const navigate = useNavigate();
  const createService = useCreateService();

  const [formData, setFormData] =
    useState<ServiceRequest>({
      serviceName: "",
      description: "",
      category: "OTHER",
      basePrice: 0,
    });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "basePrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (
    event: React.SubmitEvent,
  ) => {
    event.preventDefault();

    createService.mutate(formData, {
      onSuccess: () => {
        navigate("/services");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          asChild
          variant="ghost"
          className="mb-3 -ml-2"
        >
          <Link to="/services">
            <ArrowLeft className="mr-2 size-4" />
            Back to Services
          </Link>
        </Button>

        <h1 className="text-3xl font-semibold tracking-tight">
          Add Service
        </h1>

        <p className="mt-1 text-sm text-clientdesk-gray">
          Add a new service to your service catalogue.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Service Name */}
          <div className="space-y-2">
            <label
              htmlFor="serviceName"
              className="text-sm font-medium"
            >
              Service Name
            </label>

            <input
              id="serviceName"
              name="serviceName"
              type="text"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="e.g. Social Media Management"
              maxLength={100}
              required
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />

            <p className="text-xs text-clientdesk-gray">
              Maximum 100 characters.
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
              placeholder="Describe what this service includes..."
              maxLength={1000}
              required
              rows={5}
              className="w-full resize-y rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
            />

            <p className="text-xs text-clientdesk-gray">
              Maximum 1000 characters.
            </p>
          </div>

          {/* Category and Price */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
              >
                {categories.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Base Price */}
            <div className="space-y-2">
              <label
                htmlFor="basePrice"
                className="text-sm font-medium"
              >
                Base Price
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clientdesk-gray">
                  ₹
                </span>

                <input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full rounded-md border border-clientdesk-light bg-white py-2 pl-8 pr-3 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
                />
              </div>

              <p className="text-xs text-clientdesk-gray">
                Base price cannot be negative.
              </p>
            </div>
          </div>

          {/* API Error */}
          {createService.isError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-clientdesk-red">
                Failed to create service.
              </p>

              {createService.error instanceof Error && (
                <p className="mt-1 text-xs text-clientdesk-gray">
                  {createService.error.message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-clientdesk-light pt-6">
            <Button
              asChild
              variant="outline"
              disabled={createService.isPending}
            >
              <Link to="/services">
                Cancel
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={createService.isPending}
            >
              {createService.isPending
                ? "Creating..."
                : "Create Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}