import useVerificationStore from '../store/store';
import calculateDocumentsValid from './calculateDocumentsValid';
import calculatePhotosValid from './calculatePhotosValid';

const calculateInitialSection = (isInPhotosExperiment: boolean) => {
  const verificationState = useVerificationStore.getState();
  const documentsValid = calculateDocumentsValid();
  const photosValid = isInPhotosExperiment ? calculatePhotosValid() : false;

  if (photosValid) return 5;
  if (documentsValid) return 4;
  if (verificationState.loanConfirmation) return 3;
  if (verificationState.pickupAddressConfirmation) return 2;
  if (verificationState.firstOwnerFirstName) return 1;
  return 0;
};

export default calculateInitialSection;
