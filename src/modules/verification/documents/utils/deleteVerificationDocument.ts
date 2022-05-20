import { isErrorResponse } from '@vroom-web/networking';

import {
  DocumentFileType,
  fileTypeVerificationFieldMap,
} from './uploadVerificationDocument';

import {
  deleteVerificationFile,
  updateVerification,
} from 'src/networking/request';

class VerificationDocumentDeleteError extends Error {
  constructor(message = 'Failed to delete verification document') {
    super(message);
    this.name = 'VerificationDocumentDeleteError';
  }
}

export const deleteVerificationDocument = async (
  fileId: string,
  priceId: string,
  fileType: DocumentFileType
): Promise<string> => {
  const deleteResponse = await deleteVerificationFile(fileId);
  if (isErrorResponse(deleteResponse))
    throw new VerificationDocumentDeleteError();

  const verificationKey = fileTypeVerificationFieldMap[fileType];
  if (!verificationKey) throw new VerificationDocumentDeleteError();
  const updateVerificationResponse = await updateVerification(
    {
      [verificationKey]: '',
    },
    priceId
  );
  if (isErrorResponse(updateVerificationResponse))
    throw new VerificationDocumentDeleteError();

  return verificationKey;
};
