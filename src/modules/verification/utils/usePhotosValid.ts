import { shallow } from 'zustand/shallow';

import useVerificationStore from '../store/store';

const usePhotosValid = () => {
  const {
    photosDriverSide,
    photosPassengerSide,
    photosFront,
    photosBack,
    photosDash,
    photosFrontSeat,
  } = useVerificationStore(
    (store) => ({
      photosDriverSide: store.photosDriverSide,
      photosPassengerSide: store.photosPassengerSide,
      photosFront: store.photosFront,
      photosBack: store.photosBack,
      photosDash: store.photosDash,
      photosFrontSeat: store.photosFrontSeat,
    }),
    shallow
  );

  return Boolean(
    photosFrontSeat &&
      photosDash &&
      photosBack &&
      photosFront &&
      photosPassengerSide &&
      photosDriverSide
  );
};

export default usePhotosValid;
