import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useInvoice } from "../hooks/useInvoice";
import { useDownloadInvoicePdf } from "../hooks/useDownloadInvoicePdf";

import type { InvoiceStatus } from "../types/invoice.types";

const statusLabels: Record<InvoiceStatus, string> = {
  SENT: "Sent",
  PARTIALLY_PAID: "Partially Paid",
  PAID: "Paid",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
};

export function InvoiceDetails() {
  const { id } = useParams<{ id: string }>();

  const invoiceId = Number(id);

  const { data: invoice, isLoading, isError, error } = useInvoice(invoiceId);

  const downloadPdf = useDownloadInvoicePdf();

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button
            variant="ghost"
            className="-ml-2"
            render={<Link to="/invoices" />}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Invoices
          </Button>

          <div className="mt-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              {invoice.invoiceNumber}
            </h1>

            <p className="mt-1 text-sm text-clientdesk-gray">
              Invoice details and payment information.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => downloadPdf.mutate(invoice.id)}
            disabled={downloadPdf.isPending}
          >
            <Download className="mr-2 size-4" />
            {downloadPdf.isPending ? "Downloading..." : "Download PDF"}
          </Button>

          <Button render={<Link to={`/invoices/${invoice.id}/edit`} />}>
            <Edit className="mr-2 size-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-lg border border-clientdesk-light bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-clientdesk-gray">Status</p>

            <span
              className={[
                "mt-2 inline-flex rounded-full px-2.5 py-1",
                "text-xs font-medium",
                invoice.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : invoice.status === "OVERDUE"
                    ? "bg-red-100 text-red-700"
                    : invoice.status === "PARTIALLY_PAID"
                      ? "bg-yellow-100 text-yellow-700"
                      : invoice.status === "CANCELLED"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-blue-100 text-blue-700",
              ].join(" ")}
            >
              {statusLabels[invoice.status]}
            </span>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm text-clientdesk-gray">Grand Total</p>

            <p className="mt-1 text-2xl font-semibold">
              ₹
              {(invoice.grandTotal ?? 0).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-clientdesk-light bg-white p-6">
          <h2 className="text-lg font-semibold">Invoice Information</h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-clientdesk-gray">Invoice Number</p>

              <p className="mt-1 text-sm font-medium">
                {invoice.invoiceNumber}
              </p>
            </div>

            <div>
              <p className="text-xs text-clientdesk-gray">Invoice Date</p>

              <p className="mt-1 text-sm">{invoice.invoiceDate}</p>
            </div>

            <div>
              <p className="text-xs text-clientdesk-gray">Due Date</p>

              <p className="mt-1 text-sm">{invoice.dueDate}</p>
            </div>

            <div>
              <p className="text-xs text-clientdesk-gray">Project</p>

              <p className="mt-1 text-sm font-medium">{invoice.projectName}</p>
            </div>

            <div>
              <p className="text-xs text-clientdesk-gray">Client</p>

              <p className="mt-1 text-sm font-medium">{invoice.clientName}</p>
            </div>
          </div>
        </div>

        {/* Payment information */}
        <div className="rounded-lg border border-clientdesk-light bg-white p-6">
          <h2 className="text-lg font-semibold">Payment Information</h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-clientdesk-gray">
                Taxable Amount
              </span>

              <span className="text-sm font-medium">
                ₹
                {(invoice.taxableAmount ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-clientdesk-gray">Discount</span>

              <span className="text-sm font-medium">
                ₹
                {(invoice.discount ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-clientdesk-gray">GST</span>

              <span className="text-sm font-medium">
                ₹
                {(invoice.gstAmount ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="border-t border-clientdesk-light pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Grand Total</span>

                <span className="text-lg font-semibold">
                  ₹
                  {(invoice.grandTotal ?? 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-clientdesk-gray">Total Paid</span>

              <span className="text-sm font-medium text-green-600">
                ₹
                {(invoice.totalPaid ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pending Amount</span>

              <span className="text-sm font-semibold text-clientdesk-red">
                ₹
                {(invoice.pendingAmount ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
