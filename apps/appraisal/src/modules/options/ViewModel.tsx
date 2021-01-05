import { OptionsStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { MailingAddress } from 'src/interfaces.d';
import { PaymentOverviewFormValues } from 'src/interfaces.d';
import { submitPaymentOptions } from 'src/modules/options/store';

class OptionsViewModel {
  private readonly store: OptionsStore;
  private analyticsHandler: AnalyticsHandler;
  readonly hero: string = `let's set up your payment method`;
  readonly optionTitle: string = 'Payment Method';
  readonly optionQuestion: string = 'How would you like to get paid?';
  readonly submit: string = 'submit';
  readonly submitting: string = 'submitting';

  constructor(store: OptionsStore) {
    this.store = store;
    this.analyticsHandler = new AnalyticsHandler();
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackPaymentOptionsViewed();
  };

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

  isValidRouting = (num: string | null | undefined): boolean => {
    if (!num || num.length < 9) return false;

    // Run through each digit and calculate the total.
    let n = 0;
    for (let i = 0; i < num.length; i += 3) {
      n +=
        parseInt(num.charAt(i), 10) * 3 +
        parseInt(num.charAt(i + 1), 10) * 7 +
        parseInt(num.charAt(i + 2), 10);
    }

    // If the resulting sum is an even multiple of ten (but not zero),
    // the aba routing number is good.
    if (n != 0 && n % 10 == 0) {
      return true;
    } else {
      return false;
    }
  };

  paymentOptionsSubmit = (values: PaymentOverviewFormValues): void => {
    submitPaymentOptions(values, this.store.priceId, this.store.mailingAddress);

    const submittedType = this.store.showDD ? 'ACH' : 'Check';
    const url = `/sell/verification-congrats`;

    this.analyticsHandler.trackPaymentOptionsSubmitted(submittedType);
    window.location.href = url;
  };
}

export default OptionsViewModel;
