import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Owner Infomation Review component test', () => {
  const stores = new store();
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

  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('Contact Information');
    expect(viewModel.primarySectionTitle).toEqual(
      "Primary Owner's Information"
    );
    expect(viewModel.secondarySectionTitle).toEqual(
      "Secondary Owner's Information"
    );
    expect(viewModel.name).toEqual('Name');
    expect(viewModel.email).toEqual('Email');
    expect(viewModel.phone).toEqual('Phone');
    expect(viewModel.address).toEqual('Address');
    expect(viewModel.edit).toEqual('Edit');
  });

  it('when click handleEdit should call window location href', () => {
    stores.verification.setOfferId('123');
    const url = `/appraisal/verification/owner?priceId=${stores.verification.offerId}`;
    viewModel.handleEditClick();
    Object.defineProperty(window, 'location', {
      value: {
        href: `/appraisal/verification/owner?priceId=123`,
      },
    });
    expect(window.location.href).toEqual(url);
  });

  it('when click handleEdit and all values present, should call localstorage setItem ', () => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage(),
    });
    stores.absmart.isInExperiment = jest.fn().mockReturnValueOnce(true);
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
