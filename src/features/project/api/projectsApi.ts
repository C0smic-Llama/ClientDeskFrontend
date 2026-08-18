import api from "@/lib/axios";

import type {
  Project,
  ProjectPage,
  ProjectRequest,
  ProjectStatus,
} from "../types/project.types";

/**
 * Create a new project
 */
export async function createProject(
  data: ProjectRequest,
): Promise<Project> {
  const response = await api.post<Project>(
    "/projects",
    data,
  );

  return response.data;
}

/**
 * Get a project by ID
 */
export async function getProjectById(
  projectId: number,
): Promise<Project> {
  const response = await api.get<Project>(
    `/projects/${projectId}`,
  );

  return response.data;
}

/**
 * Get paginated projects
 */
export async function getProjects(
  page = 0,
  size = 10,
  sort = "projectName,asc",
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>(
    "/projects",
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Update an existing project
 */
export async function updateProject(
  projectId: number,
  data: ProjectRequest,
): Promise<Project> {
  const response = await api.put<Project>(
    `/projects/${projectId}`,
    data,
  );

  return response.data;
}

/**
 * Delete a project
 */
export async function deleteProject(
  projectId: number,
): Promise<void> {
  await api.delete(`/projects/${projectId}`);
}

/**
 * Search projects
 */
export async function searchProjects(
  keyword: string,
  page = 0,
  size = 10,
  sort = "projectName,asc",
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>(
    "/projects/search",
    {
      params: {
        keyword,
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(
  status: ProjectStatus,
  page = 0,
  size = 10,
  sort = "projectName,asc",
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>(
    "/projects/status",
    {
      params: {
        status,
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Get projects belonging to a client
 */
export async function getProjectsByClient(
  clientId: number,
  page = 0,
  size = 10,
  sort = "projectName,asc",
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>(
    `/projects/client/${clientId}`,
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Get projects assigned to a user
 */
export async function getProjectsByUser(
  userId: number,
  page = 0,
  size = 10,
  sort = "projectName,asc",
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>(
    `/projects/user/${userId}`,
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}