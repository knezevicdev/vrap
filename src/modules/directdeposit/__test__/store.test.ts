import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

jest.mock('src/networking/request');

import { DirectDepositStore } from '../store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { OptionsStore } from 'src/modules/options/store';
import ViewModel from 'src/modules/options/ViewModel';
import * as Request from 'src/networking/request';
import { getPlaidToken } from 'src/networking/request/__mocks__';
import AppStore from 'src/store';

describe('test direct deposit store', () => {
  let store: DirectDepositStore;
  let viewModel: ViewModel;
  const spyPlaidToken = jest.spyOn(Request, 'getPlaidToken');
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
  const analyticsHandler = new AnalyticsHandler();
  beforeEach(() => {
    const oStore = new OptionsStore();
    const appStore = new AppStore();
    const absmartly = {
      isInExperiment: () => false,
      isLoading: false,
    } as any as ABSmartlyContextValue;

    store = new DirectDepositStore();
    viewModel = new ViewModel(
      oStore,
      store,
      analyticsHandler,
      appStore,
      absmartly
    );
  });

  it('test initClientSide func ', async () => {
    spyPlaidToken.mockResolvedValueOnce(getPlaidToken());
    await store.initClientSide('abc123');
    expect(store.priceId).toEqual('abc123');
    expect(store.linkToken).toEqual(
      'link-sandbox-95019b12-9671-4d70-bc7f-61676874fb04'
    );
    expect(store.expiration).toEqual('2021-06-24T23:53:23Z');
    expect(store.requestId).toEqual('y5mvFkVFcGFeYOJ');
  });
  it('test initClientSide func with error ', async () => {
    return store.initClientSide('').catch(() => {
      expect(store.priceId).toEqual('');
      expect(store.linkToken).toEqual('');
      expect(store.expiration).toEqual('');
      expect(store.requestId).toEqual('');
    });
  });

  it('test togglePlaidLink ', () => {
    store.togglePlaidLink();
    expect(store.showPlaidLink).toEqual(false);
  });

  it('test setMutationInput ', () => {
    store.setMutationInput(undefined);
    expect(store.mutationInput).toEqual(undefined);
  });

  it('test setInstitutionId ', () => {
    store.setInstitutionId('id');
    expect(store.institutionId).toEqual('id');
  });

  it('test setPlaidOpen ', () => {
    store.setPlaidOpen(true);
    expect(store.plaidOpen).toEqual(true);
  });

  it('test setInstitutionLogo ', () => {
    store.setInstitutionLogo(null);
    expect(store.institutionLogo).toEqual(null);
  });

  it('test plaidSuccess ', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage(),
    });

    const removeItem = jest.spyOn(window.localStorage, 'removeItem');
    jest
      .spyOn(Request, 'postPlaidPayment')
      .mockResolvedValueOnce(getPlaidToken());

    const url = '/appraisal/congratulations';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });

    await store.plaidSuccess(mutationInput, viewModel.onPlaidSubmitting);
    expect(removeItem).toHaveBeenCalledTimes(2);
    expect(window.location.href).toEqual(url);
  });

  it('test plaidSuccess with error ', () => {
    return store
      .plaidSuccess(mutationInput, viewModel.onPlaidSubmitting)
      .catch(() => {
        const onPlaidSumit = jest.spyOn(viewModel, 'onPlaidSubmitting');
        expect(onPlaidSumit).toHaveBeenCalled();
      });
  });

  it('test plaid exit called ', () => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage(),
    });
    const removeItem = jest.spyOn(window.localStorage, 'removeItem');
    store.plaidExit();
    expect(removeItem).toHaveBeenCalled();
    expect(store.tokenIsLocal).toEqual(false);
  });
});
