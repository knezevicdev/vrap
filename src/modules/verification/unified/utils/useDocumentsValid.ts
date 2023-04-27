import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../store/store';
import useRequiredDocuments from './useRequiredDocuments';

const useDocumentsValid = () => {
  const {
    documentDriverLicenseFront,
    documentDriverLicenseBack,
    documentSecondDriverLicenseFront,
    documentSecondDriverLicenseBack,
    documentVehicleRegistration,
    documentTitleFront,
    documentTitleBack,
    documentOdometer,
    documentMileageValue,
  } = useVerificationStore(
    (store) => ({
      documentDriverLicenseFront: store.documentDriverLicenseFront,
      documentDriverLicenseBack: store.documentDriverLicenseBack,
      documentSecondDriverLicenseFront: store.documentSecondDriverLicenseFront,
      documentSecondDriverLicenseBack: store.documentSecondDriverLicenseBack,
      documentVehicleRegistration: store.documentVehicleRegistration,
      documentTitleFront: store.documentTitleFront,
      documentTitleBack: store.documentTitleBack,
      documentOdometer: store.documentOdometer,
      documentMileageValue: store.documentMileageValue,
    }),
    shallow
  );
  const requiredDocuments = useRequiredDocuments();

  return useMemo(() => {
    return Boolean(
      documentDriverLicenseFront &&
        documentVehicleRegistration &&
        documentOdometer &&
        documentMileageValue &&
        (requiredDocuments.titleInfo
          ? documentTitleFront && documentTitleBack
          : true) &&
        (requiredDocuments.secondDriverLicense
          ? documentSecondDriverLicenseFront
          : true) &&
        (requiredDocuments.firstDriverLicenseBack
          ? documentDriverLicenseBack
          : true) &&
        (requiredDocuments.secondDriverLicenseBack
          ? documentSecondDriverLicenseBack
          : true)
    );
  }, [
    documentDriverLicenseBack,
    documentDriverLicenseFront,
    documentMileageValue,
    documentOdometer,
    documentSecondDriverLicenseBack,
    documentSecondDriverLicenseFront,
    documentTitleBack,
    documentTitleFront,
    documentVehicleRegistration,
    requiredDocuments.firstDriverLicenseBack,
    requiredDocuments.secondDriverLicense,
    requiredDocuments.secondDriverLicenseBack,
    requiredDocuments.titleInfo,
  ]);
};

export default useDocumentsValid;
