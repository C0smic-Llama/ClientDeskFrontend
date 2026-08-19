import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";
import type { UserRequest } from "../types/user.types";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const {
    createUser,
    isCreating,
  } = useUsers();

  const handleSubmit = async (
    data: UserRequest,
  ) => {
    await createUser(data);

    navigate("/users");
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Add User
        </h1>

        <p className="text-sm text-muted-foreground">
          Create a new user account.
        </p>
      </div>

      <UserForm
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        submitLabel="Create User"
      />
    </div>
  );
}