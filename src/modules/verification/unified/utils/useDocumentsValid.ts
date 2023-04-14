import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../store/store';
import useRequiredDocuments from './useRequiredDocuments';

const useDocumentsValid = () => {
  const {
    documentDriverLicenseFront,
    documentSecondDriverLicenseFront,
    documentVehicleRegistration,
    documentTitleFront,
    documentTitleBack,
    documentOdometer,
    documentMileageValue,
  } = useVerificationStore(
    (store) => ({
      documentDriverLicenseFront: store.documentDriverLicenseFront,
      documentSecondDriverLicenseFront: store.documentSecondDriverLicenseFront,
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
          : true)
    );
  }, [
    documentDriverLicenseFront,
    documentMileageValue,
    documentOdometer,
    documentSecondDriverLicenseFront,
    documentTitleBack,
    documentTitleFront,
    documentVehicleRegistration,
    requiredDocuments.secondDriverLicense,
    requiredDocuments.titleInfo,
  ]);
};

export default useDocumentsValid;
