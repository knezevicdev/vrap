import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Owner Infomation Review component test', () => {
  const stores = new store();

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
