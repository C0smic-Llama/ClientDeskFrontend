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

import { useDeleteProject } from "../hooks/useDeleteProject";

interface DeleteProjectDialogProps {
  projectId: number;
  projectName: string;
  onDeleted?: () => void;
}

export function DeleteProjectDialog({
  projectId,
  projectName,
  onDeleted,
}: DeleteProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteProject = useDeleteProject();

  const handleDelete = () => {
    deleteProject.mutate(projectId, {
      onSuccess: () => {
        setOpen(false);
        onDeleted?.();
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
            title="Delete project"
            aria-label={`Delete ${projectName}`}
          />
        }
      >
        <Trash2 className="size-4 text-clientdesk-red" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{projectName}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteProject.isError && (
          <p className="text-sm text-clientdesk-red">
            {deleteProject.error instanceof Error
              ? deleteProject.error.message
              : "Failed to delete project."}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteProject.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteProject.isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="bg-clientdesk-red hover:bg-clientdesk-red/90"
          >
            {deleteProject.isPending ? "Deleting..." : "Delete Project"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
