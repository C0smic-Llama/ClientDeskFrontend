import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Search, Trash2, Users } from "lucide-react";

import { useUsers } from "../hooks/useUsers";
import type { UserResponse, UserRole } from "../types/user.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteUserDialog from "../components/DeleteUserDialog";

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState<UserRole | undefined>();
  const [active, setActive] = useState<boolean | undefined>();
  const [userToDelete, setUserToDelete] = useState<UserResponse | null>(null);
  const {
    // your existing values
    deleteUser,
    isDeleting,
  } = useUsers();

  const { users, totalPages, totalElements, isLoading, isFetching } = useUsers({
    page,
    size: 10,
    sort: "firstName,asc",
    keyword,
    role,
    active,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setRole(value === "" ? undefined : (value as UserRole));

    setPage(0);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setActive(value === "" ? undefined : value === "true");

    setPage(0);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>

          <p className="text-sm text-muted-foreground">
            Manage system users and their access.
          </p>
        </div>

        <Button render={<Link to="/users/new" />}>
          <Plus className="mr-2 size-4" />
          Add User
        </Button>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              All Users
            </CardTitle>

            <div className="text-sm text-muted-foreground">
              {totalElements} users
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={keyword}
                onChange={handleSearch}
                placeholder="Search users..."
                className="pl-9"
              />
            </div>

            {/* Role */}
            <select
              value={role ?? ""}
              onChange={handleRoleChange}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="">All roles</option>

              <option value="ADMIN">Admin</option>

              <option value="STAFF">Staff</option>
            </select>

            {/* Status */}
            <select
              value={active === undefined ? "" : String(active)}
              onChange={handleStatusChange}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="">All statuses</option>

              <option value="true">Active</option>

              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-medium">No users found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Name</th>

                      <th className="px-4 py-3 text-left font-medium">Email</th>

                      <th className="px-4 py-3 text-left font-medium">Phone</th>

                      <th className="px-4 py-3 text-left font-medium">Role</th>

                      <th className="px-4 py-3 text-left font-medium">
                        Status
                      </th>

                      <th className="px-4 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-4 py-3 font-medium">
                          {user.firstName} {user.lastName}
                        </td>

                        <td className="px-4 py-3">{user.email}</td>

                        <td className="px-4 py-3">{user.phoneNumber}</td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                            {user.role}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={
                              user.active
                                ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                                : "rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700"
                            }
                          >
                            {user.active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit user"
                              render={
                                <Link
                                  to={`/users/${user.id}/edit`}
                                  aria-label={`Edit ${user.firstName} ${user.lastName}`}
                                />
                              }
                            >
                              <Edit className="size-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              title="Delete user"
                              onClick={() => setUserToDelete(user)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {page + 1} of {Math.max(totalPages, 1)}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0 || isFetching}
                    onClick={() => setPage((current) => current - 1)}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages - 1 || isFetching}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <DeleteUserDialog
                user={userToDelete}
                open={userToDelete !== null}
                onOpenChange={(open) => {
                  if (!open) {
                    setUserToDelete(null);
                  }
                }}
                isDeleting={isDeleting}
                onConfirm={async () => {
                  if (!userToDelete) return;

                  await deleteUser(userToDelete.id);

                  setUserToDelete(null);
                }}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
