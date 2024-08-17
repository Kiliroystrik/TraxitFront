export interface Address {
  "@id"?: string;
  id?: number;
  street?: string;
  city?: string;
  zipCode?: string;
  stateProvince?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  company?: string;
  clients?: string[];
  orderSteps?: string[];
}
