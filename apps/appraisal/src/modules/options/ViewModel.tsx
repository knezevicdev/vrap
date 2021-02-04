import { DirectDepositStore } from '../directdeposit/store';
import { OptionsStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { MailingAddress } from 'src/interfaces.d';
import { PaymentOverviewFormValues } from 'src/interfaces.d';
import { submitPaymentOptions } from 'src/modules/options/store';

class OptionsViewModel {
  private readonly store: OptionsStore;
  private readonly ddStore: DirectDepositStore;
  private analyticsHandler: AnalyticsHandler;
  readonly hero: string = `let's set up your payment method`;
  readonly optionTitle: string = 'Payment Method';
  readonly optionQuestion: string = 'How would you like to get paid?';
  readonly submit: string = 'submit';
  readonly submitting: string = 'submitting';

  constructor(store: OptionsStore, ddStore: DirectDepositStore) {
    this.store = store;
    this.ddStore = ddStore;
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

  onPlaidSubmitting = (value: boolean): void => {
    this.store.setPlaidSubmitting(value);
  };

  getPlaidSubmitting = (): boolean => {
    return this.store.plaidSubmitting;
  };

  getPayOptionSelected = (): string => {
    return this.store.payOptionSelected;
  };

  getMailiingAddress = (): MailingAddress => {
    return this.store.mailingAddress;
  };

  getEmail = (): string => {
    return this.store.email;
  };

  showDirectDeposit = (): boolean => {
    return this.store.showDD;
  };

  getShowSubmitButton = (): boolean => {
    return !this.ddStore.showPlaidLink;
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

  isValidStreetAddress = (str: string | null | undefined): boolean => {
    const re = /\S+(?:\s+[0-9]*[A-z]+)/g;
    const val = str || '';
    return re.test(val);
  };

  isValidZipCode = (zipCode: string | null | undefined): boolean => {
    if (zipCode == null) {
      return false;
    }

    const length = zipCode.length;
    const reg = /^\d+$/;
    const numbersOnly = reg.test(zipCode);
    if (length !== 5 || !numbersOnly) {
      return false;
    }
    return true;
  };

  isValidName = (str: string | null | undefined): boolean => {
    const re = /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']+$/;
    if (!str || !re.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  paymentOptionsSubmit = (values: PaymentOverviewFormValues): void => {
    const calcMailingAddress = (): MailingAddress => {
      if (values.isPrimaryAddress === 'No') {
        return {
          // eslint-disable-next-line @typescript-eslint/camelcase
          address_1: values.address,
          // eslint-disable-next-line @typescript-eslint/camelcase
          address_2: values.apartment,
          city: values.city,
          state: values.state,
          zipcode: values.zipcode,
        };
      }
      return this.store.mailingAddress;
    };

    const mailingAddress = calcMailingAddress();
    submitPaymentOptions(values, this.store.priceId, mailingAddress);

    const submittedType = this.store.showDD ? 'ACH' : 'Check';
    const url = `/sell/verification-congrats`;

    this.analyticsHandler.trackPaymentOptionsSubmitted(submittedType);
    window.location.href = url;
  };
}

export default OptionsViewModel;
