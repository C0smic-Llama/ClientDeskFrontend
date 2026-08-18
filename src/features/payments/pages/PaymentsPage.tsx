import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Plus, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { usePayments } from "../hooks/usePayments";
import { useDeletePayment } from "../hooks/useDeletePayment";

export default function PaymentsPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [paymentToDelete, setPaymentToDelete] = useState<number | null>(null);

  const pageSize = 10;

  const { data, isLoading, isError } = usePayments({
    page,
    size: 10,
    sort: "paymentDate,desc",
  });

  const deletePaymentMutation = useDeletePayment();

  const payments = data?.content ?? [];

  const formatAmount = (amount: number) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleDelete = () => {
    if (paymentToDelete === null) {
      return;
    }

    deletePaymentMutation.mutate(paymentToDelete, {
      onSuccess: () => {
        setPaymentToDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading payments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load payments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Payments</h1>

          <p className="text-sm text-muted-foreground">
            Manage and track client payments
          </p>
        </div>

        <Button asChild>
          <Link to="/payments/create">
            <Plus className="mr-2 size-4" />
            Record Payment
          </Link>
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt No.</TableHead>

                  <TableHead>Invoice</TableHead>

                  <TableHead>Client</TableHead>

                  <TableHead>Project</TableHead>

                  <TableHead>Amount</TableHead>

                  <TableHead>Date</TableHead>

                  <TableHead>Method</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No payments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      {/* Receipt */}
                      <TableCell className="font-medium">
                        {payment.receiptNumber}
                      </TableCell>

                      {/* Invoice */}
                      <TableCell>
                        <Link
                          to={`/invoices/${payment.invoiceId}`}
                          className="text-primary hover:underline"
                        >
                          {payment.invoiceNumber}
                        </Link>
                      </TableCell>

                      {/* Client */}
                      <TableCell>{payment.clientName}</TableCell>

                      {/* Project */}
                      <TableCell>{payment.projectName}</TableCell>

                      {/* Amount */}
                      <TableCell>₹{formatAmount(payment.amount)}</TableCell>

                      {/* Date */}
                      <TableCell>{payment.paymentDate}</TableCell>

                      {/* Payment method */}
                      <TableCell>{payment.paymentMethod}</TableCell>

                      {/* Status */}
                      <TableCell>
                        <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                          {payment.status}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          {/* View */}
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            title="View payment"
                          >
                            <Link
                              to={`/payments/${payment.id}`}
                              aria-label={`View ${payment.receiptNumber}`}
                            >
                              <Eye className="size-4" />
                            </Link>
                          </Button>

                          {/* Edit */}
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            title="Edit payment"
                          >
                            <Link
                              to={`/payments/${payment.id}/edit`}
                              aria-label={`Edit ${payment.receiptNumber}`}
                            >
                              <Edit className="size-4" />
                            </Link>
                          </Button>

                          {/* Delete */}
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete payment"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setPaymentToDelete(payment.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {page + 1} of {data?.totalPages ?? 1}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 0 || !data || data.first}
                onClick={() => setPage((current) => Math.max(current - 1, 0))}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                disabled={!data || data.last}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation */}
      <AlertDialog
        open={paymentToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPaymentToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete payment?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. Deleting this payment will also
              recalculate the invoice's payment balance and status.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deletePaymentMutation.isPending}
            >
              {deletePaymentMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
