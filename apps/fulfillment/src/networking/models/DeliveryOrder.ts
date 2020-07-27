export interface Vehicle {
  id: number;
  vin: string;
  year: number;
  make: string;
  model: string;
}

export interface Address {
  id: number;
  name?: string;
  street_line_1: string;
  street_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
}

export interface Summary {
  id: number;
  vehicle: Vehicle;
  readyToShip: string;
  typeOfOrder: string;
  currentLocation: string;
  journeyType: string;
}

export interface Details {
  id: number;
  vehicle: Vehicle;
  transitType: string;
  enclosed: boolean;
  orderStatus: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  recommendedDeliveryLocation: string;
  reasonCode?: string;
  created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
}
