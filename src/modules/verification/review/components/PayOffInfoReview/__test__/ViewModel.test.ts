import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Pay Off Review component test', () => {
  const stores = new store();

  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test call getCurrentPayment should return No', () => {
    const fn = jest.fn(() => viewModel.getCurrentPayment());
    fn();
    expect(fn).toHaveReturnedWith('No');
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
