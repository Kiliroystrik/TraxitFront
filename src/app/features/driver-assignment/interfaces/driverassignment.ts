export interface DriverAssignment {
  "@id"?: string;
  id?: number;
  role?: any;
  startDate?: Date;
  endDate?: Date;
  drivingSegments?: string[];
  tour?: string;
  driver?: string;
}
