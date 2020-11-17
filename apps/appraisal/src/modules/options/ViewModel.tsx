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

  isValidRouting = (
    routingNumberToTest: string
  ): boolean => {
    if (!routingNumberToTest) {
      //all 0's is technically a valid routing number, but it's inactive
      return false;
    }

    let routing = routingNumberToTest.toString();
    while (routing.length < 9) {
      routing = '0' + routing; //I refuse to import left-pad for this
    }

    //gotta be 9  digits
    const match = routing.match('^\\d{9}$');
    if (!match) {
      return false;
    }

    //The first two digits of the nine digit RTN must be in the ranges 00 through 12, 21 through 32, 61 through 72, or 80.
    //https://en.wikipedia.org/wiki/Routing_transit_number
    const firstTwo = parseInt(routing.substring(0, 2));
    const firstTwoValid =
      (0 <= firstTwo && firstTwo <= 12) ||
      (21 <= firstTwo && firstTwo <= 32) ||
      (61 <= firstTwo && firstTwo <= 72) ||
      firstTwo === 80;
    if (!firstTwoValid) {
      return false;
    }

    //this is the checksum
    //http://www.siccolo.com/Articles/SQLScripts/how-to-create-sql-to-calculate-routing-check-digit.html
    const weights = [3, 7, 1];
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += parseInt(routing[i]) * weights[i % 3];
    }

    return (10 - (sum % 10)) % 10 === parseInt(routing[8]);
  };
}

export default OptionsViewModel;
