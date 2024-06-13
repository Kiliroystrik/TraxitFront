export interface Tour {
  "@id"?: string;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  endDate?: Date;
  company?: string;
  tourSteps?: string[];
  driverAssignments?: string[];
  vehicleAssignment?: string[];
}
