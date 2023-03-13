import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

const absmartly = {
  isInExperiment: () => false,
  isLoading: false,
} as any as ABSmartlyContextValue;

describe('Pickup Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  const mutationInput = {
    Account: {
      Id: '123',
      Name: 'name',
      Type: 'checking',
      Subtype: 'type',
      Mask: 'mask',
    },
    Institution: {
      Id: 'institute_id',
      Name: 'institute_name',
    },
    PublicToken: 'token',
    Source: 'acquisitions',
    ReferenceId: 'referenceId',
    Email: 'email@email.com',
  };
  const paymentOverviewFormValues = {
    paymentOption: 'Check by Mail',
    routingNumber: '',
    bankAccountNumber: '',
    isPrimaryAddress: 'Yes',
    address: '123 broadway',
    apartment: '',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
  };

  const mailingAddressValue = {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zipcode: '',
  };

  const mockLocalStorage = () => {
    const store: any = {};
    return {
      getItem: (key: string): string | null => {
        return store[key] || null;
      },
      setItem: (key: string, value: string): void => {
        store[key] = value;
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
    };
  };

  beforeEach(() => {
    viewModel = new ViewModel(stores, absmartly);
  });

  it('test readonly initial values', () => {
    expect(viewModel.pickUpInfotitle).toEqual('Pick Up Information');
    expect(viewModel.pickUpAddress).toEqual('Pick up address');
    expect(viewModel.contactInformation).toEqual('Contact Information');
    expect(viewModel.name).toEqual('Name');
    expect(viewModel.email).toEqual('Email');
    expect(viewModel.phoneNumber).toEqual('Phone Number');
    expect(viewModel.edit).toEqual('Edit');
  });

  it('when click handleEdit should call window location href', () => {
    stores.verification.setOfferId('123');
    const url = `/sell/verification/owner/${stores.verification.offerId}`;
    viewModel.handleEditClick();
    Object.defineProperty(window, 'location', {
      value: {
        href: `/sell/verification/owner/123`,
      },
    });
    expect(window.location.href).toEqual(url);
  });

  it('when click handleEdit and all value is present, should call setItem', () => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage(),
    });
    absmartly.isInExperiment = jest.fn().mockReturnValueOnce(true);
    jest.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(null);
    stores.deposit.setMutationInput(mutationInput);
    stores.payment.setValues(
      paymentOverviewFormValues,
      '123',
      mailingAddressValue
    );
    const setItem = jest.spyOn(window.localStorage, 'setItem');
    viewModel.handleEditClick();
    expect(stores.deposit.mutationInput).toEqual(mutationInput);
    expect(setItem).toHaveBeenCalledTimes(3);
  });
});
