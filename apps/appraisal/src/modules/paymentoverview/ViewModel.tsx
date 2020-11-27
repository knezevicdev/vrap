import { PaymentOverviewStore } from './store';

const displayCurrency = (num: number): string => {
  return '$' + Math.round(num).toLocaleString();
};

class PaymentOverviewViewModel {
  private readonly store: PaymentOverviewStore;
  readonly hero: string = 'payment overview';
  readonly carWorth: string = 'Your car is worth';
  readonly remainingLoan: string = 'Remaining Loan';
  readonly total: string = 'Total';
  readonly isDesktop: boolean = true;

  constructor(store: PaymentOverviewStore) {
    this.store = store;
  }

  getCarWorthPrice = (): string => {
    return displayCurrency(this.store.price);
  };

  getIsDesktop = (): boolean => {
    return this.store.isDesktop;
  };

  getDisplayBody = (): boolean => {
    return this.store.displayBody;
  };

  toggleBody = (): void => {
    this.store.setDisplayBody(!this.store.displayBody);
  };
}

export default PaymentOverviewViewModel;
