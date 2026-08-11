import { Bell } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";

import { Button } from "@/components/ui/button";

import { UserMenu } from "./UserMenu";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-clientdesk-light bg-white px-4 sm:px-6">
  <div className="flex items-center gap-3">
    <MobileSidebar />

    <div>
      <p className="text-sm text-clientdesk-gray">
        Welcome back
      </p>
    </div>
  </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="size-5" />

          <span className="absolute right-2 top-2 size-2 rounded-full bg-clientdesk-red" />
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}