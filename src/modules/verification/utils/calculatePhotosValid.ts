import useVerificationStore from '../store/store';

const calculatePhotosValid = () => {
  const verificationState = useVerificationStore.getState();

  const {
    photosDriverSide,
    photosPassengerSide,
    photosFront,
    photosBack,
    photosDash,
    photosFrontSeat,
  } = verificationState;

  return Boolean(
    photosFrontSeat &&
      photosDash &&
      photosBack &&
      photosFront &&
      photosPassengerSide &&
      photosDriverSide
  );
};

export default calculatePhotosValid;
