import { OptionsStore } from '../../modules/options/store';

class PayOptionViewModel {
  private readonly oStore: OptionsStore;
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];
  readonly directDeposit: string = 'Direct Deposit';
  readonly singinDesc: string = 'Sign in using your existing bank login';
  readonly getMoneyFaster: string = 'Get your money faster';
  readonly mostPopularMethod: string = 'Most popular method';
  readonly mostSecureMethod: string = 'Most secure method';
  readonly plaidBenefitFaster: string =
    'Customers who use Plaid receive their money sooner.';
  readonly enterBankInfoManual: string = 'Enter your bank information manually';
  readonly checkByMail: string = 'Check By Mail';
  readonly checkByMailDesc: string = "We'll send you a check in the mail";
  readonly overSixty: string = 'Over 60%';
  readonly paymentPreference: string =
    'of Vroom customers choose to get paid through Plaid.';
  readonly plaidIs: string = 'Plaid is';
  readonly worldwide: string = ' trusted worldwide ';
  readonly transferingFund: string = ' for transfering funds.';
  readonly poweredBy: string = 'Powered by';

  constructor(oStore: OptionsStore) {
    this.oStore = oStore;
  }

  onPayOptionClick = (
    selectedOption: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    this.oStore.setPayOptionSelected(selectedOption.currentTarget.value);
  };

  setManualInputSubmitButton = (value: string): void => {
    this.oStore.setPayOptionSelected(value);
  };
}

export default PayOptionViewModel;
