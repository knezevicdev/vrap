import { useOptionsStore } from '../../options/store';
import { usePaymentOverviewStore } from '../store';
import ViewModel from '../ViewModel';
// import mockOption from './optionStoreMock.json';
// import mockPrice from './priceResponse.json';

// import { Networker } from 'src/networking/Networker';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Direct Deposit Test', () => {
  const oStore = useOptionsStore();
  const poStore = usePaymentOverviewStore();

  const viewModel = new ViewModel(poStore, oStore);

  // let useContextMock: jest.Mock<OptionsStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('priceId', 'testItem');
  });

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('test contents', () => {
    expect(viewModel.hero).toEqual('payment overview');
    expect(viewModel.carWorth).toEqual('Your car is worth');
    expect(viewModel.remainingLoan).toEqual('Remaining Loan');
    expect(viewModel.total).toEqual('Total');
    expect(viewModel.tbd).toEqual('To be determined');
    expect(viewModel.pricePlaceholder).toEqual('--');
  });
});
