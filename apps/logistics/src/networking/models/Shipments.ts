export interface Shipment {
  vin: string;
  yearMakeModel: string;
  posted: string;
  origin: string;
  destination: string;
  blackoutDates: string[];
  notes: string;
  pickedUp: boolean;
}
