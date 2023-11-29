import useVerificationStore from '../store/store';
import calculatePhotosValid from './calculatePhotosValid';

const calculateInitialSection = (isInPhotosExperiment: boolean) => {
  const verificationState = useVerificationStore.getState();
  const isPhotosValid = isInPhotosExperiment ? calculatePhotosValid() : false;

  if (isPhotosValid) return 4;
  if (
    verificationState.loanConfirmation &&
    verificationState.paymentSubmittedType
  )
    return 3;
  if (verificationState.pickupAddressConfirmation) return 2;
  if (verificationState.firstOwnerFirstName) return 1;
  return 0;
};

export default calculateInitialSection;
