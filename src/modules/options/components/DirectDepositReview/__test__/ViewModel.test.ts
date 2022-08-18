jest.mock('src/networking/request');

import ViewModel from '../ViewModel';

import * as Request from 'src/networking/request';
import Store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Direct Deposit Review Test', () => {
  const AppStore = new Store();
  const viewModel = new ViewModel(AppStore);

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
  it('when called handleOpenLink ', () => {
    viewModel.handleOpenLink();
    expect(AppStore.deposit.mutationInput).toBe(undefined);
    expect(AppStore.option.plaidSubmitting).toBe(true);
    expect(AppStore.deposit.plaidOpen).toBe(true);
  });

  it('test getLogo ', async () => {
    const spyGetInstitutionLogo = jest.spyOn(Request, 'getInstitutionLogo');
    spyGetInstitutionLogo.mockResolvedValueOnce({ data: 'abclogoabc' });
    await viewModel.getLogo('123');
    expect(spyGetInstitutionLogo).toHaveBeenCalled();
    expect(AppStore.deposit.institutionLogo).toEqual('abclogoabc');
  });

  it('test getLogo with no logo ', async () => {
    const spyGetInstitutionLogo = jest.spyOn(Request, 'getInstitutionLogo');
    spyGetInstitutionLogo.mockResolvedValueOnce({ data: 'abclogoabc' });
    await viewModel.getLogo('123');
    expect(spyGetInstitutionLogo).toHaveBeenCalled();
    expect(AppStore.deposit.institutionLogo).toEqual('abclogoabc');
  });

  it('test getLogo with no logo ', async () => {
    const spyGetInstitutionLogo = jest.spyOn(Request, 'getInstitutionLogo');
    spyGetInstitutionLogo.mockResolvedValueOnce({ data: '\n' });
    await viewModel.getLogo('123');
    expect(AppStore.deposit.institutionLogo).toEqual(null);
  });
});
