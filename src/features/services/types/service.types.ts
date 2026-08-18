export type ServiceCategory =
  | "PRODUCTION"
  | "EDITING"
  | "DESIGN"
  | "BRANDING"
  | "DIGITAL_MARKETING"
  | "WEB_DEVELOPMENT"
  | "PHOTOGRAPHY"
  | "CONTENT_WRITING"
  | "OTHER";

export interface Service {
  id: number;
  serviceName: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRequest {
  serviceName: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
}

export interface ServicePage {
  content: Service[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}