export type ProjectStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface UserEssential {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Project {
  id: number;
  projectName: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  quota: number;
  notes: string | null;
  clientId: number;
  clientName: string;
  assignedUsers: UserEssential[];
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRequest {
  projectName: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  quota: number;
  notes?: string;
  clientId: number;
  assignedUserIds: number[];
}

export interface ProjectPage {
  content: Project[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}