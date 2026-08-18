export interface ProjectService {
  id: number;

  projectId: number;
  projectName: string;

  serviceCatalogueId: number;
  serviceName: string;

  quantity: number;

  agreedPrice: number;

  discount: number | null;

  total: number;

  lineTotal: number;

  remarks: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface ProjectServiceRequest {
  projectId: number;

  serviceCatalogueId: number;

  quantity: number;

  agreedPrice: number;

  discount?: number;

  remarks?: string;
}

export interface ProjectServicePage {
  content: ProjectService[];

  totalElements: number;

  totalPages: number;

  size: number;

  number: number;

  first: boolean;

  last: boolean;

  numberOfElements: number;

  empty: boolean;
}