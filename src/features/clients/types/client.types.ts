export type ClientStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface Client {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  contactNumber: string;
  status: ClientStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  contactNumber: string;
  status?: ClientStatus;
  address: string;
}

export interface ClientPage {
  content: Client[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}