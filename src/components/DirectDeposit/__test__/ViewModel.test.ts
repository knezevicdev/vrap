import ViewModel from '../ViewModel';

describe('DirectDeposit Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.routingLabel).toBe(`Routing Number`);
    expect(viewModel.bankAccountLabel).toEqual(`Bank Account Number`);
  });
});
