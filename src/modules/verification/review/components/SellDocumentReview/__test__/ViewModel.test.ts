import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

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
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.SellDoctitle).toEqual('Document Upload');
    expect(viewModel.frontTitle).toEqual('Front of Title Information');
    expect(viewModel.backTitle).toEqual('Back of Title Information');
    expect(viewModel.lienRelease).toEqual('Lien Release Letter');
    expect(viewModel.exactMileage).toEqual('Exact Mileage');
    expect(viewModel.dlFront).toEqual("Front of Driver's License");
    expect(viewModel.dlBack).toEqual("Back of Driver's License");
    expect(viewModel.secondDlFront).toEqual(
      "Front of Second Owner's Driver's License"
    );
    expect(viewModel.secondDlBack).toEqual(
      "Back of Second Owner's Driver's License"
    );
    expect(viewModel.tiFront).toEqual('Front of Title Information');
    expect(viewModel.tiBack).toEqual('Back of Title Information');
    expect(viewModel.registration).toEqual('Registration');
    expect(viewModel.odometer).toEqual('Odometer Picture');
    expect(viewModel.edit).toEqual('Edit');
  });

  it('when click handleEdit should call window location href', () => {
    stores.verification.setOfferId('123');
    const url = `/sell/verification/documents?priceId=${stores.verification.offerId}`;

    viewModel.handleEditClick();
    Object.defineProperty(window, 'location', {
      value: {
        href: `/sell/verification/documents?priceId=123`,
      },
    });
    expect(window.location.href).toEqual(url);
  });

  it('when click handleEdit and all value is present, should call setItem', () => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage(),
    });
    stores.absmart.isInExperiment = jest.fn().mockReturnValue(true);
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
