import { retrieveInitialDocumentResourceTiming } from '@datadog/browser-rum/cjs/browser/performanceCollection';

import { OptionsStore } from '../options/store';
import { PaymentOverviewStore } from './store';

import { StoreStatus } from 'src/interfaces.d';

const displayCurrency = (num: number): string => {
  return '$' + Math.round(num).toLocaleString();
};

class PaymentOverviewViewModel {
  readonly hero: string = 'payment overview';
  readonly carWorth: string = 'Your car is worth';
  readonly remainingLoan: string = 'Remaining Loan';
  readonly total: string = 'Total';
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

  get isDesktop(): boolean {
    return this.poStore.isDesktop;
  }

  get displayBody(): boolean {
    return this.poStore.displayBody;
  }

  get hasPoq(): boolean {
    // empty string account_number means there is no poq
    return this.oStore.poq.account_number != '';
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
      this.oStore.status != StoreStatus.Initial &&
      this.poStore.status != StoreStatus.Initial
    );
  }

  toggleBody = (): void => {
    this.poStore.setDisplayBody(!this.poStore.displayBody);
  };
}

export default PaymentOverviewViewModel;
