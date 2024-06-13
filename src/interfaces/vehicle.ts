export interface Vehicle {
  "@id"?: string;
  registrationNumber?: string;
  mileage?: string;
  registeredAt?: Date;
  company?: string;
  vehicleAssignments?: string[];
  model?: string;
  fuelTypes?: string[];
  services?: string[];
  available?: boolean;
}
