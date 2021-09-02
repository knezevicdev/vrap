jest.mock('src/networking/request');
import ViewModel from '../ViewModel';

import { OptionsStore } from 'src/modules/options/store';

describe('PayOptions Test', () => {
  const oStore = new OptionsStore();
  const viewModel = new ViewModel(oStore);

  beforeEach(async () => {
    await oStore.init('12345');
  });

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('readonly values', () => {
    expect(viewModel.optionMeta).toEqual(['Direct Deposit', 'Check by Mail']);
  });
});
