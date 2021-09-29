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
}
