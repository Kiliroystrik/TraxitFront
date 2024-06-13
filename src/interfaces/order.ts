export interface Order {
  "@id"?: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: string;
  client?: string;
  orderSteps?: string[];
}
