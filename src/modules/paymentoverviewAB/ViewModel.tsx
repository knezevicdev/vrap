import { OptionsStore } from '../optionsAB/store';
import { PaymentOverviewStore } from './store';

import { StoreStatus } from 'src/interfaces.d';

const displayCurrency = (num: number): string => {
  return '$' + Math.round(num).toLocaleString();
};

class PaymentOverviewViewModel {
  readonly hero: string = 'payment overview';
  readonly desktopTitle: string = 'sell summary';
  readonly mobileTitle: string = 'how would like to get paid?';
  readonly carWorth: string = 'Your price';
  readonly remainingLoan: string = 'Remaining Loan';
  readonly total: string = 'Your payment';
  readonly tbd = 'To be determined';
  readonly pricePlaceholder = '--';

  constructor(
    private poStore: PaymentOverviewStore,
    private oStore: OptionsStore
  ) {}

  get carWorthPrice(): string {
    if (!this.isInitialized) return this.pricePlaceholder;
    return displayCurrency(this.poStore.price);
  }

  get hasPoq(): boolean {
    if (this.oStore && this.oStore.poq && this.oStore.poq.account_number) {
      // empty string account_number means there is no poq
      return this.oStore.poq.account_number != '';
    } else {
      return false;
    }
  }

  get hasFinalPayment(): boolean {
    return this.hasPoq && this.oStore.poq.final_payment > 0;
  }

  get remainingLoanBalance(): string {
    const { currentPayments, poq } = this.oStore;

    if (!this.isInitialized) return this.pricePlaceholder;
    if (!currentPayments) return displayCurrency(0);
    if (this.hasFinalPayment) {
      return displayCurrency(poq.final_payoff);
    }

    return this.tbd;
  }

  get totalPrice(): string {
    const { currentPayments, poq } = this.oStore;

    if (!this.isInitialized) return this.pricePlaceholder;
    if (!currentPayments) return this.carWorthPrice;
    if (this.hasFinalPayment) {
      return displayCurrency(poq.final_payment);
    }

    return this.tbd;
  }

  get isInitialized(): boolean {
    return (
      this.oStore.storeStatus != StoreStatus.Initial &&
      this.poStore.storeStatus != StoreStatus.Initial
    );
  }
}

export default PaymentOverviewViewModel;
