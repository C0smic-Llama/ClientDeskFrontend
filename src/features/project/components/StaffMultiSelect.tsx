import type { UserResponse } from "@/features/users/types/user.types";

interface StaffMultiSelectProps {
  users: UserResponse[];
  selectedUserIds: number[];
  onChange: (userIds: number[]) => void;
  disabled?: boolean;
}

export function StaffMultiSelect({
  users,
  selectedUserIds,
  onChange,
  disabled = false,
}: StaffMultiSelectProps) {
  const handleToggle = (userId: number) => {
    if (selectedUserIds.includes(userId)) {
      onChange(
        selectedUserIds.filter(
          (id) => id !== userId,
        ),
      );
    } else {
      onChange([
        ...selectedUserIds,
        userId,
      ]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="rounded-md border border-clientdesk-light bg-white">
        {users.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-clientdesk-gray">
              No staff members found.
            </p>
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {users.map((user) => {
              const selected =
                selectedUserIds.includes(user.id);

              return (
                <label
                  key={user.id}
                  className={[
                    "flex cursor-pointer items-center gap-3",
                    "border-b border-clientdesk-light px-4 py-3",
                    "last:border-0",
                    "hover:bg-clientdesk-light/20",
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : "",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    disabled={disabled || !user.active}
                    onChange={() =>
                      handleToggle(user.id)
                    }
                    className="size-4 rounded border-gray-300"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {user.firstName}{" "}
                      {user.lastName}
                    </p>

                    <p className="text-xs text-clientdesk-gray">
                      {user.role}
                    </p>
                  </div>

                  {!user.active && (
                    <span className="text-xs text-clientdesk-gray">
                      Inactive
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-clientdesk-gray">
        {selectedUserIds.length} staff member
        {selectedUserIds.length === 1
          ? ""
          : "s"} selected
      </p>
    </div>
  );
}