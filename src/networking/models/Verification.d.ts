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

export interface PatchReviewData {
  ownerInfo: OwnerInfo | undefined;
  pickupInfo: PickupInfo | undefined;
  payoffInfo: PayoffInfo | undefined;
  documents: DocumentInfo[] | [] | undefined;
  exactMileage: number | undefined;
  formState: number;
  // eslint-disable-next-line @typescript-eslint/camelcase
  offer_id: string | undefined;
}
