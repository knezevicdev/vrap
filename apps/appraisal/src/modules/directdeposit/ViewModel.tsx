import { OptionsStore } from '../options/store';
import { PaymentOverviewStore } from '../paymentoverview/store';
import { DirectDepositStore, plaidSuccess } from './store';

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

  getShowPlaidLink = (): boolean => {
    return this.store.showPlaidLink;
  };

  getPriceId = (): string => {
    return this.store.priceId;
  };

  getPrice = (): string => {
    const {
      currentPayments,
      poq: {
        account_number,
        final_payment
      }
    } = this.oStore;

    if (currentPayments && account_number != '') {
      return final_payment;
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
    plaidSuccess(input, onPlaidSubmitting);
  };

  getInstitutionNotFound = (): boolean => {
    return this.oStore.institutionFound === false;
  };
}

export default DirectDepositViewModel;
