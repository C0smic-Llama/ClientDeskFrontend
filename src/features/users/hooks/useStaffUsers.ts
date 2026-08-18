import { useQuery } from "@tanstack/react-query";

import { getUsersByRole } from "../api/usersApi";

export function useStaffUsers() {
  return useQuery({
    queryKey: ["users", "staff"],

    queryFn: () =>
      getUsersByRole(
        "STAFF",
        0,
        100,
        "firstName,asc",
      ),
  });
}