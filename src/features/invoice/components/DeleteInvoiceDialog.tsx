import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDeleteInvoice } from "../hooks/useDeleteInvoice";

interface DeleteInvoiceDialogProps {
  invoiceId: number;
  invoiceNumber: string;
  onDeleted?: () => void;
}

export function DeleteInvoiceDialog({
  invoiceId,
  invoiceNumber,
  onDeleted,
}: DeleteInvoiceDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteInvoice = useDeleteInvoice();

  const handleDelete = () => {
    deleteInvoice.mutate(invoiceId, {
      onSuccess: () => {
        setOpen(false);
        onDeleted?.();
      },
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        title="Delete invoice"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${invoiceNumber}`}
      >
        <Trash2 className="size-4 text-clientdesk-red" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">
              Delete Invoice
            </h2>

            <p className="mt-2 text-sm text-clientdesk-gray">
              Are you sure you want to delete invoice{" "}
              <span className="font-medium text-gray-900">
                {invoiceNumber}
              </span>
              ? This action cannot be undone.
            </p>

            {deleteInvoice.isError && (
              <p className="mt-3 text-sm text-clientdesk-red">
                Failed to delete the invoice. Please try again.
              </p>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={deleteInvoice.isPending}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteInvoice.isPending}
              >
                {deleteInvoice.isPending
                  ? "Deleting..."
                  : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}