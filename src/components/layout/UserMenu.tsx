import { ChevronDown, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";

export function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="flex items-center gap-2" />}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-clientdesk-red text-sm font-semibold text-white">
          {user?.firstName?.charAt(0)}
        </div>

        <span className="hidden sm:inline">{user?.firstName}</span>
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
