export interface Driver {
  "@id"?: string;
  id?: number;
  licenceNumber?: string;
  licenceExpiration?: Date;
  tourTypes?: string[];
  card?: string;
  driverAssignments?: string[];
  available?: boolean;
  email?: string;
  roles?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstname?: string;
  lastname?: string;
  company?: string;
  readonly userIdentifier?: string;
}
