import { NavLink } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";
import type { UserRole } from "@/features/auth/types/auth.types";

import {
  navigationItems,
  secondaryNavigationItems,
  type NavigationItem,
} from "./navigation";

export function Sidebar() {
  const { user } = useAuth();

  const canAccess = (
    item: NavigationItem,
    role?: UserRole,
  ) => {
    if (!item.roles) return true;
    if (!role) return false;

    return item.roles.includes(role);
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-clientdesk-light bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-clientdesk-light px-6">
        <span className="text-2xl font-bold tracking-tight">
          ClientDesk
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigationItems
          .filter((item) => canAccess(item, user?.role))
          .map((item) => {
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

      {/* Secondary Navigation */}
      <div className="border-t border-clientdesk-light p-4">
        {secondaryNavigationItems
          .filter((item) => canAccess(item, user?.role))
          .map((item) => {
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
      </div>
    </aside>
  );
}