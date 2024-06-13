export interface Address {
  "@id"?: string;
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
