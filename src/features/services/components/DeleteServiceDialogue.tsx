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

import { useDeleteService } from "../hooks/useDeleteService";

interface DeleteServiceDialogProps {
  serviceId: number;
  serviceName: string;
  onDeleted?: () => void;
}

export function DeleteServiceDialog({
  serviceId,
  serviceName,
  onDeleted,
}: DeleteServiceDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteService = useDeleteService();

  const handleDelete = () => {
    deleteService.mutate(serviceId, {
      onSuccess: () => {
        setOpen(false);
        onDeleted?.();
      },
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Delete service"
          aria-label={`Delete ${serviceName}`}
        >
          <Trash2 className="size-4 text-clientdesk-red" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete service?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {serviceName}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteService.isError && (
          <p className="text-sm text-clientdesk-red">
            {deleteService.error instanceof Error
              ? deleteService.error.message
              : "Failed to delete service."}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteService.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteService.isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="bg-clientdesk-red hover:bg-clientdesk-red/90"
          >
            {deleteService.isPending
              ? "Deleting..."
              : "Delete Service"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}