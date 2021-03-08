import { GQLTypes } from '@vroom-web/networking';

export interface UploadedDocumentsProps {
  documents: Array<GQLTypes.DocumentMetadata>;
  showInsuranceDisclaimer: boolean;
}

enum FileType {
  DRIVERS_LICENSE_FRONT = 'drivers-license-front',
  DRIVERS_LICENSE_BACK = 'drivers-license-back',
  INSURANCE = 'insurance',
  FRONT_OF_CO_BUYER_ID = 'front-of-co-buyer-id',
  BACK_OF_CO_BUYER_ID = 'back-of-co-buyer-id',
  FRONT_OF_TRADE_TITLE = 'front-of-trade-title',
  BACK_OF_TRADE_TITLE = 'back-of-trade-title',
  PHOTO_OF_TRADE_ODOMETER = 'photo-of-trade-odometer',
  PROOF_OF_TRADE_ODOMETER = 'proof-of-trade-odometer',
  PROOF_OF_INCOME_1 = 'proof-of-income-1',
  PROOF_OF_INCOME_2 = 'proof-of-income-2',
  PROOF_OF_INCOME_3 = 'proof-of-income-3',
  PROOF_OF_PHONE = 'proof-of-phone',
  PROOF_OF_RESIDENCE = 'proof-of-residence',
  REFERENCES = 'references',
  VEHICLE_REGISTRATION = 'vehicle-registration',
}

const fileTypeNameMap: Record<string, string> = {
  [FileType.DRIVERS_LICENSE_FRONT]: 'Front of Driver License',
  [FileType.DRIVERS_LICENSE_BACK]: 'Back of Driver License',
  [FileType.INSURANCE]: 'Insurance Card',
  [FileType.FRONT_OF_CO_BUYER_ID]: 'Front of Co-buyer ID',
  [FileType.BACK_OF_CO_BUYER_ID]: 'Back of Co-buyer ID',
  [FileType.FRONT_OF_TRADE_TITLE]: 'Front of Trade Title',
  [FileType.BACK_OF_TRADE_TITLE]: 'Back of Trade Title',
  [FileType.PHOTO_OF_TRADE_ODOMETER]: 'Photo of Trade Odometer',
  [FileType.PROOF_OF_TRADE_ODOMETER]: 'Proof of Trade Odometer',
  [FileType.PROOF_OF_INCOME_1]: 'Proof of Income 1',
  [FileType.PROOF_OF_INCOME_2]: 'Proof of Income 2',
  [FileType.PROOF_OF_INCOME_3]: 'Proof of Income 3',
  [FileType.PROOF_OF_PHONE]: 'Proof of Phone',
  [FileType.PROOF_OF_RESIDENCE]: 'Proof of Residence',
  [FileType.REFERENCES]: 'References',
  [FileType.VEHICLE_REGISTRATION]: 'Vehicle Registration',
};

class ViewModel {
  readonly title = 'Uploaded documents';
  readonly disclaimer = `I don't have a car insurance available at this time. I understand that the insurance will be needed to complete the transaction.`;
  documents: Array<GQLTypes.DocumentMetadata>;
  showInsuranceDisclaimer: boolean;

  constructor(
    documents: Array<GQLTypes.DocumentMetadata>,
    showInsuranceDisclaimer: boolean
  ) {
    this.documents = documents;
    this.showInsuranceDisclaimer = showInsuranceDisclaimer;
  }

  getFileName = (file: string): string => fileTypeNameMap[file] ?? file;
}

export default ViewModel;
