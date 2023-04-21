import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Pickup Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
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
});
