import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  invoiceSchema,
  type InvoiceFormValues,
} from "../schema/invoice.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { useCreateInvoice } from "../hooks/useCreateInvoice";
import { useProject } from "@/features/project/hooks/useProject";

export function CreateInvoice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const projectIdParam = searchParams.get("projectId");

  const projectId = projectIdParam ? Number(projectIdParam) : undefined;

  const createInvoice = useCreateInvoice();

  const {
    data: project,
    isLoading: projectLoading,
    isError: projectError,
  } = useProject(projectId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      dueDate: "",
      discount: 0,
      notes: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        dueDate: "",
        discount: 0,
        notes: "",
      });
    }
  }, [project, reset]);

  const onSubmit = (data: InvoiceFormValues) => {
    if (!projectId) {
      return;
    }

    createInvoice.mutate(
      {
        projectId,
        dueDate: data.dueDate,
        discount: data.discount,
        notes: data.notes?.trim() || undefined,
      },
      {
        onSuccess: (invoice) => {
          navigate(`/invoices/${invoice.id}`);
        },
      },
    );
  };

  if (!projectId) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            No project was selected.
          </p>

          <Button asChild className="mt-5">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (projectLoading) {
    return (
      <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-gray">Loading project...</p>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-red">Failed to load project.</p>

        <Button asChild className="mt-5">
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button asChild variant="ghost" className="-ml-2">
          <Link to="/projects">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create Invoice
          </h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Create an invoice for this project.
          </p>
        </div>
      </div>

      {/* Project Information */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <h2 className="text-lg font-semibold">Project</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-clientdesk-gray">Project Name</p>

            <p className="mt-1 text-sm font-medium">{project.projectName}</p>
          </div>

          <div>
            <p className="text-xs text-clientdesk-gray">Client</p>

            <p className="mt-1 text-sm font-medium">{project.clientName}</p>
          </div>
        </div>
      </div>

      {/* Invoice Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
          {/* Due Date */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium">
              Due Date
            </label>

            <input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-clientdesk-blue"
            />

            {errors.dueDate && (
              <p className="text-xs text-clientdesk-red">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <label htmlFor="discount" className="text-sm font-medium">
              Discount
            </label>

            <input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              {...register("discount", {
                valueAsNumber: true,
              })}
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-clientdesk-blue"
            />

            {errors.discount && (
              <p className="text-xs text-clientdesk-red">
                {errors.discount.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>

            <textarea
              id="notes"
              rows={4}
              maxLength={500}
              placeholder="Optional invoice notes..."
              {...register("notes")}
              className="w-full resize-none rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-clientdesk-blue"
            />

            {errors.notes && (
              <p className="text-xs text-clientdesk-red">
                {errors.notes.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {createInvoice.isError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-clientdesk-red">
                Failed to create invoice. Please try again.
              </p>

              {createInvoice.error instanceof Error && (
                <p className="mt-1 text-xs text-clientdesk-gray">
                  {createInvoice.error.message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link to="/projects">Cancel</Link>
            </Button>

            <Button type="submit" disabled={createInvoice.isPending}>
              {createInvoice.isPending ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
