import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Plus, Download, Eye, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useInvoices } from "../hooks/useInvoices";
import { useDownloadInvoicePdf } from "../hooks/useDownloadInvoicePdf";

import type { InvoiceStatus } from "../types/invoice.types";
import { DeleteInvoiceDialog } from "../components/DeleteInvoiceDialog";

const statusLabels: Record<InvoiceStatus, string> = {
  SENT: "Sent",
  PARTIALLY_PAID: "Partially Paid",
  PAID: "Paid",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
};

export function InvoicesPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<InvoiceStatus>();

  const { data, isLoading, isError, error, isFetching } = useInvoices({
    page,
    size: 10,
    status,
  });

  const downloadPdf = useDownloadInvoicePdf();

  const handleStatusChange = (value?: InvoiceStatus) => {
    setStatus(value);
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  };

  const handleNextPage = () => {
    if (data && !data.last) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const handleDownloadPdf = (invoiceId: number) => {
    downloadPdf.mutate(invoiceId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Invoices</h1>

          <p className="mt-1 text-sm text-clientdesk-gray">
            Manage your invoices and payments.
          </p>
        </div>

        <Button asChild>
          <Link to="/invoices/new">
            <Plus className="mr-2 size-4" />
            Create Invoice
          </Link>
        </Button>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-3">
        <label htmlFor="invoice-status" className="text-sm font-medium">
          Status
        </label>

        <select
          id="invoice-status"
          value={status ?? ""}
          onChange={(event) =>
            handleStatusChange(
              event.target.value
                ? (event.target.value as InvoiceStatus)
                : undefined,
            )
          }
          className="rounded-md border border-clientdesk-light bg-white px-3 py-2 text-sm"
        >
          <option value="">All invoices</option>
          <option value="SENT">Sent</option>
          <option value="PARTIALLY_PAID">Partially Paid</option>
          <option value="PAID">Paid</option>
          <option value="OVERDUE">Overdue</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-gray">Loading invoices...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-clientdesk-red">
            Failed to load invoices.
          </p>

          {error instanceof Error && (
            <p className="mt-1 text-xs text-clientdesk-gray">{error.message}</p>
          )}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && data?.empty && (
        <div className="rounded-lg border border-clientdesk-light bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">
            {status ? "No matching invoices" : "No invoices found"}
          </h2>

          <p className="mt-2 text-sm text-clientdesk-gray">
            {status
              ? "Try changing your status filter."
              : "You haven't created any invoices yet."}
          </p>

          {!status && (
            <Button asChild className="mt-5">
              <Link to="/invoices/new">
                <Plus className="mr-2 size-4" />
                Create your first invoice
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Invoice table */}
      {!isLoading && !isError && data && data.content.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-clientdesk-light bg-white">
          <div className="relative overflow-x-auto">
            {/* Refetch indicator */}
            {isFetching && !isLoading && (
              <div className="absolute right-4 top-4 z-10 rounded-md bg-white px-3 py-1 text-xs text-clientdesk-gray shadow-sm">
                Updating...
              </div>
            )}

            <table className="w-full">
              <thead>
                <tr className="border-b border-clientdesk-light">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Invoice
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Client
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Project
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Invoice Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Due Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Pending
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.content.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-clientdesk-light last:border-0 hover:bg-clientdesk-light/20"
                  >
                    {/* Invoice */}
                    <td className="px-6 py-4">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="font-medium hover:underline"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>

                    {/* Client */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {invoice.clientName}
                    </td>

                    {/* Project */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {invoice.projectName}
                    </td>

                    {/* Invoice date */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {invoice.invoiceDate}
                    </td>

                    {/* Due date */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      {invoice.dueDate}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      ₹
                      {(invoice.grandTotal ?? 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Pending */}
                    <td className="px-6 py-4 text-sm text-clientdesk-gray">
                      ₹
                      {(invoice.pendingAmount ?? 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1",
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
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* payments */}
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          title="Record payment"
                          disabled={
                            invoice.status === "PAID" ||
                            invoice.status === "CANCELLED"
                          }
                        >
                          <Link
                            to={`/invoices/${invoice.id}/payments/create`}
                            aria-label={`Record payment for ${invoice.invoiceNumber}`}
                          >
                            <CreditCard className="size-4" />
                          </Link>
                        </Button>

                        {/* Edit */}
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          title="Edit invoice"
                        >
                          <Link
                            to={`/invoices/${invoice.id}/edit`}
                            aria-label={`Edit ${invoice.invoiceNumber}`}
                          >
                            <Edit className="size-4" />
                          </Link>
                        </Button>

                        <DeleteInvoiceDialog
                          invoiceId={invoice.id}
                          invoiceNumber={invoice.invoiceNumber}
                        />

                        {/* Download PDF */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Download invoice PDF"
                          disabled={downloadPdf.isPending}
                          onClick={() => handleDownloadPdf(invoice.id)}
                          aria-label={`Download ${invoice.invoiceNumber} PDF`}
                        >
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-clientdesk-light px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-clientdesk-gray">
              Showing {data.numberOfElements} of {data.totalElements} invoices
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.first || isFetching}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>

              <span className="px-2 text-sm text-clientdesk-gray">
                Page {data.number + 1} of {data.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={data.last || isFetching}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
