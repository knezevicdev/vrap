import { useOptionsStore } from '../../options/store';
import { usePaymentOverviewStore } from '../../paymentoverview/store';
import { useDirectDepositStore } from '../store';
import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Direct Deposit Test', () => {
  const ddStore = useDirectDepositStore();
  const oStore = useOptionsStore();
  const poStore = usePaymentOverviewStore();

  const viewModel = new ViewModel(ddStore, oStore, poStore);
  it('should get getPlaidLinkToken ', () => {
    expect(viewModel.getPlaidLinkToken).toBe('');
  });
});
