export interface Company {
  "@id"?: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: string[];
  tours?: string[];
  vehicles?: string[];
  brands?: string[];
  orders?: string[];
  statuses?: string[];
  clients?: string[];
  addresses?: string[];
  serviceTypes?: string[];
}
