import api from "@/lib/axios";

import type {
  ProjectService,
  ProjectServicePage,
  ProjectServiceRequest,
} from "../types/project-service.types";

/**
 * Assign a service to a project
 */
export async function assignServiceToProject(
  data: ProjectServiceRequest,
): Promise<ProjectService> {
  const response = await api.post<ProjectService>(
    "/project-services",
    data,
  );

  return response.data;
}

/**
 * Update a project service
 */
export async function updateProjectService(
  projectServiceId: number,
  data: ProjectServiceRequest,
): Promise<ProjectService> {
  const response = await api.put<ProjectService>(
    `/project-services/${projectServiceId}`,
    data,
  );

  return response.data;
}

/**
 * Remove a service from a project
 */
export async function deleteProjectService(
  projectServiceId: number,
): Promise<void> {
  await api.delete(
    `/project-services/${projectServiceId}`,
  );
}

/**
 * Get a project service by ID
 */
export async function getProjectServiceById(
  projectServiceId: number,
): Promise<ProjectService> {
  const response =
    await api.get<ProjectService>(
      `/project-services/${projectServiceId}`,
    );

  return response.data;
}

/**
 * Get all services assigned to a project
 */
export async function getProjectServicesByProject(
  projectId: number,
  page = 0,
  size = 10,
  sort = "serviceName,asc",
): Promise<ProjectServicePage> {
  const response =
    await api.get<ProjectServicePage>(
      `/project-services/project/${projectId}`,
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
 * Get all projects using a particular service
 */
export async function getProjectsByService(
  serviceCatalogueId: number,
  page = 0,
  size = 10,
  sort = "projectName,asc",
): Promise<ProjectServicePage> {
  const response =
    await api.get<ProjectServicePage>(
      `/project-services/service/${serviceCatalogueId}`,
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