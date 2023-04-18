import { StateCreator } from 'zustand';

import useContactInfoForm from '../steps/PickupInformation/steps/ContactInfo/useContactInfoForm';
import useContactInfoConfirmationForm from '../steps/PickupInformation/steps/ContactInfoConfirmation/useContactInfoConfirmationForm';
import usePickupAddressConfirmationForm from '../steps/PickupInformation/steps/PickupAddressConfirmation/usePickupAddressConfirmationForm';
import usePickupAddressInfoForm from '../steps/PickupInformation/steps/PickupAddressInfo/usePickupAddressInfoForm';
import { VerificationState } from './store';

export interface PickupVerificationState {
  pickupAddressConfirmation: string;
  pickupAddress: string;
  pickupState: string;
  pickupZip: string;
  pickupCity: string;
  pickupApt: string;
  pickupContactConfirmation: string;
  pickupContactFirstName: string;
  pickupContactLastName: string;
  pickupContactEmail: string;
  pickupContactPhoneNumber: string;
  loadPickupStateFromForms: (
    contactInfoConfirmationForm: ReturnType<
      typeof useContactInfoConfirmationForm
    >,
    contactInfoForm: ReturnType<typeof useContactInfoForm>,
    pickupAddressConfirmationForm: ReturnType<
      typeof usePickupAddressConfirmationForm
    >,
    pickupAddressInfoForm: ReturnType<typeof usePickupAddressInfoForm>
  ) => void;
}

const pickupKeysToFirstOwner: Record<
  string,
  | 'firstOwnerAddress'
  | 'firstOwnerState'
  | 'firstOwnerZip'
  | 'firstOwnerCity'
  | 'firstOwnerApt'
> = {
  address: 'firstOwnerAddress',
  state: 'firstOwnerState',
  zip: 'firstOwnerZip',
  city: 'firstOwnerCity',
  apt: 'firstOwnerApt',
};

const contactKeysToFirstOwner: Record<
  string,
  | 'firstOwnerFirstName'
  | 'firstOwnerLastName'
  | 'firstOwnerEmail'
  | 'firstOwnerPhoneNumber'
> = {
  firstName: 'firstOwnerFirstName',
  lastName: 'firstOwnerLastName',
  email: 'firstOwnerEmail',
  phoneNumber: 'firstOwnerPhoneNumber',
};

const createPickupVerificationSlice: StateCreator<
  VerificationState,
  [],
  [],
  PickupVerificationState
> = (set, get) => ({
  pickupAddressConfirmation: '',
  pickupAddress: '',
  pickupState: '',
  pickupZip: '',
  pickupCity: '',
  pickupApt: '',
  pickupContactConfirmation: '',
  pickupContactFirstName: '',
  pickupContactLastName: '',
  pickupContactEmail: '',
  pickupContactPhoneNumber: '',
  loadPickupStateFromForms: (
    contactInfoConfirmationForm,
    contactInfoForm,
    pickupAddressConfirmationForm,
    pickupAddressInfoForm
  ) => {
    const contactInfoConfirmationValues =
      contactInfoConfirmationForm.getValues();
    const contactInfoValues = contactInfoForm.getValues();
    const pickupAddressConfirmationValues =
      pickupAddressConfirmationForm.getValues();
    const pickupAddressInfoValues = pickupAddressInfoForm.getValues();

    const state = get();
    const pickupInfo = (key: keyof typeof pickupAddressInfoValues) => {
      if (pickupAddressConfirmationValues.pickupAddressConfirmation === 'Yes')
        return state[pickupKeysToFirstOwner[key]];
      return pickupAddressInfoValues[key];
    };
    const contactInfo = (key: keyof typeof contactInfoValues) => {
      if (contactInfoConfirmationValues.contactInfoConfirmation === 'Yes')
        return state[contactKeysToFirstOwner[key]];
      return contactInfoValues[key];
    };

    set((state) => ({
      ...state,
      pickupAddressConfirmation:
        pickupAddressConfirmationValues.pickupAddressConfirmation,
      pickupAddress: pickupInfo('address'),
      pickupState: pickupInfo('state'),
      pickupZip: pickupInfo('zip'),
      pickupCity: pickupInfo('city'),
      pickupApt: pickupInfo('apt'),
      pickupContactConfirmation:
        contactInfoConfirmationValues.contactInfoConfirmation,
      pickupContactFirstName: contactInfo('firstName'),
      pickupContactLastName: contactInfo('lastName'),
      pickupContactEmail: contactInfo('email'),
      pickupContactPhoneNumber: contactInfo('phoneNumber'),
    }));
  },
});

export default createPickupVerificationSlice;
