export interface Shipment {
  date_posted?: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  origin_address: Address;
  destination_address: Address;
  blackout_dates?: BlackoutDate[];
  notes?: string;
  estimated_arrival?: string;
  estimated_delivery?: string;
  estimated_pickup?: string;
  date_delivered?: string;
  date_cancelled?: string;
}

export interface Address {
  street_line_1: string;
  city: string;
  state: string;
  zip_code: string;
  to_string: string;
}

interface BlackoutDate {
  start: string;
  stop: string;
  to_string: string;
}

export enum ShipmentStatus {
  Tendered = 'posted',
  Booked = 'booked',
  InTransit = 'in transit',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
}
