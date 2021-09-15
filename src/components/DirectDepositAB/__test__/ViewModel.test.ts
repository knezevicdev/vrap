import ViewModel from '../ViewModel';

describe('DirectDepositAB Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.routingLabel).toBe(`Routing Number`);
    expect(viewModel.bankAccountLabel).toEqual(`Account Number`);
  });
});
