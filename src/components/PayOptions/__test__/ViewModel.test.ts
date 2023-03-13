import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

jest.mock('src/networking/request');
import ViewModel from '../ViewModel';

import { OptionsStore } from 'src/modules/options/store';

describe('PayOptions Test', () => {
  const oStore = new OptionsStore();
  const viewModel = new ViewModel(oStore, {
    isInExperiment: () => false,
    isLoading: false,
  } as any as ABSmartlyContextValue);

  beforeEach(async () => {
    await oStore.init('12345');
  });

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('readonly values', () => {
    expect(viewModel.optionMeta).toEqual(['Direct Deposit', 'Check by Mail']);
  });

  it('should update payment option in store when choose', () => {
    viewModel.handleAddressChange('Direct Deposit');
    expect(oStore.showDD).toEqual('Direct Deposit');
  });
});
