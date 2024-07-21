import { Client } from "../../client/interfaces/client";
import { Company } from "../../company/interfaces/company";

export interface Order {
  "@id"?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  company?: Company;
  client?: Client;
  orderSteps?: string[];
}
