import { valueFromAST } from 'graphql';

import { DirectDepositStore } from '../directdeposit/store';
import { OptionsStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { MailingAddress } from 'src/interfaces.d';
import { PaymentOverviewFormValues } from 'src/interfaces.d';
import { submitPaymentOption } from 'src/modules/options/store';
import Store from 'src/store';

class OptionsViewModel {
  private readonly store: OptionsStore;
  private readonly ddStore: DirectDepositStore;
  private analyticsHandler: AnalyticsHandler;
  private appStore: Store;
  readonly hero: string = `let's set up your payment method`;
  readonly desktopTitle: string = 'how would you like to get paid?';
  readonly optionTitle: string = 'Payment Method';
  readonly optionQuestion: string = 'How would you like to get paid?';
  readonly submit: string = 'submit';
  readonly submitting: string = 'submitting';

  constructor(
    store: OptionsStore,
    ddStore: DirectDepositStore,
    analyticsHandler: AnalyticsHandler,
    appStore: Store
  ) {
    this.store = store;
    this.ddStore = ddStore;
    this.analyticsHandler = analyticsHandler;
    this.appStore = appStore;
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackPaymentOptionsViewed();
  };

  onPlaidSubmitting = (value: boolean): void => {
    this.store.setPlaidSubmitting(value);
  };

  getPlaidSubmitting = (): boolean => {
    return this.store.plaidSubmitting;
  };

  getMailiingAddress = (): MailingAddress => {
    return this.store.mailingAddress;
  };

  getEmail = (): string => {
    return this.store.email;
  };

  showDirectDeposit = (): boolean => {
    return this.store.showDD === 'Direct Deposit';
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
    const re = /\d{1,5}(-?\/?\d{1,5})?\s(\w.\s)?(\b\w*\b\s){1,2}\w*\.?/g;
    const val = str || '';
    return re.test(val);
  };

  isValidZipCode = (zipCode: string | null | undefined): boolean => {
    if (zipCode == null) {
      return false;
    }

    const length = zipCode.length;
    const reg = /^\d{1,5}$/;
    const numbersOnly = reg.test(zipCode);
    if (length !== 5 || !numbersOnly) {
      return false;
    }
    return true;
  };

  isValidName = (str: string | null | undefined): boolean => {
    const re = /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']{2,30}$/;
    if (!str || !re.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  calcMailingAddress = (values: PaymentOverviewFormValues): MailingAddress => {
    if (values.isPrimaryAddress === 'No') {
      return {
        address_1: values.address,
        address_2: values.apartment,
        city: values.city,
        state: values.state,
        zipcode: values.zipcode,
      };
    }
    return this.store.mailingAddress;
  };

  isSubmitPaymentRequired = (values: PaymentOverviewFormValues): void => {
    if (!this.appStore.absmart.paymentRequired) {
      this.paymentOptionsSubmit(values);
      return;
    }
    const mailingAddress = this.calcMailingAddress(values);
    this.appStore.payment.setValues(values, this.store.priceId, mailingAddress);
    window.location.href = `/appraisal/verification/review?priceId=${this.store.priceId}`;
  };

  paymentOptionsSubmit = (values: PaymentOverviewFormValues): void => {
    let submittedType;

    const mailingAddress = this.calcMailingAddress(values);
    submitPaymentOption(values, this.store.priceId, mailingAddress);

    if (
      this.store.showDD === 'Manual Input' ||
      this.store.showDD === 'Direct Deposit'
    ) {
      submittedType = 'Manual ACH';
      this.analyticsHandler.trackManualACHSelected();
    } else {
      submittedType = 'Check';
      this.analyticsHandler.trackCheckSelected();
    }

    this.analyticsHandler.trackPaymentOptionsSubmitted(submittedType);
    window.location.href = `/appraisal/congratulations`;
  };

  getInstitutionNotFound = (): boolean => {
    return this.store.institutionFound === false;
  };

  inFaceliftTest(): boolean {
    return (
      this.store.abSmartlyModel?.inExperiment('ac-payment-facelift') || false
    );
  }

  setPaymentOption = (value: string): void => {
    this.store.setPayOptionSelected(value);
  };
}

export default OptionsViewModel;
