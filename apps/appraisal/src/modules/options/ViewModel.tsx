import { OptionsStore } from './store';

import { MailingAddress } from 'src/interfaces.d';

class OptionsViewModel {
  private readonly store: OptionsStore;
  readonly hero: string = `let's set up your payment method`;
  readonly optionTitle: string = 'Payment Method';
  readonly optionQuestion: string = 'How would you like to get paid?';
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

  getMailiingAddress = (): MailingAddress => {
    return this.store.mailingAddress;
  };

  showDirectDeposit = (): boolean => {
    return this.store.showDD;
  };
}

export default OptionsViewModel;
