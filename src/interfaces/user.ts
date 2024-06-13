export interface User {
  "@id"?: string;
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
