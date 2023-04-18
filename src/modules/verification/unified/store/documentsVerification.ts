import { StateCreator } from 'zustand';

import { VerificationState } from './store';

export interface DocumentsVerificationState {
  documentDriverLicenseFront: string;
  documentSecondDriverLicenseFront: string;
  documentVehicleRegistration: string;
  documentTitleFront: string;
  documentTitleBack: string;
  documentReleaseLetter: string;
  documentOdometer: string;
  documentMileageValue: number;
  setDocumentUrl: (key: VerificationDocumentKey, url: string) => void;
  setMileage: (mileage: number) => void;
}

export type VerificationDocumentKey = keyof Omit<
  DocumentsVerificationState,
  'documentMileageValue' | 'setDocumentUrl' | 'setMileage'
>;

const createDocumentsVerificationSlice: StateCreator<
  VerificationState,
  [],
  [],
  DocumentsVerificationState
> = (set) => ({
  documentDriverLicenseFront: '',
  documentSecondDriverLicenseFront: '',
  documentVehicleRegistration: '',
  documentTitleFront: '',
  documentTitleBack: '',
  documentReleaseLetter: '',
  documentOdometer: '',
  documentMileageValue: 0,
  setDocumentUrl: (key, url) => {
    set((state) => ({
      ...state,
      [key]: url,
    }));
  },
  setMileage: (mileage) =>
    set((state) => ({ ...state, documentMileageValue: mileage })),
});

export default createDocumentsVerificationSlice;
