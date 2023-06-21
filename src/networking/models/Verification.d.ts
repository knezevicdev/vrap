export interface OwnerInfo {
  primaryOwner: string | undefined;
  primaryFirst: string;
  primaryLast: string;
  primaryCity: string;
  primaryState: string;
  primaryZip: string;
  primaryAddress: string;
  primaryApartment: string;
  primaryPhone: string;
  primaryEmail: string;
  secondaryOwner: string | undefined;
  secondaryFirst: string;
  secondaryLast: string;
  secondaryCity: string;
  secondaryState: string;
  secondaryZip: string;
  secondaryAddress: string;
  secondaryApartment: string;
  secondaryPhone: string;
  secondaryEmail: string;
}

export interface PickupInfo {
  primaryPickup: string | undefined;
  pickupCity: string;
  pickupState: string;
  pickupZip: string;
  pickupAddress: string;
  pickupApartment: string;
  poc: string | undefined;
  pocFirst: string;
  pocLast: string;
  pocPhone: string;
}

export interface BankOption {
  label: string;
  value: string;
  phone: string;
}

export interface PayoffInfo {
  currentPayments: string | undefined;
  bankName: BankOption | undefined;
  lienFinancialInstitutionName: string;
  bankPhoneNumber: string;
  loanAccountNumber: string;
  termsCheckbox: boolean;
  whereIsVehicleRegistered: string;
}

export interface DocumentInfo {
  Created: string;
  FileDownloadURL: string;
  FileExtension: string;
  FileSize: number;
  FileType: string;
  OriginalFileName: string;
  ReferenceId: string;
  ThumbnailDownloadURL: string;
  UploadDone: boolean;
  fileExtension: string;
  fileSize: number;
  fileType: string;
  fileURL: string;
  id: string;
  originalFileName: string;
}

export interface DocumentResponse {
  data: DocumentInfo[];
}

interface MailingAddress {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface PatchReview {
  form_state: number;
  offer_id: string | undefined;
  is_owner: boolean | undefined;
  owner_first_name: string | undefined;
  owner_middle_name: string | undefined;
  owner_last_name: string | undefined;
  owner_mailing_address: Partial<MailingAddress> | undefined;
  owner_phone_number: string | undefined;
  owner_email_address: string | undefined;
  owners_on_title: number | undefined;
  second_owner_first_name: string | undefined;
  second_owner_middle_name: string | undefined;
  second_owner_last_name: string | undefined;
  second_owner_mailing_address: Partial<MailingAddress> | undefined;
  second_owner_phone_number: string | undefined;
  second_owner_email_address: string | undefined;
  same_mailing_address: boolean | undefined | null;
  pickup_address: Partial<MailingAddress> | undefined;
  same_contact_as_owner: boolean | undefined | null;
  pickup_contact_first_name: string | undefined;
  pickup_contact_last_name: string | undefined;
  pickup_contact_phone_number: string | undefined;
  pickup_contact_email: string | undefined;
  current_payments: boolean | undefined;
  lien_financial_institution_name: string | undefined;
  financial_institution_phone: string | undefined;
  lien_account_number: string | undefined;
  acknowledgement_of_terms: boolean | undefined;
  exact_mileage: number | undefined;
  last_four_ssn: string | null | undefined;
  loan_state: string | null | undefined;
  mileage_file_id: string | null | undefined;
  front_of_title_lien_file_id: string | null | undefined;
  back_of_title_lien_file_id: string | null | undefined;
  front_of_driver_license_file_id: string | null | undefined;
  back_of_driver_license_file_id: string | null | undefined;
  second_owner_front_of_driver_license_file_id: string | null | undefined;
  second_owner_back_of_driver_license_file_id: string | null | undefined;
  current_registration_file_id: string | null | undefined;
  lien_release_letter_file_id: string | null | undefined;
}

export interface PatchReviewData {
  source: string;
  version: string;
  timestamp: string;
  payload: PatchReview;
}

export interface Lender {
  lenderId: string;
  lenderName: string;
}
