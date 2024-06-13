export interface DriverAssignment {
  "@id"?: string;
  role?: any;
  startDate?: Date;
  endDate?: Date;
  drivingSegments?: string[];
  tour?: string;
  driver?: string;
}
