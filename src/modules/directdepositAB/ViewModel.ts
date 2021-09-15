import { DirectDepositStore } from '../directdeposit/store';
import { OptionsStore } from '../options/store';
import { PaymentOverviewStore } from '../paymentoverview/store';

import { PlaidData } from 'src/interfaces.d';

class DirectDepositViewModel {
  private readonly store: DirectDepositStore;
  private readonly oStore: OptionsStore;
  private readonly poStore: PaymentOverviewStore;
  readonly ddToggleOrCopy: string = 'Or,';
  readonly ddTogglePlaidCopy: string = 'link bank account';
  readonly cantFind: string = `Can't find your bank? Enter bank information manually`;

  constructor(
    store: DirectDepositStore,
    oStore: OptionsStore,
    poStore: PaymentOverviewStore
  ) {
    this.store = store;
    this.oStore = oStore;
    this.poStore = poStore;
  }

  getPlaidLinkToken = (): string => {
    return this.store.linkToken;
  };

  getTokenIsLocal = (): boolean => {
    return this.store.tokenIsLocal;
  };

  getShowPlaidLink = (): boolean => {
    return this.store.showPlaidLink;
  };

  getPriceId = (): string => {
    return this.store.priceId;
  };

  getPrice = (): number => {
    if (this.oStore && this.oStore.poq) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { account_number, final_payment } = this.oStore.poq || {};
      const { currentPayments } = this.oStore;

      // eslint-disable-next-line @typescript-eslint/camelcase
      if (currentPayments && account_number != '') {
        // eslint-disable-next-line @typescript-eslint/camelcase
        return final_payment;
      }
    }

    return this.poStore.price;
  };

  togglePlaidLink = (): void => {
    this.store.togglePlaidLink();
  };

  onPlaidSuccess = (
    input: PlaidData,
    onPlaidSubmitting: (value: boolean) => void
  ): void => {
    this.store.plaidSuccess(input, onPlaidSubmitting);
  };

  onPlaidExit = (): void => {
    this.store.plaidExit();
  };

  getInstitutionNotFound = (): boolean => {
    return this.oStore.institutionFound === false;
  };
}

export default DirectDepositViewModel;
