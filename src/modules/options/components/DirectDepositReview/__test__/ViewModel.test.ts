import ViewModel from '../ViewModel';

import Store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Direct Deposit Review Test', () => {
  const AppStore = new Store();
  const viewModel = new ViewModel(AppStore);

  const setMutationInputSpy = jest.spyOn(AppStore.deposit, 'setMutationInput');
  const setPlaidOpenSpy = jest.spyOn(AppStore.deposit, 'setPlaidOpen');

  it('readonly value ', () => {
    expect(viewModel.depositToLink).toEqual('Deposit to linked ');
    expect(viewModel.account).toEqual('account');
    expect(viewModel.colon).toEqual(':');
    expect(viewModel.linkADifferentAccount).toEqual('Link a different account');
    expect(viewModel.review).toEqual('REVIEW');
    expect(viewModel.infoEncrypted).toEqual(
      'Your information will be secure and encrypted'
    );
  });

  it('should called in store when viewmodel handleOpenLink ', () => {
    viewModel.handleOpenLink();
    expect(setMutationInputSpy).toHaveBeenCalled();
    expect(setPlaidOpenSpy).toHaveBeenCalled();
  });
});
