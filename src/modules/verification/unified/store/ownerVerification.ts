import { StateCreator } from 'zustand';

import useFirstOwnerConfirmationForm from '../steps/OwnerVerification/steps/FirstOwnerConfirmation/useFirstOwnerConfirmationForm';
import useFirstOwnerInfoForm from '../steps/OwnerVerification/steps/FirstOwnerInfo/useFirstOwnerInfoForm';
import useSecondOwnerConfirmationForm from '../steps/OwnerVerification/steps/SecondOwnerConfirmation/useSecondOwnerConfirmationForm';
import useSecondOwnerInfoForm from '../steps/OwnerVerification/steps/SecondOwnerInfo/useSecondOwnerInfoForm';
import { VerificationState } from './store';

export interface OwnerVerificationState {
  firstOwnerConfirmation: string;
  firstOwnerFirstName: string;
  firstOwnerMiddleName: string;
  firstOwnerLastName: string;
  firstOwnerAddress: string;
  firstOwnerState: string;
  firstOwnerZip: string;
  firstOwnerCity: string;
  firstOwnerApt: string;
  firstOwnerEmail: string;
  firstOwnerPhoneNumber: string;
  secondOwnerConfirmation: string;
  secondOwnerFirstName: string;
  secondOwnerMiddleName: string;
  secondOwnerLastName: string;
  secondOwnerAddress: string;
  secondOwnerState: string;
  secondOwnerZip: string;
  secondOwnerCity: string;
  secondOwnerApt: string;
  secondOwnerEmail: string;
  secondOwnerPhoneNumber: string;
  loadOwnerStateFromForms: (
    firstOwnerConfirmationForm: ReturnType<
      typeof useFirstOwnerConfirmationForm
    >,
    firstOwnerInfoForm: ReturnType<typeof useFirstOwnerInfoForm>,
    secondOwnerConfirmationForm: ReturnType<
      typeof useSecondOwnerConfirmationForm
    >,
    secondOwnerInfoForm: ReturnType<typeof useSecondOwnerInfoForm>
  ) => void;
}

const createOwnerVerificationSlice: StateCreator<
  VerificationState,
  [],
  [],
  OwnerVerificationState
> = (set) => ({
  firstOwnerConfirmation: '',
  firstOwnerFirstName: '',
  firstOwnerMiddleName: '',
  firstOwnerLastName: '',
  firstOwnerAddress: '',
  firstOwnerState: '',
  firstOwnerZip: '',
  firstOwnerCity: '',
  firstOwnerApt: '',
  firstOwnerEmail: '',
  firstOwnerPhoneNumber: '',
  secondOwnerConfirmation: '',
  secondOwnerFirstName: '',
  secondOwnerMiddleName: '',
  secondOwnerLastName: '',
  secondOwnerAddress: '',
  secondOwnerState: '',
  secondOwnerZip: '',
  secondOwnerCity: '',
  secondOwnerApt: '',
  secondOwnerEmail: '',
  secondOwnerPhoneNumber: '',
  loadOwnerStateFromForms: (
    firstOwnerConfirmationForm,
    firstOwnerInfoForm,
    secondOwnerConfirmationForm,
    secondOwnerInfoForm
  ) => {
    const firstOwnerConfirmationValues = firstOwnerConfirmationForm.getValues();
    const firstOwnerInfoValues = firstOwnerInfoForm.getValues();
    const secondOwnerConfirmationValues =
      secondOwnerConfirmationForm.getValues();
    const secondOwnerInfoValues = secondOwnerInfoForm.getValues();

    const secondOwnerInfoValue = (key: keyof typeof secondOwnerInfoValues) => {
      if (secondOwnerConfirmationValues.secondOwnerConfirmation === 'no')
        return '';
      return secondOwnerInfoValues[key];
    };

    set((state) => ({
      ...state,
      firstOwnerConfirmation:
        firstOwnerConfirmationValues.firstOwnerConfirmation,
      firstOwnerFirstName: firstOwnerInfoValues.firstName,
      firstOwnerLastName: firstOwnerInfoValues.lastName,
      firstOwnerMiddleName: firstOwnerInfoValues.middleName || '',
      firstOwnerAddress: firstOwnerInfoValues.address,
      firstOwnerState: firstOwnerInfoValues.state,
      firstOwnerZip: firstOwnerInfoValues.zip,
      firstOwnerCity: firstOwnerInfoValues.city,
      firstOwnerApt: firstOwnerInfoValues.apt || '',
      firstOwnerEmail: firstOwnerInfoValues.email,
      firstOwnerPhoneNumber: firstOwnerInfoValues.phoneNumber,
      secondOwnerConfirmation:
        secondOwnerConfirmationValues.secondOwnerConfirmation,
      secondOwnerFirstName: secondOwnerInfoValue('firstName'),
      secondOwnerMiddleName: secondOwnerInfoValue('middleName'),
      secondOwnerLastName: secondOwnerInfoValue('lastName'),
      secondOwnerAddress: secondOwnerInfoValue('address'),
      secondOwnerState: secondOwnerInfoValue('state'),
      secondOwnerZip: secondOwnerInfoValue('zip'),
      secondOwnerCity: secondOwnerInfoValue('city'),
      secondOwnerApt: secondOwnerInfoValue('apt') || '',
      secondOwnerEmail: secondOwnerInfoValue('email'),
      secondOwnerPhoneNumber: secondOwnerInfoValue('phoneNumber'),
    }));
  },
});

export default createOwnerVerificationSlice;
