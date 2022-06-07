import { isErrorResponse } from '@vroom-web/networking';
import { ActualFileObject } from 'filepond';

import { Verification } from 'src/networking/models/Price';
import {
  getVerificationFileUploadUrl,
  updateVerification,
  uploadVerificationFile,
} from 'src/networking/request';

class VerificationDocumentUploadError extends Error {
  constructor(message = 'Failed to upload verification document') {
    super(message);
    this.name = 'VerificationDocumentUploadError';
  }
}

export enum DocumentFileType {
  CO_BUYER_FRONT = 'second-drivers-license-front',
  CO_BUYER_BACK = 'second-drivers-license-back',
  DRIVERS_LICENSE_FRONT = 'drivers-license-front',
  DRIVERS_LICENSE_BACK = 'drivers-license-back',
  TRADE_TITLE_FRONT = 'title-information-front',
  TRADE_TITLE_BACK = 'title-information-back',
  TRADE_ODOMETER = 'odometer-information',
  LETTER = 'lien-release-letter',
  VEHICLE_REGISTRATION = 'registration',
}

export const fileTypeVerificationFieldMap: Record<
  DocumentFileType,
  keyof Verification
> = {
  [DocumentFileType.CO_BUYER_FRONT]:
    'second_owner_front_of_driver_license_file_id',
  [DocumentFileType.CO_BUYER_BACK]:
    'second_owner_back_of_driver_license_file_id',
  [DocumentFileType.DRIVERS_LICENSE_FRONT]: 'front_of_driver_license_file_id',
  [DocumentFileType.DRIVERS_LICENSE_BACK]: 'back_of_driver_license_file_id',
  [DocumentFileType.TRADE_TITLE_FRONT]: 'front_of_title_lien_file_id',
  [DocumentFileType.TRADE_TITLE_BACK]: 'back_of_title_lien_file_id',
  [DocumentFileType.TRADE_ODOMETER]: 'mileage_file_id',
  [DocumentFileType.LETTER]: 'lien_release_letter_file_id',
  [DocumentFileType.VEHICLE_REGISTRATION]: 'current_registration_file_id',
};

export const uploadVerificationDocument = async (
  file: ActualFileObject,
  fileType: DocumentFileType,
  priceId: string
): Promise<{
  verificationKey: keyof Verification;
  fileId: string;
}> => {
  const verificationUrl = await getVerificationFileUploadUrl(priceId, {
    file_extension: file.name.split('.').pop() || '',
    file_type: fileType,
    original_file_name: `"${file.name}"`,
  });
  if (isErrorResponse(verificationUrl))
    throw new VerificationDocumentUploadError();

  const uploadFileResponse = await uploadVerificationFile(
    verificationUrl.data.data.FileUploadURL,
    file
  );
  if (isErrorResponse(uploadFileResponse))
    throw new VerificationDocumentUploadError();

  const verificationKey = fileTypeVerificationFieldMap[fileType];
  if (!verificationKey) throw new VerificationDocumentUploadError();
  const updateVerificationResponse = await updateVerification(
    {
      [verificationKey]: verificationUrl.data.data.id,
    },
    priceId
  );
  if (isErrorResponse(updateVerificationResponse))
    throw new VerificationDocumentUploadError();

  return {
    verificationKey,
    fileId: verificationUrl.data.data.id,
  };
};
