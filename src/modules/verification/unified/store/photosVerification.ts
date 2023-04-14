import { StateCreator } from 'zustand';

import { VerificationState } from './store';

export interface PhotosVerificationState {
  photosDriverSide: string;
  photosPassengerSide: string;
  photosFront: string;
  photosBack: string;
  photosDash: string;
  photosFrontSeat: string;
  setPhotoUrl: (key: VehiclePhotosKey, url: string) => void;
}

export type VehiclePhotosKey = keyof Omit<
  PhotosVerificationState,
  'setPhotoUrl'
>;

const createPhotosVerificationSlice: StateCreator<
  VerificationState,
  [],
  [],
  PhotosVerificationState
> = (set) => ({
  photosDriverSide: '',
  photosPassengerSide: '',
  photosFront: '',
  photosBack: '',
  photosDash: '',
  photosFrontSeat: '',
  setPhotoUrl: (key, url) => {
    set((state) => ({
      ...state,
      [key]: url,
    }));
  },
});

export default createPhotosVerificationSlice;
