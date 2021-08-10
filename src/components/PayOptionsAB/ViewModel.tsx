import { OptionsStore } from '../../modules/optionsAB/store';

class PayOptionViewModel {
  private readonly oStore: OptionsStore;
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];
  readonly directDeposit: string = 'Direct Deposit';
  readonly singinDesc: string = 'Sign in using your exiting back login';
  readonly getMoneyFaster: string = 'Get your money faster';
  readonly mostPopularMethod: string = 'Most popular method';
  readonly mostSecureMethod: string = 'Most secure method';
  readonly plaidBenefitFaster: string =
    'Customers who use Plaid receive their money sooner';
  readonly enterBankInfoManual: string = 'Enter your bank information manually';
  readonly checkByMail: string = 'Check By Mail';
  readonly checkByMailDesc: string = "we'll send you a check in the mail";
  constructor(oStore: OptionsStore) {
    this.oStore = oStore;
  }

  onPayOptionClick = (
    selectedOption: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    this.oStore.setPayOptionSelected(selectedOption.currentTarget.value);
  };
}

export default PayOptionViewModel;
