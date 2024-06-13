export interface VehicleAssignment {
  "@id"?: string;
  startDate?: Date;
  endDate?: Date;
  drivingSegments?: string[];
  tour?: string;
  vehicle?: string;
}
