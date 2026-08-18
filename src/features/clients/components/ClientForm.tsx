import { useEffect } from "react";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  clientSchema,
  type ClientFormData,
} from "../schemas/clientSchema";

interface ClientFormProps {
  defaultValues?: Partial<ClientFormData>;
  onSubmit: SubmitHandler<ClientFormData>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ClientForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Create Client",
}: ClientFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),

    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      contactNumber: "",
      status: "ACTIVE",
      address: "",
      ...defaultValues,
    },
  });

  /*
   * Useful when editing a client.
   * When the API data arrives, the form gets updated.
   */
  useEffect(() => {
    if (defaultValues) {
      reset({
        companyName: defaultValues.companyName ?? "",
        contactPerson: defaultValues.contactPerson ?? "",
        email: defaultValues.email ?? "",
        contactNumber: defaultValues.contactNumber ?? "",
        status: defaultValues.status ?? "ACTIVE",
        address: defaultValues.address ?? "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Company Name */}
      <div className="space-y-2">
        <label
          htmlFor="companyName"
          className="text-sm font-medium"
        >
          Company Name
        </label>

        <Input
          id="companyName"
          placeholder="Enter company name"
          {...register("companyName")}
        />

        {errors.companyName && (
          <p className="text-sm text-clientdesk-red">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Contact Person */}
      <div className="space-y-2">
        <label
          htmlFor="contactPerson"
          className="text-sm font-medium"
        >
          Contact Person
        </label>

        <Input
          id="contactPerson"
          placeholder="Enter contact person"
          {...register("contactPerson")}
        />

        {errors.contactPerson && (
          <p className="text-sm text-clientdesk-red">
            {errors.contactPerson.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email
        </label>

        <Input
          id="email"
          type="email"
          placeholder="company@example.com"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-clientdesk-red">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Contact Number */}
      <div className="space-y-2">
        <label
          htmlFor="contactNumber"
          className="text-sm font-medium"
        >
          Contact Number
        </label>

        <Input
          id="contactNumber"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="9876543210"
          {...register("contactNumber")}
        />

        {errors.contactNumber && (
          <p className="text-sm text-clientdesk-red">
            {errors.contactNumber.message}
          </p>
        )}
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
          {...register("status")}
          className="flex h-10 w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-clientdesk-red focus:ring-2 focus:ring-clientdesk-red/20"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        {errors.status && (
          <p className="text-sm text-clientdesk-red">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label
          htmlFor="address"
          className="text-sm font-medium"
        >
          Address
        </label>

        <Textarea
          id="address"
          placeholder="Enter client address"
          rows={4}
          {...register("address")}
        />

        {errors.address && (
          <p className="text-sm text-clientdesk-red">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </Button>
      </div>
    </form>
  );
}