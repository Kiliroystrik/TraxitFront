export interface OrderStep {
  "@id"?: string;
  type?: string;
  description?: string;
  quantity?: string;
  createdAt?: Date;
  updatedAt?: Date;
  scheduledArrival?: Date;
  scheduledDeparture?: Date;
  address?: string;
  _order?: string;
  tourStep?: string;
  status?: string;
  product?: string;
  unit?: string;
  order?: string;
}
