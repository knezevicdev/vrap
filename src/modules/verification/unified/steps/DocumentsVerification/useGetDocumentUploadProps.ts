import { useCallback, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import {
  DocumentFileType,
  uploadVerificationDocument,
} from '../../../documents/utils/uploadVerificationDocument';
import { DocumentUploadProps } from '../../components/DocumentUpload';
import { VerificationDocumentKey } from '../../store/documentsVerification';
import useVerificationStore from '../../store/store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

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
          message
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
