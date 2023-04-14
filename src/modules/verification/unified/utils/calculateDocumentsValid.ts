import useVerificationStore from '../store/store';
import calculateRequiredDocuments from './calculateRequiredDocuments';

const calculateDocumentsValid = () => {
  const verificationState = useVerificationStore.getState();
  const requiredDocuments = calculateRequiredDocuments(verificationState);

  const {
    documentDriverLicenseFront,
    documentSecondDriverLicenseFront,
    documentVehicleRegistration,
    documentTitleFront,
    documentTitleBack,
    documentOdometer,
    documentMileageValue,
  } = verificationState;

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
};

export default calculateDocumentsValid;
