export interface VehicleAssignment {
  "@id"?: string;
  id?: number;
  startDate?: Date;
  endDate?: Date;
  drivingSegments?: string[];
  tour?: string;
  vehicle?: string;
}
