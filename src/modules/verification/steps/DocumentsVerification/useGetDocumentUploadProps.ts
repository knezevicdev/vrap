import { isErrorResponse } from '@vroom-web/networking';
import { ActualFileObject } from 'filepond';
import { useCallback, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import { Verification } from '../../../../networking/models/Price';
import {
  getVerificationFileUploadUrl,
  updateVerification,
  uploadVerificationFile,
} from '../../../../networking/request';
import { DocumentUploadProps } from '../../components/DocumentUpload';
import { VerificationDocumentKey } from '../../store/documentsVerification';
import useVerificationStore from '../../store/store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import serializeError from 'src/utils/serializeError';

export const documentUploadProps: Record<
  VerificationDocumentKey,
  Pick<DocumentUploadProps, 'label' | 'description' | 'example'>
> = {
  documentDriverLicenseFront: {
    label: 'Front of Primary Owner ID',
    description:
      "Upload the primary owner's government-issued photo ID (such as a driver's license or passport)",
    example: '/appraisal/images/driver-license.jpeg',
  },
  documentDriverLicenseBack: {
    label: 'Back of Primary Owner ID',
    description:
      "Upload the primary owner's government-issued photo ID (such as a driver's license or passport)",
  },
  documentSecondDriverLicenseFront: {
    label: 'Front of Second Owner ID',
    description:
      "Upload the second owner's government-issued photo ID (such as a driver's license or passport)",
    example: '/appraisal/images/driver-license.jpeg',
  },
  documentSecondDriverLicenseBack: {
    label: 'Back of Second Owner ID',
    description:
      "Upload the second owner's government-issued photo ID (such as a driver's license or passport)",
  },
  documentVehicleRegistration: {
    label: 'Vehicle Registration',
    description:
      'Registration must be in your name for us to be able to purchase the vehicle.',
  },
  documentTitleFront: {
    label: 'Front of Title',
    description:
      'Title must be in your name for us to be able to purchase the vehicle.',
  },
  documentTitleBack: {
    label: 'Back of Title',
    description:
      'Title must be in your name for us to be able to purchase the vehicle.',
  },
  documentReleaseLetter: {
    label: 'Release Letter',
    description:
      'If you previously had a lien, please upload a copy of the lien release letter here.',
  },
  documentOdometer: {
    label: 'Photo of Mileage',
    description:
      'Take a picture of your odometer in your vehicle with the engine on so we can validate the mileage and if there are any engine lights on.',
    example: '/appraisal/images/dash.jpg',
  },
};

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

const documentKeyToDocumentFileType: Record<
  VerificationDocumentKey,
  DocumentFileType
> = {
  documentDriverLicenseFront: DocumentFileType.DRIVERS_LICENSE_FRONT,
  documentDriverLicenseBack: DocumentFileType.DRIVERS_LICENSE_BACK,
  documentSecondDriverLicenseFront: DocumentFileType.CO_BUYER_FRONT,
  documentSecondDriverLicenseBack: DocumentFileType.CO_BUYER_BACK,
  documentVehicleRegistration: DocumentFileType.VEHICLE_REGISTRATION,
  documentTitleFront: DocumentFileType.TRADE_TITLE_FRONT,
  documentTitleBack: DocumentFileType.TRADE_TITLE_BACK,
  documentReleaseLetter: DocumentFileType.LETTER,
  documentOdometer: DocumentFileType.TRADE_ODOMETER,
};

class VerificationDocumentUploadError extends Error {
  constructor(message = 'Failed to upload verification document') {
    super(message);
    this.name = 'VerificationDocumentUploadError';
  }
}

const fileTypeVerificationFieldMap: Record<
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
    original_file_name: encodeURIComponent(file.name),
  });
  if (isErrorResponse(verificationUrl)) throw verificationUrl.error;

  const uploadFileResponse = await uploadVerificationFile(
    verificationUrl.data.data.FileUploadURL,
    file
  );
  if (isErrorResponse(uploadFileResponse)) throw uploadFileResponse;

  const verificationKey = fileTypeVerificationFieldMap[fileType];
  if (!verificationKey)
    throw new VerificationDocumentUploadError(
      `Unknown document file type ${fileType}`
    );
  const updateVerificationResponse = await updateVerification(
    {
      [verificationKey]: verificationUrl.data.data.id,
    },
    priceId
  );
  if (isErrorResponse(updateVerificationResponse))
    throw updateVerificationResponse;

  return {
    verificationKey,
    fileId: verificationUrl.data.data.id,
  };
};

const useGetDocumentUploadProps = () => {
  const analyticsHandler = useRef(new AnalyticsHandler());
  const priceId = useVerificationStore((state) => state.priceId);

  const documents = useVerificationStore(
    (state) => ({
      documentDriverLicenseFront: state.documentDriverLicenseFront,
      documentDriverLicenseBack: state.documentDriverLicenseBack,
      documentSecondDriverLicenseFront: state.documentSecondDriverLicenseFront,
      documentSecondDriverLicenseBack: state.documentSecondDriverLicenseBack,
      documentVehicleRegistration: state.documentVehicleRegistration,
      documentTitleFront: state.documentTitleFront,
      documentTitleBack: state.documentTitleBack,
      documentReleaseLetter: state.documentReleaseLetter,
      documentOdometer: state.documentOdometer,
    }),
    shallow
  );
  const setDocumentUrl = useVerificationStore((state) => state.setDocumentUrl);

  const uploadDocument = useCallback(
    async (
      file: File,
      type: DocumentFileType,
      verificationDocumentKey: VerificationDocumentKey
    ) => {
      try {
        const { fileId } = await uploadVerificationDocument(
          file,
          type,
          priceId
        );
        setDocumentUrl(verificationDocumentKey, fileId);
        analyticsHandler.current.trackDocTypeUploaded(type, priceId, fileId);
        return true;
      } catch (e) {
        let message = 'Document upload failed';
        if (e instanceof Error) message = e.message;
        analyticsHandler.current.trackDocTypeUploadError(
          type,
          priceId,
          message,
          serializeError(e)
        );
        return false;
      }
    },
    [priceId, setDocumentUrl]
  );

  return useCallback(
    (documentKey: VerificationDocumentKey): DocumentUploadProps => {
      return {
        ...documentUploadProps[documentKey],
        handleUpload: async (file) =>
          uploadDocument(
            file,
            documentKeyToDocumentFileType[documentKey],
            documentKey
          ),
        uploaded: !!documents[documentKey],
      };
    },
    [documents, uploadDocument]
  );
};

export default useGetDocumentUploadProps;
