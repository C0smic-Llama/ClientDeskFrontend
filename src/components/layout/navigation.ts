import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BriefcaseBusiness,
  PackageCheck,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react";
import type { ElementType } from "react";
import type { UserRole } from "@/features/auth/types/auth.types";



export interface NavigationItem {
  label: string;
  href: string;
  icon: ElementType;
  roles?: UserRole[];
}
export const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Services",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Deliverables",
    href: "/deliverables",
    icon: PackageCheck,
  },
  {
    label: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
];

export const secondaryNavigationItems: NavigationItem[] = [
  {
    label: "Users",
    href: "/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];