import { Address } from "../../address/interfaces/address";
import { Company } from "../../company/interfaces/company";
import { Order } from "../../order/interfaces/order";

export interface Client {
  "@id"?: string;
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: Company;
  address?: Address;
  orders?: Order[];
}
