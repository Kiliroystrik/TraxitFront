export interface Client {
  "@id"?: string;
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: string;
  address?: string;
  orders?: string[];
}
