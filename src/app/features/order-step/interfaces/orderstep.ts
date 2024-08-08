import { Address } from "../../address/interfaces/address";
import { Order } from "../../order/interfaces/order";
import { Product } from "../../product/interfaces/product";
import { Status } from "../../status/interfaces/status";
import { TourStep } from "../../tour-step/interfaces/tourstep";
import { Unit } from "../../unit/interfaces/unit";

export interface OrderStep {
  "@id"?: string;
  id?: number;
  type?: string;
  position?: number;
  description?: string;
  quantity?: string;
  createdAt?: Date;
  updatedAt?: Date;
  scheduledArrival?: Date;
  scheduledDeparture?: Date;
  address?: Address;
  _order?: string;
  tourStep?: TourStep;
  status?: Status;
  product?: Product;
  unit?: Unit;
  order?: Order;
}
