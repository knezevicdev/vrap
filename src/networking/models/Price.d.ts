export interface Price {
  automated_appraisal: boolean;
  ID: string;
  Price__c: number;
  Year__c: number;
  Make__c: string;
  Model__c: string;
  Trim__c: string;
  miles: number;
  Good_Until__c: string;
  VIN__c: string;
  offer_id: number;
  created: string;
  offer_status: string;
  user_email: string;
  active: boolean;
  new_offer: boolean | null;
  verification_url: string | null;
  tax_credit_savings: number | null;
  first_name: string;
  last_name: string;
  payment_method: string | null;
  phone: string;
  zipcode: string;
}

export interface Prices {
  data: Price[];
}

export interface Poq {
  account_number: string;
  final_payment: number;
  final_payoff: number;
}

export interface Verification {
  id: number;
  created: string;
  xke_offer_id: number;
  user_id: number;
  form_state: number;
  appraisal_vehicle_id: number;
  is_owner: boolean;
  owner_first_name: string;
  owner_middle_name: string | null;
  owner_last_name: string;
  owner_mailing_address: Partial<{
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zipcode: string;
  }>;
  owner_phone_number: string;
  owner_email_address: string;
  owners_on_title: number;
  second_owner_first_name: string | null;
  second_owner_middle_name: string | null;
  second_owner_last_name: string | null;
  second_owner_mailing_address: Partial<{
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zipcode: string;
  }>;
  second_owner_phone_number: string | null;
  second_owner_email_address: string | null;
  same_mailing_address: boolean | null;
  pickup_address: Partial<{
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zipcode: string;
  }>;
  same_contact_as_owner: boolean | null;
  pickup_contact_first_name: string;
  pickup_contact_last_name: string;
  pickup_contact_phone_number: string;
  pickup_contact_email: string;
  current_payments: boolean;
  lien_financial_institution_name: string;
  lender_id: string;
  lender_name: string;
  loan_state: string | null;
  financial_institution_phone: string;
  lien_account_number: string;
  acknowledgement_of_terms: boolean;
  exact_mileage: number;
  mileage_file_id: string | null;
  front_of_title_lien_file_id: string | null;
  back_of_title_lien_file_id: string | null;
  front_of_driver_license_file_id: string | null;
  back_of_driver_license_file_id: string | null;
  second_owner_front_of_driver_license_file_id: string | null;
  second_owner_back_of_driver_license_file_id: string | null;
  current_registration_file_id: string | null;
  lien_release_letter_file_id: string | null;
  vin: string;
  email: string;
  offer_id: string;
  last_four_ssn: string | null;
  offer_price: number;
  poq: Poq;
}

export interface VerificationRespData {
  data: Verification;
}

export interface PaymentOptionsRespData {
  data: PaymentOption;
}

export interface PaymentOption {
  sf_appraisal_id: string;
  sf_offer_id: string;
  payment_method: string;
  account_number: string | null;
  routing_number: string | null;
}

export interface Caf {
  lienholder_name: string;
  route_one_fields: string[];
  route_one_sfid: string;
  sfapi_name: string;
}

export interface CafRespData {
  data: Caf[];
}
