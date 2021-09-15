import ViewModel from '../ViewModel';

describe('PayOptionsAB Test', () => {
  const viewModel = new ViewModel();

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('readonly values', () => {
    expect(viewModel.optionMeta).toEqual(['Direct Deposit', 'Check by Mail']);
    expect(viewModel.directDeposit).toBe('Direct Deposit');
    expect(viewModel.singinDesc).toBe('Sign in using your existing bank login');
    expect(viewModel.getMoneyFaster).toBe('Get your money faster');
    expect(viewModel.mostPopularMethod).toBe('Most popular method');
    expect(viewModel.mostSecureMethod).toBe('Most secure method');
    expect(viewModel.plaidBenefitFaster).toBe(
      'Customers who use Plaid receive their money sooner.'
    );
    expect(viewModel.enterBankInfoManual).toBe(
      'Enter your bank information manually'
    );
    expect(viewModel.checkByMail).toBe('Check By Mail');
    expect(viewModel.checkByMailDesc).toBe(
      `We'll send you a check in the mail`
    );
    expect(viewModel.overSixty).toBe('Over 60%');
    expect(viewModel.paymentPreference).toBe(
      'of Vroom customers choose to get paid through Plaid.'
    );
    expect(viewModel.plaidIs).toBe('Plaid is');
    expect(viewModel.worldwide).toBe(' trusted worldwide ');
    expect(viewModel.transferingFund).toBe(' for transfering funds.');
    expect(viewModel.poweredBy).toBe('Powered by');
  });
});
