import ViewModel from '../ViewModel';

describe('NextSteps Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.nextSteps).toBe('next steps');
    expect(viewModel.verifyOwnership).toBe('Verify Ownership');
    expect(viewModel.signContracts).toBe('Sign Contracts');
    expect(viewModel.wePickUp).toBe('We Pick Up, You Get Paid');
    expect(viewModel.requestDocuments).toBe(
      `We'll request relevant documents and additional information to verify vehicle ownership before the price expires.`
    );
    expect(viewModel.sendAnEmail).toBe(
      `We'll send an email with a contract to e-Sign, and may require some additional paperwork by mail in order to finalize the deal.`
    );
    expect(viewModel.scheduleATime).toBe(
      `We'll schedule a time to pick up your vehicle. Once we have your car, we’ll send your payment within 2-3 business days.`
    );
  });
});
