export interface Tour {
  "@id"?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  endDate?: Date;
  company?: string;
  tourSteps?: string[];
  driverAssignments?: string[];
  vehicleAssignment?: string[];
}
