import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useInvoice } from "../hooks/useInvoice";
import { useUpdateInvoice } from "../hooks/useUpdateInvoice";

export function EditInvoice() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const invoiceId = Number(id);

  const { data: invoice, isLoading, isError, error } = useInvoice(invoiceId);

  const updateInvoice = useUpdateInvoice();

  const [dueDate, setDueDate] = useState("");
  const [discount, setDiscount] = useState("0");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (invoice) {
      setDueDate(invoice.dueDate);
      setDiscount(invoice.discount.toString());
    }
  }, [invoice]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateInvoice.mutate(
      {
        id: invoiceId,
        data: {
          projectId: 0,
          dueDate,
          discount: Number(discount),
          notes: notes.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          navigate(`/invoices/${invoiceId}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-gray">Loading invoice...</p>
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
        <p className="text-sm text-clientdesk-red">Failed to load invoice.</p>

        {error instanceof Error && (
          <p className="mt-1 text-xs text-clientdesk-gray">{error.message}</p>
        )}

        <Button className="mt-5" render={<Link to="/invoices" />}>
          Back to Invoices
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          className="-ml-2"
          render={<Link to={`/invoices/${invoiceId}`} />}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Invoice
        </Button>

        <div className="mt-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Edit Invoice
          </h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Update {invoice.invoiceNumber}.
          </p>
        </div>
      </div>

      {/* Invoice information */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-clientdesk-gray">Invoice Number</p>

            <p className="mt-1 text-sm font-medium">{invoice.invoiceNumber}</p>
          </div>

          <div>
            <p className="text-xs text-clientdesk-gray">Project</p>

            <p className="mt-1 text-sm font-medium">{invoice.projectName}</p>
          </div>

          <div>
            <p className="text-xs text-clientdesk-gray">Client</p>

            <p className="mt-1 text-sm font-medium">{invoice.clientName}</p>
          </div>

          <div>
            <p className="text-xs text-clientdesk-gray">Invoice Date</p>

            <p className="mt-1 text-sm">{invoice.invoiceDate}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Due Date */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium">
              Due Date
            </label>

            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-clientdesk-blue"
            />
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
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
              className="w-full rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-clientdesk-blue"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>

            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Optional invoice notes..."
              className="w-full resize-none rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-clientdesk-blue"
            />
          </div>

          {/* Error */}
          {updateInvoice.isError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-clientdesk-red">
                Failed to update invoice. Please try again.
              </p>

              {updateInvoice.error instanceof Error && (
                <p className="mt-1 text-xs text-clientdesk-gray">
                  {updateInvoice.error.message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              render={<Link to={`/invoices/${invoiceId}`} />}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={updateInvoice.isPending}>
              {updateInvoice.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
