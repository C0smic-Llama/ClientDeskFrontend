import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeleteClient } from "../hooks/useDeleteClient";

interface DeleteClientDialogProps {
  clientId: number;
  companyName: string;
  onDeleted?: () => void;
}

export function DeleteClientDialog({
  clientId,
  companyName,
  onDeleted,
}: DeleteClientDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteClientMutation = useDeleteClient();

  const handleDelete = async () => {
    try {
      await deleteClientMutation.mutateAsync(clientId);

      setOpen(false);

      onDeleted?.();
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            title="Delete client"
            className="text-clientdesk-red hover:bg-red-50 hover:text-clientdesk-red"
            aria-label={`Delete ${companyName}`}
          />
        }
      >
        <Trash2 className="size-4" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete client?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{companyName}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteClientMutation.isError && (
          <p role="alert" className="text-sm text-clientdesk-red">
            Failed to delete the client. Please try again.
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteClientMutation.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            disabled={deleteClientMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteClientMutation.isPending ? "Deleting..." : "Delete Client"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
