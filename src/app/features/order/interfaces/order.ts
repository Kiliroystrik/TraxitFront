import { Client } from "../../client/interfaces/client";
import { Company } from "../../company/interfaces/company";
import { OrderStep } from "../../order-step/interfaces/orderstep";

export interface Order {
  "@id"?: string;
  id?: number;
  serialNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: Company;
  client?: Client;
  orderSteps?: OrderStep[];
}
