export interface Shipment {
  shipment_id: number;
  date_posted?: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  notes?: string;
  estimated_pickup?: string;
  actual_pickup?: string;
  estimated_delivery?: string;
  date_delivered?: string;
  date_cancelled?: string;
  status: string;
  booked_date: string;
  cancel_reason: string;
  origin: string;
  origin_address: Address;
  destination_address: Address;
  blackout_dates?: BlackoutDate[];
  customer?: Customer;
}

export interface Address {
  stop_id: number;
  street_line_1: string;
  street_line_2: string;
  city: string;
  state: string;
  zipcode: string;
  to_string: string;
}

export interface BlackoutDate {
  start: string;
  stop: string;
  to_string: string;
}

export interface Customer {
  customer_id: number;
  name: string;
  phone: string;
  email: string;
}

export enum ShipmentStatus {
  Tendered = 'posted',
  Booked = 'booked',
  InTransit = 'in transit',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
}
