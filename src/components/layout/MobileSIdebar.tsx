import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  navigationItems,
  secondaryNavigationItems,
} from "./navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-clientdesk-light px-6 py-4">
          <SheetTitle className="text-left text-2xl font-bold">
            ClientDesk
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-4 py-3",
                    "font-sidebar text-base font-medium",
                    "transition-colors",
                    isActive
                      ? "bg-clientdesk-red text-white"
                      : "text-clientdesk-gray hover:bg-clientdesk-light/50 hover:text-black",
                  ].join(" ")
                }
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="my-3 border-t border-clientdesk-light" />

          {secondaryNavigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-4 py-3",
                    "font-sidebar text-base font-medium",
                    "transition-colors",
                    isActive
                      ? "bg-clientdesk-red text-white"
                      : "text-clientdesk-gray hover:bg-clientdesk-light/50 hover:text-black",
                  ].join(" ")
                }
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}