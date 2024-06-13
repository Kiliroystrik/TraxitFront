export interface TourStep {
  "@id"?: string;
  actualDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  actualArrival?: Date;
  actualDeparture?: Date;
  stepNumber?: number;
  orderStep?: string;
  tour?: string;
}
