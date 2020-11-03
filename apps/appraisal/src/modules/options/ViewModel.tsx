import { OptionsStore } from './store';

class OptionsViewModel {
  private readonly store: OptionsStore;
  readonly hero: string = `let's set up your payment method`;
  readonly optionTitle: string = 'Payment Method';
  readonly optionQuestion: string = 'How would you like to get paid?';
  readonly bankInfo: string = 'Please provide your bank information.';
  readonly submit: string = 'submit';

  constructor(store: OptionsStore) {
    this.store = store;
  }

  onPayOptionClick = (
    selectedOption: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.store.setPayOptionSelected(selectedOption.currentTarget.name);
  };

  getPayOptionSelected = (): string => {
    return this.store.payOptionSelected;
  };

  getPayOptionArray = (): Array<string> => {
    return this.store.payOptionArr;
  };

  showDirectDeposit = (): boolean => {
    return this.store.showDD;
  };
}

export default OptionsViewModel;
