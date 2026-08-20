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

import { useDeleteProjectService } from "../hooks/useDeleteProjectService";

interface DeleteProjectServiceDialogProps {
  projectServiceId: number;
  serviceName: string;
}

export function DeleteProjectServiceDialog({
  projectServiceId,
  serviceName,
}: DeleteProjectServiceDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteProjectService = useDeleteProjectService();

  const handleDelete = () => {
    deleteProjectService.mutate(projectServiceId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            title="Remove service"
            aria-label={`Remove ${serviceName}`}
          />
        }
      >
        <Trash2 className="size-4 text-clientdesk-red" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove service?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-medium text-foreground">{serviceName}</span>{" "}
            from this project? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteProjectService.isError && (
          <p className="text-sm text-clientdesk-red">
            {deleteProjectService.error instanceof Error
              ? deleteProjectService.error.message
              : "Failed to remove service."}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteProjectService.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteProjectService.isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="bg-clientdesk-red hover:bg-clientdesk-red/90"
          >
            {deleteProjectService.isPending ? "Removing..." : "Remove Service"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
