jest.mock('src/networking/request');

import { DirectDepositStore } from '../../directdeposit/store';
import { OptionsStore } from '../../options/store';
import { PaymentOverviewStore } from '../../paymentoverview/store';
import ViewModel from '../ViewModel';

describe('Direct Deposit Test', () => {
  const oStore = new OptionsStore();
  const poStore = new PaymentOverviewStore();
  const ddStore = new DirectDepositStore();
  const onPlaidSuccessSpy = jest.spyOn(ddStore, 'plaidSuccess');
  const onPlaidExitSpy = jest.spyOn(ddStore, 'plaidExit');
  let viewModel: ViewModel;

  beforeEach(async () => {
    await oStore.init('12345');
    await poStore.init('12345');
    await ddStore.initClientSide('12345');
  });

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('test readonly initial values', () => {
    viewModel = new ViewModel(ddStore, oStore, poStore);

    expect(viewModel.ddToggleOrCopy).toEqual('Or,');
    expect(viewModel.ddTogglePlaidCopy).toEqual('link bank account');
    expect(viewModel.cantFind).toEqual(
      "Can't find your bank? Enter bank information manually"
    );
  });

  it('getPlaidLinkToken', () => {
    expect(viewModel.getPlaidLinkToken()).toBe(
      'link-sandbox-95019b12-9671-4d70-bc7f-61676874fb04'
    );
  });

  it('getTokenIsLocal', () => {
    expect(viewModel.getTokenIsLocal()).toBe(true);
  });

  it('getShowPlaidLink', () => {
    expect(viewModel.getShowPlaidLink()).toBe(true);
  });

  it('getPriceId', () => {
    expect(viewModel.getPriceId()).toBe('12345');
  });

  it('getPrice', () => {
    expect(viewModel.getPrice()).toBe(10854);
  });

  it('togglePlaidLink', () => {
    viewModel.togglePlaidLink();
    expect(viewModel.getShowPlaidLink()).toBe(false);
    viewModel.togglePlaidLink();
    expect(viewModel.getShowPlaidLink()).toBe(true);
  });

  it('onPlaidSuccess fires Plaid ACH segment event and redirects', () => {
    const plaidData = {
      Account: {
        Id: 'string',
        Mask: 'string',
        Name: 'string',
        Subtype: 'string',
        Type: 'string',
      },
      Email: 'string',
      Institution: {
        Id: 'string',
        Name: 'string',
      },
      PublicToken: 'string',
      ReferenceId: 'string',
      Source: 'string',
    };
    const onSubmitting = oStore.setPlaidSubmitting;

    viewModel.onPlaidSuccess(plaidData, onSubmitting);
    expect(onPlaidSuccessSpy).toHaveBeenCalled();
  });

  it('onPlaidExit', () => {
    viewModel.onPlaidExit();
    expect(onPlaidExitSpy).toHaveBeenCalled();
  });

  it('getInstitutionNotFound', () => {
    expect(viewModel.getInstitutionNotFound()).toBe(false);
  });
});
