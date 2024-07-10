export interface Order {
  "@id"?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  company?: string;
  client?: string;
  orderSteps?: string[];
}
