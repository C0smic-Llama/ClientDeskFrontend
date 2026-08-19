import { useNavigate, useParams } from "react-router-dom";

import UserForm from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";
import type { UserUpdateRequest } from "../types/user.types";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/usersApi";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const userId = Number(id);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !Number.isNaN(userId),
  });

  const {
    updateUser,
    isUpdating,
  } = useUsers();

  const handleSubmit = async (
    data: UserUpdateRequest,
  ) => {
    await updateUser({
      id: userId,
      data,
    });

    navigate("/users");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          Loading user...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6">
        <p className="text-sm text-destructive">
          Unable to load user.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Edit User
        </h1>

        <p className="text-sm text-muted-foreground">
          Update the user's account details.
        </p>
      </div>

      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        submitLabel="Save Changes"
      />
    </div>
  );
}