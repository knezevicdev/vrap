export interface DeliveryOrder {
  vin: string;
  year: number;
  make: string;
  model: string;
  readyToShip: string;
  typeOfOrder: string;
  currentLocation: string;
  journeyType: string;
}
